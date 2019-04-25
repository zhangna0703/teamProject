<template>
  <div class="wrap">
    <h2>{{ defaultHead }}</h2>
    <div class="content">
      <div>
        <form action="">
          <h3>题目信息</h3>
          <div class="form-item">
            <div class="item">
              <label class="" title="题干">题干</label>
            </div>
            <div class="title">
              <input v-model="tvalue" class="ipt" placeholder="请输入题目标题，不超过20个字" type="text" value="">
            </div>
          </div>
          <div class="form-item">
            <div class="item">
              <label class="" title="题目主题">题目主题</label>
            </div>
            <markdown-editor ref="markdownEditor" v-model="content" height="300px" />
            <div class="f-item">
              <label for="title" class="add-form-item-required" title="试卷名称">请选择考试类型:</label>
              <el-select v-model="evalue" placeholder="请选择">
                <el-option v-for="item in examType" :key="item.exam_id" :label="item.exam_name" :value="item.exam_id" />
              </el-select>
            </div>
            <div class="f-item">
              <label for="title" class="add-form-item-required" title="试卷名称">请选择课程类型:</label>
              <el-select v-model="svalue" placeholder="请选择">
                <el-option v-for="item in subjectType" :key="item.subject_id" :label="item.subject_text" :value="item.subject_id" />
              </el-select>
            </div>
            <div class="f-item">
              <label for="title" class="add-form-item-required" title="试卷名称">请选择题目类型:</label>
              <el-select v-model="qvalue" placeholder="请选择">
                <el-option v-for="item in questionsType" :key="item.questions_type_id" :label="item.questions_type_text" :value="item.questions_type_id" />
              </el-select>
            </div>
            <div class="item">
              <label class="" title="答案信息">答案信息</label>
            </div>
            <markdown-editor ref="markdownEditor" v-model="content1" height="300px" />
          </div>
        </form>
        <button class="sbmit" type="primary" @click="dialogVisible = true">提交</button>
        <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <span>{{ question }}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sure">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
          <span>{{ msg }}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">知道了</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'TinymceDemo',
  components: { MarkdownEditor },
  data() {
    return {
      defaultHead: '添加试题',
      question: '你确定要添加这道试题吗?真的要添加吗？',
      content: '',
      content1: '',
      dialogVisible: false,
      dialogVisible1: false,
      id: '',
      msg: '添加试题失败',
      value: '',
      tvalue: '',
      svalue: '',
      evalue: '',
      qvalue: '',
      questions_id: '',
      tableData: [{
        information: 'Nodejs开发第二周摸底考试',
        class: '1608',
        creator: '陈',
        startTime: '2019-3-10',
        endTime: '2019-3-17'
      },
      {
        information: '渐进式',
        class: '1609',
        creator: '王',
        startTime: '2019-3-10',
        endTime: '2019-3-17'
      },
      {
        information: '组件式',
        class: '1610',
        creator: '任',
        startTime: '2019-3-10',
        endTime: '2019-3-17'
      }]
    }
  },
  computed: {
    ...mapState({
      detail: state => state.addQuestion.detail,
      userInfo: state => state.addQuestion.userInfo,
      examType: state => state.addQuestion.examType,
      subjectType: state => state.addQuestion.subjectType,
      allQuestion: state => state.addQuestion.allQuestion,
      questionsType: state => state.addQuestion.questionsType
    })
  },
  async created() {
    this.getUser()
    this.getExamType()
    this.getSubjectType()
    this.getQuestionsTpe()
    await this.getAllExam()
    this.id = this.$route.query.id
    this.allQuestion.forEach(item => {
      if (this.id === item.questions_id) {
        this.questions_id = item.questions_id
        this.tvalue = item.title
        this.evalue = item.exam_id
        this.svalue = item.subject_id
        this.qvalue = item.questions_type_id
        this.content = item.questions_stem
        this.content1 = item.questions_answer
        this.defaultHead = '编辑试题'
        this.question = '您要修改吗，确定要修改这道题吗'
      }
    })
  },
  methods: {
    ...mapMutations({
      updataState: 'addQuestion/updataState'
    }),
    ...mapActions({
      getUser: 'addQuestion/getUser',
      getAllExam: 'addQuestion/getAllExam',
      getExamType: 'addQuestion/getExamType',
      addQuestions: 'addQuestion/addQuestions',
      upQuestions: 'addQuestion/upQuestions',
      getSubjectType: 'addQuestion/getSubjectType',
      getQuestionsTpe: 'addQuestion/getQuestionsTpe'
    }),
    async sure() {
      var obj = {
        questions_type_id: this.qvalue,
        questions_answer: this.content1,
        questions_stem: this.tvalue,
        subject_id: this.svalue,
        exam_id: this.evalue,
        user_id: this.userInfo.user_id,
        title: this.content
      }
      var obj1 = {
        questions_type_id: this.qvalue,
        questions_answer: this.content1,
        questions_stem: this.tvalue,
        // user_id: this.userInfo.user_id,
        subject_id: this.svalue,
        exam_id: this.evalue,
        questions_id: this.questions_id,
        title: this.content
      }
      this.dialogVisible = false
      this.dialogVisible1 = true
      var res = null
      console.log(this.question)
      if (this.question === '您要修改吗，确定要修改这道题吗') {
        console.log(obj, '123123131')
        res = await this.upQuestions(obj1)
      } else {
        res = await this.addQuestions(obj)
      }
      if (res.msg) {
        this.msg = res.msg
      }
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
.content .form-item{
  position: relative;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 24px;
  height: auto;
  zoom: 1;
  display: block;
  line-height: 1.5;
  font-size: 14px;
  font-weight: 400;
  box-sizing: border-box;
}
.content .form-item .item{
  padding: 0 0 8px;
  margin: 0;
  display: block;
  text-align: left;
  line-height: 1.5;
  white-space: initial;
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
.f-item{
  width:15%;
  margin:30px 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.f-item label{
  padding-bottom:10px;
  box-sizing: border-box;
}
.sbmit{
  width:10%;
  height:40px;
  border:none;
  outline: none;
  border-radius: 5px;
  background: linear-gradient(-90deg,#4e75ff,#0139fd);
  color:#fff;
  margin-top:35px;
  box-sizing: border-box;
}
</style>
