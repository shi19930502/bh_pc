<template>
  <div id="orderList">
    <div class="navbar flex flex-y-center">我的订单</div>
    <div class="main">
      <div class="status-item flex flex-x-between">
        <div class="flex">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部订单" name="all"></el-tab-pane>
            <el-tab-pane label="待受理" name="0"></el-tab-pane>
            <el-tab-pane label="待分拣" name="1"></el-tab-pane>
            <el-tab-pane label="待配送" name="2"></el-tab-pane>
            <el-tab-pane label="配送中" name="3"></el-tab-pane>
            <el-tab-pane label="已收货" name="4"></el-tab-pane>
            <el-tab-pane label="已完成" name="5"></el-tab-pane>
            <el-tab-pane label="已拒绝" name="6"></el-tab-pane>
            <el-tab-pane label="已取消" name="7"></el-tab-pane>
          </el-tabs>
        </div>
        <div>
          <el-input placeholder="订单号" v-model="orderUmber" class="input-with-select" size="mini">
            <el-button slot="append" icon="el-icon-search" @click="queryByOrderUmber"></el-button>
          </el-input>
        </div>
      </div>
      <!--table-->
      <div class="order-list-tb">
        <!--表头-->
        <table border="0" style="width: 100%;">
          <tr class="tbhead">
            <th width="130px">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </th>
            <th width="118px">订单详情</th>
            <th width="73px">单价</th>
            <th width="142px">数量</th>
            <th width="101px">小计</th>
            <th width="95px">收货人</th>
            <th width="150px">总计</th>
            <th width="106px">订单状态</th>
            <th width="125px">操作</th>
          </tr>
          <tbody>
            <template v-for="d in OrderList">
              <tr class="h20"></tr>
              <tr class="h30">
                <td colspan="9">
                  <div class="flex flex-x-between flex-y-center">
                    <div class="orderh flex flex-y-center">
                      <div class="orderh-t">{{d.createdDate}}</div>
                      <div class="orderh-no">
                        <span>订单号：</span>
                        <strong>{{d.orderUmber}}</strong>
                      </div>
                      <div class="orderh-store flex flex-y-center">
                        <span>{{d.sellerName}}</span>
                        <img src="../../../../static/img/home_icon_phone.png">
                      </div>
                    </div>
                    <!--<div><i class="el-icon-delete"></i></div>-->
                  </div>
                </td>
              </tr>
              <tr class="h120">
                <td colspan="2" valign="top" style="position: relative;">
                  <div class="flex">
                    <div class="pro-img" @click="suyuan(d.orderitemList[0],d)">
                      <img
                        v-if="d.orderitemList[0].productPicUrl"
                        :src="imgURL+d.orderitemList[0].productPicUrl"
                      >
                      <img v-else src="../../../../static/img/my_default_img.png">
                      <div
                        class="sy-logo"
                        v-if="!(d.orderStatusId == '0' || d.orderStatusId == '1' || d.orderStatusId == '6' || d.orderStatusId == '7')&&d.orderitemList[0].suyuanCode"
                      >溯源</div>
                    </div>
                    <div class="pro-info">
                      <p class="c2">{{d.orderitemList[0].productName}}</p>
                      <p>{{d.orderitemList[0].skuName}}</p>
                    </div>
                  </div>
                  <template v-if="d.orderitemList.length>1">
                    <el-popover width="565" placement="bottom" trigger="click">
                      <table border="0" style="width: 100%;" id="moreOrderTab">
                        <tr v-for="pros in d.orderitemList">
                          <td width="248px">
                            <div class="flex">
                              <div
                                class="pro-img"
                                style="position: relative;"
                                @click="suyuan(pros,d)"
                              >
                                <img v-if="pros.productPicUrl" :src="imgURL+pros.productPicUrl">
                                <img v-else src="../../../../static/img/my_default_img.png">
                                <div
                                  class="sy-logo"
                                  v-if="!(d.orderStatusId == '0' || d.orderStatusId == '1')&&pros.suyuanCode"
                                >溯源</div>
                              </div>
                              <div class="pro-info">
                                <p class="c2">{{pros.productName}}</p>
                                <p>{{pros.skuName}}</p>
                              </div>
                            </div>
                          </td>
                          <td width="73px" align="top">{{'￥'+pros.price/100}}</td>
                          <td width="142px" align="top">
                            <p>订单数量 {{pros.quantity}}</p>
                            <p>分拣数量 {{pros.sortingWeight || '-'}}</p>
                            <p>验收数量 {{pros.inspectedWeight || '-'}}</p>
                          </td>
                          <td width="101px" align="top">{{'￥'+pros.itemTotal/100}}</td>
                        </tr>
                      </table>
                      <div class="sl" slot="reference">
                        <span>共{{d.orderitemList.length}}件商品</span>
                      </div>
                    </el-popover>
                  </template>
                  <template v-else>
                    <div class="sl" slot="reference">
                      <span>共{{d.orderitemList.length}}件商品</span>
                    </div>
                  </template>
                </td>
                <td valign="top">
                  <span>￥{{d.orderitemList[0].price/100}}</span>
                </td>
                <td valign="top">
                  <p>订单数量 {{d.orderitemList[0].quantity}}</p>
                  <p>分拣数量 {{d.orderitemList[0].sortingWeight || '-'}}</p>
                  <p>验收数量 {{d.orderitemList[0].inspectedWeight || '-'}}</p>
                </td>
                <td class="border-r" valign="top">
                  <span>{{'￥'+d.orderitemList[0].itemTotal/100}}</span>
                </td>
                <td class="border-r" valign="top">
                  <template v-if="d.distributionType == 0">
                    <div>
                      <span class="c2">自提</span>
                    </div>
                  </template>
                  <template v-else>
                    <el-popover placement="left" width="269" trigger="hover">
                      <div class="popover-c">
                        <p class="c2">{{d.buyerName}}</p>
                        <p>{{d.shippingAdd}}</p>
                        <p>{{d.buyerTel}}</p>
                      </div>
                      <div
                        slot="reference"
                        class="flex flex-y-center flex-x-center"
                        style="cursor: pointer;"
                      >
                        <span class="c2">{{d.buyerName}}</span>
                        <img
                          src="../../../../static/img/icon-home_mine.png"
                          style="margin-left: 5px;"
                        >
                      </div>
                    </el-popover>
                  </template>
                </td>
                <td class="border-r" valign="top">
                  <p>配送费￥{{d.shippingTotal}}</p>
                  <p v-show="d.sortingOrderTotal ==null || d.sortingOrderTotal == 0 && d.inspectedOrderTotal ==null">订单金额￥{{d.orderTotal/100}}</p>
                  <p v-show="d.sortingOrderTotal>0 && d.inspectedOrderTotal==0">订单金额￥{{d.sortingOrderTotal ? '￥'+d.sortingOrderTotal/100 : '-'}}</p>
                  <p v-show="d.inspectedOrderTotal>0">订单金额￥{{d.inspectedOrderTotal ? '￥'+d.inspectedOrderTotal/100 : '-'}}</p>
                  <!-- 总计 -->
                  <p v-if="d.sortingOrderTotal ==null || d.sortingOrderTotal == 0 && d.inspectedOrderTotal ==null">总计￥{{(d.shippingTotal+d.orderTotal/100).toFixed(2)}}</p>
                  <p v-if="d.sortingOrderTotal>0 && d.inspectedOrderTotal==0">总计￥{{(d.sortingOrderTotal+d.orderTotal/100).toFixed(2)}}</p>
                  <p v-if="d.inspectedOrderTotal>0">总计￥{{(d.shippingTotal+d.inspectedOrderTotal/100).toFixed(2)}}</p>
                </td>
                <td class="border-r" valign="top">
                  <p>{{d.orderStatusName}}</p>
                  <p class="c2 detailbtn click-a" @click="findOrderDetails(d.id,d.orderUmber)">订单详情</p>
                </td>
                <td valign="top">
                  <div class="flex flex-x-center">
                    <shop-btn
                      @click.native="orderCancel(d.id,getOrderList)"
                      v-show="d.orderStatusId == 0"
                      width="87px"
                      height="29px"
                      text="取消订单"
                      marginR="0"
                      fontsize="12px"
                    ></shop-btn>
                    <shop-btn
                      @click.native="orderCancel(d.id,getOrderList,'qrsh',d)"
                      v-show="d.orderStatusId == 3"
                      width="87px"
                      height="29px"
                      text="确认收货"
                      marginR="0"
                      fontsize="12px"
                    ></shop-btn>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div
          v-show="OrderList.length==0"
          class="nodata flex flex-x-center flex-y-center"
          style="height: 418px;color: #d1d1d1;"
        >
          <div>
            <img src="../../../../static/img/my_default_img.jpg">
            <p class="tac">暂无订单</p>
          </div>
        </div>
      </div>
      <div class="flex flex-x-end" style="margin-top: 20px;">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
          :page-size="pageSize"
          :page-sizes="[5,10, 15,20]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
        ></el-pagination>
      </div>
    </div>

    <!-- 溯源信息 -->
    <el-dialog title="溯源信息" :visible.sync="dialogFormVisible">
      <div ref="suyuanIframe">
        <iframe :src="iframeUrl" frameborder="0" height="500px" width="100%"></iframe>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ShopTop from "../../components/header.vue";
