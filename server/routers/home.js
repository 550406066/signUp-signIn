const router = require('koa-router')()
const userInfoController = require('./../controllers/user_Info')
const routers = router.post('/user/signUp.json', userInfoController.signUp)
.get('/user/getUserInfo.json', userInfoController.getLoginUserInfo)
.post('/user/signIn.json', userInfoController.signIn)

  
module.exports = routers