<template>
  <el-row type="flex" justify="center">
    <el-col :span="20">
      <v-carousel style="margin-top: 20px" />
      <div class="course-list">课程列表</div>
      <v-course-list :course-list="courseList" style="margin-top: 20px" />
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

<script type="module">
import { getCourses } from '@/api/content'
export default {
  name: 'Index',
  components: {
    'v-carousel': () => import('@/components/home/carousel'),
    'v-course-list': () => import('@/components/common/course_list')
  },
  data() {
    return {
      searchParams: {
        current: 1,
        pageSize: 12
      },
      total: 0,
      courseList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getCourses(this.searchParams).then(resp => {
        this.courseList = resp.data.list
        this.total = resp.data.total
      })
    }
  }
}
</script>

<style scoped lang="scss">

.course-list{
  margin-top: 30px;
  font-size: 24px;
  padding-left: 10px;
  border-left: #409eff solid 5px;
}

</style>
