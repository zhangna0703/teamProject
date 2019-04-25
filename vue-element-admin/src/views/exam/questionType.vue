<template>
  <div class="wrap">
    <h2>试题分类</h2>
    <div class="content">
      <div>
        <div class="style_buttons">
          <button type="button" class="btn" @click="dialogVisible = true">
            <i class="el-icon-plus" />
            <span>添加类型</span>
          </button>
        </div>
        <div class="style_lists">
          <el-table :data="questionsType" style="width: 100%">
            <el-table-column prop="questions_type_id" label="类型ID" width="280" />
            <el-table-column prop="questions_type_text" label="类型名称" width="280" />
            <el-table-column prop="address" label="操作" />
          </el-table>
        </div>
        <el-dialog title="创建新类型" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <div class="title">
            <input v-model="ivalue" class="ipt" placeholder="请输入类型名称" type="text">
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="sbmit">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      dialogVisible: false,
      code: '',
      ivalue: ''
    }
  },
  computed: {
    ...mapState({
      questionsType: state => state.addQuestion.questionsType
    })
  },
  created() {
    this.getQuestionsTpe()
  },
  methods: {
    createCode() {
      const codeArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      const length = 12
      this.code = ''
      for (let i = 0; i < length; i++) {
        var randomI = Math.floor(Math.random() * 36)
        this.code += codeArr[randomI]
      }
    },
    ...mapActions({
      getUser: 'addQuestion/getUser',
      getAllExam: 'addQuestion/getAllExam',
      getExamType: 'addQuestion/getExamType',
      addQuestions: 'addQuestion/addQuestions',
      upQuestions: 'addQuestion/upQuestions',
      getSubjectType: 'addQuestion/getSubjectType',
      getQuestionsTpe: 'addQuestion/getQuestionsTpe',
      addType: 'addQuestion/addType'
    }),
    async sbmit() {
      await this.createCode()
      this.dialogVisible = false
      await this.addType({
        text: this.ivalue,
        sort: this.code
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style>
.wrap{
  padding: 0px 24px 24px;
  background: #f0f2f5;
  display: flex;
  flex-direction: column;
}
.wrap h2{
  padding: 20px 0px;
  margin-top: 10px;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}
.content{
  flex: auto;
  line-height: 1.5;
  font-size:14px;
  color: rgba(0, 0, 0, 0.65);
}
.content h3{
  margin-top: 0;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}
.content>div{
    background: rgb(255, 255, 255);
    padding: 24px;
    margin: 0px 0px 20px;
    border-radius: 10px;
}
.style_buttons{
  width:90%;
  height:40px;
  position: relative;
  margin-bottom: 25px;
  display: flex;
}
.btn{
  height:40px;
  padding: 0 40px!important;
  border-radius: 4px!important;
  border: 0!important;
  font-size: 14px!important;
  color: #fff!important;
  background: linear-gradient(-90deg,#4e75ff,#0139fd)!important;
}
.title{
  width:90%;
  height:40px;
}
.title .ipt{
  width:65%;
  height:100%;
  border-radius: 2px;
  border:none;
  border: 1px solid #ccc;
  padding-left:10px;
  font-size: 16px;
  box-sizing: border-box;
}
el-dialog{
  width:90%;
}
</style>
