<template>
  <div class="patch-root">
    <h2>Add Metadata to All Imgs</h2>
    <button v-if="user" @click="addCacheMeta">Add Cache metadata</button><br />
    <div class="status" v-if="isRunning">{{currentName}} ... ({{ progressCount }} / {{ totalCount }})</div>
  </div>
</template>

<style lang="scss" scoped>
button {
  padding: 4px;
  background: white;
  border: 1px solid #678;
  border-radius: 5px;
}
</style>

<script>
import AdminApis from '@/admin/api/AdminApis'

export default {
  data () {
    return {
      user: null,
      progressCount: 0,
      totalCount: 0,
      currentName: '',
      isRunning: false
    }
  },
  async mounted () {
    this.user = await AdminApis.Auth.loginWithGoogle()
  },
  methods: {
    async addCacheMeta () {
      this.isRunning = true
      this.progressCount = 0
      this.currentName = ''
      const imgs = await AdminApis.ImgList.loadImgMetaDataList()
      this.totalCount = imgs.length
      for (let img of imgs) {
        this.currentName = img.filename
        this.progressCount++
        const pathOrg = img.org.path
        const pathThumb = img.thumb.path
        console.log(pathOrg)
        await AdminApis.Uploader.setCacheMeta(pathOrg)
        console.log(pathThumb)
        await AdminApis.Uploader.setCacheMeta(pathThumb)
      }
      this.isRunning = false
      this.progressCount = 0
      this.totalCount = 0
      this.currentName = ''
    }
  }
}
</script>
