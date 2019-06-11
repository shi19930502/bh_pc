<template>
  <div id="productList">
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
        :text="userInfo.userType == '003'?'农鲜汇自营平台':'批发中心'"
        height="45px"
        width="228px"
        bgcolor="#CD0011"
        color="#fff"
        border="1px #CD0011"
      ></shop-btn>
      <ul class="flex right">
        <li class="click-a">用户须知</li>
        <li class="click-a">客户登记</li>
        <!-- <li class="click-a" v-if="userInfo.userType == '003'||userInfo.userType == '004'||userInfo.userType == '002'||userInfo.userType == '008'" @click="toSearch_1p()">批发商店铺</li> -->
        <!-- 团采购买配送公司 -->
        <!-- <li class="click-a" v-if="userInfo.userType == '003'" @click="toSearch_1p('003')">配送公司</li> -->
      </ul>
    </section>
    <div class="content">
      <div class="min-width flex flex-x-between">
        <!--商品显示区-->
        <div class="right" style="width: 100%;">
          <!--分页-->
          <div class="page-num flex flex-y-center flex-x-between">
            <strong class="title">搜索结果</strong>
            <div class="flex flex-y-center">
              <el-pagination
                background
                small
                layout="total,prev, pager, next"
                :total="productDataCount"
                @current-change="handleCurrentChange"
              ></el-pagination>
            </div>
          </div>
          <!--商品列表-->
          <ul
            class="pro-list flex"
            v-if="productList.length>0"
            id="searchList"
            v-loading="searchLoding"
          >
            <li v-for="d in productList" style="height: 316px;">
              <div class="item">
                <div class="pro-img">
                  <img v-if="d.productPicUrl" :src="imgURL+d.productPicUrl">
                  <img v-else src="../../../static/img/my_default_img.png">
                </div>
                <div class="pro-text">
                  <div class="pro-price flex flex-x-between flex-y-center">
                    <div class="p1">
                      <span
                        v-if="d.productMinPrice != d.productMaxPrice"
                      >{{'￥'+d.productMinPrice+'~'+d.productMaxPrice}}</span>
                      <span v-else>{{'￥'+d.price}}</span>
                    </div>
                    <div class="flex" v-if="d.isPomotion==1">
                      <div class="p2">{{'￥'+d.price}}</div>
                      <div class="cuxbg flex flex-y-center flex-x-center">
                        <span>促销</span>
                      </div>
                    </div>
                  </div>
                  <div class="pro-name ellipsis">{{d.name}}</div>
                  <div class="pro-ms ellipsis">{{d.remark || '暂无描述'}}</div>
                  <div class="pro-ms ellipsis">{{d.createdPersonName}}</div>

                  <div class="pro-btns flex flex-y-center">
                    <div
                      class="scbtn flex-y-center flex-x-center flex"
                      @click="addShoppingCar(d,'collection')"
                    >
                      <img src="../../../static/img/icon_xingx.png" alt>
                      <span>收藏</span>
                    </div>
                    <div
                      class="addcarbtn flex-y-center flex-x-center flex"
                      @click="addShoppingCar(d,'search',true)"
                    >
                      <img src="../../../static/img/icon_gouwuche.png" alt>
                      <span>加入购物车</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div
            v-else
            class="flex flex-x-center flex-y-center"
            style="height: 500px;color: #d1d1d1;background: #fff;margin-bottom: 20px"
            v-loading="searchLoding"
          >
            <div>
              <img src="../../../static/img/my_default_img.png">
              <p class="tac">暂无商品</p>
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

import { Badge, Dialog, Select, Option, Pagination } from "element-ui";

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
    [btn.name]: btn
  },
  data() {
    return {
      dialogTableVisible: false,
      storeInfo: {},
      pageNum: 1,
      searchLoding: false
    };
  },
  created() {
    this.sellerId = this.$store.getters.selecedSellerInfo.sellerId;
    this.keyWord = this.$route.query.keyWord;
    this.$store.state.keyWord = this.keyWord;
    this.gbgoodsId = "";
    this.pageSize = 10;
    this.getSearchProductList();
  },
  mounted() {},
  methods: {
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
      let purl = "product/getProByQuotationForYP";
      if (this.userInfo && (this.userInfo.userType == "003"||this.userInfo.userType == "002"||this.userInfo.userType == "004"||this.userInfo.userType == "008")) {
        /** 自营平台需求变更 002 004还是在一批处购买 */
        // 自营平台
        purl = "product/getProByQuotationForBH";
      }
      let param = {
        purchaserId: this.userInfo.typeCode,
        buyerId: this.userInfo.typeCode,
        supplierId: this.sellerId || "",
        gbgoodsid: this.gbgoodsId,
        keyWord: this.keyWord,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        extend: this.userInfo.userType
      };
      this.postRequest(purl, param).then(resp => {
        this.searchLoding = false;
        if (resp.data && resp.data.state == 0) {
          this.productList = resp.data.aaData;
          this.$store.dispatch("setProductList_AC", resp.data.aaData);
          this.productDataCount = resp.data.dataCount;
        }
      });

      // this.getisChoiceSupplier().then(d => {
      //   if (d == 1) {
      //     // 能搜索全部渠道的商品
      //     delete param.supplierId;
      //   }
      //   this.postRequest(purl, param).then(resp => {
      //     this.searchLoding = false;
      //     if (resp.data && resp.data.state == 0) {
      //       this.productList = resp.data.aaData;
      //       this.$store.dispatch("setProductList_AC", resp.data.aaData);
      //       this.productDataCount = resp.data.dataCount;
      //     }
      //   });
      // });
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
      this.getSearchProductList();
    },
    toSearch_1p(type) {
      let userType = {
        type: '001'
      }
      if(type){
        userType.type = type
      }
      this.$router.push({
        name: "search_1p",
        query: userType
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/css/productList.scss";
#productList {
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
      margin-right: 15px;
      margin-bottom: 15px;
    }
    li:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>