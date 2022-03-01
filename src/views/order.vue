<template>
  <el-row type="flex" justify="center">
    <el-col :span="20">
      <div style="margin-top: 30px;background-color: #fff;padding: 20px 30px">
        <div style="font-size: 20px;padding:0 0 20px 10px;color: #333">
          订单订阅信息
        </div>
        <el-table
          ref="listTable"
          v-loading="tableDataLoading"
          :data="listData"
          tooltip-effect="dark"
          :header-cell-style="{fontWeight:'normal', color:'#666'}"
        >
          <el-table-column prop="orderNo" label="订单号" width="200" />
          <el-table-column prop="courseName" label="订单内容" show-tooltip-when-overflow>
            <template slot-scope="scope">
              <router-link
                :to="{name:'Course', params: {id:scope.row.courseId}}"
                class="el-link el-link--default"
              >《{{ scope.row.courseName }}》</router-link>
            </template>
          </el-table-column>
          <el-table-column prop="totalFee" label="订单金额" width="120">
            <template slot-scope="scope">￥{{ scope.row.totalFee }}</template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="200" align="center" />
          <el-table-column prop="payType" label="支付状态" width="120" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.payType==='WECHAT_PAY'" type="success" size="small">微信支付</el-tag>
              <el-tag v-else-if="scope.row.payType==='ALI_PAY'" type="primary" size="small">支付宝</el-tag>
              <el-tag v-else type="info" size="small">未支付</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="payTime" label="支付时间" width="200" align="center">
            <template slot-scope="scope">{{ scope.row.payTime || '无' }}</template>
          </el-table-column>
        </el-table>
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
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getCourseOrders } from '@/api/content'
import { mapGetters } from 'vuex'

export default {
  name: 'Order',
  data() {
    return {
      searchParams: {
        current: 1,
        pageSize: 10
      },
      total: 0,
      listData: [],
      tableDataLoading: false
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
      if (this.user === null || Object.keys(this.user).length === 0) {
        this.$message.info('请登录后再操作')
        return
      }
      this.tableDataLoading = true
      getCourseOrders(this.searchParams).then(resp => {
        this.listData = resp.data.list
        this.total = resp.data.total
        this.tableDataLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
