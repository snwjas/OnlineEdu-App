<template>
  <div>
    <el-row :gutter="20" class="course">
      <el-col v-for="course of courseList" :key="course.id" :span="6">
        <router-link :to="{name:'Course', params: {id:course.id}}">
          <div class="course-item">
            <el-image fit="cover" :src="encodeOssFileUri(course.cover)" class="img" />
            <div class="info">
              <div class="title ellipse" :title="course.title">{{ course.title }}</div>
              <div class="middle">
                <span class="course-num">共{{ course.lessonNum }}节</span>
                &nbsp;|&nbsp;
                <span class="tch">{{ course.teacherName }}</span>
              </div>
              <div class="bottom">
                <span class="free">{{ course.price === 0 ? '免费' : `￥${course.price}` }}</span>
                <span class="sub-num">共{{ course.buyCount }}人订阅</span>
              </div>
            </div>
          </div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { encodeOssFileUri } from '@/utils'

export default {
  name: 'CourseList',
  props: {
    courseList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    encodeOssFileUri(ossUri) {
      return encodeOssFileUri(ossUri)
    }
  }
}
</script>

<style scoped lang="scss">
.course-item {
  background-color: #FFFFFF;
  margin-bottom: 20px;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 3px 18px rgba(0, 0, 0, .2);
    transform: translateY(-2px);
    transition: all .3s;
  }

  .img {
    height: 140px;
    width: 100%;
    border-radius: 5px;
  }

  .info {
    padding: 5px 10px 12px 10px;
    color: #333;

    .title {
      font-size: 14px;
    }

    .middle {
      color: #999;
      font-size: 12px;
      margin: 3px 0;
    }

    .bottom {
      .free {
        font-size: 14px;
        color: #f4621f;
      }

      .sub-num {
        font-size: 12px;
        color: #999;
        margin-left: 16px;
      }
    }
  }
}
</style>
