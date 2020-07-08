/*
 * @Author: Whzcorcd
 * @Date: 2020-07-07 14:05:48
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-08 17:17:48
 * @Description: file content
 */
'use strict'

const Controller = require('egg').Controller

class RRwebController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.defaultResponse = {
      status: 0,
      data: {},
      msg: '',
    }
  }

  async index() {
    const { ctx, service } = this

    const indexRule = {
      name: { type: 'string' },
      uin: { type: 'string' },
      page: { type: 'string', required: false },
      pageSize: { type: 'string', required: false },
    }

    try {
      ctx.validate(indexRule, ctx.query)
    } catch (err) {
      ctx.logger.warn(err.errors)
      ctx.body = Object.assign({}, this.defaultResponse, {
        status: -1,
        msg: 'illegal parameters',
      })
      ctx.status = 200
      return
    }

    const { name, uin, page, pageSize } = ctx.query
    const res = await service.data.query(
      name,
      Number(uin),
      Number(page),
      Number(pageSize)
    )

    if (res) {
      ctx.body = Object.assign({}, this.defaultResponse, {
        data: {},
        msg: 'success',
      })
    } else {
      ctx.body = Object.assign({}, this.defaultResponse, {
        status: 1,
        data: {},
        msg: 'not exist',
      })
    }
    ctx.status = 200
  }

  async create() {
    const { ctx, service } = this

    const indexRule = {
      name: { type: 'string' },
      uin: { type: 'string' },
      session: { type: 'string' },
      data: { type: 'string' },
      startTime: { type: 'string' },
      endTime: { type: 'string' },
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

    const { name, uin, session, data, startTime, endTime } = ctx.request.body
    const res = await service.data.create({
      name,
      uin: Number(uin),
      session,
      data,
      startTime: Number(startTime),
      endTime: Number(endTime),
    })

    if (res && res.affectedRows === 1) {
      ctx.body = Object.assign({}, this.defaultResponse, {
        data: {},
        msg: 'success',
      })
    } else {
      ctx.body = Object.assign({}, this.defaultResponse, {
        status: -1,
        msg: 'failed',
      })
    }
    ctx.status = 200
  }

  async show() {
    const { ctx, service } = this

    // id 指代 session
    const indexRule = {
      id: { type: 'string' },
    }

    try {
      ctx.validate(indexRule, ctx.params)
    } catch (err) {
      ctx.logger.warn(err.errors)
      ctx.body = Object.assign({}, this.defaultResponse, {
        status: -1,
        msg: 'illegal parameters',
      })
      ctx.status = 200
      return
    }

    const { id } = ctx.params
    const res = await service.data.get(id)

    if (res) {
      ctx.body = Object.assign({}, this.defaultResponse, {
        data: {},
        msg: 'success',
      })
    } else {
      ctx.body = Object.assign({}, this.defaultResponse, {
        status: 1,
        data: {},
        msg: 'not existed',
      })
    }
    ctx.status = 200
  }

  async update() {
    // todo 暂无更新数据功能
    const { ctx } = this

    ctx.body = Object.assign({}, this.defaultResponse, {
      status: -1,
      data: {},
      msg: 'not permitted',
    })
    ctx.status = 403
  }

  async destroy() {
    const { ctx, service } = this

    // id 指代 session
    const indexRule = {
      id: { type: 'string' },
    }

    try {
      ctx.validate(indexRule, ctx.params)
    } catch (err) {
      ctx.logger.warn(err.errors)
      ctx.body = Object.assign({}, this.defaultResponse, {
        status: -1,
        msg: 'illegal parameters',
      })
      ctx.status = 200
      return
    }

    const { id } = ctx.params
    const res = await service.data.delete(id)

    if (res && res.affectedRows === 1) {
      ctx.body = Object.assign({}, this.defaultResponse, {
        data: {},
        msg: 'success',
      })
    } else {
      ctx.body = Object.assign({}, this.defaultResponse, {
        status: 1,
        data: {},
        msg: 'not existed',
      })
    }
    ctx.status = 200
  }
}

module.exports = RRwebController
