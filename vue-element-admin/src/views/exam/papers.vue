<template>
  <div class="wrap">
    <h2>查看试题</h2>
    <div class="content">
      <div>
        <form class="add-form">
          <div class="add-form-top">
            <label for="title" class="add-form-item-required" title="试卷名称">课程类型:</label>
            <div class="add-item-every">
              <div :class=" flag ? 'active':''" @click="every1">all</div>
              <div v-for="(item,index) in subjectType" :key="index" :class="(index===idx)||(idx===99)?'active':''" @click="every(item.subject_id,index)">{{ item.subject_text }}</div>
            </div>
          </div>
          <div class="add-form-bottom">
            <div class="add-form-item">
              <label for="title" class="add-form-item-required" title="试卷名称">考试类型:</label>
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in examType" :key="item.exam_id" :label="item.exam_name" :value="item.exam_id" />
              </el-select>
            </div>
            <div class="add-form-item">
              <label for="title" class="add-form-item-required" title="试卷名称">试题题目:</label>
              <el-select v-model="value1" placeholder="请选择">
                <el-option v-for="item in questionsType" :key="item.questions_type_id" :label="item.questions_type_text" :value="item.questions_type_id" />
              </el-select>
            </div>
            <el-button type="primary" @click="search"><i class="el-icon-search" />查询</el-button>
          </div>
        </form>
      </div>
      <div>
        <ul>
          <li v-for="(item,index) in allQuestion" :key="index" @click="detail($event,item)">
            <div class="left">
              <p>{{ item.title }}</p>
              <div>
                <p :data-type-id="item.questions_type_id" :data-id="item.questions_id">{{ item.questions_type_text }}</p>
                <p :data-id="item.subject_id">{{ item.subject_text }}</p>
                <p :data-id="item.exam_id">{{ item.exam_name }}</p>
              </div>
              <p class="color" :data-id="item.user_id">{{ item.user_name }}</p>
            </div>
            <span class="edit color">编辑</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      idx: '',
      value: '',
      value1: '',
      flag: false,
      subject_id: '',
      isShow: false,
      tableData: [{
        information: 'Nodejs开发第二周摸底考试',
        class: '1608',
        creator: '陈',
        startTime: '2019-3-10',
        endTime: '2019-3-17'
      }, {
        information: '渐进式',
        class: '1609',
        creator: '王',
        startTime: '2019-3-10',
        endTime: '2019-3-17'
      }, {
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
      examType: state => state.addQuestion.examType,
      allQuestion: state => state.addQuestion.allQuestion,
      subjectType: state => state.addQuestion.subjectType,
      questionsType: state => state.addQuestion.questionsType
    })
  },
  created() {
    this.getAllExam()
    this.getExamType()
    this.getSubjectType()
    this.getQuestionsTpe()
  },
  methods: {
    ...mapMutations({
      updataState: 'addQuestion/updataState'
    }),
    ...mapActions({
      getExamType: 'addQuestion/getExamType', // 获取所有的考试类型s
      getSubjectType: 'addQuestion/getSubjectType', // 获取所有的课程
      getQuestionsTpe: 'addQuestion/getQuestionsTpe', // 获取所有的试题类型
      getAllExam: 'addQuestion/getAllExam', // 获取所有的试题
      getRightExam: 'addQuestion/getRightExam', // 按条件获取试题
      getDetail: 'addQuestion/getDetail' // 获取详情信息
    }),
    detail(e, item) {
      this.getDetail(item)
      console.log(item)
      var str = ''
      if (e.target.tagName === 'SPAN') {
        str = 'addQuestion?id=' + item.questions_id
      } else {
        str = 'detail?id=' + item.questions_id
      }
      this.$router.push({ path: str })
    },
    every(sid, index) {
      this.subject_id = sid
      this.idx = index
    },
    every1() {
      this.flag = !this.flag
      if (this.flag) {
        this.idx = 99
      } else {
        this.idx = ''
      }
    },
    async search() {
      await this.getRightExam({
        questions_type_id: this.value1,
        // questinos_id: '',
        subject_id: this.subject_id,
        exam_id: this.value
      })
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
.content>div .add-form {
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.content>div .add-form label{
  font-size: 14px;
  font-weight: normal;
}
.content>div .add-form-top {
  display: flex;
}
.add-form-top .add-item-every {
  width:90%;
  display: flex;
  flex-wrap:wrap;
  line-height: 39.9999px;
}
.add-item-every .add-form label{
  width:200px;
}
.add-form-top .add-item-every div{
  list-style: none;
  display: inline-block;
  line-height: 20px;
  height: 22px;
  padding: 0 7px;
  border-radius: 2px;
  background: #fafafa;
  font-size: 12px;
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  opacity: 1;
  margin-right: 8px;
  margin-bottom: 20px;
  cursor: pointer;
}
.add-form-top .add-item-every div:hover {
  color:#00f;
}
.content div .add-form-bottom {
  display: flex;
}
.content div .add-form-bottom .add-form-item{
  margin-right: 60px;
}
.content div ul{
  width:100%;
  list-style: none;
}
.content div ul li{
  border-bottom:1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content div ul li:hover{
  background: rgba(232, 245, 249, 0.65);
}
.content div ul li:last-child{
  border:none;
}
.content div ul li .left{
  display: flex;
  flex-direction: column;
}
.content div ul li .left div{
  display: flex;
}
.content div ul li .left div p{
  padding:0 10px;
  border:1px solid #ccc;
  box-sizing: border-box;
  margin-left:10px;
}
.content div ul li .left div p:nth-child(1){
  color: #1890ff;
  background: #e6f7ff;
  border-color: #91d5ff;
}
.content div ul li .left div p:nth-child(2){
  color: #2f54eb;
  background: #f0f5ff;
  border-color: #adc6ff;
}
.content div ul li .left div p:nth-child(3){
  color: #fa8c16;
  background: #fff7e6;
  border-color: #ffd591;
}
.color{
  color:#00f;
}
.edit{
  padding-right:10px;
  box-sizing: border-box;
}
.active{
  background: #0139FD!important;
  color:#fff;
}
</style>
