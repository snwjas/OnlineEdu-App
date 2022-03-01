<template>
  <el-dialog
    :visible.sync="loginFormVisible"
    top="25vh"
    width="400px"
    custom-class="login"
    :show-close="false"
    :close-on-click-modal="false"
    @closed="close"
  >
    <el-tabs v-model="tabName" type="border-card" :stretch="true">
      <el-tab-pane label="登录" name="login">
        <el-form ref="loginForm" :model="loginForm">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              type="text"
              placeholder="请输入手机号"
              autocomplete="off"
              prefix-icon="el-icon-user"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              autocomplete="off"
              prefix-icon="el-icon-lock"
            />
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" style="width: 100%" @click="login">登  录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <el-form ref="regForm" :model="regForm">
          <el-form-item prop="username">
            <el-input
              v-model="regForm.username"
              type="text"
              placeholder="请输入手机号"
              autocomplete="off"
              prefix-icon="el-icon-user"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="regForm.password"
              type="password"
              placeholder="请输入密码"
              autocomplete="off"
              prefix-icon="el-icon-lock"
            />
          </el-form-item>
          <el-form-item prop="checkPassword">
            <el-input
              v-model="regForm.confirmPassword"
              type="password"
              placeholder="请确认密码"
              autocomplete="off"
              prefix-icon="el-icon-lock"
            />
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" style="width: 100%" @click="register">注  册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <i class="el-icon-circle-close close" @click="loginFormVisible = false" />
  </el-dialog>
</template>

<script>
import { register } from '@/api/user'
import store from '@/store'
export default {
  name: 'Login',
  data() {
    return {
      loginFormVisible: false,
      loginForm: {
        username: '13077591234',
        password: ''
      },
      regForm: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      tabName: 'login',
      loading: false
    }
  },
  methods: {
    show() {
      this.loginFormVisible = true
    },
    close() {

    },
    login() {
      if (this.loading) return
      this.loading = true
      this.$verify()
        .then(() => store.dispatch('user/login', this.loginForm)
          .then(() => {
            this.loginFormVisible = false
            this.loading = false
          })
        )
        .catch((err) => { this.loading = false; console.log(err) })
    },
    register() {
      this.$verify()
        .then(() => register(this.regForm)
          .then(resp => {
            this.loginForm.username = this.regForm.username
            this.loginForm.password = this.regForm.password
            this.$message.success('注册成功，请登录')
            this.tabName = 'login'
            this.loading = false
          })
        )
        .catch((err) => { this.loading = false; console.log(err) })
    }
  }
}
</script>

<style lang="scss">
.login {
  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    padding: 0;
  }
}
</style>

<style scoped lang="scss">
.close {
  font-size: 30px;
  color: #fff;
  position: absolute;
  right: -22px;
  top: -26px;
  cursor: pointer;
}
</style>
