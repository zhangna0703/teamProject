<template>
  <div class="layout" style="padding: 0px 24px 24px;">
    <h2 style="padding: 20px 0px; margin-top: 10px;">学生管理</h2>
    <div class="layout-content">
      <div class="top">
        <el-input v-model="input" style="width: 165px; margin-right: 15px;" placeholder="请输入学生姓名" />
        <el-select v-model="value" style="width: 165px; margin-right: 15px;" placeholder="请选择教室号">
          <el-option
            v-for="item in roomarr"
            :key="item.room_id"
            :label="item.room_text"
            :value="item.room_text"
          />
        </el-select>
        <el-select v-model="valueclass" style="width: 165px; margin-right: 15px;" placeholder="班级名">
          <el-option
            v-for="item in arr"
            :key="item.grade_id"
            :label="item.grade_name"
            :value="item.grade_name"
          />
        </el-select>
        <el-button type="primary" class="button" @click="search">搜索</el-button>
        <el-button type="primary" class="button" @click="reset">重置</el-button>
        <el-button type="primary" class="button" @click="exportExcel">导出学生</el-button>
      </div>
      <el-table :data="arrClass.length > 0 ? arrClass.slice((currentpage - 1) * pagesize, currentpage * pagesize):allStud.slice((currentpage - 1) * pagesize, currentpage * pagesize)" style="width: 100%">
        <el-table-column label="姓名">
          <template slot-scope="scope">
            {{ scope.row.student_name }}
          </template>
        </el-table-column>
        <el-table-column
          label="学号"
        >
          <template slot-scope="scope">
            {{ scope.row.student_id }}
          </template>
        </el-table-column>
        <el-table-column
          label="班级"
        >
          <template slot-scope="scope">
            {{ scope.row.grade_name }}
          </template>
        </el-table-column>
        <el-table-column
          label="教室"
        >
          <template slot-scope="scope">
            {{ scope.row.room_text }}
          </template>
        </el-table-column>
        <el-table-column
          label="密码"
        >
          <template slot-scope="scope">
            {{ scope.row.student_pwd }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="deleteRow(scope.row.student_id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="allStud.length"
          @size-change="changeSize"
          @current-change="changeYe"
        />
      </div>
    </div>
    <div class="app-container">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
      <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
      </el-table>
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      arrClass: [],
      input: '',
      value: '',
      valueclass: '',
      currentpage: 1,
      pagesize: 10,
      tableData: [],
      tableHeader: []
    }
  },
  computed: {
    ...mapState({
      allStud: state => state.classes.studentarr,
      arr: state => state.classes.arr,
      roomarr: state => state.classes.roomarr
    })
  },
  async created() {
    await this.student()
    this.allclass()
    this.allroom()
  },
  methods: {
    ...mapActions({
      student: 'classes/allStudent',
      allclass: 'classes/allClass',
      allroom: 'classes/allRoom',
      deletestudent: 'classes/deletestudent'
    }),
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    },
    deleteRow(id) {
      this.deletestudent(id)
      this.student()
    },
    changeYe(val) { //  当前第几页
      this.currentpage = val
    },
    changeSize(val) { //  多少条每页
      this.pagesize = val
    },
    reset() {
      this.input = ''
      this.value = ''
      this.valueclass = ''
      this.student()
    },
    search() {
      if (this.input && this.value && this.valueclass) {
        this.arrClass = this.allStud.filter((item, ind) => {
          return this.input === item.student_name && this.value === item.room_text && this.valueclass === item.grade_name
        })
      } else if ((this.input && this.value) || (this.value && this.valueclass) || (this.input && this.valueclass)) {
        this.arrClass = this.allStud.filter((item, ind) => {
          return (this.input === item.student_name && this.value === item.room_text) || (this.value === item.room_text && this.valueclass === item.grade_name) || (this.input === item.student_name && this.valueclass === item.grade_name)
        })
      } else {
        this.arrClass = this.allStud.filter((item, ind) => {
          return this.input === item.student_name || this.value === item.room_text || this.valueclass === item.grade_name
        })
      }
    },
    exportExcel() {
      const header = Object.keys(this.allStud[0])
      const list = this.allStud.map(item => {
        const arr = Object.values(item)
        return arr.map(item => JSON.stringify(item))
      })
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: header,
          data: list,
          filename: '',
          bookType: 'xlsx'
        })
      })
    }
  }
}
</script>

<style scoped>
  .top{
    width: 100%;
    display: flex;
  }
  .chart-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
  }
  .layout {
    display: flex;
    flex-direction: column;
    flex: auto;
    background: #f0f2f5;
    min-height: 0;
  }
  thead{
    color: rgba(0, 0, 0, 0.85)!important;
    background: #f0f2f5!important;
    font-weight: 100!important;
  }
  h2{
      margin-top: 0;
      margin-bottom: 0.5em;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
  }
  .layout-content {
      flex: auto;
      min-height: 0;
      box-sizing: border-box;
  }
  .layout-content {
      flex: auto;
      min-height: 0;
      background: rgb(255, 255, 255);
      padding: 24px;
      margin: 0px 0px 20px;
      border-radius: 10px;
  }
  .button{
    display: flex;
    background: #0139fd;
    margin-bottom: 15px;
  }
  .table{
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }
</style>
