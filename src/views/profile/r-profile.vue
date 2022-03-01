<template>
  <div>
    <el-form label-position="top" :model="user" size="small">
      <el-form-item label="手机号：" prop="mobile">
        <el-input :value="user.mobile" disabled />
      </el-form-item>
      <el-form-item label="昵称：" prop="nickname">
        <el-input v-model="user.nickname" />
      </el-form-item>
      <el-form :model="user" size="small" :inline="true" label-width="50px">
        <el-form-item label="性别：" prop="sex">
          <el-radio-group v-model="user.sex">
            <el-radio label="SECRET">保密</el-radio>
            <el-radio label="FEMALE">女</el-radio>
            <el-radio label="MALE">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄：" prop="age" style="margin-left: 40px">
          <el-input-number v-model="user.age" :min="3" :max="125" label="年龄" />
        </el-form-item>
      </el-form>
      <el-form-item label="个性签名：" prop="sign">
        <el-input v-model="user.sign" :rows="5" type="textarea" maxlength="255" show-word-limit />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateProfile">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateProfile } from '@/api/user'

export default {
  name: 'RProfile',
  data() {
    return {
      user: { ...this.$store.getters.user }
    }
  },
  methods: {
    updateProfile() {
      const user = { ...this.user }
      delete user.avatar
      updateProfile(user).then(resp => {
        this.$message.success(resp.message)
        if (resp.data) {
          this.$store.dispatch('user/setInfo', resp.data)
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
