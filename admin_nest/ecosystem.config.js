module.exports = {
  apps: [
    {
      name: 'Nest_APP', //应用名称
      log_date_format: 'YYYY-MM-DD HH:mm:ss', //日志格式
      script: 'dist/main.js', //启动文件
      out_file: './log/file.log', //日志文件
      error_file: './log/file_error.log', //错误日志文件
      autorestart: true, //是否自动重启
      instances: 2, //要启动实例的数量即负载数量
    },
  ],
};
