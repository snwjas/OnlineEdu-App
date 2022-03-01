<!-- 申请成为讲师 -->
<template>
  <el-row type="flex" justify="center">
    <el-col :span="16" style="background-color: #fff;margin-top: 30px;color: #333;border-radius: 5px;">
      <div style="padding: 32px 0;text-align: center;font-size: 20px;font-weight: bold;">申请成为讲师</div>
      <div style="padding: 20px 0;">
        <el-steps :active="stepActive" simple finish-status="success" style="width: 80%;margin: 0 auto;">
          <el-step title="签订协议" />
          <el-step title="填写资料" />
          <el-step title="审核" />
        </el-steps>
      </div>
      <!-- 1. 签约协议 -->
      <div v-if="stepActive===0">
        <div class="treaty">
          <p />
          <p />
          <p><b>甲方：xxx有限公司（简称“在线教育平台”）<br> 乙方：提交有效申请并经在线教育平台审核通过后，有权在在线教育平台制作，并在在线教育平台发布付费作品的自然人、法人、其他机构组织。<br> </b>
          </p>
          <h3> 一、合作协议总则 </h3>
          <p> 1、 本协议双方为甲方和乙方<u>（以下简称“讲师”或“您”）</u>。 </p>
          <p> 2、 乙方在注册前请仔细阅读本协议的条款，并按照页面上的提示完成全部注册程序。 </p>
          <p> 3、 乙方在进行注册过程中点击“同意”按钮，即表示您已充分知悉和完全接受本协议项下全部条款，进而与甲方达成本协议。 </p>
          <p> 4、 甲方有权不时对本协议项下各类业务规则作出修改或补充，并通过甲方网站公布。您若继续使用即视为您接受修订后的本协议条款。否则,您有权在确保用户权益的情况下终止与甲方的合作。 </p>
          <h3> 二、合作内容 </h3>
          <p> 1、乙方作为甲方旗下:<u> 在线教育平台 </u>的签约讲师，基于甲方 &nbsp;&nbsp;&nbsp;的在线教育平台，为甲方的用户提供远程培训课程及答疑服务。乙方主要工作包括录制课程和定期在线答疑。
          </p>
          <p> 2、甲方提供对乙方的课程信息（讲师）展示和推广服务，提供对课程播放的技术维护、服务器宽带、客服销售支持工作。 </p>
          <h3> 三、分成比例与结算方式 </h3>
          <p> 1、乙方享有对提供的课程的定价权，甲方可提出定价参考建议。 </p>
          <p> 2、甲乙双方按约定比例分成，按乙方在甲方平台的课程交易额，乙方收取销售额的比例为 60% ，甲方获取销售额的比例为 40% ； </p>
          <p> 3、乙方提供的课程在甲方平台上销售收入和销售分成以甲方系统中实际记录的数据为准,若有异议的双方可协商处理,并于协商之日起7个工作日内予以确认。双方无法协商一致的，任何一方可按本协议争议解决条款维护权益。 </p>
          <p> 4、乙方分成收益的结算周期为1个月,
            甲方于每个月的前10个工作日（法定节假日顺延）汇总统计乙方的应得收益，经乙方确认无误之日起（以电子邮件或微信的形式确认），甲方在3个工作日内将款项支付至乙方指定银行账户。 </p>
          <p> 5、乙方的银行卡信息若变更需及时通知甲方,否则造成的损失由乙方负责。 </p>
          <h3> 四、课程内容规定 </h3>
          <p> 1、乙方提供的录制课程不得含有下列内容： </p>
          <p> （1）&nbsp; 违反宪法确定的基本原则的。 </p>
          <p> （2）&nbsp; 危害国家的统一、主权和领土完整的。 </p>
          <p> （3）&nbsp; 泄漏国家秘密、危害国家安全或者损害国家的荣誉和利益的。 </p>
          <p> （4）&nbsp; 煽动民族仇恨、分裂和歧视，侵害少数民族风俗习惯，破坏民族团结的。 </p>
          <p> （5）&nbsp; 宣扬邪教、迷信的，扰乱社会秩序，破坏社会稳定的。 </p>
          <p> （6）&nbsp; 宣扬淫秽、赌博或者渲染暴力、教唆犯罪的，危害社会公德和民族优秀文化传统的。 </p>
          <p> （7）&nbsp; 侮辱或者诽谤他人，侵害他人合法权益的。 </p>
          <p> （8）&nbsp; 有法律、行政法规和国家规定禁止的其他内容的。 </p>
          <p>
            2、如因乙方课程内容违法违规造成的一切损失和责任，由乙方自行独立承担。如甲方发现乙方课程存在前述不合法不合规的情况，有权告知乙方并建议调整及整改；乙方应积极配合，主动整改。自收到甲方建议之日起7个工作日内未整改完毕的，甲方有权单方解除本合同。 </p>
          <h3> 五、课程交付规则 </h3>
          <p>
            1、乙方提交课程大纲经甲方审核通过之日起（以电子邮件或微信的形式确认），乙方应在1个月内提交第一次课时内容（首次提交的课时内容不得少于全部课时内容的50%），并承诺保证以后每周至少提交3个课时以上的内容，全部课时必须在3个月以内完成提交。 </p>
          <p> 2、如乙方由于不可抗力导致不能按时提交/更新课程时，须在出现该原因之日起5日内通知甲方，双方另行约定课程的更新/交付日期。 </p>
          <p> 3、如果因乙方个人原因导致无法按时完成全部课程时，乙方需提前7个工作日与甲方进行协商沟通, 双方另行约定课程的更新/交付日期。 </p>
          <p>
            4、如果在双方另行约定更新/交付日期到期时，乙方仍不能更新/交付课件，甲方有权选择下线该课程，单方解除合作关系而不承担任何违约责任；乙方同意对已上线的课程收入所得进行冻结，用以垫付用户/学员退款（退款金额全部由乙方承担）；如果乙方课程收入所得无法满足向用户/学员退款的金额，不足部分由乙方承担差额补足责任，并对由此给甲方造成的损失承担法律责任。 </p>
          <h3> 六、课程发布规则 </h3>
          <p> 1、乙方提供的课程中，必须有1个课时（包含1个课时）以上的免费课时。 </p>
          <p> 2、乙方提交课程之日起7个工作日内，甲方应完成课程审核，并发布上线，如审核未通过将会在审核结束后3个工作日内以电子邮件方式通知乙方。 </p>
          <p> 3、如因任何一方出现不可抗力而需要推迟课程发布日期时，存在不可抗力的一方应向另一方及时说明，双方另行协商确定课程发布日期。 </p>
          <p> 4、如甲方由于不可抗力停止该课程的合作，甲方应按照本合作协议项下的分成比例条款向乙方支付该课程剩余销售所得。 </p>
          <h3> 七、播放权与版权规则 </h3>
          <p>
            1、乙方提供给甲方在线教育平台所发布的课程以及课件（包括但不限于文档），在本协议有效期内，甲方拥有课程及课件的播放权、使用权。本协议有效期届满（或经双方协商一致同意提前终止合作协议后），为保证已付费用户利益，甲方仍保留该课程对已付费用户的播放权，但不会再销售该课程。 </p>
          <p> 2、如出现因乙方提供的课程涉嫌违反相关法律法规规定，有可能导致甲方承担法律责任、经济或名誉损失的，甲方有权决定停播此课程。 </p>
          <p>
            3、如发现乙方提供的课程在其它网站（包含乙方自己的网站）销售价格低于在甲方网站上销售的价格，甲方有权决定停播此课程。课程停播后，如果出现需要向付费用户退款的情况，乙方同意将乙方课程收入所得用以垫付用户/学员退款（退款金额由乙方承担）；如果乙方课程收入所得无法满足向用户/学员退款的金额，不足部分由乙方承担差额补足责任，并对由此给甲方造成的损失承担法律责任。 </p>
          <p> 4、除本条第1点约定的播放权和使用权外，本课程的版权归乙方所有。 </p>
          <p> 5、乙方承诺向甲方提供的课程不存在与第三方的任何版权纠纷或潜在争议。否则，由此带来的一切法律后果由乙方自行独立承担。 </p>
          <h3> 八、服务规则 </h3>
          <p> 1、乙方按照提交的课程大纲录制作品，并在甲乙双方商定时间内交付/更新。 </p>
          <p> 2、课程上线后，乙方（讲师）应在48小时内线上回复付费用户与该课程有关的疑问。 </p>
          <p> 3、本协议有效期届满（或经双方协商一致同意提前终止合作后），乙方仍需回复付费用户与该课程有关的疑问。 </p>
          <h3> 九、保密规则 </h3>
          <p> 1、甲乙双方应对因履行本协议而取得的对方的各种形式的技术或商业信息保密（包括本协议内容本身），法律法规另有规定的除外；未经一方事先书面允许，另一方不得将双方合作信息，如价格，销售分成比例等透露给第三方。 </p>
          <h3> 十、其他约定 </h3>
          <p> 1、本协议项下任何争议，双方应友好协商解决；协商不成的，任何一方均可向甲方所在地人民法院提起诉讼。 </p>
          <p> 2、课程的具体录制内容等其他条款，双方在《课程制作规范》进行约定。《课程制作规范》和本协议具有同等的法律效力。 </p>
          <p> 3、自乙方点击同意接受本协议全部条款之时生效。 </p>
          <p />
        </div>
        <div class="treaty" style="padding: 10px 20px;">
          <el-checkbox v-model="treatyChecked" style="color: #d51423;">我已阅读并同意此协议</el-checkbox>
        </div>
        <div style="margin: 20px 0;text-align: center;">
          <el-button type="primary" style="width: 240px;" @click="stepTwo">下一步</el-button>
        </div>
      </div>
      <!-- 2. 填写资料 -->
      <div v-if="stepActive===1" style="margin: 40px 10% 0 10%">
        <el-form :inline="true" :model="data" size="small" label-width="100px">
          <div class="avatar-container">
            <el-tooltip effect="dark" placement="right" style="float: left">
              <div slot="content">点击上传个人头像<br>图片大小不超过1MB</div>
              <el-upload
                action=""
                :auto-upload="false"
                :show-file-list="false"
                accept=".png, .jpg, .jpeg"
                :on-change="selectAvatar"
              >
                <el-avatar :size="100" :src="original.avatar" fit="cover">
                  <img
                    alt=""
                    src="data:image/png;base64,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"
                  >
                </el-avatar>
              </el-upload>
            </el-tooltip>
            <div class="avatar-right">
              <div>
                <el-form-item label="讲师名称：" prop="name">
                  <el-input v-model="data.name" placeholder="请输入用户名" />
                </el-form-item>
              </div>
              <el-form-item label="手机号：" prop="mobile">
                <el-input v-model="data.mobile" placeholder="请输入手机号" />
              </el-form-item>
              <el-form-item label="邮箱地址：" prop="email">
                <el-input v-model="data.email" placeholder="请输入邮箱地址" />
              </el-form-item>
            </div>
          </div>
        </el-form>
        <el-form :model="data" size="small" style="margin-top: 10px">
          <el-form-item label="简介：" prop="intro">
            <el-input
              v-model="data.intro"
              :rows="7"
              type="textarea"
              maxlength="1023"
              show-word-limit
              placeholder="个人描述、简介"
            />
          </el-form-item>
          <el-form-item label="简历：" prop="intro">
            <el-tooltip effect="dark" placement="right" style="float: left">
              <div slot="content">简历大小不超过5MB</div>
              <el-upload
                action=""
                :auto-upload="false"
                :show-file-list="false"
                accept=".png, .jpg, .jpeg, .pdf"
                :on-change="selectResume"
              >
                <el-button size="small" type="primary">点击上传简历</el-button>
              </el-upload>
            </el-tooltip>
            <div class="ellipse" style="margin-left: 24px;display: inline-block;width: 60%" :title="resumeName">
              {{ resumeName }}
            </div>
          </el-form-item>
        </el-form>
        <div style="margin: 30px 0 20px 0;text-align: center;">
          <el-button type="primary" style="width: 240px;" @click="submitApply">提 交</el-button>
        </div>
      </div>
      <!-- 3. 申请成功，待审核 -->
      <div v-if="stepActive===2" style="font-size: 24px;text-align: center;margin-top: 10vh">
        <div>讲师申请提交成功，待管理员审核！</div>
        <div style="margin: 10vh 0 20vh 0">
          <router-link to="/">
            <el-button type="primary" style="width: 240px;">返回首页</el-button>
          </router-link>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { teacherApply } from '@/api/content'
