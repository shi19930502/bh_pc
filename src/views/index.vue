<template>
  <div id="index-page">
    <shop-header />
    <shop-search @getSellerId="getSellerId" :isStore="true" :showClassify="false" />

    <!--主体-->
    <section class="shop-content">
      <div class="shop-product flex flex-x-between min-width">
        <div class="left">
          <shop-category />
        </div>
        <div class="center">
          <div class="banner">
            <img src="../../static/img/northring/home_babner.png" />
          </div>
          <div class="slogan">
            <ul class="flex flex-x-between flex-y-center">
              <li>
                <img src="../../static/img/icon_baozheng.png" />
                <div>食品安全保障</div>
              </li>
              <li>
                <img src="../../static/img/icon-wuliu.png" />
                <div>专业物流配送</div>
              </li>
              <li>
                <img src="../../static/img/iconz-xiadan.png" />
                <div>便捷在线下单</div>
              </li>
              <li>
                <img src="../../static/img/icon-zhineng.png" />
                <div>智能硬件支持</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="right">
          <div class="system-bulletin">
            <div class="flex flex-x-center" style="padding: 20px; 0">
              <strong>—</strong>
              <strong class="title-text">
                <span>系统公告</span>
              </strong>
              <strong>—</strong>
            </div>
            <ul v-if="megList.length>0">
              <li class="ellipsis" v-for="d in megList" @click="toReadMsg(d)">{{d.title}}</li>
            </ul>
            <div v-else class="tac">暂无公告</div>
          </div>
          <div class="new-order">
            <div class="flex flex-x-center" style="padding: 20px 0 10px">
              <strong>—</strong>
              <strong class="title-text">最新订单</strong>
              <strong>—</strong>
            </div>
            <template v-if="newestOrder.sellerName">
              <div class="store-name">{{newestOrder.sellerName}}</div>
              <div class="pro" v-if="newestOrder.orderitemList">
                <p class="pro-status">
                  <strong>{{newestOrder.orderStatusName}}</strong>
                </p>
                <img v-if="newestOrder.orderitemList[0].productPicUrl" :src="imgURL+newestOrder.orderitemList[0].productPicUrl" />
                <img v-else src="../../static/img/my_default_img.png" />
                <p class="pro-name">{{newestOrder.orderitemList[0].productName}}</p>
                <p class="pro-price">{{'￥'+newestOrder.orderitemList[0].price/100}}</p>
              </div>
              <div class="price">总计:{{'￥'+newestOrder.orderTotal/100}}</div>
              <div class="enterbtn" @click="findOrderDetails(newestOrder.id,newestOrder.orderUmber)">进入></div>
            </template>
            <div v-else>暂无订单</div>
          </div>
        </div>
        <!-- <div class="yezi"></div> -->
      </div>
    </section>
    <!--促销活动-->
    <section class="sales-promotion" v-show="activeList.length>0">
      <div class="promotion-title-bg">
        <div class="min-width flex flex-y-center">
          <img src="../../static/img/northring/cxhd.png" alt="">
          <div class="sales-list">
            <ul class="flex flex-y-center">
              <template v-for="d,index in activeList">
                <li @click="changeActivePro(d)" :class="d.active ? 'active flex flex-y-center':'flex flex-y-center'">
                  <!-- <div class="radio-box"></div> -->
                  <div>
                    <p>{{d.promotionTitle}}</p>
                    <p>{{d.endDate.split(' ')[0]+'结束'}}</p>
                  </div>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>

      <div class="min-width">
        <div class="promotion-content flex">
          <div class="left">
            <div class="cxhd"></div>
            <p>距离活动结束还剩</p>
            <div class="data-show-box">
              <span class="date-tiem-span d">{{djs_d}}</span>天
              <span class="date-tiem-span h">{{djs_h}}</span>时
              <span class="date-tiem-span m">{{djs_m}}</span>分
              <span class="date-s-span s">{{djs_s}}</span>秒
            </div>
          </div>
          <div class="right">
            <ul class="promotion-pro-list flex">
              <li v-for="d in ActiveProduct">
                <div class="item">
                  <div class="pro-price flex">
                    <p class="p1">{{'￥'+d.skuPriceTemp}}</p>
                    <p class="p2">{{'￥'+d.price}}</p>
                  </div>
                  <div class="pro-img">
                    <img v-if="d.skuPicUrl" :src="imgURL+d.skuPicUrl" />
                    <img v-else src="../../static/img/my_default_img.png" />
                  </div>
                  <div class="pro-name">{{d.name}}</div>
                  <div class="addbtn" @click="createShippingcarBySku(d)">
                    <shop-btn width="100%" bgcolor="#FF4400" border="1px #FF4400" color="#fff" text="加入购物车"></shop-btn>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <!--新品上市-->
    <section class="new-product" v-show="NewUpProduct.length>0">
      <div class="min-width">
        <div class="newtitle flex flex-x-between flex-y-center">
          <div class="img-line"></div>
          <div class="newtitle-text">新品上市</div>
          <div class="img-line"></div>
        </div>
        <ul class="newprolist flex flex-x-between">
          <li v-for="d in NewUpProduct">
            <div class="item flex">
              <div class="pro-img">
                <img v-if="d.skuPicUrl" :src="imgURL+d.skuPicUrl">
                <img v-else src="../../static/img/my_default_img.png">
              </div>
              <div class="pro-info">
                <div class="pro-name ellipsis">{{d.name}}</div>
                <!-- <div class="pro-ms ellipsis">{{d.createdPersonName}}</div> -->
                <div class="pro-sj">上新时间</div>
                <div>{{d.createdDate}}</div>
              </div>
            </div>
            <div class="pro-btns flex">
              <div class="pro-price flex flex-x-center flex-y-center">热销价：￥{{d.price}}</div>
              <div class="pro-addcar flex flex-x-center flex-y-center" @click="createShippingcarBySku(d)">
                <img src="../../static/img/northring/icon_shop.png">
                <span>加入购物车</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <!--热卖商品-->
    <section class="hot-product"  v-show="NewUpProduct.length>0">
      <div class="min-width">
        <div class="newtitle flex flex-x-between flex-y-center">
          <div class="img-line"></div>
          <div class="newtitle-text">热卖商品</div>
          <div class="img-line"></div>
        </div>
        <ul class="hotprolist flex">
          <li v-for="d in hotProduct">
						<div class="addbtn" @click="createShippingcarBySku(d)">
							<shop-btn width="100%" bgcolor="#FF4400" border="1px #FF4400" color="#fff" text="加入购物车"></shop-btn>
						</div>
            <div class="item">
              <div class="pro-img">
								<img v-if="d.skuPicUrl" :src="imgURL+d.skuPicUrl">
								<img v-else src="../../static/img/my_default_img.png">
							</div>
              <div class="pro-name ellipsis">{{d.name}}</div>
              <div class="pro-pri">￥{{d.price}}</div>
            </div>
          </li>
        </ul>
      </div>
    </section>


    <shop-footer />
  </div>
