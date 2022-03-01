<template>
  <el-row type="flex" justify="center">
    <el-col :span="20">
      <div style="text-align: center;margin-top: 40px" class="search-box">
        <el-input v-model="searchParams.title" style="width: 280px;margin-right: 10px" @keyup.enter.native="search" />
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
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
import { getCourses } from '@/api/content'

export default {
  name: 'SearchKeyword',
  components: {
    'v-course-list': () => import('@/components/common/course_list')
  },
  data() {
    return {
      searchParams: {
        current: 1,
        pageSize: 12,
        title: ''
      },
      total: 0,
      courseList: []
    }
  },
  watch: {
    $route(to, from) {
      this.searchParams.title = this.$route.params.title
      this.searchParams.current = 1
      this.getList()
    }
  },
  created() {
    this.searchParams.title = this.$route.params.title
    this.getList()
  },
  methods: {
    getList() {
      getCourses(this.searchParams).then(resp => {
        this.courseList = resp.data.list
        this.total = resp.data.total
      })
    },
    search() {
      if (this.$route.params.title === this.searchParams.title) return
      this.$router.push({
        name: 'SearchByKeyword',
        params: { title: this.searchParams.title }
      })
    }
  }
}
</script>

<style lang="scss">
.search-box {
  .el-input__inner {
    border-width: 2px;
    border-color: #ccd0d7;

    &:focus {
      border-color: #409EFF;
      outline: 0;
    }
  }
}
</style>
