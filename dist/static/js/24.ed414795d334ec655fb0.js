webpackJsonp([24],{F025:function(t,e){},cuFS:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,s=a("bOdI"),i=a.n(s),l=(a("ylrw"),a("+BTi"),a("6oiW")),n=a.n(l),d=(a("Yq4J"),a("qubY")),o=a.n(d),c=(a("8z31"),a("SXzR")),v=a.n(c),p=(a("I4nB"),a("STLj")),_=a.n(p),u=(a("cDSy"),a("e0Bm")),m=a.n(u),h=(a("GXEp"),a("mtrD")),g=a.n(h),f=(a("X+ky"),a("HJMx")),b=a.n(f),x=(a("DSCY"),a("LaeV")),C=a.n(x),y=(a("IxJZ"),a("NoPp")),O=a.n(y),w=(a("Dte2"),a("q4le")),S=a.n(w),T=(a("isE6"),a("LR6y")),L=a.n(T),N=a("j/0j"),U=a("ruXz"),I=a("VNcD"),k=a("vsZy"),z=a("pyzf"),F={mixins:[k.a],components:(r={},i()(r,N.a.name,N.a),i()(r,U.a.name,U.a),i()(r,I.a.name,I.a),i()(r,L.a.name,L.a),i()(r,S.a.name,S.a),i()(r,O.a.name,O.a),i()(r,C.a.name,C.a),i()(r,b.a.name,b.a),i()(r,g.a.name,g.a),i()(r,m.a.name,m.a),i()(r,_.a.name,_.a),i()(r,v.a.name,v.a),i()(r,o.a.name,o.a),i()(r,n.a.name,n.a),r),data:function(){return{iframeUrl:"",dialogFormVisible:!1,activeName:"0",options:[{value:"1",label:"近一个月订单"},{value:"2",label:"三个月内订单"},{value:"3",label:"半年内订单"},{value:"4",label:"今年内订单"}],value:"1",pageNum:1,pageSize:5,orderStatusId:"0",orderUmber:"",dataCount:0,currentPage:1,OrderList:[]}},created:function(){this.getOrderList()},mounted:function(){},methods:{suyuan:function(t,e){"0"!=e.orderStatusId&&"1"!=e.orderStatusId&&"6"!=e.orderStatusId&&"7"!=e.orderStatusId&&t.suyuanCode&&(this.iframeUrl=""+z.a.SUYUAN_URL+t.suyuanCode,console.log(this.iframeUrl),this.$refs.suyuanIframe&&(this.$refs.suyuanIframe.innerHTML='<iframe src="'+this.iframeUrl+'" frameborder="0" height="500px" width="100%"></iframe>'),this.dialogFormVisible=!0)},queryByOrderUmber:function(){this.pageNum=1,this.activeName="all",this.getOrderList()},getOrderList:function(){var t=this;this.postRequest("order/listByUser",{pageNum:this.pageNum,pageSize:this.pageSize,orderStatusId:this.orderStatusId,orderUmber:this.orderUmber,checkType:"buy"}).then(function(e){e.data&&0==e.data.state&&(t.OrderList=e.data.aaData,t.dataCount=e.data.dataCount)})},handleClick:function(t,e){this.orderStatusId="all"===this.activeName?"":this.activeName,this.getOrderList()},findOrderDetails:function(t,e){this.$router.push({name:"orderDetails",query:{orderId:t,orderUmber:e}})},handleSizeChange:function(t){this.pageSize=t,this.getOrderList()},handleCurrentChange:function(t){this.pageNum=t,this.getOrderList()}}},q={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"orderList"}},[r("div",{staticClass:"navbar flex flex-y-center"},[t._v("我的订单")]),t._v(" "),r("div",{staticClass:"main"},[r("div",{staticClass:"status-item flex flex-x-between"},[r("div",{staticClass:"flex"},[r("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[r("el-tab-pane",{attrs:{label:"全部订单",name:"all"}}),t._v(" "),r("el-tab-pane",{attrs:{label:"待受理",name:"0"}}),t._v(" "),r("el-tab-pane",{attrs:{label:"待分拣",name:"1"}}),t._v(" "),r("el-tab-pane",{attrs:{label:"待配送",name:"2"}}),t._v(" "),r("el-tab-pane",{attrs:{label:"配送中",name:"3"}}),t._v(" "),r("el-tab-pane",{attrs:{label:"已收货",name:"4"}}),t._v(" "),r("el-tab-pane",{attrs:{label:"已完成",name:"5"}}),t._v(" "),r("el-tab-pane",{attrs:{label:"已拒绝",name:"6"}}),t._v(" "),r("el-tab-pane",{attrs:{label:"已取消",name:"7"}})],1)],1),t._v(" "),r("div",[r("el-input",{staticClass:"input-with-select",attrs:{placeholder:"订单号",size:"mini"},model:{value:t.orderUmber,callback:function(e){t.orderUmber=e},expression:"orderUmber"}},[r("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.queryByOrderUmber},slot:"append"})],1)],1)]),t._v(" "),r("div",{staticClass:"order-list-tb"},[r("table",{staticStyle:{width:"100%"},attrs:{border:"0"}},[r("tr",{staticClass:"tbhead"},[r("th",{attrs:{width:"130px"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.options,function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),r("th",{attrs:{width:"118px"}},[t._v("订单详情")]),t._v(" "),r("th",{attrs:{width:"73px"}},[t._v("单价")]),t._v(" "),r("th",{attrs:{width:"142px"}},[t._v("数量")]),t._v(" "),r("th",{attrs:{width:"101px"}},[t._v("小计")]),t._v(" "),r("th",{attrs:{width:"95px"}},[t._v("收货人")]),t._v(" "),r("th",{attrs:{width:"150px"}},[t._v("总计")]),t._v(" "),r("th",{attrs:{width:"106px"}},[t._v("订单状态")]),t._v(" "),r("th",{attrs:{width:"125px"}},[t._v("操作")])]),t._v(" "),r("tbody",[t._l(t.OrderList,function(e){return[r("tr",{staticClass:"h20"}),t._v(" "),r("tr",{staticClass:"h30"},[r("td",{attrs:{colspan:"9"}},[r("div",{staticClass:"flex flex-x-between flex-y-center"},[r("div",{staticClass:"orderh flex flex-y-center"},[r("div",{staticClass:"orderh-t"},[t._v(t._s(e.createdDate))]),t._v(" "),r("div",{staticClass:"orderh-no"},[r("span",[t._v("订单号：")]),t._v(" "),r("strong",[t._v(t._s(e.orderUmber))])]),t._v(" "),r("div",{staticClass:"orderh-store flex flex-y-center"},[r("span",[t._v(t._s(e.sellerName))]),t._v(" "),r("img",{attrs:{src:a("eEgi")}})])])])])]),t._v(" "),r("tr",{staticClass:"h120"},[r("td",{staticStyle:{position:"relative"},attrs:{colspan:"2",valign:"top"}},[r("div",{staticClass:"flex"},[r("div",{staticClass:"pro-img",on:{click:function(a){t.suyuan(e.orderitemList[0],e)}}},[e.orderitemList[0].productPicUrl?r("img",{attrs:{src:t.imgURL+e.orderitemList[0].productPicUrl}}):r("img",{attrs:{src:a("vmrj")}}),t._v(" "),"0"!=e.orderStatusId&&"1"!=e.orderStatusId&&"6"!=e.orderStatusId&&"7"!=e.orderStatusId&&e.orderitemList[0].suyuanCode?r("div",{staticClass:"sy-logo"},[t._v("溯源")]):t._e()]),t._v(" "),r("div",{staticClass:"pro-info"},[r("p",{staticClass:"c2"},[t._v(t._s(e.orderitemList[0].productName))]),t._v(" "),r("p",[t._v(t._s(e.orderitemList[0].skuName))])])]),t._v(" "),e.orderitemList.length>1?[r("el-popover",{attrs:{width:"565",placement:"bottom",trigger:"click"}},[r("table",{staticStyle:{width:"100%"},attrs:{border:"0",id:"moreOrderTab"}},t._l(e.orderitemList,function(s){return r("tr",[r("td",{attrs:{width:"248px"}},[r("div",{staticClass:"flex"},[r("div",{staticClass:"pro-img",staticStyle:{position:"relative"},on:{click:function(a){t.suyuan(s,e)}}},[s.productPicUrl?r("img",{attrs:{src:t.imgURL+s.productPicUrl}}):r("img",{attrs:{src:a("vmrj")}}),t._v(" "),"0"!=e.orderStatusId&&"1"!=e.orderStatusId&&s.suyuanCode?r("div",{staticClass:"sy-logo"},[t._v("溯源")]):t._e()]),t._v(" "),r("div",{staticClass:"pro-info"},[r("p",{staticClass:"c2"},[t._v(t._s(s.productName))]),t._v(" "),r("p",[t._v(t._s(s.skuName))])])])]),t._v(" "),r("td",{attrs:{width:"73px",align:"top"}},[t._v(t._s("￥"+s.price/100))]),t._v(" "),r("td",{attrs:{width:"142px",align:"top"}},[r("p",[t._v("订单数量 "+t._s(s.quantity))]),t._v(" "),r("p",[t._v("分拣数量 "+t._s(s.sortingWeight||"-"))]),t._v(" "),r("p",[t._v("验收数量 "+t._s(s.inspectedWeight||"-"))])]),t._v(" "),r("td",{attrs:{width:"101px",align:"top"}},[t._v(t._s("￥"+s.itemTotal/100))])])})),t._v(" "),r("div",{staticClass:"sl",attrs:{slot:"reference"},slot:"reference"},[r("span",[t._v("共"+t._s(e.orderitemList.length)+"件商品")])])])]:[r("div",{staticClass:"sl",attrs:{slot:"reference"},slot:"reference"},[r("span",[t._v("共"+t._s(e.orderitemList.length)+"件商品")])])]],2),t._v(" "),r("td",{attrs:{valign:"top"}},[r("span",[t._v("￥"+t._s(e.orderitemList[0].price/100))])]),t._v(" "),r("td",{attrs:{valign:"top"}},[r("p",[t._v("订单数量 "+t._s(e.orderitemList[0].quantity))]),t._v(" "),r("p",[t._v("分拣数量 "+t._s(e.orderitemList[0].sortingWeight||"-"))]),t._v(" "),r("p",[t._v("验收数量 "+t._s(e.orderitemList[0].inspectedWeight||"-"))])]),t._v(" "),r("td",{staticClass:"border-r",attrs:{valign:"top"}},[r("span",[t._v(t._s("￥"+e.orderitemList[0].itemTotal/100))])]),t._v(" "),r("td",{staticClass:"border-r",attrs:{valign:"top"}},[0==e.distributionType?[t._m(0,!0)]:[r("el-popover",{attrs:{placement:"left",width:"269",trigger:"hover"}},[r("div",{staticClass:"popover-c"},[r("p",{staticClass:"c2"},[t._v(t._s(e.buyerName))]),t._v(" "),r("p",[t._v(t._s(e.shippingAdd))]),t._v(" "),r("p",[t._v(t._s(e.buyerTel))])]),t._v(" "),r("div",{staticClass:"flex flex-y-center flex-x-center",staticStyle:{cursor:"pointer"},attrs:{slot:"reference"},slot:"reference"},[r("span",{staticClass:"c2"},[t._v(t._s(e.buyerName))]),t._v(" "),r("img",{staticStyle:{"margin-left":"5px"},attrs:{src:a("QZiU")}})])])]],2),t._v(" "),r("td",{staticClass:"border-r",attrs:{valign:"top"}},[r("p",[t._v("配送费￥"+t._s(e.shippingTotal))]),t._v(" "),r("p",{directives:[{name:"show",rawName:"v-show",value:null==e.sortingOrderTotal||0==e.sortingOrderTotal&&null==e.inspectedOrderTotal,expression:"d.sortingOrderTotal ==null || d.sortingOrderTotal == 0 && d.inspectedOrderTotal ==null"}]},[t._v("订单金额￥"+t._s(e.orderTotal/100))]),t._v(" "),r("p",{directives:[{name:"show",rawName:"v-show",value:e.sortingOrderTotal>0&&0==e.inspectedOrderTotal,expression:"d.sortingOrderTotal>0 && d.inspectedOrderTotal==0"}]},[t._v("订单金额￥"+t._s(e.sortingOrderTotal?"￥"+e.sortingOrderTotal/100:"-"))]),t._v(" "),r("p",{directives:[{name:"show",rawName:"v-show",value:e.inspectedOrderTotal>0,expression:"d.inspectedOrderTotal>0"}]},[t._v("订单金额￥"+t._s(e.inspectedOrderTotal?"￥"+e.inspectedOrderTotal/100:"-"))]),t._v(" "),null==e.sortingOrderTotal||0==e.sortingOrderTotal&&null==e.inspectedOrderTotal?r("p",[t._v("总计￥"+t._s((e.shippingTotal+e.orderTotal/100).toFixed(2)))]):t._e(),t._v(" "),e.sortingOrderTotal>0&&0==e.inspectedOrderTotal?r("p",[t._v("总计￥"+t._s((e.sortingOrderTotal+e.orderTotal/100).toFixed(2)))]):t._e(),t._v(" "),e.inspectedOrderTotal>0?r("p",[t._v("总计￥"+t._s((e.shippingTotal+e.inspectedOrderTotal/100).toFixed(2)))]):t._e()]),t._v(" "),r("td",{staticClass:"border-r",attrs:{valign:"top"}},[r("p",[t._v(t._s(e.orderStatusName))]),t._v(" "),r("p",{staticClass:"c2 detailbtn click-a",on:{click:function(a){t.findOrderDetails(e.id,e.orderUmber)}}},[t._v("订单详情")])]),t._v(" "),r("td",{attrs:{valign:"top"}},[r("div",{staticClass:"flex flex-x-center"},[r("shop-btn",{directives:[{name:"show",rawName:"v-show",value:0==e.orderStatusId,expression:"d.orderStatusId == 0"}],attrs:{width:"87px",height:"29px",text:"取消订单",marginR:"0",fontsize:"12px"},nativeOn:{click:function(a){t.orderCancel(e.id,t.getOrderList)}}}),t._v(" "),r("shop-btn",{directives:[{name:"show",rawName:"v-show",value:3==e.orderStatusId,expression:"d.orderStatusId == 3"}],attrs:{width:"87px",height:"29px",text:"确认收货",marginR:"0",fontsize:"12px"},nativeOn:{click:function(a){t.orderCancel(e.id,t.getOrderList,"qrsh",e)}}})],1)])])]})],2)]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:0==t.OrderList.length,expression:"OrderList.length==0"}],staticClass:"nodata flex flex-x-center flex-y-center",staticStyle:{height:"418px",color:"#d1d1d1"}},[t._m(1)])]),t._v(" "),r("div",{staticClass:"flex flex-x-end",staticStyle:{"margin-top":"20px"}},[r("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:t.dataCount,"page-size":t.pageSize,"page-sizes":[5,10,15,20],"current-page":t.currentPage},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)]),t._v(" "),r("el-dialog",{attrs:{title:"溯源信息",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[r("div",{ref:"suyuanIframe"},[r("iframe",{attrs:{src:t.iframeUrl,frameborder:"0",height:"500px",width:"100%"}})])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("span",{staticClass:"c2"},[this._v("自提")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("img",{attrs:{src:a("nXxh")}}),this._v(" "),e("p",{staticClass:"tac"},[this._v("暂无订单")])])}]};var D=a("VU/8")(F,q,!1,function(t){a("F025")},null,null);e.default=D.exports}});
//# sourceMappingURL=24.ed414795d334ec655fb0.js.map