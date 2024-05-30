<template>
<div class="app-container">
  <div class="header" style="margin-bottom: 10px;">
    <el-input v-model="input" placeholder="请输入用户名" clearable @clear="reset" style="width: 300px; margin-right: 20px"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="textSearch">搜索</el-button>
    <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增</el-button>
  </div>
  <el-dialog title="新建用户" :visible.sync="dialogVisible" width="30%" :before-close="cancel">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-select v-model="form.roles" placeholder="请选择角色">
          <el-option label="管理员" value="admin"></el-option>
          <el-option label="设计员" value="designer"></el-option>
          <el-option label="普通用户" value="user"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
  
  <template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <!-- <el-table-column prop="userstate" label="用户状态" width="180">
        <template slot-scope="scope">
          <span v-if="userState(scope.row.userstate)" style="color: #909399">未登录</span>
          <span v-else style="color: #409EFF">已登录</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="roles" label="用户角色">
        <template slot-scope="scope">
          <span>{{alertRole(scope.row.roles)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="mini" style="margin-right: 20px;" @click="edit(scope.row)">编辑</el-button>
          <el-dialog title="编辑用户" :visible.sync="editVisible" width="30%" :before-close="editCancel">
            <el-form ref="editForm" :model="editForm" :rules="editRules" label-width="80px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="editForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="editForm.password"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="editForm.name"></el-input>
              </el-form-item>
              <el-form-item label="角色" prop="roles">
                <el-select v-model="editForm.roles" placeholder="请选择角色">
                  <el-option label="管理员" value="admin"></el-option>
                  <el-option label="设计员" value="designer"></el-option>
                  <el-option label="普通用户" value="user"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editCancel">取 消</el-button>
              <el-button type="primary" :loading="loading" @click="onEditSubmit">确 定</el-button>
            </span>
          </el-dialog>
          <el-popconfirm placement="bottom" width="200" :ref="`node-popover-${scope.row.userId}`" title="确定删除本条数据吗 ?" @onConfirm="subDelete(scope.$index, scope.row)">
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </template>
  
</div>
</template>

<script>
import {
  list,
  search,
  edit,
  delta,
  add,
  unique
} from '@/api/admin/user'

export default {
  name: 'adminUser',
  data() {
      let validateUserNameUnique = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("用户名不能为空"));
        }

        unique(value)
          .then((res) => {
            if (!res.data) {
              callback(new Error("用户名已存在"));
            } else {
              callback();
            }
          })
          .catch((err) => {
            callback(new Error(res.msg));
          });
      };
      return {
        tableData: null,
        role: '',
        input: '',
        delLoading: false,
        editVisible: false,
        form: {
          username: '',
          password: '',
          name: '',
          roles: ''
        },
        editForm: {
          username: '',
          password: '',
          name: '',
          roles: ''
        },
        dialogVisible: false,
        rules: {
          username: [{
              required: true,
              message: "请输入用户名",
              trigger: "blur"
            },
            {
              required: true,
              trigger: "blur",
              validator: validateUserNameUnique,
            },
          ],
          password: [{
              required: true,
              message: "请输入密码",
              trigger: "blur"
            },
            {
            min: 6,
            max: 10,
            message: "长度应为 6-10 个字符",
            trigger: "blur",
          }, ],
          name: [{
              required: false,
              message: "请输入姓名",
              trigger: "blur"
            }
          ],
          roles: [{
            required: true,
            message: "请选择角色",
            trigger: "change"
          }, ]
        },
        editRules: {
          username: [{
              required: true,
              message: "请输入用户名",
              trigger: "blur"
            },
          ],
          password: [{
              required: true,
              message: "请输入密码",
              trigger: "blur"
            },
            {
            min: 6,
            max: 10,
            message: "长度应为 6-10 个字符",
            trigger: "blur",
          }, ],
          name: [{
              required: false,
              message: "请输入姓名",
              trigger: "blur"
            }
          ],
          roles: [{
            required: true,
            message: "请选择角色",
            trigger: "change"
          }, ]
        },
      }
    },
    created() {
      this.getUserList()
    },
    methods: {
      getUserList() {
        list().then(res => {
          this.tableData = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      userState(state) {
        return state == '0' ? 1 : 0
      },
      alertRole(role) {
        if (role === 'designer') {
          return '设计员'
        } else if (role === 'user') {
          return '普通用户'
        } else if (role === 'admin') {
          return '管理员'

        }
      },
      subDelete(index, row) {
        delta(row.userId)
          .then((res) => {

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
      reset() {
        this.getUserList()
      },
      onSubmit() {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            this.loading = true;

            add(this.form)
              .then((res) => {
                this.cancel();
                this.$notify({
                  title: "新增",
                  message: "新增成功",
                  type: "success",
                  duration: 2500,
                });

                this.loading = false;
                // this.$parent.$parent.init();
                this.reset()
              })
              .catch((err) => {
                this.loading = false;

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
      onEditSubmit() {
        this.$refs["editForm"].validate((valid) => {
          if (valid) {
            this.loading = true;

            edit(this.editForm)
              .then((res) => {
                this.editCancel();

                this.$notify({
                  title: "编辑",
                  message: "编辑成功",
                  type: "success",
                  duration: 2500,
                });

                this.loading = false;
                this.reset()
              })
              .catch((err) => {
                this.loading = false;

                this.$notify({
                  title: "编辑",
                  message: err.data.msg,
                  type: "error",
                  duration: 2500,
                });
              });
          } else {
            return false;
          }
        });
      },
      cancel() {
        this.form = {
          username: '',
          password: '',
          name: '',
          roles: ''
        }
        this.dialogVisible = false
      },
      editCancel() {
        this.editForm = {
          username: '',
          password: '',
          name: '',
          roles: ''
        }
        this.editVisible = false
      },
      edit(row) {
        this.editForm.username = row.username
        this.editForm.password = row.password
        this.editForm.name = row.name
        this.editForm.roles = row.roles
        this.editForm.userId = row.userId
        this.editVisible = true
      },
      textSearch() {
        const param = {
          username: this.input
        }
        search(param).then(res => {
          this.tableData = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
