/*
 * @Author: Whzcorcd
 * @Date: 2020-07-07 14:56:36
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-07 18:04:46
 * @Description: file content
 */
'use strict'

const Service = require('egg').Service

class DataService extends Service {
  constructor(ctx) {
    super(ctx)
    this.table = 'rrweb'
  }

  async query(name, uin, page = 1, pageSize = 10) {
    const { app } = this
    const start = (page - 1) * pageSize

    const res = await app.mysql.select(this.table, {
      where: uin ? { is_use: 1, name, uin } : { is_use: 1, name },
      orders: [['id', 'aesc']],
      limit: pageSize,
      offset: start,
    })
    return res
  }

  async get(session) {
    const { app } = this

    if (!session) return {}

    const res = await app.mysql.get(this.table, {
      is_use: 1,
      session,
    })
    return res
  }

  async create(params = {}) {
    const { app } = this

    if (!params) return {}

    const res = await app.mysql.insert(
      this.table,
      Object.assign({}, params, {
        updateTime: app.mysql.literals.now,
      })
    )
    return res
  }

  async update() {
    // todo 暂无更新数据功能
  }

  async delete(session) {
    const { app } = this

    if (!session) return {}

    const res = await app.mysql.delete(this.table, {
      session,
    })
    return res
  }
}

module.exports = DataService
