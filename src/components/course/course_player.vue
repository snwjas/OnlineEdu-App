<template>
  <el-row style="position: relative" class="course">
    <el-col :span="17" style="position: relative">
      <div style="padding-top: 56.25%" />
      <div class="player">
        <div class="preplay">
          <div class="fade" />
          <i class="el-icon-video-play trnfcenter play-btn" @click="playFirst" />
          <el-image fit="cover" :src="encodeOssFileUri(course.cover)" class="img" />
        </div>
        <div id="J_prismPlayer" @dblclick="requestFullScreen" @contextmenu.prevent="requestPlay" />
      </div>
    </el-col>
    <el-col :key="refreshKey" :span="7" class="selection">
      <div v-for="chapter of chapterData" :key="chapter.id" class="chapter">
        <div class="title ellipse" :title="chapter.title">{{ chapter.title }}</div>
        <div
          v-for="value of videoData[chapter.id]"
          :key="`${chapter.id}:${value.id}`"
          :class="{'video':true,'active':activeItem===`${chapter.id}:${value.id}`}"
          @click="clickChapterItem(value,`${chapter.id}:${value.id}`)"
        >
          <div class="title ellipse" :title="value.title">
            <i class="el-icon-video-play" />
            {{ value.title }}
          </div>
          <div class="info">
            <span class="duration">时长: {{ value.duration }}</span>
            <span v-if="course.price>0&&value.free" class="free">免费</span>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getChapters } from '@/api/content'
import { getChapterVideos, getVideoPlayAuth } from '@/api/content'
import { mapGetters } from 'vuex'
import { encodeOssFileUri, jsonObj2FormData } from '@/utils'

export default {
  name: 'EducourseWatch',
  data() {
    return {
      course: { cover: '', price: 0 },
      player: null,
      chapterData: [],
      // <chapterId, videoList>
      videoData: {},
      refreshKey: false,
      activeItem: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.$notify.info({
      title: '提示',
      dangerouslyUseHTMLString: true,
      message: '鼠标左键双击播放器进入或退出全屏<br>鼠标右键单击播放器切换暂停与播放',
      offset: 50,
      duration: 3600
    })
  },
  methods: {
    setData(course) {
      this.course = course
      this.listChaptersAndVideos(course.id)
    },
    encodeOssFileUri(ossUri) {
      return encodeOssFileUri(ossUri)
    },
    listChaptersAndVideos(courseId) {
      getChapters(courseId).then(resp => {
        this.chapterData = resp.data
        let len = resp.data.length
        for (const c of resp.data) {
          getChapterVideos(c.id).then(resp => {
            this.videoData[c.id] = resp.data
            // 获取完视频列表
            if (--len <= 0) {
              // 关键：强制刷新组件渲染
              this.refreshKey = !this.refreshKey
            }
          })
        }
      })
    },
    clickChapterItem(video, activeItem) {
      if (this.user === null || Object.keys(this.user).length === 0) {
        // this.$message.info('请登录后再操作')
        this.$login()
        return
      }
      this.activeItem = activeItem
      this.play(video)
    },
    play(video) {
      const params = { courseId: video.courseId, videoId: video.id, videoSourceId: video.videoId }
      if (this.player) {
        // const autoPlay = this.player.getStatus() === 'playing'
        // 销毁播放器
        this.player.dispose()
        this.player = null
        document.getElementById('J_prismPlayer').innerHTML = ''
        this.initPlayer(params)
      } else {
        const p = document.querySelector('.player .preplay')
        if (p) p.parentNode.removeChild(p)
        this.initPlayer(params)
      }
    },
    playFirst() {
      if (this.user === null || Object.keys(this.user).length === 0) {
        // this.$message.info('请登录后再操作')
        this.$login()
        return
      }
      // 准备第一个视频
      try {
        const firstChapterId = this.chapterData[0].id
        const firstVideo = this.videoData[firstChapterId][0]
        this.play(firstVideo)
        // eslint-disable-next-line no-empty
        setTimeout(function() {
          this.player.play()
        }.bind(this), 1000)
        // 设置第一个视频激活
        this.activeItem = `${firstChapterId}:${firstVideo.id}`
      } catch (e) {
        console.log(e)
      }
    },
    initPlayer(params = { courseId: 0, videoId: 0, videoSourceId: '' }) {
      getVideoPlayAuth(jsonObj2FormData(params))
        .then(resp => {
          // eslint-disable-next-line no-undef
          this.player = new Aliplayer({
            id: 'J_prismPlayer',
            autoplay: false,
            width: '100%',
            height: '100%',
            vid: params.videoSourceId,
            playauth: resp.data
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    requestFullScreen() { // 进入/退出全屏
      if (this.player) {
        if (this.player.fullscreenService.getIsFullScreen()) {
          this.player.fullscreenService.cancelFullScreen()
        } else {
          this.player.fullscreenService.requestFullScreen()
        }
      }
    },
    requestPlay() { // 暂停/播放
      if (this.player) {
        const status = this.player.getStatus()
        if (status === 'playing') {
          this.player.pause()
        } else {
          this.player.play()
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

.player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333;

  .preplay {
    height: 100%;
    position: relative;

    .fade {
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, .3);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }

    .img {
      width: 100%;
      height: 100%;

    }

    .play-btn {
      font-size: 76px;
      z-index: 2;
      color: #23b8ff;
      cursor: pointer;

      &:hover {
        color: #409eff;
      }
    }
  }
}

.course {
  .selection {
    position: absolute;
    right: 0;
    height: 100%;
    padding: 20px 16px;
    overflow: auto;
    background-color: #232323;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #64a5ff;
    }

    &::-webkit-scrollbar-track {
      background: #232323;
    }
  }
}

.chapter {
  color: #c7c7c7;
  margin-top: 16px;

  > .title {
    font-size: 16px;
  }

  .video {
    font-size: 14px;
    margin-top: 16px;
    cursor: pointer;

    i {
      margin-right: 6px;
    }

    &:hover, &.active {
      color: #20a0ff;

      .duration {
        color: #20a0ff;
      }
    }

    .info {
      font-size: 12px;
      margin: 5px 0 0 20px;
      color: #777777;

      span {
        margin-right: 12px;

        &:last-child {
          margin-right: 0;
        }
      }

      .free {
        color: #ff4f23;
      }
    }
  }
}
</style>
