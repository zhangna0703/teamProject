<template>
  <div class="wrap">
    <h3>阅卷</h3>
    <div class="main">
      <div class="left">
        <div v-for="(item,index) in data" :key="index">
          <h5>{{ item.title }}<span>{{ item.questions_type_text }}</span></h5>
          <!-- <p>{{item.questions_stem}}</p> -->
          <VueMarkdown class="markdown">{{ item.questions_stem }}</VueMarkdown>
          <div class="answers">
            <div class="stu_answer">
              <p>学生答案</p>
              <VueMarkdown class="markdown">{{ item.student_answer }}</VueMarkdown>
            </div>
            <div class="true_answer">
              <p>正确答案</p>
              <VueMarkdown class="markdown">{{ item.questions_answer }}</VueMarkdown>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <h3>{{ name }}</h3>
        <div class="block sliders">
          <span class="demonstration">得分：{{ val }}</span>
          <el-slider v-model="val" />
        </div>
        <el-button type="text" @click="open">提交</el-button>
        <!-- <el-button type="primary" @click="score"></el-button> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      data: [],
      name: '',
      val: 0
    }
  },
  computed: {
    ...mapState({
      message: state => state.readPapers.message
    })
  },
  async mounted() {
    var obj = JSON.parse(window.localStorage.getItem('examIds'))
    await this.getExamMsg({
      id: obj.nid
    })
    this.data = this.message.questions
    this.name = obj.name
  },
  methods: {
    ...mapActions({
      getExamMsg: 'readPapers/getExamMsg',
      subScroll: 'readPapers/subScroll'
    }),
    open() {
      var obj = JSON.parse(window.localStorage.getItem('examIds'))
      var id = obj.nid
      this.$confirm('确定提交阅卷结果？ 阅卷分数:' + this.val, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async() => {
        await this.subScroll({
          id: id,
          score: this.val
        })
        this.opens()
        this.$router.push('classmate')
      }).catch(() => {})
    },
    opens() {
      this.$confirm('分数为' + this.val, '提示', {
        confirmButtonText: '知道了',
        showCancelButton: false,
        showClose: false,
        type: 'success',
        center: true
      }).then(() => {}).catch(() => {})
    }
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.wrap {
  width: 100%;
  padding-left: 30px;
  box-sizing: border-box;
  background: #f5f5f5;
}
h3 {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 26px;
  font-weight: normal;
}
.main {
  width: 100%;
  height: auto;
}
.main>div {
  display: inline-block;
}
.main .left {
  width: 73%;
  height: auto;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 30px;
  background: #fff;
}
.left div h5 {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.left div h5>span {
  font-weight: normal;
  margin-left:5px;
  color:blue;
  background: azure;
  border: 1px solid skyblue;
  padding: 2px 5px;
}
.wrap .right {
  width: 250px;
  height: 200px;
  border-radius: 30px;
  background: #fff;
  position: fixed;
  right: 20px;
  top: 200px;
  padding: 0 20px;
  box-sizing: border-box;
}
.wrap .right .h3 {
  width: 100%;
  height: 80px;
  line-height: 80px;
}
.answers {
  margin-top: 20px;
}
.answers>div {
  display: inline-block;
  /* display: flex; */
  width: 45%;
  /* text-emphasis: v; */
  vertical-align: top;
}
.markdown /deep/ code{
  white-space: normal;
  white-space: pre-wrap;
  word-wrap: break-word;
}
.answers>div.true_answer {
  margin-left: 20px;
}
 /* .right h3 {
  height: 30px;
} */
/* .sliders {
  padding: 0 20px;
  box-sizing: border-box;

} */
</style>
