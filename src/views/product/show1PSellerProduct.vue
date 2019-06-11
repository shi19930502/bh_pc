<template>
  <div id="productList" class="productList1">
    <shop-header/>
    <shop-search
      @getSellerId="getSellerId"
      :isStore="true"
      @getSearchProList="getSearchProList"
      :showClassify="false"
    />
    <section class="page-title min-width flex flex-x-between flex-y-end">
      <shop-btn
        marginR="0"
        :text="userInfo.userType == '003' && type == '003'?'配送公司':'批发商店铺'"
        height="45px"
        width="228px"
        bgcolor="#CD0011"
        color="#fff"
        border="1px #CD0011"
      ></shop-btn>
      <ul class="flex right">
        <li class="click-a">用户须知</li>
        <li class="click-a">客户登记</li>
      </ul>
    </section>
    <div class="content">
      <div class="min-width flex flex-x-between">
        <div class="right" style="width: 100%;">
          <div class="page-num flex flex-y-center flex-x-between">
            <div class="flex flex-x-between muen-list-bg" id="muen-list">
              <ul class="muen-list flex flex-y-center">
                <li class="active">
                  <span @click="channelChange('')">全部店铺</span>
                </li>
                <li v-for="d in channelList">
                  <span @click="channelChange(d.code)">{{d.name}}</span>
                </li>
              </ul>
              <div style="margin: 15px 20px;width: 250px;">
                <el-input
                  placeholder="搜索店铺"
                  v-model="searchVal"
                  class="input-with-select"
                  size="small"
                >
                  <el-button slot="append" icon="el-icon-search" @click="queryBySearchVal"></el-button>
                </el-input>
              </div>
            </div>
          </div>
          <!-- 一批店铺列表 -->
          <div class="stores">
            <ul class="store-list" v-if="stores.length>0">
              <li v-for="d in stores" class="flex">
                <div class="store-info">
                  <div class="flex">
                    <div class="store-img">
                      <img v-if="d.f_head_pic_url" :src="imgURL+d.f_head_pic_url" alt>
                      <img v-else src="../../../static/img/img_dianpu.png" alt>
                    </div>
                    <div class="flex-item-4">
                      <div class="store-name">{{d.f_store_name}}</div>
                      <p class="store-mainsell">
                        <span>主营：</span>
                        <template v-for="item,index in d.listCategory">
                          <span v-if="index!=d.listCategory.length-1">{{item.name+'、'}}</span>
                          <span v-else>{{item.name}}</span>
                        </template>
                      </p>
                    </div>
                  </div>
                  <div class="store-pingfen">
                    <shop-btn
                      marginR="0"
                      text="信誉评分：5分"
                      height="22px"
                      width="118px"
                      bgcolor="#FF9873"
                      color="#fff"
                      border="1px #FF9873"
                      fontsize="14px"
                    ></shop-btn>
                  </div>
                  <div class="store-text" v-if="d.distatce == 0">距离 -</div>
                  <div
                    class="store-text"
                    v-else-if="d.distatce >= 1000"
                  >距离 {{(d.distatce/1000).toFixed(1)}}km</div>
                  <div class="store-text" v-else>距离 {{(d.distatce).toFixed(0)}}m</div>

                  <div class="store-text">成交 {{d.dealCount}}</div>
                  <div class="store-address flex flex-y-center">
                    <img src="../../../static/img/northring/position.png" alt>
                    <span>地址：{{d.completeAddress}}</span>
                  </div>
                </div>

                <div class="store-products">
                  <template v-if="d.listProSku.length>0">
                    <div
                      :class="d.listProSku.length>=4 ? 'pro-list flex flex-x-between' : 'pro-list flex mr15'"
                    >
                      <div class="pro-item" v-for="item in d.listProSku">
                        <div class="pro-img">
                          <img v-if="item.skuPicUrl" :src="imgURL+item.skuPicUrl" alt>
                          <img v-else src="../../../static/img/my_default_img.png" alt>
                          <div class="muslim" v-if="item.isMuslim == 1">
                            <img src="../../../static/img/northring/qingzhen.jpg" alt="">
                          </div>
                        </div>
                        <template v-if="!isLogin">
                          <div class="pro-price flex flex-y-center">时价</div>
                        </template>
                        <template v-else>
                          <div
                            class="pro-price flex flex-y-center"
                            v-if="item.promotionPrice>0 && item.promotionBasePrice>0"
                          >{{'￥'+item.promotionPrice}}</div>
                          <div class="pro-price flex flex-y-center" v-else>{{'￥'+item.price}}</div>
                        </template>
                        <!-- <div class="pro-price flex flex-y-center">￥1231</div> -->
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div
                      class="flex flex-x-center flex-y-center"
                      style="height: 82%;color: #d1d1d1;"
                    >
                      <div>
                        <img src="../../../static/img/my_default_img.png">
                        <p class="tac">暂无商品</p>
                      </div>
                    </div>
                  </template>

                  <div class="btns flex flex-x-center flex-y-center">
                    <div class="tac flex flex-x-center flex-y-center">
                      <img src="../../../static/img/northring/icon_phone.png" class="icon">
                      <div>
                        <p>联系卖家</p>
                        <p>{{d.f_phone_number}}</p>
                      </div>
                    </div>
                    <div style="width: 1px;height: 30px;background: #fff;"></div>
                    <div
                      class="tac flex flex-x-center flex-y-center"
                      @click="toPersonalBuyStore(d.f_seller_id)"
                    >
                      <img src="../../../static/img/northring/icon_store.png" class="icon">
                      <span>进入店铺</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div
              v-else
              class="flex flex-x-center flex-y-center"
              style="height: 444px;color: #d1d1d1;"
            >
              <div>
                <img src="../../../static/img/my_default_img.png">
                <p class="tac">暂无数据</p>
              </div>
            </div>

            <div class="todays-pagination flex flex-x-end">
              <el-pagination
                background
                small
                layout="total,prev, pager, next,jumper"
                :total="pageTatol"
                @current-change="handleCurrentChange"
                :page-size="pageSize"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <shop-footer></shop-footer>
    <shopcar-modal
      v-if="modalShow"
      :modal="modalShow"
      @close="modalClose"
      :params="modalParams"
      @submitShopCar="submitShopCar"
    ></shopcar-modal>
    <!--加入购物车成功弹出窗-->
    <el-dialog title="添加成功" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
      <shopcar-sumodal @toShoppingCar="toShoppingCar" @closeSuccessModal="closeSuccessModal"></shopcar-sumodal>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ShopTop from "../components/header.vue";
