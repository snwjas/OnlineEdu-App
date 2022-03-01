<template>
  <el-row type="flex" justify="center" class="footer">
    <el-col :span="20">
      <div>Copyright © 2021 在线教育平台</div>
      <div style="margin-top:5px;">作者：
        <el-link :underline="false" href="https://refrain.xyz" target="_blank">
          Myles Yang
        </el-link>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="scss">
.footer {
  margin-top: 36px;
  padding: 20px;
  text-align: center;
  background-color:#545c64;

  * {
    color: #dcdcdc;
    font-size: 13px;
  }
}
</style>
