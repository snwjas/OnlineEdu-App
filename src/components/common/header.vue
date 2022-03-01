<template>
  <el-row type="flex" justify="center" class="header">
    <el-col :span="20" class="nav-content">
      <router-link to="/" class="logo" style="color: #409eff;margin-right: 10px;">
        在线教育平台
      </router-link>
      <router-link class="nav-item el-link el-link--default" :to="{name:'Recruit'}">
        讲师入驻
      </router-link>
      <el-input
        ref="SearchInput"
        v-model.trim="searchInput"
        size="small"
        class="nav-search"
        placeholder="搜索课程..."
        @keyup.enter.native="search"
      >
        <el-button slot="append" icon="el-icon-search" style="color: #fff" @click="search" />
      </el-input>
      <div class="nav-right">
        <router-link
          v-if="user!==null && Object.keys(user).length!==0"
          class="nav-item el-link el-link--default"
          :to="{name:'Order'}"
        >订阅订单</router-link>
        <el-link
          v-if="user===null || Object.keys(user).length===0"
          :underline="false"
          class="nav-item"
          @click="$login"
        >登录/注册</el-link>
        <el-dropdown v-else class="avatar-container" trigger="hover">
          <div class="avatar-wrapper">
            <el-avatar :size="32" :src="user.avatar" fit="contain" />
            <span class="name">{{ user.nickname || '' }}</span>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link :to="{name: 'Profile'}">
              <el-dropdown-item icon="el-icon-user">
                个人中心
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided icon="el-icon-switch-button" @click.native="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      loginFormVisible: false,
      searchInput: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('user/logout')
        await this.$router.push({ name: 'Index' })
        // eslint-disable-next-line no-empty
      } catch (ignore) { }
    },
    search() {
      if (!this.searchInput) {
        this.$refs.SearchInput.focus()
        return
      }
      // const { href } = this.$router.resolve({
      //   name: 'SearchByKeyword',
      //   params: { title: this.searchInput }
      // })
      // window.open(href, '_blank')
      this.$router.push(
        {
          name: 'SearchByKeyword',
          params: { title: this.searchInput }
        }
      )
      this.searchInput = ''
    }
  }
}
</script>

<style lang="scss">
.nav-search {
  width: 240px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  .el-input-group__append {
    background-color: #409eff;
    border: none;
    color: #fff;
  }
}
</style>

<style scoped lang="scss">
.header {
  height: 60px;
  background-color: #fff;

  .nav-content {
    position: relative;
    display: flex;
    align-items: center;
  }

  .nav-item {
    margin: 0 20px;
    font-size: 16px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .nav-right {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
  }

  .logo {
    font-size: 26px;
  }

  .avatar-container {
    .avatar-wrapper {
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover {
        .el-icon-caret-bottom {
          transform: rotate(180deg);
        }
      }

      .name {
        margin: 0 5px 0 10px;
      }

      .el-icon-caret-bottom {
        transition: all .7s;
        font-size: 14px;
      }
    }
  }
}

</style>
