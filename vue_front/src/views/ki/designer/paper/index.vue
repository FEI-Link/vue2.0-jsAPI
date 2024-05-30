<template>
  <div class="app-container">

    <el-table :data="tableData" style="width: 100%">
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column prop="papername" label="图纸名称" width="180">
      </el-table-column>
      <el-table-column prop="name" label="提交人" width="180">
      </el-table-column>
      <!-- <el-table-column prop="userstate" label="用户状态" width="180">
        <template slot-scope="scope">
          <span v-if="userState(scope.row.userstate)" style="color: #909399">未登录</span>
          <span v-else style="color: #409EFF">已登录</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="createtime" label="上传时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="mini" style="margin-right: 20px;" @click="look(scope.row)">查看</el-button>
          <el-button type="danger" size="mini" style="margin-right: 20px;" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="图像查看" :visible.sync="dialogVisible" width="930px" :before-close="cancel">
      <el-image
      style="width: 891px; height: 630px"
      :src="url"
      :fit="fill"></el-image>
    </el-dialog>



  </div>
</template>

<script>
import {
  list,
  dele
} from '@/api/designer'
export default {
  name: 'designer',
  data() {
    return {
      tableData: null,
      dialogVisible: false,
      url: null,
    }
  },
  created() {
    this.getPaperList()
  },
  methods: {
    getPaperList() {
      list().then(res => {
        console.log(res.data)
        this.tableData = res.data
      }).catch(err => {
        console.log(err);
      })
    },
    look(row) {
      this.dialogVisible = true
      this.url = row.imgsrc
    },
    reset() {
      this.getPaperList()
    },
    del(row) {
      dele(row.paperid).then(res => {
        this.reset()
        
        if (res.data == true) {
          this.$notify({
            title: "删除",
            message: "删除成功",
            type: "success",
            duration: 2500
          })
        } else {
          this.$notify({
            title: '删除',
            message: err.data.msg,
            type: 'error',
            duration: 2500
          })
        }
      })
      .catch((err) => {
        this.$notify({
          title: '删除',
          message: err.data.msg,
          type: 'error',
          duration: 2500
        })
      })
    }
  }
}
</script>

<style scoped>

</style>

