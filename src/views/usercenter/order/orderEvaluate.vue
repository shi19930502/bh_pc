<template>
  <div id="orderList">
    <div class="navbar flex flex-y-center">我的订单</div>
    <div class="main">
      <div class="status-item flex flex-x-between">
        <div class="flex">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="待评价订单" name="5"></el-tab-pane>
            <el-tab-pane label="已评价" name="8"></el-tab-pane>
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
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
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
                        <img src="../../../../static/img/home_icon_phone.png" />
                      </div>
                    </div>
                    <!--<div><i class="el-icon-delete"></i></div>-->
                  </div>
                </td>
              </tr>
              <tr class="h120">
                <td colspan="2" valign="top" style="position: relative;">
                  <div class="flex">
                    <div class="pro-img">
                      <img v-if="d.orderitemList[0].productPicUrl" :src="imgURL+d.orderitemList[0].productPicUrl" />
                      <img v-else src="../../../../static/img/my_default_img.png" />
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
                              <div class="pro-img">
                                <img v-if="pros.productPicUrl" :src="imgURL+pros.productPicUrl" />
                                <img v-else src="../../../../static/img/my_default_img.png" />
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
                  <el-popover placement="left" width="269" trigger="hover">
                    <div class="popover-c">
                      <p class="c2">{{d.buyerName}}</p>
                      <p>{{d.shippingAdd}}</p>
                      <p>159****7814</p>
                    </div>
                    <div slot="reference" class="flex flex-y-center flex-x-center" style="cursor: pointer;">
                      <span class="c2">{{d.buyerName}}</span>
                      <img src="../../../../static/img/icon-home_mine.png" style="margin-left: 5px;" />
                    </div>
                  </el-popover>
                </td>
                <td class="border-r" valign="top">
                  <p>订单金额￥{{d.orderTotal/100}}</p>
                  <p>分拣金额{{d.sortingOrderTotal ? '￥'+d.sortingOrderTotal/100 : '-'}}</p>
                  <p>验收金额{{d.inspectedOrderTotal ? '￥'+d.inspectedOrderTotal/100 : '-'}}</p>
                </td>
                <td class="border-r" valign="top">
                  <p>{{d.orderStatusName}}</p>
                  <p class="c2 detailbtn click-a" @click="findOrderDetails(d.id,d.orderUmber)">订单详情</p>
                </td>
                <td valign="top">
                  <div class="flex flex-x-center">
                    <!--<shop-btn @click.native="toevaluation(d)" v-show="d.orderStatusId == 4" width="87px" height="29px" text="我要评价" marginR="0" fontsize="12px"></shop-btn>-->
                    <shop-btn @click.native="toevaluation(d)" v-show="d.orderStatusId == 4 || d.orderStatusId == 5" width="87px" height="29px"
                      text="我要评价" marginR="0" fontsize="12px"></shop-btn>
                    <shop-btn @click.native="toevaluation(d,'find')" v-show="d.orderStatusId == 8" width="87px" height="29px" text="查看评价" marginR="0"
                      fontsize="12px"></shop-btn>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div v-show="OrderList.length==0" class="nodata flex flex-x-center flex-y-center" style="height: 418px;color: #d1d1d1;">
          <div>
            <img src="../../../../static/img/my_default_img.jpg" />
            <p class="tac">暂无订单</p>
          </div>
        </div>
      </div>
      <div class="flex flex-x-end" style="margin-top: 20px;">
        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataCount" :page-size="pageSize" :page-sizes="[5,10, 15,20]"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import ShopTop from '../../components/header.vue'
  import ShopFooter from '../../components/footer.vue'
  import btn from '../../components/shopbtn.vue'
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
    Pagination
  } from 'element-ui'
  import mixin from '../../../utils/mixin.js'

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
      [Pagination.name]: Pagination,

    },
    data() {
      return {
        input5: '',
        activeName: '5',
        options: [{
          value: '1',
          label: '近一个月订单'
        }, {
          value: '2',
          label: '三个月内订单'
        }, {
          value: '3',
          label: '半年内订单'
        }, {
          value: '4',
          label: '今年内订单'
        }],
        value: '1',

        pageNum: 1,
        pageSize: 5,
        orderStatusId: '5',
        orderUmber: '',
        dataCount: 0,
        currentPage: 1,
        OrderList: []
      }
    },
    created() {
			if( this.$route.query.orderStatusId){
				this.activeName = this.$route.query.orderStatusId
				this.orderStatusId = this.$route.query.orderStatusId
			}
     
      this.getOrderList()
    },
    mounted() {

    },
    methods: {
      /**
       * 根据订单号搜索
       */
      queryByOrderUmber() {
        this.pageNum = 1
        this.getOrderList()
      },
      /**
       * 获取订单列表
       */
      getOrderList() {
        this.postRequest('order/listByUser', {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          orderStatusId: this.orderStatusId,
          orderUmber: this.orderUmber,
					checkType: 'buy'
        }).then(resp => {
          if (resp.data && resp.data.state == 0) {
            this.OrderList = resp.data.aaData
            this.dataCount = resp.data.dataCount
          }
        })
      },
      /**
       * tabs 
       */
      handleClick(tab, event) {
        this.orderStatusId = this.activeName
        this.$route.query.orderStatusId = this.activeName
        this.getOrderList()
      },
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
       * 每页显示条数改变
       */
      handleSizeChange(val) {
        this.pageSize = val
        this.getOrderList()
      },
      /**
       * 分页改变
       */
      handleCurrentChange(val) {
        this.pageNum = val
        this.getOrderList()
      },
      /**
       * 订单评价
       */
      toevaluation(d, type) {
        var param = {
          orderId: d.id,
          sellerId: d.sellerId,
          orderUmber: d.orderUmber
        }
        if (type) {
          param.type = 1
        }
        this.$router.push({
          name: 'OEvaluation',
          query: param
        })
      }
    }
  }
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
      border-bottom: 1px solid #E5E5E5;
      td {
        padding: 12px 0;
        color: #909090;
        font-size: 12px;
        text-align: center;
        .pro-img {
          width: 62px;
          height: 62px;
          margin: 0 15px;
          img {
            width: 100%;
            height: 100%;
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
    color: #FF4400 !important;
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
    .main {
      .order-list-tb {
        table {
          tr.tbhead {
            height: 34px;
            background: #F1F1F1;
            .el-input.el-input--suffix {
              input {
                background: #F1F1F1 !important;
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
              background: #F1F1F1;
              border-bottom: none;
              .el-icon-delete {
                font-size: 16px;
                margin-right: 15px;
                cursor: pointer;
              }
              .el-icon-delete:hover {
                color: #E4393C;
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
              border: 1px solid #E5E5E5;
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
                  background: #F1F1F1;
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
                border-right: 1px solid #E5E5E5;
                .detailbtn {
                  cursor: pointer;
                }
              }
              p {
                margin-bottom: 5px;
              }
              .pro-img {
                width: 62px;
                height: 62px;
                margin: 0 15px;
                img {
                  width: 100%;
                  height: 100%;
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
