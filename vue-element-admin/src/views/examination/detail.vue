<template>
  <div class="add-layout">
    <h2>试卷详情</h2>
    <div v-for="(item,index) in detailList" :key="index" class="add-layout-content">
      <div class="add-layout-question">
        <div class="content-list">
          <div class="list">
            <div class="style_questionitem__3ETlC">
              <h4>{{ index+1 }}: {{ item.title }}</h4>
              <VueMarkdown class="markdown">{{ item.questions_stem }}</VueMarkdown>
            </div>
          </div>
        </div>
      </div>
      <div class="add-layout-answer">
        <!-- <p class="message">答案信息</p> -->
        <div class="content-list">
          <div class="list">
            <div class="style_questionitem__3ETlC">
              <VueMarkdown class="markdown">{{ item.questions_answer }}</VueMarkdown>
            </div>
          </div>
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
      detailList: []
    }
  },
  async created() {
    const id = this.$route.query.id
    const result = await this.examDetail(id)
    this.detailList = result
  },
  methods: {
    ...mapActions({
      examDetail: 'examination/getPaperDetail'
    })
  }
}
</script>

<style lang="scss" scoped>
.add-layout {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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
.add-layout-content{
  width: 100%;
  display: flex;
  // flex-wrap: wrap;
}
.add-layout-question {
  width: 60%;
  background: white;
  border-radius: 10px;
  margin-left: 20px;
  float: left;
  margin-right: 20px;
  padding: 24px;
  margin-bottom: 20px;
}
.add-layout-answer {
  width: 35%;
  // flex: 1;
  background: white;
  border-radius: 10px;
  float: left;
  padding: 24px;
  margin-bottom: 20px;
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
.message {
  font-size: 18px;
  margin: 0;
  padding: 0;
  margin-bottom: 5px;
}
</style>
