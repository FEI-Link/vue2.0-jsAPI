<template>
  <div class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" /> -->
    <breadcrumb class="breadcrumb-container" style="margin-left: 40px;" />

    <div class="right-menu">
      <el-button class="logoutBtn" type="danger" size="small" @click.native="logout"><span
          style="display:block; color: white">注销</span></el-button>
    </div>
    <div style="display: flex;
        justify-content: center;
        align-items: center; ;">
      <div class="center" style="float: left; line-height: 50px; ">
        <el-button v-show="s1" style="color: black;" @click="fun1">首页</el-button>
        <el-button v-show="s2" style="color: black;" @click="fun2">用户管理</el-button>
        <el-button v-show="s3" style="color: black;" @click="fun3">图纸上传</el-button>
        <el-button v-show="s4" style="color: black;" @click="fun4">图纸查看</el-button>
        <el-button v-show="s5" style="color: black;" @click="fun5">工艺设计</el-button>
        <el-button v-show="s6" style="color: black;" @click="fun6">工艺查看</el-button>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      s1: true,
      s2: false,
      s3: false,
      s4: false,
      s5: false,
      s6: false,
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'sidebarRouters'
    ]),
    com() {
    }
  },
  created() {
    this.compute()
  },
  methods: {
    compute() {
      console.log(1, this.$store.getters.sidebarRouters)
      this.$store.getters.sidebarRouters.forEach(element => {
        if (element.path == '/') this.s1 = true
        if (element.path == '/admin/user') this.s2 = true
        if (element.path == '/user/upload') this.s3 = true
        if (element.path == '/designer/paper') this.s4 = true
        if (element.path == '/designer/design') this.s5 = true
        if (element.path == '/user') this.s6 = true
      });
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)

    },
    fun1() {
      this.$router.push('/')
    },
    fun2() {
      this.$router.push('/admin/user/index')
    },
    fun3() {
      this.$router.push('/user/upload/index')
    },
    fun4() {
      this.$router.push('/designer/paper/index')
    },
    fun5() {
      this.$router.push('/designer/design/index')
    },
    fun6() {
      this.$router.push('/user/index')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }
  }

  .logoutBtn {
    border: none;
    margin-right: 10px;
  }


  .center {
    margin: auto;

    /* 通过translate反向偏移的方式，实现居中 */


  }
}
</style>
