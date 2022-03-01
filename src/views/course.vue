<template>
  <el-row type="flex" justify="center">
    <el-col :span="20">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 20px 0;color: #333">
        <el-breadcrumb-item>全部课程</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in getDetailsSubject(course.subjectParent)" :key="index">
          {{ item }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ course.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 播放器 -->
      <div style="position: relative;width: 100%">
        <v-course-player ref="CoursePlayer" />
        <!-- 付费课程订阅栏 -->
        <div v-if="showBuyBanner" class="sub-course">
          <div>
            <div style="color: #fff;font-size: 20px;">
              {{ course.title }}
              <span style="color: #ff4f23;margin-left: 20px;">￥{{ course.price }}</span>
            </div>
            <div style="color: #999;font-size: 13px;margin-top: 5px">
              <span style="margin-right: 26px">{{ course.lessonNum }} 总课时</span>
              <span style="margin-right: 26px">{{ course.buyCount }} 人订阅过</span>
              <span>{{ course.viewCount }} 人观看过</span>
            </div>
          </div>
          <div style="margin-left: auto">
            <div style="width: 22vw;text-align: center">
              <el-button
                type="primary"
                style="width: 18vw;font-size: 18px"
                icon="el-icon-plus"
                @click="openBuyCourseDialog"
              >
                订阅课程
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 课程简介、评价 -->
      <div class="clearfix" style="margin-top: 20px">
        <div style="width: 73%;background-color: #fff;padding: 10px 20px;float: left;">
          <el-tabs>
            <el-tab-pane label="课程概述" class="course-descriptiont" v-html="course.description" />
            <el-tab-pane label="课程评价" lazy>
              <v-course-comment :course="course" />
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- 讲师简介 -->
        <div style="width: 26%;background-color: #fff;float: right">
          <el-card>
            <div slot="header">讲师简介</div>
            <div style="display: flex;align-items: center;">
              <router-link :to="{name: 'SearchByTeacher', params: { teacher: teacher.id || 0 }}">
                <el-avatar fit="contain" :src="teacher.avatar" :size="70" style="float: left;margin-right: 12px" />
              </router-link>
              <div>
                <div style="color: #20a0ff;font-size: 18px;cursor: pointer" @click="linkToTeacher(teacher.id)">
                  {{ teacher.name }}
                </div>
                <div style="margin-top: 10px;font-size: 14px" :title="teacher.email">
                  <i class="el-icon-message" />
                  {{ teacher.email }}
                </div>
              </div>
            </div>
            <div style="margin-top: 12px;font-size: 15px;line-height: 24px;color: #666">
              {{ teacher.intro }}
            </div>
          </el-card>
        </div>
      </div>
    </el-col>
    <el-dialog
      :title="`支付订单《${course.title}》`"
      :visible.sync="buyCourseDialogVisible"
      :close-on-click-modal="false"
      append-to-body
      destroy-on-close
      width="36vw"
    >
      <div style="margin-bottom: 12px">
        <span> 订单编号: {{ orderNo }}</span>
        <span style="margin-left: 24px">金额:
          <span style="color: #ff4f23">￥{{ course.price }}</span>
        </span>
      </div>
      <div style="text-align: center;font-size: 16px">
        请在以下时间内完成支付:
        <mv-count-down
          style="margin-top: 7px"
          :start-time="new Date().getTime()"
          :end-time="new Date().getTime() + 1800000"
          end-text="支付订阅已经过期，请关闭再打开刷新"
          :hour-txt="'小时'"
          :minutes-txt="'分钟'"
          :seconds-txt="'秒'"
          :is-start="true"
        />
      </div>
      <div style="margin: 36px 0 50px 0;text-align: center">
        <el-button type="primary" icon="el-icon-shopping-cart-2" style="width: 16vw;font-size: 20px" @click="buyCourse">
          点击支付
        </el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import { getCourseDetail, getTeacher, getIsBuyCourse, createOrder, orderPaySucceed } from '@/api/content'
import MvCountDown from 'mv-count-down'
import { mapGetters } from 'vuex'

export default {
  name: 'Course',
  components: {
    'v-course-player': () => import('@/components/course/course_player'),
    'v-course-comment': () => import('@/components/course/course_comment'),
    MvCountDown
  },
  data() {
    return {
      course: {},
      teacher: {},
      buyCourseDialogVisible: false,
      orderNo: '',
      isBuyTheCourse: false
    }
  },
  computed: {
    ...mapGetters(['user']),
    showBuyBanner: function() {
      return !(this.course.price === 0 || this.isBuyTheCourse)
    }
  },
  created() {
    const courseId = this.$route.params.id
    this.getCourseData(courseId)
    this.getIsBuyCourse(courseId)
  },
  methods: {
    getCourseData(id) {
      getCourseDetail(id).then(resp => {
        this.course = resp.data
        // 获取讲师信息
        this.getTeacher(this.course.teacherId)
        // 初始化播放器
        setTimeout(function() {
          this.$refs.CoursePlayer.setData(this.course)
        }.bind(this), 100)
      })
    },
    getTeacher(id) {
      getTeacher(id).then(resp => {
        this.teacher = resp.data
      })
    },
    getIsBuyCourse(id) {
      if (this.user === null || Object.keys(this.user).length === 0) {
        return
      }
      getIsBuyCourse(id).then(resp => {
        this.isBuyTheCourse = resp.data
      })
    },
    getDetailsSubject(subjectParent) {
      let subject = []
      let parent = subjectParent
      while (parent) {
        subject = [parent.title, ...subject]
        parent = parent.parent
      }
      return subject
    },
    openBuyCourseDialog() {
      if (this.user === null || Object.keys(this.user).length === 0) {
        // this.$message.info('请登录后再操作')
        this.$login()
        return
      }
      // 创建订单
      const params = {
        courseId: this.course.id,
        memberId: this.user.id,
        totalFee: this.course.price
      }
      createOrder(params).then(resp => {
        this.$message({ message: resp.message, type: 'success', customClass: 'elmessage' })
        this.orderNo = resp.data
        this.buyCourseDialogVisible = true
      })
    },
    // 支付订单成功
    buyCourse() {
      if (this.orderNo) {
        orderPaySucceed(this.orderNo).then(resp => {
          this.$message.success(resp.message)
          this.buyCourseDialogVisible = false
        })
      }
    },
    linkToTeacher(tid) {
      this.$router.push({
        name: 'SearchByTeacher',
        params: { teacher: tid }
      })
    }
  }
}
</script>

<style lang="scss">
.el-tabs__item {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
}

.elmessage {
  z-index: 9999 !important;
}
</style>

<style lang="scss" scoped>
.sub-course {
  background-color: #333;
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: 80px;
  z-index: 3;
  padding: 14px 16px;
  display: flex;
  align-items: center;
}

// 课程介绍颜色
.course-descriptiont {
  /* table 样式 */
  table {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }

  table td,
  table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
  }

  table th {
    border-bottom: 2px solid #ccc;
    text-align: center;
  }

  /* blockquote 样式 */
  blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
  }

  /* code 样式 */
  code {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
  }

  pre code {
    display: block;
  }

  /* ul ol 样式 */
  ul, ol {
    margin: 10px 0 10px 20px;
  }
}
</style>
