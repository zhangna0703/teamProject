<template>
  <div class="list-wrap">
    <h2>试卷列表</h2>
    <div class="add-layout-content">
      <el-form v-model="info" class="add-form">
        <div class="add-form-item">
          <label for="title" class="add-form-item-required" title="考试类型">考试类型:</label>
          <el-select v-model="info.exam_id" placeholder="请选择">
            <el-option
              v-for="(item,index) in typeList"
              :key="index"
              :label="item.exam_name"
              :value="item.exam_id"
            />
          </el-select>
        </div>
        <div class="add-form-item">
          <label for="title" class="add-form-item-required" title="课程">课程:</label>
          <el-select v-model="info.subject_id" placeholder="请选择">
            <el-option
              v-for="item in curriculumList"
              :key="item.subject_id"
              :label="item.subject_text"
              :value="item.subject_id"
            />
          </el-select>
        </div>
        <el-button type="primary" @click="submitForm(info)"><i class="el-icon-search" />查询</el-button>
        <el-button type="primary" @click="exportExcel"><i class="el-icon-search" />导出列表</el-button>
      </el-form>
    </div>
    <div class="add-layout-content">
      <div class="add-layout-title">
        <h4>试卷列表</h4>
        <el-button-group>
          <el-button plain>全部</el-button>
          <el-button plain>进行中</el-button>
          <el-button plain>已结束</el-button>
        </el-button-group>
      </div>
      <el-table :data="arr.length>0?arr:paperLists" :header-cell-style="tableHeaderColor" style="width: 100%">
        <el-table-column label="试卷信息">
          <template slot-scope="scope">
            <div>
              <p>{{ scope.row.title }}</p>
              <p>
                <span style="margin-right:4px">考试时间:{{ parseInt((scope.row.end_time - scope.row.start_time)/1000/60/60%24) }}:{{ parseInt((scope.row.end_time - scope.row.start_time)/1000/60%60) }}:{{ parseInt((scope.row.end_time - scope.row.start_time)/1000%60) }}</span>
                <span>{{ scope.row.number }}道题作弊{{ scope.row.status }}分</span>
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="班级">
          <template slot-scope="scope">
            <p>考试班级</p>
            <p><span v-for="(item,index) in scope.row.grade_name" :key="index" style="margin-right:3px">{{ item }}</span></p>
          </template>
        </el-table-column>
        <el-table-column label="创建人">
          <template slot-scope="scope" :width="flexColumnWidth(column)">
            <span>{{ scope.row.user_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开始时间">
          <template slot-scope="scope">
            <span>{{ new Date(scope.row.start_time * 1).toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间">
          <template slot-scope="scope">
            <span>{{ new Date(scope.row.end_time * 1).toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="87">
          <template slot-scope="scope">
            <span class="detail" @click="jumpDetail(scope.row.exam_exam_id)">详情</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
      </el-table> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import UploadExcelComponent from '@/components/UploadExcel/index.vue'
export default {
  // components: { UploadExcelComponent },
  data() {
    return {
      info: {
        exam_id: '',
        subject_id: ''
      },
      arr: []
    }
  },
  computed: {
    ...mapState({
      typeList: state => state.examination.examType,
      curriculumList: state => state.examination.curriculum,
      paperLists: state => state.examination.paperList
    })
  },
  created() {
    this.typeData()
    this.curriculumData()
    this.paperData()
    // this.arr = this.paperLists
  },
  methods: {
    ...mapActions({
      typeData: 'examination/getExamType',
      curriculumData: 'examination/getCurriculums',
      paperData: 'examination/getPaperList'
    }),
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #f4f7f9;color: #000;font-weight: 500;width:100%; height: 53px;'
      }
    },
    jumpDetail(id) {
      this.$router.push({ path: 'detail', query: { id: id }})
    },
    submitForm(formData) {
      for (var i in formData) {
        this.arr = this.paperLists.filter(item => {
          return formData[i] === item[i]
        })
      }
    },
    exportExcel() {
      const header = Object.keys(this.paperLists[0])
      const list = this.paperLists.map(item => {
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

<style lang="scss" scoped>
.list-wrap {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: auto;
  background: #f0f2f5;
  min-height: 0;
  padding: 0px 24px 24px;
}
h2 {
  padding: 20px 0px;
  margin-top: 10px;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 1.5em;
}
.add-layout-content {
  width: 100%;
  height: 100%;
  flex: auto;
  min-height: 0;
  background: rgb(255, 255, 255);
  padding: 24px;
  margin: 0px 0px 20px;
  border-radius: 10px;
}
.add-layout-title {
  display: flex;
  justify-content: space-between;
  h4 {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
  }
  .add-layout-button {
    // display: flex;
    button {
      flex-shrink: 0;
      margin: 0;
    }
  }
}
.add-form {
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  label {
    font-size: 14px;
    font-weight: normal;
  }
}
.add-form-item {
  margin-right: 60px;
}
.detail {
  color: #0139fd;
  background-color: transparent;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
}
</style>

