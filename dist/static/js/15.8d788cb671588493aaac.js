webpackJsonp([15],{"8Q5a":function(t,e){},TWvY:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s,i=a("//Fk"),r=a.n(i),n=a("Xxa5"),o=a.n(n),l=a("woOf"),c=a.n(l),d=a("exGp"),u=a.n(d),p=a("bOdI"),f=a.n(p),v=(a("Yq4J"),a("+BTi"),a("qubY")),h=a.n(v),g=(a("BWar"),a("IMy7")),m=a.n(g),x=(a("ylrw"),a("6oiW")),_=a.n(x),y=a("j/0j"),C=a("ruXz"),I=a("7R5U"),b=a("VNcD"),S=a("AG1f"),k=a("EY10"),L=a("vsZy"),w=a("kCXn"),P=a("KS/k"),D={mixins:[L.a,w.a,P.a],components:(s={},f()(s,y.a.name,y.a),f()(s,C.a.name,C.a),f()(s,I.a.name,I.a),f()(s,b.a.name,b.a),f()(s,_.a.name,_.a),f()(s,m.a.name,m.a),f()(s,h.a.name,h.a),f()(s,S.a.name,S.a),f()(s,k.a.name,k.a),s),data:function(){return{dialogTableVisible:!1,categoryText:"全部商品",storeInfo:{},liheight:"003"==JSON.parse(localStorage.getItem("userInfo")).userType&&"003"==this.$route.query.type||1==this.$route.query.sellerId?"height: 300px;":"height: 260px;",type:"001"}},created:function(){this.$route.query.type&&(this.type=this.$route.query.type),this.$route.query.sellerId&&(this.sellerId=this.$route.query.sellerId,this.getCategoryList(this.$route.query.sellerId),this.setStoreInfo(this.$route.query.sellerId),this.getProductList())},mounted:function(){$(document).on("click","#category ul li",function(){$(this).addClass("active").siblings().removeClass("active")})},methods:{handleCurrentChange:function(t){this.pageNum=t,this.getProductList()},getSellerId:function(){},setStoreInfo:function(t){var e=this;return u()(o.a.mark(function a(){var s,i;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.getStoreInfoById(t);case 2:return s=a.sent,a.next=5,e.getStoreReputation(t);case 5:i=a.sent,e.storeInfo=c()(s,i);case 7:case"end":return a.stop()}},a,e)}))()},getProductList:function(){var t=this;this.proLoading=!0;var e=void 0;e=this.userInfo?{purchaserId:this.userInfo.typeCode,buyerId:this.userInfo.typeCode,supplierId:this.sellerId||"",gbgoodsid:this.gbgoodsId,keyWord:this.keyWord,pageSize:this.pageSize,pageNum:this.pageNum}:{supplierId:this.sellerId||"",gbgoodsid:this.gbgoodsId,keyWord:this.keyWord,pageSize:this.pageSize,pageNum:this.pageNum},""==this.sellerId&&delete e.supplierId,this.postRequest("product/getProByQuotationForYP",e).then(function(e){t.proLoading=!1,e.data&&0==e.data.state&&(t.productList=e.data.aaData,t.$store.dispatch("setProductList_AC",e.data.aaData),t.productDataCount=e.data.dataCount)})},getStoreInfoById:function(t){var e=this;return new r.a(function(a,s){e.postRequest("store/queryBySellerId",{sellerId:t}).then(function(t){t.data&&0==t.data.state&&t.data.aaData&&a(t.data.aaData)})})},getSellerInfoById:function(t){var e=this;return new r.a(function(a,s){e.postRequest("customer/selectById",{sellerId:t}).then(function(t){t.data&&0==t.data.state&&t.data.aaData&&a(t.data.aaData)})})},getStoreReputation:function(t){var e=this;return new r.a(function(a,s){e.postRequest("reputation/list",{customerId:t}).then(function(t){if(t.data&&0==t.data.state){var s={};if(t.data.aaData.length>0)switch(t.data.aaData[0].reputationLevel){case"A":s.reputationVal=5,s.reputationLevel="A";break;case"B":s.reputationVal=4,s.reputationLevel="B";break;case"C":s.reputationVal=3,s.reputationLevel="C";break;case"D":s.reputationVal=2,s.reputationLevel="D";break;default:e.reputationVal=1,e.reputationLevel="E"}else s.reputationVal=5,s.reputationLevel="A";a(s)}})})},addShoppingCar:function(t,e){var a={productId:t.id,sellerId:this.sellerId,sellerName:this.sellerName,type:e};""==this.sellerId&&(a.sellerId=t.customerId,a.sellerName=t.createdPersonName,a.type="search"),this.modalEdit(a)},submitShopCar:function(){this.modalClose(),this.dialogTableVisible=!0},toShoppingCar:function(){this.$router.push({name:"shoppingCar"})},closeSuccessModal:function(){this.dialogTableVisible=!1},toevalist:function(t){console.log(t),this.$router.push({name:"evaluationList",params:{storeInfo:t}})}}},q={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"PersonalBuyStore"}},[s("shop-header"),t._v(" "),s("shop-search",{attrs:{isStore:!0,showClassify:!1},on:{getSellerId:t.getSellerId}}),t._v(" "),s("div",{staticClass:"page-content"},[s("div",{staticClass:"store-info min-width flex flex-x-between"},[s("div",{staticClass:"flex flex-y-center"},[s("div",{staticClass:"store-name"},[s("strong",[t._v(t._s(t.storeInfo.storeName))])]),t._v(" "),s("div",{staticStyle:{width:"1px",height:"30px",background:"#DFDFDF"}}),t._v(" "),s("div",{staticClass:"store-pingfen flex flex-y-center"},[s("span",{staticClass:"lookpj",on:{click:function(e){t.toevalist(t.storeInfo)}}},[t._v("信用等级")]),t._v("：\n          "),s("el-rate",{attrs:{disabled:""},model:{value:t.storeInfo.reputationVal,callback:function(e){t.$set(t.storeInfo,"reputationVal",e)},expression:"storeInfo.reputationVal"}}),t._v(" "),s("span",{staticStyle:{color:"#FF541F"}},[t._v(t._s(t.storeInfo.reputationLevel))])],1)]),t._v(" "),s("div",{staticClass:"flex flex-y-center"},[s("div",{staticClass:"critem flex flex-y-center"},[s("img",{staticClass:"icon",attrs:{src:a("eEgi")}}),t._v(" "),s("span",[t._v("联系卖家："+t._s(t.storeInfo.phoneNumber))])])])]),t._v(" "),s("section",{staticClass:"market-name flex flex-x-center flex-y-center"},[t._v(t._s(t.storeInfo.storeName))]),t._v(" "),s("section",{staticClass:"pro-list min-width flex flex-x-between"},[s("div",{staticClass:"left"},[s("div",{staticClass:"store-title flex flex-x-center flex-y-center"},[t._v("店铺商品分类")]),t._v(" "),s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.categoryLoading,expression:"categoryLoading"}],attrs:{id:"category"}},[t.categoryList.length>0?s("ul",[s("li",{staticClass:"active",on:{click:function(e){t.categoryChange("","全部商品")}}},[t._m(0)]),t._v(" "),t._l(t.categoryList,function(e){return s("li",[s("div",{staticClass:"flex flex-x-between flex-y-center listem",on:{click:function(a){t.categoryChange(e.gbgoodsId,e.name)}}},[s("div",{staticClass:"flex flex-y-center"},[s("strong",[t._v(t._s(e.name))])]),t._v(" "),e.childList?s("div",{staticClass:"arrow-r"}):t._e()]),t._v(" "),e.childList?s("div",{staticClass:"fenlist flex"},t._l(e.childList,function(e,a){return s("div",[s("span",{on:{click:function(a){t.categoryChange(e.gbgoodsId,e.name)}}},[t._v(t._s(e.name))])])})):t._e()])})],2):t._e()])]),t._v(" "),s("div",{staticClass:"right"},[s("div",{staticClass:"page-num flex flex-y-center flex-x-between"},[s("strong",{staticClass:"title"},[t._v(t._s(t.categoryText))]),t._v(" "),s("div",{staticClass:"flex flex-y-center"},["oftenbuy"==t.gbgoodsId?[s("el-pagination",{attrs:{background:"",small:"",layout:"total,prev, pager, next",total:t.oftenbuyDataCount,"page-size":this.oftenbuyPageSize},on:{"current-change":t.handleCurrentoftenbuyChange}})]:[s("el-pagination",{attrs:{background:"",small:"",layout:"total,prev, pager, next",total:t.productDataCount,"page-size":this.pageSize},on:{"current-change":t.handleCurrentChange}})]],2)]),t._v(" "),s("div",{staticClass:"pro-list-wrapper"},[t.productList.length>0?s("ul",{staticClass:"pro-list flex"},t._l(t.productList,function(e){return s("li",{style:t.liheight},[s("div",{staticClass:"item"},[s("div",{staticClass:"pro-img"},[e.productPicUrl?s("img",{attrs:{src:t.imgURL+e.productPicUrl}}):s("img",{attrs:{src:a("vmrj")}}),t._v(" "),1==e.isMuslim?s("div",{staticClass:"muslim"},[s("img",{attrs:{src:a("OMlq"),alt:""}})]):t._e()]),t._v(" "),s("div",{staticClass:"pro-text"},[s("div",{staticClass:"pro-price flex flex-x-between flex-y-center"},[s("div",{staticClass:"p1"},[1==e.isPomotion&&""!=e.promotionalPricing&&null!=e.promotionalPricing?s("span",[t._v(t._s("￥"+e.promotionalPricing.toFixed(2)))]):[e.productMinPrice!=e.productMaxPrice?s("span",[t._v(t._s("￥"+e.productMinPrice+"~"+e.productMaxPrice))]):s("span",[t._v(t._s("￥"+e.price))])]],2),t._v(" "),1==e.isPomotion?s("div",{staticClass:"flex"},[s("div",{staticClass:"p2"},[t._v(t._s("￥"+e.price))]),t._v(" "),t._m(1,!0)]):t._e()]),t._v(" "),s("div",{staticClass:"pro-name ellipsis"},[t._v(t._s(e.name))]),t._v(" "),s("div",{staticClass:"pro-ms ellipsis",attrs:{title:e.remark}},[t._v(t._s(e.remark||"暂无描述"))]),t._v(" "),"003"==t.userInfo.userType&&"003"==t.type||1==t.storeInfo.sellerId?s("div",{staticClass:"pro-btns flex flex-y-center"},[s("div",{staticClass:"scbtn flex-y-center flex-x-center flex",on:{click:function(a){t.addShoppingCar(e,"collection")}}},[s("img",{attrs:{src:a("wWm9"),alt:""}}),t._v(" "),s("span",[t._v("收藏")])]),t._v(" "),s("div",{staticClass:"addcarbtn flex-y-center flex-x-center flex",on:{click:function(a){t.addShoppingCar(e)}}},[s("img",{attrs:{src:a("1ehB"),alt:""}}),t._v(" "),s("span",[t._v("加入购物车")])])]):t._e()])])])})):s("div",{staticClass:"flex flex-x-center flex-y-center",staticStyle:{height:"444px",color:"#d1d1d1"}},[t._m(2)])])])])]),t._v(" "),s("shop-footer"),t._v(" "),t.modalShow?s("shopcar-modal",{attrs:{modal:t.modalShow,params:t.modalParams},on:{close:t.modalClose,submitShopCar:t.submitShopCar}}):t._e(),t._v(" "),s("el-dialog",{attrs:{title:"添加成功",visible:t.dialogTableVisible,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[s("shopcar-sumodal",{on:{toShoppingCar:t.toShoppingCar,closeSuccessModal:t.closeSuccessModal}})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flex flex-x-between flex-y-center listem"},[e("div",{staticClass:"flex flex-y-center"},[e("strong",[this._v("全部商品")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"cuxbg flex flex-y-center flex-x-center"},[e("span",[this._v("促销")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("img",{attrs:{src:a("vmrj")}}),this._v(" "),e("p",{staticClass:"tac"},[this._v("暂无商品")])])}]};var V=a("VU/8")(D,q,!1,function(t){a("8Q5a")},null,null);e.default=V.exports}});
//# sourceMappingURL=15.8d788cb671588493aaac.js.map