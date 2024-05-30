<template>
  <div class="app-container">
    <el-table :data="paperdata" style="width: 100%">
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
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
          <el-button type="success" @click="look(scope.row)">查看</el-button>

        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="工艺查看" :visible.sync="dialogVisible" width="1080px" :before-close="cancel">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" label="加工顺序" width="95">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        
        <el-table-column prop="surface" label="加工表面" width="180">
 
        </el-table-column>
        <el-table-column prop="size" label="尺寸(mm)" width="180">
          <template slot-scope="scope">
            {{ scope.row.size }}
          </template>
        </el-table-column>
        <el-table-column prop="level" label="精度等级" width="180">
          <template slot-scope="scope">
            IT{{ scope.row.level }}
          </template>
        </el-table-column>
        <el-table-column prop="ra" label="表面粗糙度" width="180">
          <template slot-scope="scope">
            Ra{{ scope.row.ra }}
          </template>
        </el-table-column>
        <el-table-column prop="scheme" label="加工方案" width="180">
        </el-table-column>


      </el-table>
      <div style="height: 40px;" >
        <el-button @click="xlsxcreate" type="primary" style="float: right;margin-top: 10px;">导出</el-button>
      </div>

    </el-dialog>



  </div>
</template>

<script>
import {
  list,
  dele,
  create,
  getplanbypaperid,
  addplan
} from '@/api/designer'
import { list as adminlist} from '@/api/admin/user'

import { getInfobyid } from '@/api/user'
import { export2Excel } from '@/utils/util'
export default {
  name: 'designer',
  data() {
    return {
      columns:[{title:'图号',key:'paperid'},{title:'加工顺序',key:'ord'},{title:'加工表面',key:'surface'},
              {title:'精度等级',key:'level'},{title:'表面粗糙度',key:'ra'},{title:'加工方案',key:'scheme'},
              {title:'设计员',key:'userid'}],
      paperdata: null,
      dialogVisible: false,
      url: null,
      tableData: [],
    }
  },
  created() {
    this.getPaperList()
  },
  methods: {
    getPaperList() {
      list().then(res => {
        console.log(res.data)
        this.paperdata = res.data
      }).catch(err => {
        console.log(err);
      })
    },
    look(row) {
      this.dialogVisible = true
      getplanbypaperid(row.paperid).then(res => {
        this.tableData = res.data
      }).catch(err => {
        console.log(err);
      })
    },
    reset() {
      this.getPaperList()
    },
    xlsxcreate() {
      let table = JSON.parse(JSON.stringify(this.tableData));
      adminlist().then(res => {
        let userlist = res.data

        table.forEach(item => {
          console.log(item)
          if(item.surface == '1') item.surface = '拨叉角两端面'
          if(item.surface == '2') item.surface = '拨叉头孔'
          if(item.surface == '3') item.surface = '锁销孔'
          if(item.surface == '4') item.surface = '拔叉头左端面'
          if(item.surface == '5') item.surface = '拔叉头右端面'
          if(item.surface == '6') item.surface = '拔叉头内端面'
          if(item.surface == '7') item.surface = '操纵槽内侧面'
          if(item.surface == '8') item.surface = '操纵槽底面'

          userlist.forEach(element => {
            if(element.userId == item.userid) item.userid = element.name
          })
        });
      })
      export2Excel(this.columns,table)
    }

  }
}
</script>

<style scoped></style>