import ShopFooter from "../components/footer.vue";
import Category from "../components/category.vue";
import Search from "../components/search.vue";
import shopcarModal from "./addShopCarModal.vue";
import shopcarSuModal from "./addCarSuccessModal.vue";
import btn from "../components/shopbtn.vue";

import {
  Badge,
  Dialog,
  Select,
  Option,
  Pagination,
  Button,
  Input
} from "element-ui";

import mixin from "../../utils/mixin.js";

export default {
  mixins: [mixin],
  components: {
    [ShopTop.name]: ShopTop,
    [ShopFooter.name]: ShopFooter,
    [shopcarModal.name]: shopcarModal,
    [shopcarSuModal.name]: shopcarSuModal,
    [Search.name]: Search,

    [Badge.name]: Badge,
    [Dialog.name]: Dialog,
    [Category.name]: Category,
    [Select.name]: Select,
    [Option.name]: Option,
    [Pagination.name]: Pagination,
    [btn.name]: btn,
    [Input.name]: Input,
    [Button.name]: Button
  },
  data() {
    return {
      shopTypeName:
        JSON.parse(localStorage.getItem("userInfo")).userType == "003" && this.type == "003"
          ? "配送公司"
          : "批发商店铺",
      dialogTableVisible: false,
      storeInfo: {},
      pageNum: 1,
      searchLoding: false,
      searchVal: "",
      pageNum: 1,
      pageSize: 5,
      pageTatol: 0,
      // 门店客户类型004
      customerProperty: "001",
      stores: [],
      channelCode: "",
      channelList: [],
      type: "001"
    };
  },
  watch: {
    searchVal: "getStoreByChannel"
  },
  created() {
    // this.sellerId = this.$store.getters.selecedSellerInfo.sellerId;
    // this.keyWord = this.$route.query.keyWord;
    // this.$store.state.keyWord = this.keyWord;
    // this.gbgoodsId = "";
    // this.pageSize = 10;
    // this.query1pProduct();
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
    console.log(this.$route.query.userType);
    this.getStoreByChannel();
    this.getChannelList();
  },
  mounted() {
    $(document).on("click", "#muen-list ul li", function() {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
    });
  },
  methods: {
    queryBySearchVal() {
      this.getStoreByChannel();
    },
    /**
     * 获取登录人地址信息
     */
    getUserAddressInfo() {
      return new Promise((resolve, reject) => {
        this.postRequest("address/queryByCustomerId", {
          customerId: this.userInfo.typeCode
        }).then(d => {
          if (d.data && d.data.state == 0) {
            resolve(d.data.aaData);
          }
        });
      });
    },
    /**
     * 获取店铺
     */
    async getStoreByChannel() {
      let param = {
        channelCode: this.channelCode,
        customerProperty:
          this.userInfo.userType == "003" && this.type == "003"
            ? "008"
            : this.customerProperty,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        purchaserId: this.userInfo.typeCode,
        keyWord: this.searchVal
      };
      if (this.userInfo) {
        let AddressInfo = await this.getUserAddressInfo();
        if (AddressInfo) {
          param.latitude = AddressInfo.latitude;
          param.longitude = AddressInfo.longitude;
        }
      }

      this.postRequest("store/getStoreByChannel", param).then(d => {
        if (d.data && d.data.state == 0) {
          if (d.data.aaData) {
            this.stores = d.data.aaData;
            this.pageTatol = d.data.dataCount;
          }
        }
      });
    },
    /**
     * 获取搜索商品
     */
    getSearchProList(keyWord) {
      this.keyWord = keyWord;
      this.gbgoodsId = "";
      this.pageSize = 10;
      this.getSearchProductList();
    },
    /**
     * 获取商品列表
     */
    getSearchProductList() {
      this.searchLoding = true;
      let purl = "product/getProByQuotationForBH";
      let param = {
        purchaserId: this.userInfo.typeCode,
        buyerId: this.userInfo.typeCode,
        supplierId: this.sellerId || "",
        gbgoodsid: this.gbgoodsId,
        keyWord: this.keyWord,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };

      this.getisChoiceSupplier().then(d => {
        if (d == 1) {
          // 能搜索全部渠道的商品
          delete param.supplierId;
        }
        this.postRequest(purl, param).then(resp => {
          this.searchLoding = false;
          if (resp.data && resp.data.state == 0) {
            this.productList = resp.data.aaData;
            this.$store.dispatch("setProductList_AC", resp.data.aaData);
            this.productDataCount = resp.data.dataCount;
          }
        });
      });
    },
    /**
     * 选择商品规格
     */
    addShoppingCar(d, type, isSearch) {
      var param = {
        productId: d.id,
        sellerId: this.sellerId,
        sellerName: this.sellerName,
        type: type
      };
      if (isSearch) {
        param.sellerId = d.customerId;
        param.sellerName = d.createdPersonName;
      }
      this.modalEdit(param);
    },
    /**
     * 提交购物车
     */
    submitShopCar() {
      this.modalClose();
      this.dialogTableVisible = true;
    },
    /**
     * 添加成功提示框跳转购物车
     */
    toShoppingCar() {
      this.$router.push({
        name: "shoppingCar"
      });
    },
    /**
     * 关闭继续购物
     */
    closeSuccessModal() {
      this.dialogTableVisible = false;
    },
    /**
     * 获取id
     */
    getSellerId(params) {
      this.sellerId = params.sellerId;
      this.getSearchProductList();

      //获取店铺
      this.getStore(this.sellerId, d => {
        this.storeInfo = d;
        $(".buytime").html(
          `采购时间${d.distributionStart}:00-${d.distributionEnd}:00`
        );
      });
    },
    /**
     * 商品分页
     */
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getStoreByChannel();
    },
    /**
     * 进入店铺
     */
    toPersonalBuyStore(sellerId) {
      this.$router.push({
        name: "showProductByStore",
        query: {
          sellerId: sellerId,
          type: this.type
        }
      });
    },
    // 查看一批商品
    query1pProduct() {
      this.postRequest("product/query1pProduct", {
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }).then(resp => {
        this.searchLoding = false;
        if (resp.data && resp.data.state == 0) {
          this.productList = resp.data.aaData;
          this.productDataCount = resp.data.dataCount;
        }
      });
    },
    /**
     * 获取渠道
     */
    getChannelList() {
      this.postRequest("channel/list", {
        level: 3
      }).then(d => {
        if (d.data && d.data.state == 0) {
          if (d.data.aaData) {
            this.channelList = d.data.aaData;
          }
        }
      });
    },
    /**
     * 改变渠道
     */
    channelChange(channelCode) {
      this.channelCode = channelCode;
      this.pageNum = 1;
      this.getStoreByChannel();
    }
  }
};
</script>

<style lang="scss">
@import "../northviews/styles/store-list.scss";
@import "../../assets/css/productList.scss";
.productList1 {
  .muen-list-bg {
    width: 100%;
    background: #fff;
    border: 1px solid #ddd;
  }
  ul.muen-list {
    // height: 54px;
    font-size: 14px;
    li {
      padding: 0 20px;
      span {
        padding: 2px 10px;
        cursor: pointer;
      }
    }
    li.active {
      span {
        background: #ff4400;
        color: #fff;
      }
    }
  }
  #shop-btn {
    font-weight: 600;
  }
  ul.right {
    font-size: 16px;
    color: #999;
    li {
      padding: 17px 15px;
      cursor: pointer;
    }
  }
  ul#searchList {
    padding-top: 0;
    li {
      height: 280px !important;
      margin-right: 15px;
      margin-bottom: 15px;
    }
    li:nth-child(5n) {
      margin-right: 0;
    }
  }
  .stores {
    .todays-pagination {
      padding: 20px;
      background: #fff;
      border: 1px solid #ddd;
      margin: 20px 0 0;
    }
  }
}
</style>