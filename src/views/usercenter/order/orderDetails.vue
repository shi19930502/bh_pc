<template>
  <div id="orderDetails">
    <shop-header/>
    <!--搜索-->
    <shop-search :showClassify="false" pageName="订单详情"/>

    <!--主体-->
    <section class="content">
      <div class="min-width">
        <div class="navbar flex flex-y-center">
          <div class="click-a" @click="toUserCenter">个人中心</div>
          <div class="arrow-r"></div>
          <div class="click-a" @click="toUserCenter">订单中心</div>
          <div class="arrow-r"></div>
          <div>
            <strong>订单{{orderUmber}}</strong>
          </div>
        </div>
        <!---->
        <div class="order-status">
          <div class="wraper flex flex-y-center">
            <div class="left">
              <p>订单号：{{orderUmber}}</p>
              <div class="status">{{orderDetail.orderStatusName}}</div>
              <div class="flex flex-x-center">
                <shop-btn
                  @click.native="orderCancel(orderDetail.id,getOrderDetailById)"
                  v-show="orderDetail.orderStatusId == 0"
                  width="87px"
                  height="29px"
                  text="取消订单"
                  marginR="0"
                  fontsize="12px"
                ></shop-btn>
                <shop-btn
                  @click.native="orderCancel(orderDetail.id,getOrderDetailById,'qrsh',orderDetail)"
                  v-show="orderDetail.orderStatusId == 3"
                  width="87px"
                  height="29px"
                  text="确认收货"
                  marginR="0"
                  fontsize="12px"
                ></shop-btn>
              </div>
              <div class="paystatus">{{orderDetail.payStatusName}}</div>
            </div>
            <div class="leftafter"></div>
            <div class="right">
              <p>订单{{orderDetail.orderStatusName}}</p>
              <ul class="flex flex-x-between">
                <template v-for="d,index in stepList">
                  <li :class="d.active?'active':''">
                    <div class="point"></div>
                    <div class="name">{{d.curStatusName}}</div>
                    <div class="time">
                      <div>{{d.optionDate}}</div>
                    </div>
                    <div class="jts flex" v-if="index !=stepList.length-1">
                      <div class="arrow-r" v-for="d in 13"></div>
                    </div>
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
        <!--拒绝原因-->
        <div class="order-info" style="margin-bottom: 20px;" v-if="orderDetail.orderStatusId==6">
          <div class="item" style="border: none;width: 100%;">
            <strong>拒绝原因</strong>
            <p>{{orderDetail.cancelReason}}</p>
          </div>
        </div>
        <!---->
        <div class="order-info flex flex-x-between">
          <div class="item">
            <strong>收货人信息</strong>
            <p>
              <span>收货人：{{orderDetail.buyerName}}</span>
            </p>
            <p>
              <span>地址：{{orderDetail.shippingAdd}}</span>
            </p>
            <p>
              <span>电话：{{orderDetail.buyerTel}}</span>
            </p>
          </div>
          <div class="item">
            <strong>分拣信息</strong>
            <p>
              <span>分拣商：{{orderDetail.sellerName}}</span>
            </p>
            <!--<p><span>分拣员：</span></p>-->
            <p>
              <span>分拣时间：{{orderDetail.fenjianDate || '--'}}</span>
            </p>
          </div>
          <div class="item" style="border-right: none;margin-right:0 ;">
            <strong>配送信息</strong>
            <template v-if="orderDetail.distributionType == 1">
              <p>
                <span>配送地址：{{orderDetail.shippingAdd}}</span>
              </p>
              <p>
                <span>配送商：{{orderDetail.pssname}}</span>
              </p>
              <p>
                <span>期望配送时间：{{orderDetail.sdsj}}</span>
              </p>
            </template>
            <template v-else>
              <p>自提，无需配送</p>
            </template>
          </div>
        </div>
        <!---->
        <div class="order-item-info">
          <strong>订单详情</strong>
          <div class="item-info">
            <span>卖家信息</span>
            <div class="flex item-text">
              <p>
                <span>卖家名称：</span>
                <span>{{orderDetail.sellerName}}</span>
              </p>
              <p>
                <span>联系电话：</span>
                <span>{{orderDetail.sellerTel}}</span>
              </p>
            </div>
          </div>
          <div class="item-info">
            <span>订单信息</span>
            <div class="flex item-text">
              <p>
                <span>订单号码：</span>
                <span>{{orderDetail.orderUmber}}</span>
              </p>
              <p>
                <span>下单时间：</span>
                <span>{{orderDetail.createdDate}}</span>
              </p>
              <!--<p>
								<span>完成时间：</span>
								<span>--</span>
              </p>-->
            </div>
            <div class="flex item-text">
              <p>
                <span>支付方式：</span>
                <span>{{orderDetail.payWayStatusName}}</span>
              </p>
              <template v-if="orderDetail.comment">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="orderDetail.comment"
                  placement="top"
                >
                  <p class="ellipsis">
                    <span>订单备注：</span>
                    <span>{{orderDetail.comment}}</span>
                  </p>
                </el-tooltip>
              </template>
              <template v-else>
                <p class="ellipsis">
                  <span>订单备注：</span>
                  <span></span>
                </p>
              </template>
            </div>
          </div>
          <div class="item-info">
            <span>商品信息</span>
            <table border="0" style="width: 100%;">
              <tr class="tbhead">
                <th width="236px">商品信息</th>
                <th width="106px">交易状态</th>
                <th width="106px">单价(元)</th>
                <th width="106px">订单数量</th>
                <th width="106px">成交数量</th>
                <th width="106px">验收数量</th>
                <th width="106px">订单金额(元)</th>
                <th width="106px">成交金额(元)</th>
                <th width="106px">验收金额(元)</th>
                <th width="106px">备注</th>
              </tr>
              <tbody>
                <tr v-for="d in orderDetail.orderitemList">
                  <td class="pro-info flex">
                    <div class="pro-img">
                      <img v-if="d.skuPicUrl!=null && d.productPicUrl!=null" :src="imgURL+(d.skuPicUrl==''?d.productPicUrl:d.skuPicUrl)">
                      <img v-else src="../../../../static/img/my_default_img.png">
                    </div>
                    <div class="pro-name">
                      <p>{{d.productName}}</p>
                      <p>{{d.skuName}}</p>
                    </div>
                  </td>
                  <td valign="top">{{orderDetail.payStatusName}}</td>
                  <td valign="top">{{'￥'+d.price/100}}</td>
                  <td valign="top">{{d.quantity+d.skuMeasureName}}</td>
                  <td valign="top">{{d.sortingWeight || '--'}}</td>
                  <td valign="top">{{d.inspectedWeight || '--'}}</td>
                  <td valign="top">{{d.itemTotal?'￥'+d.itemTotal/100:'--'}}</td>
                  <td valign="top">{{d.sortingTotal?'￥'+d.sortingTotal/100:'--'}}</td>
                  <td valign="top">{{d.inspectedTotal?'￥'+d.inspectedTotal/100:'--'}}</td>
                  <td valign="top">
                    <el-tooltip class="item" effect="dark" :content="d.comment" placement="top">
                      <p class="ellipsis" style="width:106px">{{d.comment}}</p>
                    </el-tooltip>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="flex flex-x-end">
              <div class="small-plan">
                <p v-show="orderDetail.sortingOrderTotal ==null || orderDetail.sortingOrderTotal == 0 && orderDetail.inspectedOrderTotal ==null"> 
                  <span>订单总金额：</span>
                  <span>{{'￥'+orderDetail.orderTotal/100}}</span>
                </p>
                <p v-show="orderDetail.sortingOrderTotal>0 && orderDetail.inspectedOrderTotal==0">
                  <span>订单总金额：</span>
                  <span>{{'￥'+orderDetail.sortingOrderTotal/100}}</span>
                </p>
                <p v-show="orderDetail.inspectedOrderTotal>0">
                  <span>订单总金额：</span>
                  <span style="color: #F64811;">{{'￥'+orderDetail.inspectedOrderTotal/100}}</span>
                </p>
                <p>
                  <span style="display:inline-block;width: 72px;text-align: right">配送费：</span>
                  <span style="color: #F64811;">{{'￥'+orderDetail.shippingTotal}}</span>
                </p>
                <!-- 总计 -->
                <p v-if="orderDetail.sortingOrderTotal ==null || orderDetail.sortingOrderTotal == 0 && orderDetail.inspectedOrderTotal ==null">
                  <span style="display:inline-block;width: 72px;text-align: right">总计：</span>
                  <span style="color: #F64811;">{{'￥'+(orderDetail.orderTotal/100+orderDetail.shippingTotal).toFixed(2)}}</span>
                </p>
                <p v-if="orderDetail.sortingOrderTotal>0 && orderDetail.inspectedOrderTotal==0">
                  <span style="display:inline-block;width: 72px;text-align: right">总计：</span>
                  <span style="color: #F64811;">{{'￥'+(orderDetail.sortingOrderTotal/100+orderDetail.shippingTotal).toFixed(2)}}</span>
                </p>
                <p v-if="orderDetail.inspectedOrderTotal>0">
                  <span style="display:inline-block;width: 72px;text-align: right">总计：</span>
                  <span style="color: #F64811;">{{'￥'+(orderDetail.inspectedOrderTotal/100+orderDetail.shippingTotal).toFixed(2)}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <shop-footer></shop-footer>
  </div>
</template>
<script>
import ShopTop from "../../components/header.vue";
import ShopFooter from "../../components/footer.vue";
import btn from "../../components/shopbtn.vue";
import Search from "../../components/search.vue";
import {
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Input,
  Button,
  Select,
  Option,
  Popover,
  Badge,
  Tooltip
} from "element-ui";

import mixin from "../../../utils/mixin.js";

export default {
  mixins: [mixin],
  components: {
    [ShopTop.name]: ShopTop,
    [ShopFooter.name]: ShopFooter,
    [btn.name]: btn,
    [Search.name]: Search,

    // element component
    [Table.name]: Table,
    [Badge.name]: Badge,

    [TableColumn.name]: TableColumn,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [Popover.name]: Popover,
    [Tooltip.name]: Tooltip
  },
  data() {
    return {
      orderId: "",
      orderUmber: "",
      // 总价
      totalPrice: 0,
      // 订单详情
      orderDetail: {},
      stepList: [
        {
          curStatusName: "新建",
          changeIndex: "1",
          optionDate: "",
          active: false
        },
        {
          curStatusName: "受理",
          changeIndex: "2",
          optionDate: "",
          active: false
        },
        {
          curStatusName: "分拣",
          changeIndex: "3",
          optionDate: "",
          active: false
        },
        {
          curStatusName: "发货",
          changeIndex: "4",
          optionDate: "",
          active: false
        },
        {
          curStatusName: "收货",
          changeIndex: "5",
          optionDate: "",
          active: false
        },
        {
          curStatusName: "完成",
          changeIndex: "6",
          optionDate: "",
          active: false
        },
        {
          curStatusName: "已评价",
          changeIndex: "7",
          optionDate: "",
          active: false
        }
      ]
    };
  },
  created() {
    this.orderId = this.$route.query.orderId;
    this.orderUmber = this.$route.query.orderUmber;
    this.getOrderDetailById();
  },
  mounted() {},
  methods: {
    /**
     * 获取订单详情
     */
    getOrderDetailById() {
      this.postRequest("order/listByUser", {
        orderUmber: this.orderUmber,
        checkType: "buy"
      }).then(d => {
        if (d.data && d.data.state == 0) {
          if (d.data.aaData.length > 0) {
            var datestr, startTime, endTime;
            if (d.data.aaData[0].distributionTimeEnd) {
              datestr = d.data.aaData[0].distributionTimeEnd.split(" ")[0];
            }
            if (d.data.aaData[0].distributionTimeBegin) {
              startTime = d.data.aaData[0].distributionTimeBegin.split(" ")[1];
            }
            if (d.data.aaData[0].distributionTimeEnd) {
              endTime = d.data.aaData[0].distributionTimeEnd.split(" ")[1];
            }

            var o = d.data.aaData[0];
            this.orderDetail = o;

            this.orderstatuschange();
            if (d.data.aaData[0].distributorId) {
              this.postRequest("customer/queryById", {
                id: d.data.aaData[0].distributorId
              }).then(d => {
                if (d.data.aaData.name) {
                  o.pssname = d.data.aaData.name;
                  this.orderDetail = o;
                  // 期望送达时间
                  if (datestr) {
                    this.orderDetail.sdsj = `${datestr} ${startTime.slice(
                      0,
                      startTime.length - 3
                    )}~${endTime.slice(0, endTime.length - 3)}`;
                  }
                }
              });
            }
          }
        }
      });
    },
    /**
     * 获取订单状态
     */
    orderstatuschange() {
      this.postRequest("orderstatuschange/list", {
        orderNumber: this.orderUmber
      }).then(d => {
        if (d.data && d.data.state == 0) {
          if (d.data.aaData.length > 0) {
            for (var k of this.stepList) {
              for (var i of d.data.aaData) {
                if (i.changeIndex == k.changeIndex) {
                  k.active = true;
                  k.optionDate = i.optionDate;
                  k.curStatusName = i.curStatusName;
                }
              }

              if (k.curStatusName == "已分拣") {
                this.orderDetail.fenjianDate = k.optionDate;
              }
            }
          }
        }
      });
    }
  }
};
</script>
<style lang="scss">
.el-tooltip__popper.is-dark {
  max-width: 1000px !important;
}

#orderDetails {
  .content {
    width: 100%;
    background: #f1f1f1;
    font-size: 12px;
    padding-bottom: 20px;
    .navbar {
      height: 60px;
      .arrow-r {
        margin: 0 10px;
      }
    }
    .order-status {
      width: 1188px;
      border: 1px solid #ff4400;
      height: 200px;
      background: rgba(250, 255, 246, 1);
      margin-bottom: 20px;
      .wraper {
        padding: 28px 0;
        p {
          color: #909090;
        }
        .left {
          width: 240px;
          text-align: center;
          .status {
            font-size: 20px;
            color: #ff4400;
            font-weight: bold;
            margin: 25px 0;
          }
          .paystatus {
            color: #f64811;
            margin-top: 5px;
          }
        }
        .leftafter {
          width: 1px;
          height: 121px;
          background: #e5e5e5;
        }
        .right {
          padding: 0 20px;
          width: 930px;
          ul {
            width: 100%;
            padding: 0 20px;
            padding-left: 0;
            li {
              width: 132px;
              position: relative;
              text-align: center;
              .point {
                width: 28px;
                height: 28px;
                margin: 26px auto;
                background: #7de2a9;
                border-radius: 10px;
              }
              .name {
                margin-bottom: 10px;
                color: #b2b6af;
              }
              .time {
                display: none;
              }
              .jts {
                position: absolute;
                left: 88px;
                top: 38px;
                .arrow-r {
                  width: 3px;
                  height: 3px;
                  margin-right: 3px;
                  border-top: 1px solid #7de2a9;
                  border-right: 1px solid #7de2a9;
                }
              }
            }
            li.active {
              .point {
                background: #ff4400;
              }
              .name {
                color: #222;
              }
              .time {
                display: block;
              }
              .jts {
                .arrow-r {
                  width: 3px;
                  height: 3px;
                  margin-right: 3px;
                  border-top: 1px solid #ff4400;
                  border-right: 1px solid #ff4400;
                }
              }
            }
          }
        }
      }
    }
    .order-info {
      background: #fff;
      padding: 20px;
      .item {
        width: 33.3%;
        border-right: 1px solid #e5e5e5;
        margin-right: 20px;
        strong {
          margin-bottom: 10px;
          display: block;
        }
        p {
          margin-bottom: 5px;
        }
      }
    }
    .order-item-info {
      strong {
        display: block;
        margin-bottom: 30px;
      }
      margin-top: 20px;
      padding: 20px;
      background: #fff;
      .item-info {
        margin-bottom: 10px;
        span {
          display: inline-block;
          margin-bottom: 10px;
        }
        .item-text {
          p {
            width: 33.3%;
            margin-bottom: 5px;
          }
        }
        table {
          border: 1px solid #ddd;
          tr.tbhead {
            height: 34px;
            background: #f1f1f1;
            .el-input.el-input--suffix {
              input {
                background: #f1f1f1 !important;
                border: none;
                font-size: 12px;
              }
              .el-scrollbar {
                font-size: 12px !important;
              }
            }
          }
          tbody {
            tr {
              border-bottom: 1px solid #ddd;
              /*border-left: 1px solid #ddd;
								border-right: 1px solid #ddd;*/
              td {
                padding: 20px 0;
                text-align: center;
              }
              td.pro-info {
                text-align: left;
                .pro-img {
                  img {
                    width: 100%;
                    height: 100%;
                  }
                  margin: 0 10px;
                  width: 62px;
                  height: 62px;
                }
                .pro-name {
                  p:nth-child(2) {
                    margin-top: 5px;
                    color: #909090;
                  }
                }
              }
            }
          }
        }
        .small-plan {
          padding-top: 42px;
          p {
            span {
              display: inline-block;
            }
            span:nth-child(2) {
              width: 165px;
              text-align: right;
            }
          }
        }
      }
    }
  }
}
</style>
