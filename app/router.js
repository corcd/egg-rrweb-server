/*
 * @Author: Whzcorcd
 * @Date: 2020-07-07 10:16:14
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-08 17:11:14
 * @Description: file content
 */

'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app

  router.get('/api/user/account', jwt, controller.user.account)

  router.post('/api/user/login', controller.user.login)
  router.post('/api/user/logout', jwt, controller.user.logout)

  router.resources('rrweb', '/api/rrweb', jwt, controller.rrweb)
}
