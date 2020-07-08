/*
 * @Author: Whzcorcd
 * @Date: 2020-07-07 10:16:14
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-08 11:49:12
 * @Description: file content
 */

'use strict'

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
}
