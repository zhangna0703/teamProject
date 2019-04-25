<template>
  <div class="layout" style="padding: 0px 24px 24px;">
    <h2 style="padding: 20px 0px; margin-top: 10px;">教室管理</h2>
    <div class="layout-content">
      <el-button type="primary" class="button" @click="dialogFormVisible = true">+添加教室</el-button>
      <el-table :data="allRoom.roomarr" style="width: 100%">
        <el-table-column label="姓名" width="695">
          <template slot-scope="scope">
            {{ scope.row.room_text }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="open2(scope.row.room_id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加教室" :visible.sync="dialogFormVisible" width="520px" height="317px">
      <el-form :model="form">
        <el-form-item label="教室号" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="教室号" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    ...mapState({
      allRoom: state => state.classes,
      roomId: state => state.classes.roomId
    })
  },
  created() {
    this.room()
  },
  methods: {
    ...mapActions({
      room: 'classes/allRoom',
      allAddroom: 'classes/allAddroom',
      deletecurrent: 'classes/deleteroom'
    }),
    async sure() {
      this.dialogFormVisible = false
      await this.allAddroom({ room_text: this.form.name })
      await this.room()
    },
    open2(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.deletecurrent({ room_id: id })
        this.room()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
  .chart-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
  }
  .layout {
    display: flex;
    flex-direction: column;
    flex: auto;
    background: #f0f2f5;
    min-height: 0;
  }
  thead{
    color: rgba(0, 0, 0, 0.85)!important;
    background: #f0f2f5!important;
    font-weight: 100!important;
  }
  h2{
      margin-top: 0;
      margin-bottom: 0.5em;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
  }
  .layout-content {
      flex: auto;
      min-height: 0;
      box-sizing: border-box;
  }
  .layout-content {
      flex: auto;
      min-height: 0;
      background: rgb(255, 255, 255);
      padding: 24px;
      margin: 0px 0px 20px;
      border-radius: 10px;
  }
  .button{
    display: flex;
    background: #0139fd;
    margin-bottom: 15px;
  }
  .table{
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }
</style>

