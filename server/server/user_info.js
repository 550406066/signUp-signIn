const validator = require('validator')
const userModel = require('../models/user_info')
const userCode = require('./../message/userTip')

const user={
    async create(user){
        let result=await userModel.create(user)
        return result
    },
    async getExistOne(formData){
        let resultData=await userModel.getExistOne({
            "email":formData.email,
            "name":formData.name
        })
        return resultData
    },
    async signIn( formData ) {

        let resultData = await userModel.getOneByUserNameAndPassword({
          'password': formData.password,
          'name': formData.name})
  
        return resultData
      },
    async getUserInfoByUserName(userName){
        let resultData=await userModel.getUserInfoByUserName(userName)
            let userInfo={
                email:resultData.email,
                userName:resultData.name,
                detailInfo:resultData.detailInfo,
                createTime:resultData.createTime,
        }
        return userInfo
    },
    validatorSignUp(userInfo ){
        console.log("userInfo"+userInfo.userName)
        console.log("userInfo"+ userInfo.email)
        console.log("userInfo"+ userInfo.password)
        console.log("userInfo"+userInfo.confirmPassword)
        let result={
            success:false,
            message:'',
        }
        if ( /[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false ) {
            result.message = userCode.ERROR_USER_NAME
            return result
          }
          if ( !validator.isEmail( userInfo.email ) ) {
            result.message = userCode.ERROR_EMAIL
            return result
          }
          if ( !/[\w+]{6,16}/.test( userInfo.password )  ) {
            result.message = userCode.ERROR_PASSWORD
            return result
          }
          if ( userInfo.password !== userInfo.confirmPassword ) {
            result.message = userCode.ERROR_PASSWORD_CONFORM
            return result
          }
      
          result.success = true
      
          return result
        
    }

}
module.exports=user