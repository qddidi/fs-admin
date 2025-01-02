import mysql from "mysql2/promise"; // 使用 promise 版本的 mysql2
import cron from "node-cron";
import fs from "fs/promises"; // 使用 promises API

// 数据库连接配置
const connectionConfig = {
  host: "",
  user: "",
  port: 3307,
  password: "",
  database: "fs_admin",
};

// 创建数据库连接
const createConnection = async () => {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    console.log("Connected to the database.");
    return connection;
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err; // 抛出错误以便后续处理
  }
};

// 读取 SQL 文件并执行
const executeSqlFile = async (connection, filePath) => {
  try {
    const sql = await fs.readFile(filePath, "utf8");
    const sqlStatements = sql
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt);
    for (const statement of sqlStatements) {
      if (statement) {
        try {
          await connection.query(statement);
        } catch (error) {
          console.error("Error executing SQL statement:", statement, error);
        }
      }
    }
  } catch (err) {
    console.error("Error reading SQL file:", err);
  }
};

// 定时任务，每分钟执行一次
const scheduleTask = (connection) => {
  cron.schedule("* * * * *", () => {
    console.log("Executing SQL file...");
    executeSqlFile(connection, "fs_admin.sql");
  });
};

// 主函数
const main = async () => {
  const connection = await createConnection();
  scheduleTask(connection);

  // 处理进程退出
  process.on("SIGINT", async () => {
    try {
      await connection.end();
      console.log("Database connection closed.");
      process.exit();
    } catch (err) {
      console.error("Error ending the database connection:", err);
      process.exit(1);
    }
  });
};

// 启动主函数
main().catch((err) => {
  console.error("An error occurred:", err);
});
