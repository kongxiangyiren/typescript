// 生产环境使用
module.exports = {
    port: 8360, // 服务器端口,默认 8360
    host: '127.0.0.1',
    // model: {
    //   type: 'mysql',
    //   mysql: {
    //     database: '',
    //     prefix: 'think_',
    //     encoding: 'utf8mb4',
    //     host: '127.0.0.1',
    //     port: '',
    //     user: 'root',
    //     password: 'root',
    //     dateStrings: true
    //   }
    // },
    session: {
      file: {
        cookie: {
          name: 'thinkjs' // session 名称
        }
      }
    }
  };
  