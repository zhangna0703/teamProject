<template>
  <div class="layout" style="padding: 0px 24px 24px;">
    <h2 style="padding: 20px 0px; margin-top: 10px;">班级管理</h2>
    <div class="layout-content">
      <el-button type="primary" class="button" @click="dialogFormVisible = true">+添加班级</el-button>
      <el-table :data="allArr.arr" style="width: 100%">
        <el-table-column label="班级名" width="311">
          <template slot-scope="scope">{{ scope.row.grade_name }}</template>
        </el-table-column>
        <el-table-column label="课程名" width="460">
          <template slot-scope="scope">{{ scope.row.subject_text }}</template>
        </el-table-column>
        <el-table-column label="教室号" width="315">
          <template slot-scope="scope">{{ scope.row.room_text }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editRow(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteRow(scope.row.grade_id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加班级 -->
    <el-dialog title="添加班级" :visible.sync="dialogFormVisible" width="520px" height="317px">
      <el-form :model="form">
        <el-form-item label="班级名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="班级名" />
        </el-form-item>
        <el-form-item label="教室号" :label-width="formLabelWidth">
          <el-select v-model="form.roomid" placeholder="请选择">
            <el-option v-for="(item,index) in allArr.arr" :key="index" :label="item.room_text" :value="item.room_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="课程名" :label-width="formLabelWidth">
          <el-select v-model="form.subjectid" placeholder="请选择">
            <el-option v-for="(item,index) in allArr.arr" :key="index" :label="item.subject_text" :value="item.subject_id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClasses">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 修改班级 -->
    <el-dialog title="修改班级" :visible.sync="mark" width="520px" height="317px">
      <el-form :model="edit">
        <el-form-item label="班级名" :label-width="formLabelWidth">
          <el-input v-model="edit.name" autocomplete="off" placeholder="班级名" disabled="disabled" />
        </el-form-item>
        <el-form-item label="教室号" :label-width="formLabelWidth">
          <el-select v-model="edit.roomText" placeholder="请选择">
            <el-option v-for="(item,index) in allArr.arr" :key="index" :label="item.room_text" :value="item.room_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="课程名" :label-width="formLabelWidth">
          <el-select v-model="edit.subjectText" placeholder="请选择">
            <el-option v-for="(item,index) in allArr.arr" :key="index" :label="item.subject_text" :value="item.subject_id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="mark = false">取 消</el-button>
        <el-button type="primary" @click="editClass(edit)">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      mark: false,
      dialogFormVisible: false,
      form: {
        name: '',
        roomid: '',
        subjectid: ''
      },
      edit: {
        name: '',
        grade_id: '',
        roomText: '',
        subjectText: '',
        roomid: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    ...mapState({
      allArr: state => state.classes
    })
  },
  created() {
    this.allClass()
  },
  methods: {
    ...mapActions({
      allClass: 'classes/allClass',
      addgrade: 'classes/addgrade',
      deletegrade: 'classes/deletegrade',
      updategrade: 'classes/updategrade'
    }),
    async addClasses() {
      this.dialogFormVisible = false
      const obj = this.form
      await this.addgrade({ grade_name: obj.name, room_id: obj.roomid, subject_id: obj.subjectid })
      await this.allClass()
    },
    deleteRow(id) {
      this.deletegrade({ grade_id: id })
      this.allClass()
    },
    editRow(value) {
      this.mark = true
      this.edit.name = value.grade_name
      this.edit.roomText = value.room_id
      this.edit.subjectText = value.subject_id
      this.edit.gradeid = value.grade_id
    },
    async editClass(value) {
      this.mark = false
      await this.updategrade({ grade_id: value.gradeid, grade_name: value.name, subject_id: value.subjectText, room_id: value.roomText })
      await this.allClass()
    }
  }
}
</script>

<style scoped>
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

