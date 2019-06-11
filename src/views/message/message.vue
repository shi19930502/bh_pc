<template>
  <div id="userCenter">
    <shop-header />
    <!--搜索-->
    <shop-search :showClassify="false" pageName="消息" />

    <!--主体-->
    <section class="user-content">
      <div class="min-width flex flex-x-between">
        <div class="user-content-l">
          <ul>
            <li>
              <strong>消息</strong>
              <p>我的消息</p>
              <!--<router-link to="/userCenter/orderList">我的订单</router-link>
							<router-link to="/userCenter/orderEvaluate">订单评价</router-link>-->
            </li>
          </ul>
        </div>
        <div class="user-content-r">
          <!--<router-view></router-view>-->
          <div class="navbar flex flex-y-center">我的消息</div>
          <div class="main">
            <div v-if="megList.length>0">
              <ul id="msglist">
                <li v-for="d in megList">
                  <div class="flex flex-x-center">
                    <div class="date">{{d.publishedDate}}</div>
                  </div>
                  <div class="mes">
                    <div class="mes-title">{{d.title}}</div>
                    <div class="mes-body">{{d.comment}}</div>
                    <div class="mes-sender">{{d.customerName}}</div>
                    <div v-if="d.file">
                      <span>附件下载：</span>
                      <a :href="imgURL+d.file.filePath+'?'+d.file.fileName" class="click-a">{{d.file.fileName}}</a>
                    </div>

                  </div>
                </li>
              </ul>
              <div class="flex flex-x-end" style="margin-top: 20px;">
                <el-pagination background small layout="total,prev, pager, next" :total="productDataCount" @current-change="handleCurrentChange"
                  :page-size="pageSize">
                </el-pagination>
              </div>
            </div>
            <div v-else class=" flex flex-x-center flex-y-center" style="height: 544px;color: #d1d1d1;">
              <div>
                <img src="../../../static/img/my_default_img.png" />
                <p class="tac">暂无消息</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <shop-footer />

  </div>
</template>
<script>
  import ShopTop from '../components/header.vue'
  import ShopFooter from '../components/footer.vue'
  import btn from '../components/shopbtn.vue'
  import Search from '../components/search.vue'

  import {
    Badge,
    Dialog,
    Table,
    TableColumn,
    InputNumber,
    Pagination
  } from 'element-ui'
  import mixin from '../../utils/mixin.js'
  export default {
    mixins: [mixin],
    components: {
      [ShopTop.name]: ShopTop,
      [ShopFooter.name]: ShopFooter,
      [btn.name]: btn,
      [Search.name]: Search,

      // element component
      [Badge.name]: Badge,
      [Dialog.name]: Dialog,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [InputNumber.name]: InputNumber,
      [Pagination.name]: Pagination,

    },
    data() {
      return {
        pageSize: 5,
        pageNum: 1,
        productDataCount: 0,
        megList: [],
        count: 0,
        msgFileList: []
      }
    },
    created() {
      // 获取消息id
      if (this.$route.query.id) {
        this.readMsg(this.$route.query.id)
      } else {
        this.getUserMessageAll()
      }
			
			// this.queryMsgFileByPage()
    },
    mounted() {},
    methods: {
      /**
       * 查看消息
       */
      readMsg(id) {
        this.postRequest('platformnoticeflow/queryById', {
          id: id
        }).then(resp => {
          if (resp.data && resp.data.state == 0) {
            this.geMsgFile([resp.data.aaData])
            this.productDataCount = 1
          }
        })
      },
      /**
       * 获取消息列表
       */
      getUserMessageAll() {
        this.postRequest('platformnoticeflow/list', {
          customerId: this.userInfo.userId,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then(d => {
          if (d.data && d.data.state == 0) {
            this.geMsgFile(d.data.aaData)
            this.productDataCount = d.data.dataCount
          }
        })
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.getUserMessageAll()
      },
      /**
       * 递归获取获取附件
       */
      geMsgFile(arr) {
        if (this.count < arr.length) {
          var param = {
            sourceObjectType: '002', //公告附件
            sourceObjectId: arr[this.count].id,
          }
          this.postRequest('uploadfilerecode/list', param).then(d => {
            if (d.data && d.data.state == 0) {
              if (d.data.aaData.length > 0) {
                arr[this.count].file = d.data.aaData[0]
              }
              this.count++
                this.geMsgFile(arr)
            }
          })
        } else {
          this.megList = arr
        }
      },
      /**
       * 通过接口获取通知及附件
       */
      queryMsgFileByPage() {
        this.postRequest('platformnoticeflow/queryMsgFileByPage', {
          customerId: this.userInfo.userId,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then(d => {
          if (d.data && d.data.state == 0) {
            console.log(d.data.aaData)
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/css/userCenter.scss';
  .router-link-active {
    color: #FF4400 !important;
  }

  #msglist {
    li {
      margin-top: 30px;
    }
    .date {
      height: 20px;
      line-height: 20px;
      background: #f7f7f7;
      width: 144px;
      text-align: center;
      color: #666;
      margin-bottom: 20px;
    }
    .mes {
      padding: 10px 20px;
      background: #f7f7f7;
      .mes-title {
        font-size: 14px;
        font-weight: 600;
        border-bottom: 1px solid #D3D3D3;
        padding-bottom: 10px;
      }
      .mes-body {
        padding: 10px 0;
      }
      .mes-sender {
        padding-bottom: 6px;
        font-size: 12px;
        color: #999999;
      }
    }
  }
</style>
