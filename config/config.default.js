/*
 * @Author: Whzcorcd
 * @Date: 2020-07-07 10:16:14
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-08 17:01:46
 * @Description: file content
 */

/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1594088148603_9210'

  // add your middleware config here
  config.middleware = ['gzip', 'errorHandler']

  // add your user config here
  const userConfig = {
    myAppName: 'rrweb-server',
    cluster: {
      listen: {
        port: 7001,
        hostname: '127.0.0.1',
      },
    },
    jwt: {
      secret: 'gdy-rrweb', // 自定义 token 加密条件字符串
      ignore: '/api/user/login',
    },
    auth: {
      ignore: ['/api/user/login'], // 忽略注册和登陆的接口
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
        headerName: 'x-csrf-token',
      },
      domainWhiteList: ['http://localhost'],
    },
    bodyParser: {
      jsonLimit: '2mb',
      formLimit: '2mb',
    },
    mysql: {
      client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'rrweb',
      },
      app: true,
      agent: false,
    },
    gzip: {
      threshold: 1024,
    },
    errorHandler: {
      match: '/api',
    },
  }

  return {
    ...config,
    ...userConfig,
  }
}