import { jsonObj2FormData } from '@/utils'

export default {
  name: 'Apply',
  data() {
    return {
      stepActive: 0,
      treatyChecked: false,
      original: {
        avatar: ''
      },
      data: {
        name: '',
        mobile: '',
        email: '',
        intro: '',
        resumeFile: null
      },
      resumeName: ''
    }
  },
  methods: {
    stepTwo() {
      if (this.treatyChecked) {
        this.stepActive = 1
      } else {
        this.$message.info('请阅读并勾选同意此协议')
      }
    },
    submitApply() {
      const data = jsonObj2FormData(this.data)
      teacherApply(data).then(resp => {
        this.$message.success(resp.message)
        this.stepActive = 2
      })
    },
    selectAvatar(file) {
      this.original.avatar = URL.createObjectURL(file.raw)
      this.data.file = file.raw
    },
    selectResume(file) {
      this.data.resumeFile = file.raw
      this.resumeName = file.name
    }
  }
}
</script>

<style lang="scss">
.el-step {
  .is-process {
    color: #409eff;
    border-color: #409eff;
  }
}
</style>

<style scoped lang="scss">
.treaty {
  margin: 0 40px;
  padding: 20px;
  border: 1px solid #e4e4e4;

  p, h3 {
    font-size: 12px;
  }
}
</style>
