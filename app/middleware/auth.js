/*
 * @Author: Whzcorcd
 * @Date: 2020-07-08 11:57:17
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-08 17:00:10
 * @Description: file content
 */
'use strict'

module.exports = (options, app) => {
  return async (ctx, next) => {
    const token = ctx.header.authorization

    console.log(token)
    if (!token) {
      ctx.throw(401, '没有权限')
    }

    // 根据 token，换取用户信息
    let user = {}
    try {
      user = ctx.checkToken(token)
      console.log(user)
    } catch (error) {
      console.error(error)
      const fail =
        error.name === 'TokenExpiredError'
          ? 'Token 已过期! 请重新获取令牌'
          : 'Token 令牌不合法!'
      ctx.throw(401, fail)
    }
    // // 判断当前用户是否登陆
    // const t = await ctx.service.cache.get('user_' + user.id)
    // if (!t || t !== token) {
    //   ctx.throw(401, 'Token 不合法')
    // }
    // // 判断用户的状态
    // user = await app.model.User.findByPk(user.id)
    // if (!user || user.status === 0) {
    //   ctx.throw(401, '用户不存在或已经被禁用')
    // }
    // // 把 user 信息挂载到全局 ctx
    // ctx.authUser = user
    await next()
  }
}