import ShopFooter from "../../components/footer.vue";
import btn from "../../components/shopbtn.vue";
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
  Pagination,
  Dialog
} from "element-ui";
import mixin from "../../../utils/mixin.js";
import configs from "../../../configs.js";

export default {
  mixins: [mixin],
  components: {
    [ShopTop.name]: ShopTop,
    [ShopFooter.name]: ShopFooter,
    [btn.name]: btn,

    // element component
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [Popover.name]: Popover,
    [Dialog.name]: Dialog,
    [Pagination.name]: Pagination
  },
  data() {
    return {
      iframeUrl: "",
      dialogFormVisible: false,
      activeName: "0",
      options: [
        {
          value: "1",
          label: "近一个月订单"
        },
        {
          value: "2",
          label: "三个月内订单"
        },
        {
          value: "3",
          label: "半年内订单"
        },
        {
          value: "4",
          label: "今年内订单"
        }
      ],
      value: "1",

      pageNum: 1,
      pageSize: 5,
      orderStatusId: "0",
      orderUmber: "",

      dataCount: 0,
      currentPage: 1,
      OrderList: []
    };
  },
  created() {
    this.getOrderList();
  },
  mounted() {},
  methods: {
    suyuan(d, orderDetail) {
      if (
        !(
          orderDetail.orderStatusId == "0" ||
          orderDetail.orderStatusId == "1" ||
          orderDetail.orderStatusId == "6" ||
          orderDetail.orderStatusId == "7"
        ) &&
        d.suyuanCode
      ) {
        this.iframeUrl = `${configs.SUYUAN_URL}${d.suyuanCode}`;
        console.log(this.iframeUrl);
        if (this.$refs.suyuanIframe) {
          this.$refs.suyuanIframe.innerHTML = `<iframe src="${
            this.iframeUrl
          }" frameborder="0" height="500px" width="100%"></iframe>`;
        }
        this.dialogFormVisible = true;
      }
    },
    /**
     * 根据订单号搜索
     */
    queryByOrderUmber() {
      this.pageNum = 1;
      this.activeName = "all";
      this.getOrderList();
    },
    /**
     * 获取订单列表
     */
    getOrderList() {
      this.postRequest("order/listByUser", {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        orderStatusId: this.orderStatusId,
        orderUmber: this.orderUmber,
        checkType: "buy"
      }).then(resp => {
        if (resp.data && resp.data.state == 0) {
          this.OrderList = resp.data.aaData;
          this.dataCount = resp.data.dataCount;
        }
      });
    },
    /**
     * tabs
     */
    handleClick(tab, event) {
      this.orderStatusId = this.activeName === "all" ? "" : this.activeName;
      this.getOrderList();
    },
    /**
     * 查看订单详情
     */
    findOrderDetails(orderId, orderUmber) {
      this.$router.push({
        name: "orderDetails",
        query: {
          orderId: orderId,
          orderUmber: orderUmber
        }
      });
    },
    /**
     * 每页显示条数改变
     */
    handleSizeChange(val) {
      this.pageSize = val;
      this.getOrderList();
    },
    /**
     * 分页改变
     */
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getOrderList();
    }
  }
};
</script>

