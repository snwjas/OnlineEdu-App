<template>
  <div style="min-height: 100%;display: flex;flex-direction: column;">
    <v-header />
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" style="flex: 1" />
    </transition>
    <el-backtop />
    <v-footer />
  </div>
</template>

<script>
export default {
  name: 'Layout',
  components: {
    'v-header': () => import('@/components/common/header'),
    'v-footer': () => import('@/components/common/footer')
  },
  data() {
    return {}
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped lang="scss">

</style>
