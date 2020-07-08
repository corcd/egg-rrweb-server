/*
 * @Author: Whzcorcd
 * @Date: 2020-07-08 13:27:20
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-08 16:59:57
 * @Description: file content
 */
'use strict'

module.exports = {
  // 生成 token
  getToken(value) {
    return this.app.jwt.sign(value, this.app.config.jwt.secret, {
      expiresIn: '1h',
    })
  },

  // 验证 token
  checkToken(token) {
    return this.app.jwt.verify(token, this.app.config.jwt.secret)
  },
}
