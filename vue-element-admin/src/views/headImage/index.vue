<template>
  <div>
    <pan-thumb :image="info.avatar || image" />
    <el-button type="primary" icon="upload" style="margin-left: 40px;" @click="imagecropperShow=true">
      修改头像
    </el-button>
    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="https://service.jasonandjay.com/upload"
      method="post"
      lang-type="en"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>
<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AvatarUploadDemo',
  components: { ImageCropper, PanThumb },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
    }
  },
  computed: {
    ...mapState({
      info: state => state.user.userInfo
    })
  },
  created() {
    this.getInfo()
  },
  methods: {
    ...mapActions({
      updateInfo: 'adduser/changeMes',
      getInfo: 'user/getInfo'
    }),
    async cropSuccess(e) {
      this.imagecropperShow = false
      await this.updateInfo({ user_id: this.info.user_id, avatar: e[0].path })
      await this.getInfo()
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>
