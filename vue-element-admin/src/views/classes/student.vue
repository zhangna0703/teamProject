<template>
  <div class="layout" style="padding: 0px 24px 24px;">
    <h2 style="padding: 20px 0px; margin-top: 10px;">学生管理</h2>
    <div class="layout-content">
      <div class="top">
        <el-input v-model="input" style="width: 165px; margin-right: 15px;" placeholder="请输入学生姓名" />
        <el-select v-model="value" style="width: 165px; margin-right: 15px;" placeholder="请选择教室号">
          <el-option
            v-for="item in roomArr"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-select v-model="valueclass" style="width: 165px; margin-right: 15px;" placeholder="班级名">
          <el-option
            v-for="item in classArr"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-button type="primary" class="button" @click="search">搜索</el-button>
        <el-button type="primary" class="button">重置</el-button>
      </div>
      <el-table
        :data="arrClass.length>0?arrClass.slice((currentpage-1)*pagesize,currentpage*pagesize):allStud.studentarr.slice((currentpage-1)*pagesize,currentpage*pagesize)"
        style="width: 100%"
      >
        <el-table-column
          label="姓名"
          width="216"
        >
          <template slot-scope="scope">
            {{ scope.row.student_name }}
          </template>
        </el-table-column>
        <el-table-column
          label="学号"
          width="359"
        >
          <template slot-scope="scope">
            {{ scope.row.student_id }}
          </template>
        </el-table-column>
        <el-table-column
          label="班级"
          width="216"
        >
          <template slot-scope="scope">
            {{ scope.row.grade_name }}
          </template>
        </el-table-column>
        <el-table-column
          label="教室"
          width="204"
        >
          <template slot-scope="scope">
            {{ scope.row.room_text }}
          </template>
        </el-table-column>
        <el-table-column
          label="密码"
          width="459"
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
          :total="allStud.studentarr.length"
          @size-change="changeSize"
          @current-change="changeYe"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      arrClass: [],
      input: '',
      value: '',
      valueclass: '',
      allData: [],
      currentpage: 1,
      pagesize: 10,
      roomArr: [],
      classArr: []
    }
  },
  computed: {
    ...mapState({
      allStud: state => state.classes
    })
  },
  created() {
    this.student()
    const roomarr = []
    const classarr = []
    this.allStud.studentarr.forEach((item, ind) => {
      if (roomarr.indexOf(item.room_text) === -1) {
        roomarr.push(item.room_text)
      }
      if (classarr.indexOf(item.grade_name) === -1) {
        classarr.push(item.grade_name)
      }
    })
    this.roomArr = roomarr
    this.classArr = classarr
  },
  methods: {
    ...mapActions({
      student: 'classes/allStudent',
      deletestudent: 'classes/deletestudent'
    }),
    deleteRow(id) {
      this.deletestudent(id)
      this.student()
    },
    changeYe(val) {
      this.currentpage = val
    },
    changeSize(val) {
      this.pagesize = val
    },
    search() {
      if (this.input && this.value && this.valueclass) {
        const arr = this.allStud.studentarr.filter((item, ind) => {
          return this.input === item.student_name && this.value === item.room_text && this.valueclass === item.grade_name
        })
        this.arrClass = arr
      } else if ((this.input && this.value) || (this.value && this.valueclass) || (this.input && this.valueclass) || (this.value && this.valueclass)) {
        const arr = this.allStud.studentarr.filter((item, ind) => {
          return (this.input === item.student_name && this.value === item.room_text) || (this.value === item.room_text && this.valueclass === item.grade_name) || (this.input === item.student_name && this.valueclass === item.grade_name)
        })
        this.arrClass = arr
      } else {
        const arr = this.allStud.studentarr.filter((item, ind) => {
          return this.input === item.student_name || this.value === item.rooxm_text || this.valueclass === item.grade_name
        })
        this.arrClass = arr
      }
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

