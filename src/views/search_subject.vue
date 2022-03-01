<template>
  <el-row type="flex" justify="center">
    <el-col :span="20">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 30px 0;color: #333">
        <el-breadcrumb-item>全部课程</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in subjectParent" :key="index">
          {{ item }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <v-course-list :course-list="courseList" style="margin-top: 40px" />
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
    </el-col>
  </el-row>
</template>

<script>
import { getCourses, getSubjectParent } from '@/api/content'

export default {
  name: 'SearchSubject',
  components: {
    'v-course-list': () => import('@/components/common/course_list')
  },
  data() {
    return {
      searchParams: {
        current: 1,
        pageSize: 12,
        subjectId: null
      },
      total: 0,
      courseList: [],
      subjectParent: []
    }
  },
  watch: {
    $route(to, from) {
      const subjectId = this.$route.params.subject
      this.searchParams.subjectId = subjectId
      this.searchParams.current = 1
      this.getSubjectParent(subjectId)
      this.getList()
    }
  },
  created() {
    const subjectId = this.$route.params.subject
    this.searchParams.subjectId = subjectId
    this.getSubjectParent(subjectId)
    this.getList()
  },
  methods: {
    getList() {
      getCourses(this.searchParams).then(resp => {
        this.courseList = resp.data.list
        this.total = resp.data.total
      })
    },
    getSubjectParent(id) {
      getSubjectParent(id).then(resp => {
        let subject = []
        let parent = resp.data
        while (parent) {
          subject = [parent.title, ...subject]
          parent = parent.parent
        }
        this.subjectParent = subject
      })
    }
  }
}
</script>

<style lang="scss">

</style>