<style lang="scss">
#moreOrderTab {
  tr:first-child {
    td {
      padding-top: 0;
    }
  }
  tr:last-child {
    td {
      padding-bottom: 0;
    }
  }
  tr {
    border-bottom: 1px solid #e5e5e5;
    td {
      padding: 12px 0;
      color: #909090;
      font-size: 12px;
      text-align: center;
      .pro-img {
        width: 62px;
        height: 62px;
        margin: 0 15px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
        .sy-logo {
          position: absolute;
          top: 0;
          background: #8cd362;
          color: #fff;
          padding: 0 2px;
          font-size: 0.24rem;
        }
      }
      .pro-info {
        text-align: left;
      }
      p {
        margin-bottom: 5px;
      }
    }
  }
}

.el-select-dropdown__item.selected {
  color: #ff4400 !important;
}

.el-popover.el-popper {
  .popover-c {
    padding: 0 12px;
    p {
      font-size: 12px !important;
      margin-bottom: 5px;
    }
    p:last-child {
      margin-bottom: 0;
      color: #909090;
    }
  }
}

.el-popover {
  padding: 12px 0 !important;
}

.c2 {
  color: #222;
}

#orderList {
  .el-dialog__body {
    padding: 0 !important;
  }
  .main {
    .order-list-tb {
      table {
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
          tr.h20 {
            height: 20px;
            background: #fff;
            border: none;
          }
          tr.h30 {
            height: 30px;
            background: #f1f1f1;
            border-bottom: none;
            .el-icon-delete {
              font-size: 16px;
              margin-right: 15px;
              cursor: pointer;
            }
            .el-icon-delete:hover {
              color: #e4393c;
            }
            .orderh {
              padding: 0 15px;
              .orderh-t,
              .orderh-no span {
                color: #909090;
              }
              .orderh-no {
                margin-left: 20px;
              }
              .orderh-store {
                margin-left: 47px;
                img {
                  margin-left: 5px;
                }
              }
            }
          }
          tr {
            border: 1px solid #e5e5e5;
            margin-bottom: 20px;
            td {
              text-align: center;
            }
          }
          tr.h120 {
            height: 120px;
            background: #fff;
            color: #909090;
            td {
              padding-top: 14px;
              .sl {
                width: 563px;
                height: 30px;
                background: #f1f1f1;
                position: absolute;
                bottom: 0;
                text-align: left;
                line-height: 30px;
                span {
                  margin-left: 15px;
                }
              }
            }
            td.border-r {
              border-right: 1px solid #e5e5e5;
              .detailbtn {
                cursor: pointer;
              }
            }
            p {
              margin-bottom: 5px;
            }
            .pro-img {
              cursor: pointer;
              position: relative;
              width: 62px;
              height: 62px;
              margin: 0 15px;
              img {
                width: 100%;
                height: 100%;
              }
              .sy-logo {
                position: absolute;
                top: 0;
                background: #8cd362;
                color: #fff;
                padding: 0 2px;
                font-size: 0.24rem;
              }
            }
            .pro-info {
              text-align: left;
            }
          }
        }
      }
    }
  }
}
</style>
