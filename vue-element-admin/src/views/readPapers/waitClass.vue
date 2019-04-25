<template>
  <div class="wrap">
    <h2>待批班级</h2>
    <div class="content">
      <el-table
        :data="data"
        style="width: 100%"
      >
        <el-table-column
          prop="grade_name"
          label="班级名"
          width="180"
        />
        <el-table-column
          prop="subject_text"
          label="课程名"
          width="180"
        />
        <el-table-column
          prop=""
          label="阅卷状态"
        />
        <el-table-column
          prop="subject_text"
          label="课程名称"
        />
        <el-table-column
          prop="room_text"
          label="教室号"
        />
        <el-table-column label="操作" width="87">
          <template slot-scope="scope">
            <span class="detail" @click="toClass(scope.row.grade_id, scope.row.grade_name)">详情</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="sizes, prev, pager, next, jumper"
      :total="data.length"
      style="float: right;margin:20px 0;"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      data: state => state.readPapers.classArr
    })
  },
  async mounted() {
    await this.getExamType()
    // console.log(this.data)
  },
  methods: {
    ...mapActions({
      getExamType: 'readPapers/getExamType'
    }),
    toClass(ind, name) {
      window.localStorage.setItem('classMsg', JSON.stringify({
        id: ind,
        name: name
      }))
      this.$router.push('classmate')
    }
  }
}
</script>

<style scoped>
.wrap>h2 {
  width:100%;
  height:50px;
  padding-left: 30px;
  box-sizing: border-box;
  font-weight: normal;
  line-height: 50px;
}
.wrap .content {
  width: 95%;
  /* height: 500px; */
  margin: 0 auto;
}
.detail {
  color: #0139fd;
  cursor: pointer;
}
</style>
