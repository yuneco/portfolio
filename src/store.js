import Vue from 'vue'
import Vuex from 'vuex'
import Apis from '@/api/Apis'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gallery: {
      imgMetas: []
    }
  },
  mutations: {
    addGalleryMetas (state, { metas }) {
      state.gallery.imgMetas.push(...metas)
    },
    setGalleryMetas (state, { metas }) {
      state.gallery.imgMetas = [...metas]
    }
  },
  actions: {
    async loadGalleryMetas (ctx) {
      const metas = await Apis.ImgList.loadImgMetaDataList()
      ctx.commit('setGalleryMetas', { metas })
    }
  }
})
