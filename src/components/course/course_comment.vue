<template>
  <div>
    <div style="text-align: right">
      <el-button size="small" type="primary" @click="openDialog">发表评价</el-button>
    </div>
    <div v-for="comment in listData" :key="comment.id" class="comment-item">
      <div class="member">
        <el-avatar :src="comment.memberAvatar" />
        <div class="ellipse">{{ comment.memberName }}</div>
      </div>
      <div class="content">
        <div>
          <el-rate :value="comment.mark" disabled disabled-void-color="#ccc" />
        </div>
        <div class="text">{{ comment.content }}</div>
        <div class="ct">发表时间：{{ comment.createTime }}</div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :total="total"
        :page-size.sync="searchParams.pageSize"
        :current-page.sync="searchParams.current"
        @size-change="getList"
        @current-change="getList"
      />
    </div>
    <el-dialog
      title="发表评论"
      :visible.sync="publishDialogVisible"
      :close-on-click-modal="false"
      append-to-body
      width="36vw"
    >
      <el-form :model="publishCommentData" size="small" label-width="60px">
        <el-form-item label="评分：">
          <el-rate
            v-model="publishCommentData.mark"
            style="height: 32px;display: flex;align-items: center"
            allow-half
            show-score
            text-color="#ff9900"
          />
        </el-form-item>
        <el-form-item label="内容：">
          <el-input
            v-model="publishCommentData.content"
            type="textarea"
            placeholder="请输入评论内容"
            maxlength="1023"
            :rows="5"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" size="small" @click="publishComment">发 表</el-button>
        <el-button size="small" @click="publishDialogVisible=false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCourseComment, publishComment } from '@/api/content'
import { mapGetters } from 'vuex'

export default {
  name: 'CourseComment',
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      searchParams: {
        current: 1,
        pageSize: 10
      },
      total: 0,
      listData: [],
      publishCommentData: {
        courseId: null,
        memberId: null,
        teacherId: null,
        mark: 5,
        content: ''
      },
      publishDialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const params = { courseId: this.course.id, ...this.searchParams }
      getCourseComment(params).then(resp => {
        this.listData = resp.data.list
        this.total = resp.data.total
      })
    },
    publishComment() {
      this.publishCommentData.courseId = this.course.id
      this.publishCommentData.memberId = this.user.id
      this.publishCommentData.teacherId = this.course.teacherId
      publishComment(this.publishCommentData).then(resp => {
        this.$message.success(resp.message)
        this.publishDialogVisible = false
      })
    },
    openDialog() {
      if (this.user === null || Object.keys(this.user).length === 0) {
        // this.$message.info('请登录后再操作')
        this.$login()
        return
      }
      this.publishDialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
.comment-item {
  position: relative;
  padding: 20px 20px 20px 80px;
  border-bottom: 1px solid #e5e5e5;

  .member {
    position: absolute;
    width: 80px;
    text-align: center;
    top: 20px;
    left: 0;
    font-size: 13px;
  }

  .content {
    .text {
      color: #333;
      font-size: 14px;
    }

    .ct {
      color: #999;
      font-size: 12px;
      margin-top: 5px;
    }
  }
}
</style>
