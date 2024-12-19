module.exports = {
  apps: [
    {
      name: 'app1',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      script: './dist/main.js',
      out_file: './log/file.log',
      error_file: './log/file_error.log',
      autorestart: true, //是否自动重启
      instances: 'max', //要启动实例的数量
    },
  ],
};
