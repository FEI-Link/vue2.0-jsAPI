<template>
  <div>
    <div class="container clearfix">
      <div class="left"></div>
      <div class="right">
        <div class="parent">
          <div class="child">
            <div class="login-container">
              <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
                label-position="left">
                <div class="title-container">
                  <h3 class="title">加工方案生成系统</h3>
                </div>
                <el-form-item prop="username">
                  <span class="svg-container">
                    <svg-icon icon-class="user" />
                  </span>
                  <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username"
                    type="text" tabindex="1" auto-complete="on" />
                </el-form-item>
                <el-form-item prop="password">
                  <span class="svg-container">
                    <svg-icon icon-class="password" />
                  </span>
                  <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
                    placeholder="Password" name="password" tabindex="2" auto-complete="on"
                    @keyup.enter.native="handleLogin" />
                  <span class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                  </span>
                </el-form-item>

                <el-button :loading="loading" type="primary" style="width:200px;margin-bottom:30px;margin-right: 40px;"
                  @click.native.prevent="handleLogin">登录</el-button>
                <el-button type="info" style="width:200px;margin-bottom:30px;"
                  @click.native.prevent="handleRegister">注册</el-button>
              </el-form>


            </div>
           
           



          </div>
        </div>
              
        

      </div>
    </div>






    <el-dialog title="用户注册" :visible.sync="centerDialogVisible" width="30%" :show-close="false"
      :close-on-click-modal="false" center>
      <el-form class="registform" ref="registerFrom" :model="registerFrom" label-width="100px">
        <el-form-item label="账号">
          <el-input label-width="140px" v-model="registerFrom.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="registerFrom.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="registerFrom.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="registerFrom.roles">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="设计员" value="designer"></el-option>
            <el-option label="普通用户" value="user"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submitRegister">注册</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { register } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        // password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      centerDialogVisible: false,
      registerFrom: {
        username: '',
        password: '',
        name: '',
        roles: ''
      }
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRegister() {
      this.centerDialogVisible = true
    },
    cancel() {
      this.registerFrom = {
        username: '',
        password: '',
        name: '',
        roles: ''
      }
      this.centerDialogVisible = false
    },
    submitRegister() {
      console.log('注册成功')
      this.centerDialogVisible = false
      register(this.registerFrom).then(res => {
        console.log(res)

        this.$message({
          message: '注册成功',
          type: 'success'
        })
      }).catch(err => {
        this.$message({
          message: '注册失败',
          type: 'danger'
        })
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 90%;
    .el-input__inner {
        color: black;
        caret-color: #000
      }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;

      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .registform {
    .el-form-item  {
      border: solid 1px rgb(255, 255, 255);
      //background-color: #fff;
      
    }

    .el-input {
      border-bottom: solid 1px #666;
      border-radius: 5px;

      .el-input__inner {
        
        color: black;
        caret-color: #000
      }
      
    }

    .el-select {
      width: 100%;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

body {
  margin: 0;
}

.container {
  height: 100vh;
  background-color: #eebefa;
}

.left {
  height: 100vh;
  width: 60vw;
  background-color: #f783ac;
  background-image: url('../../assets/bg.jpg');
  background-size: cover;
  font-size: 26px;
  line-height: 100vh;
  text-align: center;
}

.right {
  height: 100vh;
  background-color: white;
  font-size: 26px;
  //line-height: 100vh;
  text-align: center;
}

/* 清除浮动 */
.clearfix:after {
  content: '';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.left {
  /* 左边列开启浮动 */
  float: left;
}

.right {
  /* 右边列开启浮动 */
  float: left;
  /* 宽度减去左列的宽度 */
  width: calc(100% - 60vw);
}
.parent {
  height: 100vh;
  /* 开启 flex 布局 */
  display: flex;
  /* 方法一 */
  align-items: center; 
}

.child {
  /* 方法二 */
  margin: auto;
}

.registform {
  .el-input {
    width: 80%;
  }
}



.login-container {
  

  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;

    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    color: black;
    .title {
      font-size: 26px;
      
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    
    cursor: pointer;
    user-select: none;
  }
}
</style>
