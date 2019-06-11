<template>
  <div id="collectionPro">
    <div class="navbar flex flex-y-center">收藏商品</div>
    <div class="main">
      <div class="status-item flex flex-x-between">
        <div class="flex">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部商品" name="0"></el-tab-pane>
            <el-tab-pane label="促销商品" name="1"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="flex" v-show="productcollection.length>0">
          <shop-btn
            width="74px"
            height="26px"
            text="批量操作"
            fontsize="12px"
            marginR="10px"
            @click.native="piliang"
          ></shop-btn>
          <shop-btn
            v-show="showCheckbox"
            width="74px"
            height="26px"
            :text="allclick?'取消全选':'全选'"
            fontsize="12px"
            marginR="10px"
            @click.native="allChecked"
          ></shop-btn>
          <shop-btn
            v-show="showCheckbox"
            width="74px"
            height="26px"
            text="删除"
            fontsize="12px"
            marginR="10px"
            @click.native="delpc"
          ></shop-btn>
          <shop-btn
            v-show="showCheckbox"
            width="74px"
            height="26px"
            text="加入购物车"
            fontsize="12px"
            marginR="0px"
            @click.native="addCarpl"
          ></shop-btn>
        </div>
      </div>
      <!--商品列表-->
      <template v-if="productcollection.length>0">
        <ul class="pro-list flex">
          <li v-for="d in productcollection">
            <div class="checkbox-w" v-show="showCheckbox">
              <el-checkbox v-model="d.checkboxed"></el-checkbox>
            </div>
            <div class="item">
              <div class="pro-img">
                <img v-if="d.skuPic" :src="imgURL+d.skuPic">
                <img v-else-if="d.proPic" :src="imgURL+d.proPic">
                <img v-else src="../../../../static/img/my_default_img.png">
                <div class="muslim" v-if="d.isMuslim == 1">
                  <img src="../../../../static/img/northring/qingzhen.jpg" alt>
                </div>
              </div>
              <div class="pro-text">
                <div class="pro-price flex flex-x-between flex-y-center">
                  <div
                    class="p1"
                    v-if="d.promotionPrice>0 && d.promotionBasePrice>0"
                  >{{'￥'+d.promotionPrice}}</div>
                  <div class="p1" v-else>{{'￥'+d.price}}</div>
                  <div class="flex" v-if="d.promotionPrice < d.price">
                    <div class="p2">{{'￥'+d.price}}</div>
                    <div class="cuxbg flex flex-y-center flex-x-center">
                      <span>促销</span>
                    </div>
                  </div>
                </div>
                <div class="pro-name">{{d.productName+'['+d.skuName+']'}}</div>
                <div class="pro-ms">{{d.sellerName}}</div>
                <div class="pro-ms">计量方式：{{d.skuMethodType == 1 ?'计重':'计件'}}</div>
                <!--不限制库存-->
                <!--<template v-if="d.f_stock_limit == '0'">
									<div class="pro-ms">基本量库存：充足</div>
									<div class="pro-ms">规格量库存：充足</div>
								</template>
								<template v-else>
									<div class="pro-ms">基本量库存：{{d.f_stock_quantity
										<0?0:d.f_stock_quantity}}</div>
											<div class="pro-ms">规格量库存：{{d.f_stock_quantity_sku
												<0?0:d.f_stock_quantity_sku}}</div>
                </template>-->
              </div>
              <div
                class="pro-btns flex flex-y-center flex-x-center"
                @click="addShippingcarBySku(d)"
              >
                <img src="../../../../static/img/home_icon_shop.png" alt>
                <span>加入购物车</span>
              </div>
            </div>
          </li>
        </ul>

        <div class="flex flex-x-end">
          <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :total="dataCount"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
          ></el-pagination>
        </div>
      </template>
      <div v-else class="flex flex-x-center flex-y-center" style="height: 444px;color: #d1d1d1;">
        <div>
          <img src="../../../../static/img/my_default_img.png">
          <p class="tac">暂无商品</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShopTop from "../../components/header.vue";
import ShopFooter from "../../components/footer.vue";
import btn from "../../components/shopbtn.vue";
import { Pagination, Tabs, TabPane, Checkbox } from "element-ui";

import mixin from "../../../utils/mixin.js";