</template>

<script>
  import ShopTop from './components/header.vue'
  import ShopFooter from './components/footer.vue'
  import Category from './components/category.vue'
  import Search from './components/search.vue'
  import btn from './components/shopbtn.vue'
  import '../utils/leftTime.min.js'

  import {
    Badge,
    Select,
    Option
  } from 'element-ui'

  import mixin from '../utils/mixin.js'
  export default {
    mixins: [mixin],
    components: {
      [ShopTop.name]: ShopTop,
      [ShopFooter.name]: ShopFooter,

      [Category.name]: Category,
      [Search.name]: Search,

      [Badge.name]: Badge,
      [Select.name]: Select,
      [Option.name]: Option,
      [btn.name]: btn,


    },
    data() {
      return {
        newestOrder: {},
        NewUpProduct: [],
        hotProduct: [],
        sellerId: '',
        ActiveProduct: [],
        activeList: [],
        djs_s: '00',
        djs_m: '00',
        djs_h: '00',
        djs_d: '00',
        active_endTime: '',
        clearTime: null
      }
    },
    created() {
      this.getUserMessage()
      this.getnewestOrder()
      // this.getNewUpProduct()
    },
    mounted() {

    },
    methods: {
      /**
       * 查看订单详情
       */
      findOrderDetails(orderId, orderUmber) {
        this.$router.push({
          name: 'orderDetails',
          query: {
            orderId: orderId,
            orderUmber: orderUmber
          }
        })
      },
      /**
       * 最新采购
       */
      getnewestOrder() {
        this.postRequest('order/listByUser', {
          pageNum: 1,
          pageSize: 5,
          orderField: 'f_created_date desc'
        }).then(resp => {
          if (resp.data && resp.data.state == 0) {
            if (resp.data.aaData.length > 0) {
              this.newestOrder = resp.data.aaData[0]
              if (this.newestOrder.orderitemList) {
                this.newestOrder.sl = this.newestOrder.orderitemList.length
              }
            }
          }
        })
      },
      /**
       * 获取促销商品
       */
      getActiveProduct(promotionId) {
        this.postRequest('productsku/getSkuByPromotion', {
          purchaserId: this.userInfo.typeCode,
          supplierId: this.sellerId,
          pageNum: 1,
          pageSize: 5,
          promotionId: promotionId
        }).then(resp => {
          if (resp.data && resp.data.state == 0) {
            this.ActiveProduct = resp.data.aaData
          }
        })
      },
      /**
       * 获取最新上架
       */
      getNewUpProduct(sellerId) {
        this.postRequest('productsku/getSkuByQuotation', {
          pageNum: 1,
          pageSize: 12,
          purchaserId: this.userInfo.typeCode,
          supplierId: sellerId,
          orderField: 'f_created_date'
        }).then(resp => {
          if (resp.data && resp.data.state == 0) {
            var NewUpProduct = []
            for (let i = 0; i < 3; i++) { // 新品商品获取前三天数据
              NewUpProduct.push(resp.data.aaData[i])
            }
            this.NewUpProduct = NewUpProduct
            this.hotProduct = resp.data.aaData
          }
        })
      },
      /**
       * 获取id
       */
      getSellerId(params) {
        this.sellerId = params.sellerId
        window.clearInterval(this.clearTime);
        this.getPromotionList(this.sellerId)
        this.getNewUpProduct(this.sellerId)
      },
      /**
       * 获取促销活动
       */
      getPromotionList(sellerId) {
        this.postRequest('promotion/queryListByBuyerId', {
          pageNum: 1,
          pageSize: 4,
          sellerId: sellerId,
          buyerId: this.userInfo.typeCode
        }).then(resp => {
          if (resp.data && resp.data.state == 0) {
            if (resp.data.aaData.length > 0) {

              for (var i in resp.data.aaData) {
                if (i == 0) {
                  resp.data.aaData[i].active = true
                } else {
                  resp.data.aaData[i].active = false
                }
              }

              this.activeList = resp.data.aaData
              setTimeout(() => {
                this.getActiveProduct(this.activeList[0].id)
              }, 100)

              this.active_endTime = this.activeList[0].endDate.replace(/-/g, '/')
              // 倒计时
              this.clearTime = $.leftTime(this.active_endTime, (d) => {
                if (d.status) {
                  this.djs_s = d.s
                  this.djs_m = d.m
                  this.djs_h = d.h
                  this.djs_d = d.d
                }
              });
            }
          }
        })
      },
      /**
       * 切换促销活动
       */
      changeActivePro(d) {
        window.clearInterval(this.clearTime);

        for (var i of this.activeList) {
          i.active = false
        }
        if (!d.active) {
          d.active = true
        }
        this.getActiveProduct(d.id)

        this.active_endTime = d.endDate.replace(/-/g, '/')

        // 倒计时
        this.clearTime = $.leftTime(this.active_endTime, (d) => {
          if (d.status) {
            this.djs_s = d.s
            this.djs_m = d.m
            this.djs_h = d.h
            this.djs_d = d.d
          }
        });

      },
      /**
       * 读取消息
       */
      toReadMsg(param) {
        this.$router.push({
          name: 'message',
          query: {
            id: param.id
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/index.scss';
  .data-show-box {
    margin-top: 30px;
    line-height: 30px;
    .date-tiem-span,
    .date-s-span {
      display: inline-block;
      font-size: 20px; // padding: 0 10px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      border-radius: 5px;
    }
    .date-tiem-span {
      background: #333;
    }
    .date-s-span {
      background: #fff;
      color: #000;
    }
  }
</style>
