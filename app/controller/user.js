/*
 * @Author: Whzcorcd
 * @Date: 2020-07-08 09:30:28
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-08 17:09:48
 * @Description: file content
 */
'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.defaultResponse = {
      status: 0,
      data: {},
      msg: '',
    }
  }

  async login() {
    const { ctx, service } = this

    const indexRule = {
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    }

    try {
      ctx.validate(indexRule, ctx.request.body)
    } catch (err) {
      ctx.logger.warn(err.errors)
      ctx.body = Object.assign({}, this.defaultResponse, {
        status: -1,
        msg: 'illegal parameters',
      })
      ctx.status = 200
      return
    }

    const { username, password } = ctx.request.body

    const res = await service.user.check(username, password)

    if (res) {
      ctx.body = Object.assign({}, this.defaultResponse, {
        data: { token: res },
        msg: 'success',
      })
    } else {
      ctx.body = Object.assign({}, this.defaultResponse, {
        status: -1,
        data: {},
        msg: 'error',
      })
    }
    ctx.status = 200
  }

  async account() {
    const { ctx } = this

    const user = ctx.state.user

    ctx.body = Object.assign({}, this.defaultResponse, {
      data: { user },
      msg: 'success',
    })
    ctx.status = 200
  }

  async logout() {
    const { ctx } = this

    ctx.body = Object.assign({}, this.defaultResponse, {
      status: -1,
      data: {},
      msg: 'coming soon',
    })
    ctx.status = 403
  }
}

module.exports = UserController
