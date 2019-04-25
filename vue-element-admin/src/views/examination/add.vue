<template>
  <div class="add-layout">
    <h2>创建试卷</h2>
    <div class="add-layout-content">
      <el-button plain @click="showDialog">添加新题</el-button>
      <div class="content-list">
        <div class="top-title">
          <h3>报考院校</h3>
          <p>考试时间：1小时30分钟 监考人：刘于 开始考试时间：2018.9.10 10:00 阅卷人：刘于</p>
        </div>
        <div v-for="(item,index) in questionList.questions" :key="index" class="list">
          <div class="style_questionitem__3ETlC">
            <h4>{{ index+1 }}：{{ item.title }} <a href="javascript:;" style="float: right;" @click="del(index)">删除</a></h4>
            <VueMarkdown class="markdown">{{ item.questions_stem }}</VueMarkdown>
          </div>
        </div>
      </div>
      <el-button type="primary" @click="jump">创建试卷</el-button>
    </div>
    <div v-show="flag" class="add-drawer">
      <div class="mask" />
      <div class="add-drawer-right">
        <div>
          <p class="fix-top"><span style="margin-right:20px;font-size:20px;color:#f00;cursor:pointer;" @click="close">X</span>所有试题</p>
          <ul v-for="(item,index) in alltest" :key="index" class="allPaper" @click="changeExam(item)">
            <li>
              <p>类型:{{ item.questions_type_text }}</p>
              <p>题目:{{ item.title }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import VueMarkdown from 'vue-markdown'
export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      flag: false,
      questionList: [],
      alltest: []
    }
  },
  created() {
    this.questionList = JSON.parse(window.localStorage.getItem('exam'))
  },
  methods: {
    ...mapActions({
      testData: 'examination/getTestList',
      renewal: 'examination/getRenewal'
    }),
    async showDialog() {
      if (this.questionList.questions.length < this.questionList.number * 1) {
        this.flag = true
        const result = await this.testData()
        this.alltest = result
      } else {
        this.$alert('请先删除再添加！', '提示', {
          confirmButtonText: '确定'
        })
      }
    },
    close() {
      this.flag = false
    },
    del(ind) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.questionList.questions.splice(ind, 1)
          window.localStorage.setItem('exam', JSON.stringify(this.questionList))
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    changeExam(item) {
      this.questionList.questions.push(item)
      window.localStorage.setItem('exam', JSON.stringify(this.questionList))
      this.flag = false
    },
    async jump() {
      const arr = []
      this.questionList.questions.forEach(item => {
        arr.push(item.questions_id)
      })
      const str = JSON.stringify(arr)
      const data = { question_ids: str }
      await this.renewal({ header: this.questionList.exam_exam_id, data })
      this.$router.push({ path: 'listexamination' })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
}
@keyframes fade-in {
  0% {
    width: 0;
  }
  40% {
    width: 20%;
  }
  60%{
    width: 10%;
  }
  100% {
    width: 40%;
  }
}
.add-drawer-right {
  width: 40%;
  position: relative;
  float: right;
  background-color: #fff;
  border: 0;
  background-clip: padding-box;
  z-index: 1;
  height: 100%;
  overflow-y: scroll;
  animation: fade-in;
  animation-duration: 2s;

  .fix-top {
    width: 100%;
    height: 30px;
    position: fixed;
    top: 0;
    background: #fff;
  }
}
.allPaper {
  margin-top: 50px;
}
.add-layout {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: auto;
  background: #f0f2f5;
  min-height: 0;
  padding: 0px 24px 24px;
  box-sizing: border-box;
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
h3,
h4 {
  font-weight: normal;
  display: block;
  font-size: 1.3em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
h4 {
  font-size: 14px;
  margin: 0;
  padding: 0;
}
a {
  color: #0139fd;
  background-color: initial;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
}
.content-list {
  width: 100%;
  margin-bottom: 10px;
}
.top-title {
  text-align: center;
  p {
    font-size: 14px;
  }
}
.style_questionitem__3ETlC {
  text-align: left;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
}
.markdown/deep/code{
  margin-top: 5px;
  height: 100%;
  display: block;
  padding: 2em;
  line-height: 1.2;
  // max-height: 35em;
  color: #657b83;
  background: #f6f6f6;
  background-size: 30px 30px;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 14px;
  white-space: normal;
  white-space: pre-wrap;
  word-wrap: break-word;
}
.markdown/deep/img{
  width: 100%;
}
</style>
