<template>
  <div class="wrap">
    <h2>添加用户 </h2>
    <div class="content">
      <div class="top">
        <div class="border">
          <p>
            <span :class="showClass ? '' : 'active'" @click="changeShow">添加用户</span>
            <span :class="showClass ? 'active' : ''" @click="changeShow">更新用户</span>
          </p>
          <div :id="showClass ? '' : 'active'" class="mainForm">
            <el-input v-model="add.name" placeholder="请输入姓名" style="width:90%; margin:10px 0" />
            <el-input v-model="add.pwd" type="password" placeholder="请输入密码" autocomplete="off" style="width:90%; margin:10px 0" />
            <el-select v-model="add.idText" placeholder="请选择身份id" style="margin-top:10px;">
              <el-option
                v-for="item in allIden"
                :key="item.identity_id"
                :label="item.identity_text"
                :value="item.identity_text"
                style="margin-left:5px;"
              />
            </el-select><br>
            <p>
              <el-button type="primary" @click="addUser">确定</el-button>
              <el-button @click="reset(1)">重置</el-button>
            </p>
          </div>
          <div :id="showClass ? 'active' : ''" class="mainForm">
            <el-select v-model="changeUser.id" placeholder="请选择用户id" style="margin-top:10px;">
              <el-option
                v-for="item in users"
                :key="item.user_id"
                :label="item.user_name"
                :value="item.user_id"
                style="margin-left:5px;"
              />
            </el-select><br>
            <el-input v-model="changeUser.name" placeholder="请输入用户名" style="width:90%; margin:10px 0" />
            <el-input v-model="changeUser.pwd" type="password" placeholder="请输入密码" autocomplete="off" style="width:90%; margin:10px 0" />
            <el-select v-model="changeUser.indet" placeholder="请选择身份id" style="margin-top:10px;">
              <el-option
                v-for="item in allIden"
                :key="item.identity_id"
                :label="item.identity_text"
                :value="item.identity_text"
                style="margin-left:5px;"
              />
            </el-select><br>
            <p>
              <el-button type="primary" @click="changes">确定</el-button>
              <el-button @click="reset(1)">重置</el-button>
            </p>
          </div>
        </div>
        <div class="border">
          <p>
            <span class="active">添加身份</span>
          </p>
          <div class="mainForm">
            <el-input v-model="idValue" placeholder="请输入身份" style="width:90%; margin:10px 0" />
            <p>
              <el-button type="primary" @click="addIden">确定</el-button>
              <el-button @click="reset(2)">重置</el-button>
            </p>
          </div>
        </div>
        <div class="border">
          <p>
            <span class="active">添加接口权限</span>
          </p>
          <div class="mainForm">
            <el-input v-model="apiMsg.name" placeholder="请输入api接口权限名称" style="width:90%; margin:10px 0" />
            <el-input v-model="apiMsg.url" placeholder="请输入api接口权限url" style="width:90%; margin:10px 0" />
            <el-input v-model="apiMsg.method" placeholder="请输入api接口权限方法" style="width:90%; margin:10px 0" />
            <p>
              <el-button type="primary" @click="addApi">确定</el-button>
              <el-button @click="reset(3)">重置</el-button>
            </p>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="border">
          <p>
            <span class="active">添加视图接口权限</span>
          </p>
          <div class="mainForm">
            <el-select v-model="viewMsg" placeholder="请选择已有视图" style="margin-top:10px;">
              <el-option
                v-for="item in viewOpt"
                :key="item.view_id"
                :label="item.view_authority_text"
                :value="item.view_id"
                style="margin-left:5px;"
              />
            </el-select>
            <p>
              <el-button type="primary" @click="addView">确定</el-button>
              <el-button @click="reset(4)">重置</el-button>
            </p>
          </div>
        </div>
        <div class="border">
          <p>
            <span class="active">给身份设置api接口权限</span>
          </p>
          <div class="mainForm">
            <el-select v-model="setApi.idMsg" placeholder="请选择身份id" style="margin-top:10px;">
              <el-option
                v-for="item in allIden"
                :key="item.identity_id"
                :label="item.identity_text"
                :value="item.identity_text"
                style="margin-left:5px;"
              />
            </el-select><br>
            <el-select v-model="setApi.apiMsg" placeholder="请选择api接口权限" style="margin-top:10px;">
              <el-option
                v-for="item in apiOpt"
                :key="item.api_authority_id"
                :label="item.api_authority_text"
                :value="item.api_authority_text"
                style="margin-left:5px;"
              />
            </el-select>
            <p>
              <el-button type="primary" @click="idAuth">确定</el-button>
              <el-button @click="reset(5)">重置</el-button>
            </p>
          </div>
        </div>
        <div class="border">
          <p>
            <span class="active">给身份设置视图权限</span>
          </p>
          <div class="mainForm">
            <el-select v-model="viewAuthor.idAuth" placeholder="请选择身份id" style="margin-top:10px;">
              <el-option
                v-for="item in allIden"
                :key="item.identity_id"
                :label="item.identity_text"
                :value="item.identity_text"
                style="margin-left:5px;"
              />
            </el-select><br>
            <el-select v-model="viewAuthor.viewAuth" placeholder="请选择视图权限id" style="margin-top:10px;">
              <el-option
                v-for="item in viewOpt"
                :key="item.view_id"
                :label="item.view_authority_text"
                :value="item.view_authority_text"
                style="margin-left:5px;"
              />
            </el-select>
            <p>
              <el-button type="primary" @click="viewAuth">确定</el-button>
              <el-button @click="reset(6)">重置</el-button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
  // MessageBox,
  Message
} from 'element-ui'
export default {
  data() {
    return {
      showClass: 0,
      isShow: false,
      input: '',
      password: '',
      user: '',
      changeUser: {
        id: '',
        name: '',
        pwd: '',
        indet: ''
      },
      add: {
        name: '',
        pwd: '',
        idText: ''
      },
      idValue: '',
      viewMsg: '',
      setApi: {
        idMsg: '',
        apiMsg: ''
      },
      idAuthorize: '',
      apiMsg: {
        name: '',
        url: '',
        method: ''
      },
      viewAuthor: {
        idAuth: '',
        viewAuth: ''
      },
      options: [{
        name: '',
        label: ''
      }]
    }
  },
  computed: {
    ...mapState({
      viewOpt: state => state.adduser.viewOpt,
      allIden: state => state.adduser.allIden,
      apiOpt: state => state.adduser.apiOpt,
      users: state => state.adduser.users
    })
  },
  async created() {
    await this.allViewList()
    // if (res.code ===1 ) {
    //   this.viewOpt = res.data
    // }
    await this.getAllIndetity()
    await this.getApiAuth()
    await this.showUsers()
  },
  methods: {
    ...mapActions({
      addPeo: 'adduser/addPeo',
      addIndentity: 'adduser/addIdentity',
      addApiAuth: 'adduser/addApiAuth',
      allViewList: 'adduser/allViewList',
      addViewAuth: 'adduser/addViewAuth',
      getAllIndetity: 'adduser/getAllIndetity',
      getApiAuth: 'adduser/getApiAuth',
      setApiAuth: 'adduser/setApiAuth',
      setViewAuth: 'adduser/setViewAuth',
      showUsers: 'adduser/showUsers',
      changeMes: 'adduser/changeMes'
    }),
    // 添加用户
    async addUser() {
      if (!this.add.name) {
        Message({
          message: '姓名不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return false
      } else {
        var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
        if (!uPattern.test(this.add.name)) {
          Message({
            message: '用户名为4-6位的字符',
            type: 'error',
            duration: 5 * 1000
          })
          return false
        }
      }
      if (!this.add.pwd) {
        Message({
          message: '密码不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return false
      } else {
        var Reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
        if (!Reg.test(this.add.pwd)) {
          Message({
            message: '密码由大写字母，小写字母，数字，特殊符号组成，至少8位',
            type: 'error',
            duration: 5 * 1000
          })
          return false
        }
      }
      var num = ''
      if (!this.add.idText) {
        num = 'zi0gu7-v7dy08'
      } else {
        var item = this.allIden.filter((item) => {
          return item.identity_text === this.add.idText
        })
        num = item[0].identity_id
      }
      var res = await this.addPeo({
        user_name: this.add.name,
        user_pwd: this.add.pwd,
        identity_id: num
      })
      if (res.code === 1) {
        Message({
          message: res.msg,
          type: 'success',
          duration: 5 * 1000
        })
      }
    },
    async changes() {
      if (!this.changeUser.id) {
        Message({
          message: '身份id不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      // 身份id
      var item = this.allIden.filter((item) => {
        return item.identity_text === this.changeUser.indet
      })
      // user_id
      var arr = this.users.filter((item) => {
        return item.user_id === this.changeUser.id
      })
      this.changeUser.name = arr[0].user_name
      this.changeUser.pwd = arr[0].user_pwd
      var res = await this.changeMes({
        user_id: this.changeUser.id,
        user_name: this.changeUser.name,
        user_pwd: this.changeUser.pwd,
        identity_id: item[0].identity_id
      })
      if (res.code === 1) {
        Message({
          message: res.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.changeUser = {
          id: '',
          name: '',
          pwd: '',
          indet: ''
        }
      } else {
        Message({
          message: '添加失败',
          type: 'success',
          duration: 5 * 1000
        })
      }
    },
    // 添加身份
    async addIden() {
      if (!this.idValue) {
        Message({
          message: '身份信息不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }
      var res = await this.addIndentity({ identity_text: this.idValue })
      if (res.code === 1) {
        Message({
          message: res.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.idValue = ''
      }
    },
    // 添加接口权限信息
    async addApi() {
      if (!this.apiMsg.name) {
        Message({
          message: 'api名字不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }
      if (!this.apiMsg.url) {
        Message({
          message: 'api路径不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }
      if (!this.apiMsg.method) {
        Message({
          message: 'api接口方法不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }
      var res = await this.addApiAuth({
        api_authority_text: this.apiMsg.name,
        api_authority_url: this.apiMsg.url,
        api_authority_method: this.apiMsg.method
      })
      if (res.code === 1) {
        Message({
          message: res.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.apiMsg = {
          name: '',
          url: '',
          method: ''
        }
      }
    },
    // 添加视图接口权限
    async addView() {
      if (!this.viewMsg) {
        Message({
          message: '视图信息不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }
      var item = this.viewOpt.filter((item) => {
        return item.view_id === this.viewMsg
      })
      var id = item[0].view_id
      var text = item[0].view_authority_text
      const res = await this.addViewAuth({ view_authority_text: text, view_id: id })
      if (!res) {
        Message({
          message: '视图接口重复',
          type: 'error',
          duration: 5 * 1000
        })
        this.viewMsg = ''
      } else {
        if (res.code === 1) {
          Message({
            message: res.msg,
            type: 'success',
            duration: 5 * 1000
          })
          this.viewMsg = ''
        }
      }
    },
    // 身份设置api接口权限
    async idAuth() {
      if (!this.setApi.idMsg) {
        Message({
          message: '身份id不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }
      if (!this.setApi.apiMsg) {
        Message({
          message: '接口权限不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }
      const item = this.allIden.filter((item) => {
        return item.identity_text === this.setApi.idMsg
      })
      const array = this.apiOpt.filter((item) => {
        return item.api_authority_text === this.setApi.apiMsg
      })
      const idNum = item[0].identity_id
      const apiNum = array[0].api_authority_id
      var res = await this.setApiAuth({
        identity_id: idNum,
        api_authority_id: apiNum
      })
      if (res.code === 1) {
        Message({
          message: res.msg,
          type: 'success',
          duration: 5 * 1000
        })
      }
    },
    // 身份设置视图权限
    async viewAuth() {
      if (!this.viewAuthor.idAuth) {
        Message({
          message: '身份id不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }
      if (!this.viewAuthor.viewAuth) {
        Message({
          message: '视图权限不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }
      const item = this.allIden.filter((item) => {
        return item.identity_text === this.viewAuthor.idAuth
      })
      const array = this.viewOpt.filter((item) => {
        return item.view_authority_text === this.viewAuthor.viewAuth
      })
      const idNum = item[0].identity_id
      const apiNum = array[0].api_authority_id
      const res = await this.setViewAuth({
        identity_id: idNum,
        view_authority_id: apiNum
      })
      if (!res) {
        Message({
          message: '视图权限重复',
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        if (res.code === 1) {
          Message({
            message: res.msg,
            type: 'success',
            duration: 5 * 1000
          })
        }
      }
    },
    reset(num) {
      switch (num) {
        case 0: {
          break
        }
        case 1: {
          this.add = {
            name: '',
            pwd: '',
            id: ''
          }
          break
        }
        case 2: {
          this.idValue = ''
          break
        }
        case 3: {
          this.apiMsg = {
            name: '',
            url: '',
            method: ''
          }
          break
        }
        case 4: {
          this.viewMsg = ''
          break
        }
        case 5: {
          this.setApi = {
            idMsg: '',
            apiMsg: ''
          }
          break
        }
        case 6: {
          this.viewAuthor = {
            idAuth: '',
            viewAuth: ''
          }
          break
        }
      }
      this.idValue = ''
    },
    changeShow() {
      this.showClass = !this.showClass
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
  border: 1px solid #ccc;
  margin: 0 auto;
}
.wrap .content>div {
  width: 100%;
  height: auto;
  display: flex;
  border-bottom: 1px solid #ccc;
}
.wrap .content .bottom {
  border: none;
}
.wrap .border {
  width: 33.3%;
  padding-left:10px;
  box-sizing: border-box;
  padding-bottom: 20px;
  border-right: 1px solid #ccc;
}
.wrap .top .border:first-child>.mainForm {
  display: none
}
.wrap .border #active {
  display: block
}
.wrap .border:last-child {
  border: none;
}
.wrap .border>p {
  width: 100%;
  /* height: 50px; */
  padding: 0 5px;
  box-sizing: border-box;
}
.wrap .border>p span {
  padding: 5px 10px;
  border: 1px solid #ccc;
  margin: auto 0;
  margin-left: 0;
}
.wrap .border>p span.active {
  border-color: blue;
  color: blue;
}
</style>
