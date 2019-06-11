<template>
  <div class="shop-bottom">
    <div class="min-width">
      <ul class="slogans flex flex-x-between flex-y-center">
        <li class="flex flex-y-center flex-x-center">
          <img src="../../../static/img/icon_baozheng_small.png" />
          <span>食品安全保障</span>
        </li>
        <li class="flex flex-y-center flex-x-center">
          <img src="../../../static/img/icon-wuliu_small.png" />
          <span>专业物流配送</span>
        </li>
        <li class="flex flex-y-center flex-x-center">
          <img src="../../../static/img/iconz-xiadan_samll.png" />
          <span>便捷在线下单</span>
        </li>
        <li class="flex flex-y-center flex-x-center">
          <img src="../../../static/img/icon-zhineng_small.png" />
          <span>智能硬件支持</span>
        </li>
      </ul>
      <div class="contact flex flex-x-center">
        <div class="contact-left flex">
          <div class="QRcode" style="margin-right: 0;">
            <img src="../../../static/img/login_img_erweima.png" />
            <p>微信公众号</p>
          </div>
        </div>
      </div>
      <p class="copyright">宁夏农鲜汇农业科技发展有限公司</p>
      <p class="copyright">版权所有</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shop-footer',
    props: {

    },
    data() {
      return {

      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      toReg() {
        this.$router.push({
          name: 'reg'
        })
      },
      tofeedback() {
        this.$router.push({
          name: 'feedback'
        })
      },
      toContactService() {
        this.$router.push({
          name: 'contactService'
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/footer.scss'
</style>
