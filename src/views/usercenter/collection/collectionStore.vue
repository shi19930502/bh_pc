<template>
  <div id="collectionStore">
    <div class="navbar flex flex-y-center">收藏商家</div>
    <div class="main">
      <div class="status-item flex flex-x-between flex-y-center">
        <span>共{{collectionStores.length}}个商家</span>
        <div>
          <!--<shop-btn width="74px" height="26px" text="批量操作" fontsize="12px" marginR="0"></shop-btn>-->
        </div>
      </div>
      <!--商家列表-->
      <ul class="store-listc">
        <li class="flex" v-for="d in collectionStores">
          <div class="store-info">
            <!--<div class="top-btns flex">
							<div class="flex flex-x-center flex-y-center">取消关注</div>
							<div class="flex flex-x-center flex-y-center">置顶</div>
            </div>-->
            <div class="store-logo flex flex-x-center">
              <div>
                <div class="logo">
                  <img v-if="d.headPicUrl" :src="imgURL+d.headPicUrl">
                  <img v-else src="../../../../static/img/my_default_img.png">
                </div>
                <div class="store-name">
                  <strong>{{d.storeName}}</strong>
                </div>
                <div class="pf">评分5.0</div>
              </div>
            </div>
            <div class="bottom-btns flex flex-x-center flex-y-center">
              <div class="flex flex-y-center flex-x-center" @click="toPersonalBuyStore(d.sellerId)">
                <img src="../../../../static/img/home_icon_shop.png">
                <span>进入店铺</span>
              </div>
              <div>|</div>
              <div class="flex flex-y-center flex-x-center" @click="toContactService">
                <img src="../../../../static/img/home_icon_phone.png">
                <span>联系客服</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="flex flex-x-end">
        <el-pagination background layout="prev, pager, next" :total="2"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ShopTop from "../../components/header.vue";
import ShopFooter from "../../components/footer.vue";
import btn from "../../components/shopbtn.vue";
import { Pagination } from "element-ui";
import mixin from "../../../utils/mixin.js";
import { userInfo } from "os";
export default {
  components: {
    [ShopTop.name]: ShopTop,
    [ShopFooter.name]: ShopFooter,
    [btn.name]: btn,

    // element component
    [Pagination.name]: Pagination
  },
  mixins: [mixin],
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.getCollectionStores("collectionStore");
  },
  methods: {
    handleClick(tab, event) {},
    /**
     * 进入店铺
     */
    toPersonalBuyStore(sellerId) {
      let name;
      switch (this.userInfo.userType) {
        case "005":
          name = "PersonalBuyStore";
          break;
        default:
          name = "showProductByStore";
      }
      console.log(name)
      this.$router.push({
        name: name,
        query: {
          sellerId: sellerId,
          type: this.userInfo.userType
        }
      });
    }
  }
};
</script>

<style lang="scss">
#collectionStore {
  ul.store-listc {
    padding: 10px 0 20px 0;
    li .store-info:hover .top-btns {
      top: 0;
    }
    li {
      margin-bottom: 20px;
      width: calc(100% - 1px);
      height: 298px;
      border: 1px solid #ddd;
      overflow: hidden;
      .store-products {
        width: 800px;
        .pro {
          height: 232px;
          padding: 0px 20px 0;
          .pro-item:hover .addbtn {
            bottom: 0;
          }
          .pro-item {
            width: 120px;
            height: 100%;
            position: relative;
            overflow: hidden;
            margin-right: 30px;
            .pro-img {
              width: 100%;
              height: 120px;
              img {
                width: 100%;
                height: 100%;
              }
              margin-top: 15px;
            }
            .pro-price {
              font-size: 14px;
              color: #333;
              margin: 30px auto 20px;
              text-align: center;
            }
            .addbtn {
              position: absolute;
              bottom: -38px;
              transition: all 0.3s;
              -moz-transition: all 0.3s;
              -webkit-transition: all 0.3s;
              -o-transition: all 0.3s;
            }
          }
        }
        .pagelist {
          padding: 18px 20px;
          .flbtns {
            font-size: 14px;
            .btn {
              width: 60px;
              height: 30px;
              line-height: 30px;
              border: 1px solid #dddddd;
              text-align: center;
              cursor: pointer;
            }
            .btn:not(:last-child) {
              border-right: none;
            }
            .btn.active {
              color: #ff4400;
              border-color: #ff4400;
              border-right: 1px solid #ff4400;
            }
            .btn:first-child.active {
              color: #ff4400;
              border-color: #ff4400;
            }
          }
          .page-num {
            padding: 20px 0;
            strong.title {
              color: #666666;
            }
            .pagebtn {
              margin-right: 20px;
              .cpage {
                color: #ff4400;
              }
            }
            .arrowout {
              cursor: pointer;
              height: 25px;
              width: 48px;
              border: 1px solid #ff4400;
              .arrow-r,
              .arrow-l {
                border-color: #ff4400;
              }
            }
            .arrowout.brn {
              border-right: none;
            }
          }
        }
      }
      .store-info {
        width: 240px;
        height: 100%;
        border-right: 1px solid #ddd;
        position: relative;
        .top-btns {
          width: 100%;
          height: 36px;
          background: rgba(0, 0, 0, 0.7);
          position: absolute;
          top: -36px;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s;
          -moz-transition: all 0.3s;
          -webkit-transition: all 0.3s;
          -o-transition: all 0.3s;
          div {
            width: 50%;
            height: 100%;
          }
          div:nth-child(1) {
            border-right: 1px solid #fff;
          }
        }
        .store-logo {
          text-align: center;
          padding-top: 25px;
          .logo {
            width: 60px;
            height: 60px;
            margin: 0 auto;
            border-radius: 100px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .store-name {
            font-size: 16px;
            margin: 20px 0 90px;
          }
          .pf {
            color: #999;
          }
        }
        .bottom-btns {
          width: 100%;
          height: 42px;
          background: #f9f9f9;
          position: absolute;
          bottom: 0;
          div:nth-child(2) {
            font-size: 20px;
            color: #e3e3e3;
          }
          div:not(:nth-child(2)) {
            width: 49%;
            img {
              margin-right: 7px;
            }
            cursor: pointer;
            height: 100%;
            color: #666;
          }
        }
      }
    }
  }
}
</style>>