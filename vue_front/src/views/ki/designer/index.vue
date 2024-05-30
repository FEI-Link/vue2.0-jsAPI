<template>
  <div class="app-container" style="text-align: center;">
    <div style="margin-bottom: 10px;">
      <el-select v-model="paperid" placeholder="请选择图纸">
        <el-option v-for="(item, index) in paperlist" :key="item.paperid" :label="item.papername"
          :value="item.paperid"></el-option>
      </el-select>
      <el-button size="large" type="primary" style="margin-left: 10px;" @click="start">开始设计</el-button>
    </div>

    <div v-show="url">
      <div>
        <el-image style="width: 891px; height: 630px" :src="url" :fit="fill"></el-image>
      </div>
      <div style="display: block; float: right;">

        <el-button size="large" type="primary" style="margin-right: 20px;" @click="addoper">新增工序</el-button>


      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" label="加工顺序" width="95">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="surface" label="加工表面" width="180">

        </el-table-column>
        <el-table-column prop="size" label="尺寸(mm)" width="180">

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
        <!-- <el-table-column prop="userstate" label="用户状态" width="180">
        <template slot-scope="scope">
          <span v-if="userState(scope.row.userstate)" style="color: #909399">未登录</span>
          <span v-else style="color: #409EFF">已登录</span>
        </template>
      </el-table-column> -->

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-show="scope.$index != 0" type="warning" size="mini" style="margin-right: 20px;"
              @click="arrup(scope.row)">上移</el-button>
            <el-button v-show="scope.$index != tableData.length - 1" type="warning" size="mini"
              style="margin-right: 20px;" @click="arrdown(scope.row)">下移</el-button>
            <el-button size="mini" type="danger" style="margin-right: 20px;" @click="arrdel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>



    </div>

    <el-dialog title="新增工序" :visible.sync="dialogVisible" width="500px" :before-close="cancel">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="加工面名称" prop="surface">
          <el-input v-model="form.surface" style="width: 217px;"></el-input>
          <!-- <el-select v-model="form.surface" placeholder="加工表面">
            <el-option label="拨叉角两端面" value="1"></el-option>
            <el-option label="拨叉头孔" value="2"></el-option>
            <el-option label="锁销孔" value="3"></el-option>
            <el-option label="拔叉头左端面" value="4"></el-option>
            <el-option label="拔叉头右端面" value="5"></el-option>
            <el-option label="拔叉头内端面" value="6"></el-option>
            <el-option label="操纵槽内侧面" value="7"></el-option>
            <el-option label="操纵槽底面" value="8"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="加工面类型" prop="method">
          <el-select v-model="form.method" placeholder="加工面类型" @change="schemegenerate">
            <el-option label="面" value="1"></el-option>
            <el-option label="孔" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="尺寸(mm)" prop="size">
          <el-input v-model="form.size" style="width: 217px;"></el-input>
        </el-form-item>
        <el-form-item label="精度等级" prop="level">
          <el-select v-model="form.level" placeholder="精度等级" @change="schemegenerate">
            <el-option label="IT1" value="1"></el-option>
            <el-option label="IT2" value="2"></el-option>
            <el-option label="IT3" value="3"></el-option>
            <el-option label="IT4" value="4"></el-option>
            <el-option label="IT5" value="5"></el-option>
            <el-option label="IT6" value="6"></el-option>
            <el-option label="IT7" value="7"></el-option>
            <el-option label="IT8" value="8"></el-option>
            <el-option label="IT9" value="9"></el-option>
            <el-option label="IT10" value="10"></el-option>
            <el-option label="IT11" value="11"></el-option>
            <el-option label="IT12" value="12"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表面粗糙度" prop="ra">
          <el-select v-model="form.ra" placeholder="表面粗糙度" @change="schemegenerate">
            <el-option label="Ra100" value="100"></el-option>
            <el-option label="Ra50" value="50"></el-option>
            <el-option label="Ra25" value="25"></el-option>
            <el-option label="Ra12.5" value="12.5"></el-option>
            <el-option label="Ra6.3" value="6.3"></el-option>
            <el-option label="Ra3.2" value="3.2"></el-option>
            <el-option label="Ra1.6" value="1.6"></el-option>
            <el-option label="Ra0.8" value="0.8"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="加工方案" prop="scheme">
          <el-radio-group v-model="form.scheme">
            <el-radio v-for="(item, index) in methodlist" :key="index" :label="item">{{ item }}</el-radio>
          </el-radio-group>

        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit" style="margin-left: 10px;">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  list,
  dele,
  create,
  getplanbypaperid,
  addplan, up, down, delplan
} from '@/api/designer'
export default {
  name: 'designer',
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      form: {
        surface: '',
        size: '',
        level: '',
        ra: '',
        scheme: '',
        ord: '',
        method: ''
      },
      paperid: null,
      design: false,
      paperlist: null,
      url: '',
      method: ['铣', '钻', '钻', '铣', '铣', '铣', '铣',],
      methodlist: []
    }
  },
  created() {
    this.getPaperList()
  },
  mounted() {
    this.schemegenerate()
  },
  methods: {
    getPaperList() {
      list().then(res => {
        this.paperlist = res.data
      }).catch(err => {
        console.log(err);
      })
    },
    addoper() {
      this.dialogVisible = true
    },
    start() {
      if (this.paperid == null || this.paperid == '') return undefined;
      for (let i = 0; i < this.paperlist.length; i++) {
        if (this.paperlist[i].paperid == this.paperid) {
          this.url = this.paperlist[i].imgsrc
        }
      }
      console.log(this.paperid);
      if (this.paperid) {
        this.design = true
        getplanbypaperid(this.paperid).then(res => {
          this.tableData = res.data
        }).catch(err => {
          console.log(err);
        })
      }
    },
    cancel() {
      this.form = {
        surface: '',
        size: '',
        level: '',
        ra: '',
        scheme: '',
        ord: ''
      }
      this.methodlist = []
      this.dialogVisible = false
    },
    onSubmit() {
      // this.tableData = [{
      //       date: '2016-05-02',
      //       name: '王小虎',
      //       address: '上海市普陀区金沙江路 1518 弄'
      //     }]
      // this.tableData = [this.form]
      // form: {
      //   surface: '',
      //   level: '',
      //   ra: '',
      //   scheme: '',
      //   ord: ''
      // },
      let param = {
        paperid: this.paperid,
        surface: this.form.surface,
        size: this.form.size == undefined ? 0 : this.form.size,
        level: this.form.level,
        ra: this.form.ra,
        scheme: this.form.scheme,
        ord: this.tableData.length + 1
      }

      addplan(param).then(res => {
        console.log(res.data)
        getplanbypaperid(this.paperid).then(res => {
          this.tableData = res.data
        }).catch(err => {
          console.log(err);
        })
      }).catch(err => {
        console.log(err);
      })




      // if (this.tableData.length == 0) {
      //   this.tableData = [this.form];
      // } else {
      //   let data = JSON.parse(JSON.stringify(this.tableData));
      //   data[data.length] = this.form

      //   this.tableData = JSON.parse(JSON.stringify(data));

      // }
      this.form = {
        surface: '',
        size: '',
        level: '',
        ra: '',
        scheme: '',
        ord: ''
      }
      this.methodlist = []
      this.dialogVisible = false
    },

    schemegenerate() {
      if (this.form.level && this.form.ra) {
        this.methodlist = []
        if(this.form.method == '1') {
          if (this.form.level >= 10 && this.form.level <= 11 && this.form.ra <= 12.5 && this.form.ra >= 6.3) this.methodlist[this.methodlist.length] = '粗车'
          if (this.form.level >= 8 && this.form.level <= 9 && this.form.ra <= 6.3 && this.form.ra >= 3.2) this.methodlist[this.methodlist.length] = '粗车一半精车'
          if (this.form.level >= 6 && this.form.level <= 8 && this.form.ra <= 1.6 && this.form.ra >= 0.8) this.methodlist[this.methodlist.length] = '粗车一半精车一精车'
          if (this.form.level >= 7 && this.form.level <= 9 && this.form.ra <= 0.8 && this.form.ra >= 0.2) this.methodlist[this.methodlist.length] = '粗车一半精车一磨削'
          if (this.form.level >= 11 && this.form.level <= 13 && this.form.ra <= 12.5 && this.form.ra >= 6.3) this.methodlist[this.methodlist.length] = '粗刨(粗铣)'
          if (this.form.level >= 8 && this.form.level <= 11 && this.form.ra <= 12.5 && this.form.ra >= 3.2) this.methodlist[this.methodlist.length] = '粗刨(粗铣)一半精创(半精铣)'
          if (this.form.level >= 7 && this.form.level <= 9 && this.form.ra <= 6.3 && this.form.ra >= 1.6) this.methodlist[this.methodlist.length] = '粗刨(粗铣)一精刨(精铣)'
          if (this.form.level >= 6 && this.form.level <= 8 && this.form.ra <= 3.2 && this.form.ra >= 0.63) this.methodlist[this.methodlist.length] = '粗刨(粗铣)一半精创(半精铣)一精刨(精铣)'
          if (this.form.level >= 6 && this.form.level <= 9 && this.form.ra <= 0.8 && this.form.ra >= 0.2) this.methodlist[this.methodlist.length] = '粗铣一拉'
          if (this.form.level >= 6 && this.form.level <= 7 && this.form.ra <= 0.8 && this.form.ra >= 0.2) this.methodlist[this.methodlist.length] = '粗刨(粗铣)一半精刨(半精铣)一宽刃刀精刨'
          if (this.form.level == 5 && this.form.ra <= 0.8 && this.form.ra >= 0.16) this.methodlist[this.methodlist.length] = '粗刨(粗铣)一半精刨(半精铣)一精刨(精铣)一宽刃刀低速精刨'
          if (this.form.level >= 5 && this.form.level <= 6 && this.form.ra <= 0.8 && this.form.ra >= 0.1) this.methodlist[this.methodlist.length] = '粗刨(粗铣)一精刨(精铣)一刮研'
          if (this.form.level >= 5 && this.form.level <= 6 && this.form.ra <= 0.8 && this.form.ra >= 0.04) this.methodlist[this.methodlist.length] = '粗刨(粗铣)-半精刨(半精铣)一精刨(精铣)-刮研'
          if (this.form.level >= 6 && this.form.level <= 7 && this.form.ra <= 0.8 && this.form.ra >= 0.2) this.methodlist[this.methodlist.length] = '粗刨(粗铣)一精刨(精铣)一磨削'
          if (this.form.level >= 5 && this.form.level <= 6 && this.form.ra <= 0.4 && this.form.ra >= 0.2) this.methodlist[this.methodlist.length] = '粗刨(粗铣)一半精刨(半精铣)一精刨(精铣)-磨削'
        }

        if(this.form.method == '2') {
          if (this.form.level >= 11 && this.form.level <= 12 && this.form.ra == 12.5) this.methodlist[this.methodlist.length] = '钻'
          if (this.form.level >= 8 && this.form.level <= 9 && this.form.ra <= 3.2 && this.form.ra >= 1.6) this.methodlist[this.methodlist.length] = '钻——铰'
          if (this.form.level >= 7 && this.form.level <= 8 && this.form.ra <= 1.6 && this.form.ra >= 0.8) this.methodlist[this.methodlist.length] = '钻——粗铰——精铰'
          if (this.form.level >= 10 && this.form.level <= 11 && this.form.ra <= 12.5 && this.form.ra >= 6.3) this.methodlist[this.methodlist.length] = '钻——扩'
          if (this.form.level == 7 && this.form.ra <= 1.6 && this.form.ra >= 0.8) this.methodlist[this.methodlist.length] = '钻——扩——粗铰——精铰'
          if (this.form.level >= 6 && this.form.level <= 9 && this.form.ra <= 3.2 && this.form.ra >= 0.32) this.methodlist[this.methodlist.length] = '钻——扩——铰'
          if (this.form.level == 5 && this.form.ra <= 1.25 && this.form.ra >= 0.08) this.methodlist[this.methodlist.length] = '钻一扩-机铰一手铰'
          if (this.form.level >= 7 && this.form.level <= 9 && this.form.ra <= 1.6 && this.form.ra >= 0.1) this.methodlist[this.methodlist.length] = '钻-扩一拉'
          if (this.form.level >= 11 && this.form.level <= 12 && this.form.ra <= 12.5 && this.form.ra >= 6.3) this.methodlist[this.methodlist.length] = '粗镗(或扩孔)'
          if (this.form.level >= 8 && this.form.level <= 9 && this.form.ra <= 3.2 && this.form.ra >= 1.6) this.methodlist[this.methodlist.length] = '粗镗(粗扩)-半精镗(精扩)'
          if (this.form.level >= 7 && this.form.level <= 8 && this.form.ra <= 1.6 && this.form.ra >= 0.8) this.methodlist[this.methodlist.length] = '粗镗(粗扩)-半精镗(精扩)一精镗(铰)'
          if (this.form.level >= 6 && this.form.level <= 7 && this.form.ra <= 0.8 && this.form.ra >= 0.4) this.methodlist[this.methodlist.length] = '粗镗(扩)-半精镗(精扩)一精镗一浮动镗刀块精镗'
          if (this.form.level >= 7 && this.form.level <= 8 && this.form.ra <= 0.8 && this.form.ra >= 0.2) this.methodlist[this.methodlist.length] = '粗镗(扩)-半精镗一磨孔'
          if (this.form.level >= 6 && this.form.level <= 7 && this.form.ra <= 0.2 && this.form.ra >= 0.1) this.methodlist[this.methodlist.length] = '粗镗(扩)一半精镗一粗磨一精磨'
          if (this.form.level >= 5 && this.form.level <= 7 && this.form.ra <= 0.4 && this.form.ra >= 0.05) this.methodlist[this.methodlist.length] = '粗镗一半精镗一精镗一金刚镗'
        }
        
      
        
      
      }


    },
    arrup(row) {
      up(row.planid).then(res => {
        getplanbypaperid(this.paperid).then(res => {
          this.tableData = res.data
        }).catch(err => {
          console.log(err);
        })
      })
    },
    arrdown(row) {
      down(row.planid).then(res => {
        getplanbypaperid(this.paperid).then(res => {
          this.tableData = res.data
        }).catch(err => {
          console.log(err);
        })
      })
    },
    arrdel(row) {
      delplan(row.planid).then(res => {
        getplanbypaperid(this.paperid).then(res => {
          this.tableData = res.data
        }).catch(err => {
          console.log(err);
        })
      })
    }
  }
}
</script>

<style scoped>
.el-button+.el-button {
  margin: 0
}

.el-form {
  text-align: left;
}
</style>
