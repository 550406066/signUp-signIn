<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="登录" name="first">
      <el-form class="form-format" label-position="right" label-width="80px" ref="formLabelAlign"  :rules="rules"  :model="formLabelAlign">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password"  v-model="formLabelAlign.pass" auto-complete="off"></el-input>
        </el-form-item>
      <el-form-item>
    <el-button type="primary" @click="submitForm('formLabelAlign')">登录</el-button>
    <el-button @click="resetForm('formLabelAlign')">注册</el-button>
    </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="注册" name="second">


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px"  label-position="right"  class="demo-ruleForm form-format">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label=确认密码 prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email"   :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
    </el-tab-pane>

  </el-tabs>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeName: "first",
      formLabelAlign: {
        name: "",
        pass: ""
      },
      ruleForm: {
        name: "",
        pass: "",
        checkPass: "",
        email: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10个字符", trigger: "blur" }
        ],
        pass: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, message: "密码长度在六位以上", trigger: "blur" }
        ],
        checkPass: [
          { validator: validatePass2, trigger: "blur" },
          { min: 6, message: "密码长度在六位以上", trigger: "blur" }
        ]
      }
    };
  },

  created() {

  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.activeName === "second") {
            this.$http.post("http://localhost:3001/home/user/signUp.json", {
                name: this.ruleForm.name,
                email: this.ruleForm.email,
                password:this.ruleForm.pass,
                confirmPassword:this.ruleForm.checkPass
              })
              .then(function(response) {
                if(response.data.success){
                  alert("success")

                }else{
                  alert(response.data.message)
                }
               
              })
              .catch(function(error) {
                console.log(error);
              });
          } else {
          this.$http.post("http://localhost:3001/home/user/signIn.json", {
                name: this.formLabelAlign.name,
                password: this.formLabelAlign.pass,
            
              })
              .then(function(response) {
                console.log(response.data)
                if(response.data.success){
                  alert("success")

                }else{
                 alert(response.data.message)
                }
               
              })
              .catch(function(error) {
                console.log(error);
              });

          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      (this.activeName = "second"), this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
.form-format {
  width: 50%;
  margin: 0 auto;
}
</style>
