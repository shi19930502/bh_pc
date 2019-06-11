<template>
  <div id="shop-search">
    <!--搜索-->
    <section class="shop-search flex flex-y-center">
      <div class="min-width">
        <ul class="flex flex-x-between">
          <li class="logo flex flex-y-end">
            <div class="logoimg" @click="toIndex">
              <img src="../../../static/img/northring/logo_new.png" />
            </div>
            <strong>{{pageName}}</strong>
          </li>
          <li class="search flex">
            <div class="search-box">
              <div class="flex flex-y-center">
                <input type="text" placeholder="请输入商品关键字" v-model="keyWord" @keyup.enter="searchBykeywrod('all')" />
                <span class="searchtn" @click="searchBykeywrod('all')">搜索</span>
                <!--<span class="searchtn" @click="searchBykeywrod('local')" style="background: #222;" v-show="isStore">搜本店</span>-->
              </div>
              <div class="pros">
                <template v-for="d in keyWordList">
                  <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
                    <span class="ellipsis">{{d.f_name}}</span>
                  </el-tooltip>
                </template>
              </div>
            </div>
            <div class="btns flex">
              <!-- <el-badge :value="shippingcarCount" class="item" v-show="!isCarPage"> -->
              <el-badge :value="shippingcarCount" class="item">
                <div class="carbtn flex flex-y-center flex-x-center" @click="toShopCar">
                  <img src="../../../static/img/home_icon_shop.png" />
                  <span>我的购物车</span>
                </div>
              </el-badge>
              <!-- <div v-show="isCarPage" class="carbtn flex flex-y-center flex-x-center" @click="toProductList">
                <img src="../../../static/img/home_icon_shop.png" />
                <span>继续购物</span>
              </div> -->
              <div class="userbtn flex flex-y-center flex-x-center" @click="toUserCenter">
                <img src="../../../static/img/icon-home_mine.png" />
                <span>个人中心</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <!--分类头-->
    <section :class="showClassify?'shop-classify-title':'shop-classify-title hide'">
      <ul class="flex flex-x-between min-width">
        <li class="flex flex-x-between">
          <div v-if="searchScope == 'all'" class="classify-title flex flex-y-center flex-x-center">全部供应商产品</div>
          <div v-if="searchScope == 'local'" class="classify-title flex flex-y-center flex-x-center">{{sellerName || '供应商'}}产品</div>
          <div v-if="searchScope== undefined" class="classify-title flex flex-y-center flex-x-center">{{sellerName || '全部供应商'}}产品分类</div>

          <div class="choosegys flex flex-y-center" v-show="searchScope != 'all'">
            <el-select v-model="sellerId" placeholder="选择供应商" @change="sellerChange">
              <el-option v-for="item,index in sellerList" :key="index" :label="item.sellerName" :value="item.sellerId">
              </el-option>
            </el-select>
          </div>
        </li>
        <li class="logo flex flex-y-center" v-if="sellerId=='' || searchScope=='all'">
          <img src="../../../static/img/slog.png" />
        </li>
        <li class="storeinf flex flex-y-center" v-if="sellerId !='' && searchScope != 'all'">
          <div class="flex flex-y-center">
            <span style="padding-right: 5px;" class="click-a" @click="toevalist">信誉等级</span>
            <el-rate v-model="reputationVal" disabled></el-rate>
            <span class="score">{{reputationLevel}}</span>
          </div>
          <div class="lxmj flex flex-y-center">
            <img src="../../../static/img/home_icon_phone.png" class="icon" />
            <span>联系卖家</span>
          </div>
          <!-- <div class="flex flex-y-center">
            <img src="../../../static/img/home_icon_shoucang.png" class="icon" />
            <span>收藏店铺</span>
          </div> -->
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
  import mixin from '../../utils/mixin.js'
  import {
    mapGetters
  } from 'vuex'
  import {
    Popover,
    Select,
    Option,
    Badge,
    Rate,
    Tooltip
  } from 'element-ui'
  export default {
    name: 'shop-search',
    components: {
      [Popover.name]: Popover,
      [Badge.name]: Badge,
      [Select.name]: Select,
      [Option.name]: Option,
      [Rate.name]: Rate,
      [Tooltip.name]: Tooltip

    },
    props: {
      showClassify: {
        default: true
      },
      isCarPage: {
        default: false
      },
      pageName: {
        default: ''
      },
      isStore: {
        default: false
      }
    },
    mixins: [mixin],
    computed: mapGetters({
      shippingcarCount: 'shippingcarCount'
    }),
    data() {
      return {
        keyWord: this.$store.state.keyWord,
        keyWordList: [],
        searchScope: ''
      }
    },
    watch: {
      keyWord: 'setkeywrodValue'
    },
    created() {
      // if(this.showClassify) {塞上北环不显示供应商列表
      //       this.getSellers()
      //     this.getReputation(this.sellerId)
      // }
      // 获取购物车数量
			if(this.isLogin){
				this.getShopCarCount()
				this.queryCustomerAnalysisMap()
			}
      // this.getShopCarCount()
      // this.queryCustomerAnalysisMap()
      // 获取搜索范围
      this.searchScope = this.$route.query.scope
    },
    methods: {
      /**
       * 获取搜索记录关键字
       */
      queryCustomerAnalysisMap() {
        this.postRequest('customer/queryCustomerAnalysisMap', {
          buyerId: this.userInfo.typeCode,
          sellerId: 201,
          startDate: this.GetDateStr(-30).date,
          endDate: this.GetDateStr(0).date,
        }).then(d => {
          if (d.data.aaData) {
            this.keyWordList = d.data.aaData.productDate.aaData
          }
        })
      },
      searchBykeywrod(scope) {
        this.$store.state.keyWord = this.keyWord
        this.searchScope = scope
        if (this.$route.name == 'search') {
          this.$emit('getSearchProList', this.keyWord)
        }
        this.$router.push({
          name: 'search',
          query: {
            keyWord: this.keyWord,
            scope: scope
          }
        })
      },
      setkeywrodValue() {
        this.$store.state.keyWord = this.keyWord
      },
      toevalist() {
        this.getStore(this.sellerId, (d) => {
          this.$router.push({
            name: 'evaluationList',
            query: {
              storeId: d.id
            }
          })
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/css/search.scss'
</style>
