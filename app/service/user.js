/*
 * @Author: Whzcorcd
 * @Date: 2020-07-08 11:15:44
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-08 14:32:15
 * @Description: file content
 */
'use strict'

const Service = require('egg').Service

class UserService extends Service {
  constructor(ctx) {
    super(ctx)
    this.table = 'user'
  }

  async check(username, password) {
    const { ctx, app } = this
    // todo

    // 生成 token
    const token = ctx.getToken({
      username,
    })

    return token
  }
}

module.exports = UserService