export default {
  mixins: [mixin],
  components: {
    [ShopTop.name]: ShopTop,
    [ShopFooter.name]: ShopFooter,
    [btn.name]: btn,

    // element component
    [Pagination.name]: Pagination,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Checkbox.name]: Checkbox
  },
  data() {
    return {
      productcollection: [],
      dataCount: 0,
      pageNum: 1,
      pageSize: 8,
      activeName: "0",
      currentPage: 1,
      showCheckbox: false,
      allclick: false,
      isPromotion: ""
    };
  },
  created() {
    this.getProductcollection();
  },
  mounted() {},
  methods: {
    /**
     * 规格创建购物车
     */
    addShippingcarBySku(d) {
      var data = d;
      //				if(d.f_stock_limit == '1' && d.f_stock_quantity_sku <= 0) {
      //					this.$message('该商品库存不足无法加入购物车！')
      //					return false
      //				}
      var saveurl = "shippingcar/create";
      this.postRequest("shippingcar/list", {
        buyerId: this.userInfo.typeCode
      }).then(d => {
        if (d.data && d.data.state == 0) {
          let a = [];
          let ids = [];
          var params = {
            buyerId: this.userInfo.typeCode,
            productId: data.productId,
            productName: data.productName,
            skuId: data.skuId,
            skuName: data.skuName,
            quantity: 1,
            comment: data.remark || "",
            sellerId: data.sellerId || data.supplierId - 0 || this.sellerId
          };

          for (let j of d.data.aaData) {
            if (j.sellerId == params.sellerId) {
              a.push(j.skuId);
              var o = {
                skuId: j.skuId,
                id: j.id
              };
              ids.push(o);
            }
          }

          // 判断购物车中是否已经有某个商品
          if (this.isInArray(a, params.skuId)) {
            saveurl = "shippingcar/update";
            for (var l of ids) {
              if (params.skuId == l.skuId) {
                params.id = l.id - 0;
              }
            }
          } else {
            saveurl = "shippingcar/create";
          }

          if (params.sellerId) {
            this.postRequest(saveurl, params).then(d => {
              if (d.data && d.data.state == 0) {
                this.$message({
                  message: "加入购物车成功，可在购物车中查看！",
                  type: "success"
                });
                if (data.checkboxed) {
                  data.checkboxed = false;
                }
                // 获取购物车数量
                this.getShopCarCount();
              } else {
                this.$message.error("加入购物车失败！");
              }
            });
          } else {
            this.$message.error("加入购物车失败！");
          }
        }
      });
    },
    /**
     * 获取收藏品
     */
    getProductcollection() {
      this.postRequest("productcollection/querylistByCustomerId", {
        customerId: this.userInfo.typeCode,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        isPromotion: this.isPromotion
      }).then(resp => {
        if (resp.data && resp.data.state == 0) {
          for (var i of resp.data.aaData) {
            i.checkboxed = false;
          }
          this.productcollection = resp.data.aaData;
          this.dataCount = resp.data.dataCount;
        }
      });
    },
    /**
     * 分页改变
     */
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getProductcollection();
    },
    handleClick(tab, event) {
      if (this.activeName == "1") {
        this.isPromotion = this.activeName;
      } else {
        this.isPromotion = "";
      }
      this.getProductcollection();
    },
    /**
     * 批量操作
     */
    piliang() {
      this.showCheckbox = !this.showCheckbox;
    },
    /**
     * 全选
     */
    allChecked() {
      this.allclick = !this.allclick;
      if (this.allclick) {
        for (var i of this.productcollection) {
          i.checkboxed = true;
        }
      } else {
        for (var i of this.productcollection) {
          i.checkboxed = false;
        }
      }
    },
    /**
     * 删除
     */
    delpc() {
      this.allclick = !this.allclick;
      var a = [];
      for (var i of this.productcollection) {
        if (i.checkboxed) {
          a.push(i);
        }
      }

      if (a.length == 0) {
        this.$message("至少选择一个商品操作！");
      } else {
        for (var i of a) {
          this.deleteByCustomerIdAndSkuId(i.skuId);
        }
      }
    },
    /**
     * 批量加入购物车
     */
    addCarpl() {
      var a = [];
      this.allclick = !this.allclick;
      for (var i of this.productcollection) {
        if (i.checkboxed) {
          a.push(i);
        }
      }

      if (a.length == 0) {
        this.$message("至少选择一个商品操作！");
      } else {
        for (var i of a) {
          this.addShippingcarBySku(i);
        }
      }
    },
    deleteByCustomerIdAndSkuId(skuId) {
      this.postRequest("productcollection/deleteByCustomerIdAndSkuId", {
        customerId: this.userInfo.typeCode,
        skuId: skuId
      }).then(resp => {
        if (resp.data && resp.data.state == 0) {
          for (let i in this.productcollection) {
            if (this.productcollection[i].skuId == skuId) {
              this.productcollection.splice(i, 1);
            }
          }
          this.$message({
            message: "操作成功！",
            type: "success"
          });
          this.getProductcollection();
        }
      });
    }
  }
};
</script>

<style lang="scss">
#collectionPro {
  ul.pro-list {
    li {
      position: relative;
      height: 330px;
      width: 238px;
      border: 1px solid #ddd;
      margin-right: 26px;
      .checkbox-w {
        position: absolute;
        top: -1px;
        left: -1px;
      }
      .pro-name {
        margin: 0 0 5px;
      }
      .item {
        .pro-btns {
          border: none;
          border-radius: 0;
          background: #f9f9f9;
          color: #666;
          height: 36px;
          width: 100%;
          position: absolute;
          bottom: 0;
          img {
            margin-right: 7px;
          }
        }
      }
    }
    li:nth-child(4n) {
      margin-right: 0;
    }
  }
}
</style>