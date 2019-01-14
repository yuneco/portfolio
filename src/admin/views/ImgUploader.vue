<template>
  <div class="imgupload-root">
    <h1>Admin Page</h1>
    <div class="user-info" v-if="user">
      <div class="info-item">{{ user.uid }}</div>
      <div class="info-item">{{ user.displayName }}</div>
      <div class="info-item"><button class="logout-btn" @click="logout">logout</button></div>
    </div>
    <div class="uploder">
      <h2>Upload</h2>
      <div class="info-item">{{ stateMsg }}</div>
      <input type="file" class="file" @change="(e) => setUploadFile(e.target.files[0])" />
      <div class="editor" v-if="edittingImgMetaData">
        <img :src="edittingImgMetaData.thumb.url" v-if="edittingImgMetaData.thumb.url" alt="">
        <input type="text" v-model="edittingImgMetaData.title" /><br />
        <textarea type="text" v-model="edittingImgMetaData.description" />
        <button @click="updateMetaData" v-show="isMetaDataPrepared">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import AdminApis from '@/admin/api/AdminApis'

export default {
  name: 'ImgUploaderView',
  components: { },
  data () {
    return {
      user: null,
      hasImage: false,
      edittingImgMetaData: null,
      isMetaDataPrepared: false,
      stateMsg: 'wait for select file'
    }
  },
  async mounted () {
    this.user = await AdminApis.Auth.loginWithGoogle()
  },
  methods: {
    async logout () {
      await AdminApis.Auth.logout()
      this.$router.push('/')
    },
    async setUploadFile (file) {
      if (!file) { return }
      this.edittingImgMetaData = null
      this.isMetaDataPrepared = false

      this.stateMsg = 'uploading...'
      const result = await AdminApis.Uploader.uploadImageFile(file)
      this.hasImage = true
      this.stateMsg = 'loading metadata...'
      const metaData = await AdminApis.ImgList.loadImgMetaDataByName(result.name, true)
      console.log(metaData)
      this.edittingImgMetaData = metaData
      const orgPath = metaData.org.path
      const thumbPath = metaData.thumb.path
      this.stateMsg = 'creating img url...'
      metaData.thumb.url = await AdminApis.Uploader.getUrlFromPath(thumbPath)
      metaData.org.url = await AdminApis.Uploader.getUrlFromPath(orgPath)

      this.stateMsg = 'analize color'
      const colset = await AdminApis.Analizer.getColorsetFromUrl(metaData.thumb.url)
      metaData.colors.main = '#' + colset.colors[0].map(v => Math.round(v).toString(16).padStart(2, '0')).join('')
      metaData.colors.colorset = colset

      this.stateMsg = 'prepared'
      this.isMetaDataPrepared = true
    },
    async updateMetaData () {
      this.stateMsg = 'saving metadata'
      await AdminApis.ImgList.updateImageMetaData(this.edittingImgMetaData)
      this.stateMsg = 'metadata saved'
    }
  }
}
</script>
