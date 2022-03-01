<!-- 招聘要求 -->
<template>
  <el-row type="flex" justify="center">
    <el-col :span="16" style="background-color: #fff;margin-top: 30px;color: #333;border-radius: 5px;">
      <div style="padding: 40px 0;text-align: center;font-size: 20px;font-weight: bold">
        讲师招聘
      </div>
      <div style="padding: 0 50px 50px;line-height: 28px">
        <p />
        <p>在线教育平台是专注于在线教育内容提供的平台,致力于为用户提供优质的在线教育内容。为适应平台的发展和给用户提供更多高质量的内容，我们期待有理想、有追求的<em>您能加入
        </em>我们一起通过互联网无边界的方式进行传播服务到更多努力求知的用户! </p>
        <p><br></p>
        <p> 讲师权益 </p>
        <p>1、能力变现：技术能力的兑现且收益可持续 </p>
        <p>2、精湛加密：保护你的知识版权 </p>
        <p>3、品牌塑造：帮你打造在线教育领域个人品牌 </p>
        <p> <br> </p>
        <p> 申请条件 </p>
        <p>1、教育行业内2年以上从业经验，自身有丰富的教学知识体系及经验 </p>
        <p>2、拥有过讲师、培训讲师经历 </p>
        <p>3、喜欢在行业内分享心得（写博客，逛论坛等） </p>
        <p>4、参与过知名教育行业峰会讲师</p>
        <p />
        <p><br></p>
        <p><br></p>
        <div style="text-align: center">
          <router-link :to="{name:'Apply'}">
            <el-button type="primary" style="width: 160px">申请成为讲师</el-button>
          </router-link>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'RecruitReqm'
}
</script>

<style scoped>

</style>
