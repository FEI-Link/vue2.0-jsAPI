<template>
  <div class="app-container">
    <div style="float: right;" >
      <el-button type="success" size="large" @click="opendialog()">上传图纸</el-button>
    </div>
    
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
          <el-button type="primary"  style="margin-right: 10px;" @click="look(scope.row)">查看</el-button>
          <el-button type="danger"  style="margin-right: 20px;" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="图像查看" :visible.sync="dialogVisible" width="930px">
      <el-image
      style="width: 891px; height: 630px"
      :src="url"
      :fit="fill"></el-image>
    </el-dialog>
    <el-dialog title="图纸上传" :visible.sync="dialogVisible1" width="930px" :before-close="cancel">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="图纸名称" prop="papername">
          <el-input v-model="form.papername"></el-input>
        </el-form-item>
        <el-form-item label="图纸文件" prop="url">
          <el-upload class="upload-demo" action="http://localhost:3000/api/course/img" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed" :on-success="handleSuccess" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import {
  list,
  dele,
  create
} from '@/api/designer'
export default {
  name: 'designer',
  data() {
    return {
      tableData: null,
      dialogVisible: false,
      dialogVisible1: false,
      url: null,
      editfileList: null,
      form: {
        papername: '',
        url: ''
      },
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
    opendialog(){
      this.dialogVisible1 = true
    },
    reset() {
      this.getPaperList()
    },
    cancel() {
      this.form = {
        coursename: '',
        url: ''
      }
      this.dialogVisible1 = false
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
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleSuccess(res, file, fileList) {
      console.log('handle',res.data)
      this.form.url = res.data
    },
    edithandleSuccess(res, file, fileList) {
      console.log('edit',res.data)

      this.editForm.url = res.data
    },
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          create(this.form)
            .then((res) => {
              this.cancel();
              this.$notify({
                title: "新增",
                message: "新增成功",
                type: "success",
                duration: 2500,
              });

              // this.$parent.$parent.init();
              this.reset()
            })
            .catch((err) => {

              this.$notify({
                title: "新增",
                message: err.data.msg,
                type: "error",
                duration: 2500,
              });
            });
        } else {
          return false;
        }
      })
    },
  }
}
</script>

<style scoped>

</style>

