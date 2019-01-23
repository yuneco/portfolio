<template>
  <div class="mail-form-root">

    <div class="block-writing" v-show="isWriting || isSendFailed">
      <div class="info">
        ご質問・ご感想・お仕事のご相談等、お気軽にお寄せください。<br />
        <a class="tw-link" href="https://twitter.com/yuneco" target="_blank">twitter @yuneco</a>でもご連絡お待ちしております。
      </div>
      <div class="items">
        <div class="item">
          <label class="required">お名前</label>
          <input type="text" name="name" class="name" v-model="mail.name" />
        </div>
        <div class="item">
          <label class="">会社名</label>
          <input type="text" name="company" class="company" v-model="mail.company" />
        </div>
        <div class="item">
          <label class="required">メールアドレス</label>
          <input type="email" name="email" class="mail" v-model="mail.mailAddr" />
        </div>
        <div class="item">
          <label class="required">お問い合わせ内容</label>
          <textarea type="text" name="message" class="message" v-model="mail.message"></textarea>
        </div>
      </div>
      <div class="buttons submit">
        <button @click="onSendButtonClicked" :disabled="!formFullfilled" :class="{
          disabled: !formFullfilled
        }">SEND</button>
      </div>
    </div>

    <div class="block-sending" v-show="isSending">
      <div class="loading">
        <loading-bar></loading-bar>
      </div>
      <div class="sending-info">
        送信中...
      </div>
    </div>

    <div class="block-sent" v-show="isSent || isSendFailed">
      <div class="send-ok-info" v-if="isSent">
        送信しました。<br />
      </div>
      <div class="send-error-info" v-if="isSendFailed">
        メール送信に失敗しました。お手数ですが {{ altMailAddr }} まで直接ご連絡ください。
      </div>

      <div class="items">
        <div class="item">
          <p class="label">お名前</p>
          <p class="content name">
            {{ mail.name }}
          </p>
        </div>
        <div class="item">
          <p class="label">会社名</p>
          <p class="content company">
            {{ mail.company }}
          </p>
        </div>
        <div class="item">
          <p class="label">メールアドレス</p>
          <p class="content mail">
            {{ mail.mailAddr }}
          </p>
        </div>
        <div class="item">
          <p class="label">お問い合わせ内容</p>
          <p class="content message">
            {{ mail.message }}
          </p>
        </div>
      </div>
      <div class="buttons">
        <button @click="onBackButtonClicked">BACK</button>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.mail-form-root {
  margin: 10px auto;
  padding: 20px 0;
  max-width: 500px;
  background-color: #eafdffad;
  box-shadow: 0px 0px 80px -4px rgba(16, 39, 59, 0.783);
  color: #133344;
  transition: height 1s ease;
  .image {
    position: relative;
    width: 100%;
    height: 60px;
    background-image: url(/img/contact.jpg);
    background-position: top left;
    background-repeat: no-repeat;
    background-size: cover;
    .title {
      position: absolute;
      width: 100%;
      line-height: 40px;
      bottom: 0;
      text-align: right;
      color: #ddeeff50;
      font-size: 40pt;
      font-weight: bold;
      overflow: hidden;
    }
  }
  h1 {
    padding-top: 15px;
  }
  .info {
    text-align: center;
    font-size: 11pt;
    padding: 0 15px;
  }
  .tw-link {
     color: #133344;
     font-weight: bold;
  }
  .items {
    padding: 20px;
    .item {
      padding: 10px 20px;

      width: 100%;
      text-align: left;
      label {
        margin-bottom: 5px;
        letter-spacing: 0.2em;
        font-size: 11pt;
        &.required::after {
          content: '＊必須';
          color: rgb(201, 69, 126);
          font-weight: bold;
          font-size: 9pt;
        }
      }
      input[type="text"], input[type="email"], textarea {
        display: block;
        width: 100%;
        font-size: 14pt;
        outline: none;
        border: 1px solid #678;
        background-color: #ffffffdd;
        padding: 4px;
        box-shadow: inset 0px 0px 2px 0px rgba(16, 39, 59, 0.783);
      }
      textarea {
        height: 120px;
        min-height: 60px;
        max-height: 240px;
        font-size: 11pt;
        resize: vertical;
      }
    }
  }
  .buttons {
    text-align: center;
    padding-bottom: 25px;
    button {
      font-size: 13pt;
      background-color: #a3cdda;
      border: 1px solid #133344;
      padding: 5px 30px;
      box-shadow: 0px 0px 14px 0px rgba(16, 39, 59, 0.283);
      &.disabled {
        background-color: #ced4d8;
        border: 1px solid #133344;
        color: #678;
      }
    }
  }
  .loading {
    position: relative;
    height: 60px;
  }
  .sending-info {
    font-size: 14pt;
    font-weight: bold;
  }
  .send-ok-info {
    font-size: 14pt;
    font-weight: bold;
  }
  .send-error-info {
    font-size: 14pt;
    font-weight: bold;
    color: rgb(109, 23, 43);
  }
}
</style>

<script>
import LoadingBar from '@/components/LoadingBar'

const STATUS_WRITING = 'writing'
const STATUS_SENDING = 'sending'
const STATUS_SENT = 'sent'
const STATUS_SENDERROR = 'senderror'

export default {
  name: 'MailForm',
  components: { LoadingBar },
  props: {
    status: { type: String, default: STATUS_WRITING }
  },
  data () {
    return {
      mail: {
        subject: 'Contact',
        name: '',
        company: '',
        mailAddr: '',
        message: ''
      },
      altMailAddr: 'yukiyuneco@gmail.com'
    }
  },
  computed: {
    formFullfilled () {
      return this.mail.name && this.mail.mailAddr && this.mail.message
    },
    isSending () {
      return this.status === STATUS_SENDING
    },
    isWriting () {
      return this.status === STATUS_WRITING
    },
    isSent () {
      return this.status === STATUS_SENT
    },
    isSendFailed () {
      return this.status === STATUS_SENDERROR
    }
  },
  mounted () {
    // console.log(this.$el.offsetHeight)
  },
  methods: {
    onSendButtonClicked () {
      this.$emit('send', this.mail)
    },
    onBackButtonClicked () {
      this.$emit('back', this.mail)
    },
    reset () {
      this.mail.subject = 'Contact'
      this.mail.name = ''
      this.mail.company = ''
      this.mail.mailAddr = ''
      this.mail.message = ''
    }
  }
}
</script>
