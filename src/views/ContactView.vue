<template>
  <div class="contact-view">
    <h1 class="page-title">contact me</h1>
    <transition appear name="slide">
      <mail-form ref="mailform" :status="formStatus" @send="sendMessage" @back="backToWrite"></mail-form>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 1000ms;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateY(80px);
}
.contact-view{
  padding: 0 30px;
}
.page-title {
  margin: 20px 0 0 0;
}
</style>

<script>
import Apis from '@/api/Apis'
import MailForm from '@/components/MailForm.vue'

export default {
  name: 'ContactView',
  components: { MailForm },
  data () {
    return {
      formStatus: 'writing'
    }
  },
  methods: {
    async sendMessage (mail) {
      this.formStatus = 'sending'
      try {
        await Apis.Contact.sendMessage(
          mail.subject,
          mail.name,
          mail.company,
          mail.mailAddr,
          mail.message)
      } catch (err) {
        this.formStatus = 'senderror'
        console.warn('メール送信に失敗しました', err)
        return
      }
      this.formStatus = 'sent'
    },
    backToWrite () {
      if (this.formStatus === 'sent') {
        this.$refs.mailform.reset()
      }
      this.formStatus = 'writing'
    }
  }
}
</script>
