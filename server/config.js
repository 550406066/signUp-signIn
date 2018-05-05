const config = {
    // 启动端口
    port: 3001,
  
    // 数据库配置
    database: {
      DATABASE: 'user',
      USERNAME: 'root',
      PASSWORD: 'root',
      PORT: '3306',
      HOST: 'localhost',
      TABLE:'user_info'
    }
  }
  
  module.exports = config