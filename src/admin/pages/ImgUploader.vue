<template>
  <div class="imgupload-root">
    <h1>Img Uploader</h1>
    <div class="user-info" v-if="user">
      <div class="info-item">{{ user.displayName }}</div>
      <div class="info-item"><button class="logout-btn" @click="logout">logout</button></div>
    </div>
    <div class="uploder">
      <div class="info-item status">Status: {{ stateMsg }}</div>
      Name: <input type="text" v-model="filename"> <br />
      ** Only required overwrite exists entry **<br />
      <input type="file" class="file" @change="(e) => setUploadFile(e.target.files[0])" />

      <div class="editor" v-if="edittingImgMetaData">
        <div class="edit-item-box thumb-box" v-if="edittingImgMetaData.thumb.url">
          <div class="thumb" :style="{
            backgroundImage: `url(${edittingImgMetaData.thumb.url})`
          }"></div>
        </div>
        <div class="edit-item-box text-box">
          <label>title</label>
          <input class="title-inp" type="text" v-model="edittingImgMetaData.title" /><br />
          <label>description</label>
          <textarea class="description-inp" type="text" v-model="edittingImgMetaData.description" />
        </div>
        <div class="edit-item-box btn-box">
          <button @click="updateMetaData" v-show="isMetaDataPrepared">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  button, input[type="button"] {
    -webkit-appearance: none;
    font-size: 12pt;
    border: 1px solid #369;
    border-radius: 8px;
  }
  .status {
    padding: 10px;
    font-weight: bold;
  }
  .editor {
    padding: 10px 10%;
    display: flex;
    flex-wrap: wrap;
    background-color: #ddeeff30;
    .thumb-box {
      width: 30%;
      padding-right: 10px;
    }
    .text-box {
      width: 70%;
    }
    .btn-box {
      width: 100%;
      padding: 10px;
    }
  }
  .file {
    font-size: 12pt;
    border: 1px solid #369;
    background-color: #def;
    color: #369;
  }
  .thumb {
    width: 100%;
    height: 150px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .title-inp {
    width: 100%;
    display: block;
  }
  .description-inp {
    width: 100%;
    height: 60px;
    display: block;
  }

</style>

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
      stateMsg: 'wait for select file',
      filename: ''
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
      const uploadname = this.filename || null
      const result = await AdminApis.Uploader.uploadImageFile(file, 'default', uploadname)
      this.hasImage = true
      this.filename = ''
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
      this.stateMsg = 'saved; wait for next file'
      this.edittingImgMetaData = null
      this.hasImage = false
      this.isMetaDataPrepared = false
    }
  }
}
</script>
