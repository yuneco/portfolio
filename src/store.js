import Vue from 'vue'
import Vuex from 'vuex'
import Apis from '@/api/Apis'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    common: {
      colors: []
    },
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
    },
    setAppColors (state, { colors }) {
      state.common.colors = []
      if (colors && colors.length >= 5) {
        state.common.colors.push(...colors)
      }
    }
  },
  actions: {
    async loadGalleryMetas (ctx) {
      const metas = await Apis.ImgList.loadImgMetaDataList()
      ctx.commit('setGalleryMetas', { metas })
    }
  }
})
