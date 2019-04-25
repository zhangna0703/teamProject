<template>
  <div class="add-layout">
    <h2>添加考试</h2>
    <div class="add-layout-content">
      <div class="add-layout-content">
        <el-form ref="formData" :rules="rules" class="add-form" :model="formData">
          <el-form-item class="add-form-item" label="试卷名称:" prop="title" required>
            <br>
            <el-input v-model="formData.title" size="medium" style="width:45%" class="add-form-item-control-wrapper" />
          </el-form-item>
          <el-form-item class="add-form-item" label="选择考试类型:" prop="typeId" required>
            <br>
            <el-select v-model="formData.typeId" placeholder="请选择" class="add-form-item-control-wrapper">
              <el-option
                v-for="(item,index) in typeList"
                :key="index"
                :label="item.exam_name"
                :value="item.exam_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="add-form-item" label="选择课程:" prop="classId" required>
            <br>
            <el-select v-model="formData.classId" placeholder="请选择" class="add-form-item-control-wrapper">
              <el-option
                v-for="item in curriculumList"
                :key="item.subject_id"
                :label="item.subject_text"
                :value="item.subject_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="add-form-item" label="设置题量:" prop="num" required>
            <br>
            <el-input-number v-model="formData.num" controls-position="right" :min="4" :max="10" value="0" class="add-form-item-control-wrapper" />
          </el-form-item>
          <el-form-item label="考试时间:">
            <br>
            <el-col :span="14" class="item">
              <el-form-item prop="startTime">
                <el-date-picker v-model="formData.startTime" type="datetime" style="width:200px;" default-time="12:00:00" />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">——</el-col>
            <el-col :span="14" class="item">
              <el-form-item prop="endTime">
                <el-date-picker v-model="formData.endTime" type="datetime" style="width:200px;" default-time="12:00:00" />
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" @click="submitForm('formData')">创建试卷</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      formData: {
        title: '',
        typeId: '',
        classId: '',
        num: 0,
        startTime: '',
        endTime: ''
      },
      rules: {
        // 校验标题
        title: [{ required: true, trigger: 'blur', message: '请输入试卷名称' }],
        // 试卷名称
        typeId: [{ required: true, trigger: 'change', message: '请选择考试类型' }],
        // 课程名称
        classId: [{ required: true, trigger: 'change', message: '请选择课程' }],
        // 题量
        num: [{ required: true, trigger: 'change', message: '请选择题量' }],
        // 开始时间
        startTime: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
        // 结束时间
        endTime: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapState({
      typeList: state => state.examination.examType,
      curriculumList: state => state.examination.curriculum
    })
  },
  created() {
    this.typeData()
    this.curriculumData()
  },
  methods: {
    ...mapActions({
      typeData: 'examination/getExamType',
      curriculumData: 'examination/getCurriculums',
      createExam: 'examination/createTestPaper'
    }),
    submitForm(formData) {
      this.$refs[formData].validate(async(valid) => {
        if (valid) {
          // 参数
          const formData = {
            title: this.formData.title,
            exam_id: this.formData.typeId,
            subject_id: this.formData.classId,
            start_time: this.formData.startTime.getTime(),
            end_time: this.formData.endTime.getTime(),
            number: this.formData.num * 1
          }
          const res = await this.createExam(formData)
          window.localStorage.setItem('exam', JSON.stringify(res))
          this.$router.push({ path: 'add' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-layout {
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
.add-form {
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  label {
    font-size: 14px;
    font-weight: normal;
  }
}
.add-form-item {
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 24px;
  vertical-align: top;
}
.item {
  width: 185px;
  margin-top: 10px;
}

.line {
  margin-top: 10px;
  width: 50px;
  text-align: center;
  height: 32px;
  margin-left: 10px;
}
</style>
