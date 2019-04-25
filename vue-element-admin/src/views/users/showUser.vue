<template>
  <div class="wrap">
    <div class="head">
      <h3>展示用户</h3>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first" style="font-size:26px; font-weight:normal; padding:10px 20px;">用户管理</el-tab-pane>
        <el-tab-pane label="身份数据" name="second" style="font-size:26px; font-weight:normal; padding:10px 20px;">身份数据</el-tab-pane>
        <el-tab-pane label="api接口权限" name="third" style="font-size:26px; font-weight:normal; padding:10px 20px;">api接口权限</el-tab-pane>
        <el-tab-pane label="身份和api接口关系" name="fourth" style="font-size:26px; font-weight:normal; padding:10px 20px;">身份和api接口关系</el-tab-pane>
        <el-tab-pane label="视图接口权限" name="fifth" style="font-size:26px; font-weight:normal; padding:10px 20px;">视图接口权限</el-tab-pane>
        <el-tab-pane label="身份和视图权限关系" name="six" style="font-size:26px; font-weight:normal; padding:10px 20px;">身份和视图权限关系</el-tab-pane>
      </el-tabs>
    </div>
    <div class="content">
      <!-- <h2>用户数据</h2> -->
      <el-table :data="arr" style="width: 100%">
        <el-table-column v-for="(item, i) in apiList[index].tit" :key="i" :prop="item.prop" :label="item.label" />
      </el-table>
    </div>
    <el-pagination background layout="prev, pager, next" style="float:right;margin:20px 0;margin-right:20px 0;" :page-size="10" :total="date.length" @current-change="handleCurrentChange" />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      activeName: 'first',
      index: 0,
      apiList: [
        {
          name: '展示用户',
          id: 0,
          tit: [
            {
              prop: 'user_name',
              label: '用户名'
            },
            {
              prop: 'user_pwd',
              label: '密码'
            },
            {
              prop: 'identity_text',
              label: '用户名'
            }
          ]
        }, {
          name: '身份数据',
          id: 1,
          tit: [
            {
              prop: 'identity_text',
              label: '身份名称'
            }
          ]
        }, {
          name: 'api接口权限',
          id: 2,
          tit: [
            {
              prop: 'api_authority_text',
              label: 'api权限接口'
            },
            {
              prop: 'api_authority_url',
              label: 'api权限url'
            },
            {
              prop: 'api_authority_method',
              label: 'api权限方法'
            }
          ]
        }, {
          name: '身份和api接口关系',
          id: 3,
          tit: [
            {
              prop: 'identity_text',
              label: '身份名称'
            },
            {
              prop: 'api_authority_text',
              label: 'api权限名称'
            },
            {
              prop: 'api_authority_url',
              label: 'api权限url'
            }, {
              prop: 'api_authority_method',
              label: 'api权限方法'
            }
          ]
        }, {
          name: '视图接口权限',
          id: 4,
          tit: [
            {
              prop: 'view_authority_text',
              label: '视图权限名称'
            },
            {
              prop: 'view_id',
              label: '视图id'
            }
          ]
        }, {
          name: '身份和视图权限关系',
          id: 5,
          tit: [
            {
              prop: 'identity_text',
              label: '身份名称'
            },
            {
              prop: 'view_authority_text',
              label: '视图权限名称'
            },
            {
              prop: 'view_id',
              label: '视图id'
            }
          ]
        }
      ],
      currentPage: 1,
      arr: []
    }
  },
  computed: {
    ...mapState({
      date: state => [...state.adduser.dateList]
    })
  },
  async mounted() {
    await this.dateList()
    this.arr = this.date.slice(0, 10)
  },

  methods: {
    ...mapActions({
      dateList: 'adduser/dateList',
      showViewAuth: 'adduser/showViewAuth', // 身份与视图权限信息
      allViewList: 'adduser/allViewList', // 视图接口
      showApiAuth: 'adduser/showApiAuth', // 身份与api接口权限信息
      getApiAuth: 'adduser/getApiAuth', // api接口信息
      getAllIndetity: 'adduser/getAllIndetity' // 身份信息
    }),
    handleCurrentChange(val) {
      this.currentPage = val
      this.arr = this.date.slice((this.currentPage - 1) * 10, this.currentPage * 10)
    },
    async handleClick(tab, event) {
      switch (tab.index) {
        case '0': {
          await this.dateList()
          break
        }
        case '1': {
          await this.getAllIndetity()
          break
        }
        case '2': {
          await this.getApiAuth()
          break
        }
        case '3': {
          await this.showApiAuth()
          break
        }
        case '4': {
          await this.allViewList()
          break
        }
        case '5': {
          await this.showViewAuth()
          break
        }
      }
      this.index = tab.index
      this.arr = this.date.slice(0, 10)
    }
  }
}
</script>
<style scoped>
.wrap .head h3 {
  width:100%;
  height:50px;
  padding-left: 30px;
  box-sizing: border-box;
  font-weight: normal;
  line-height: 50px;
}
.content {
  padding: 0 30px;
  box-sizing: border-box;
}
.content #pane_first {
  font-size: 30px;
  font-weight: normal;
}
</style>
