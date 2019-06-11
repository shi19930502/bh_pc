<template>
  <div id="loginPage">
    <!--logo-->
    <section class="shop-search flex flex-y-center">
      <div class="min-width">
        <ul class="flex flex-x-between flex-y-center">
          <li class="logo flex flex-y-end">
            <div class="logo-l"></div>
            <strong>欢迎登录</strong>
          </li>
          <!-- <li>
						<div class="logo-r"></div>
          </li>-->
        </ul>
      </div>
    </section>
    <!--form-->
    <section class="form-container flex flex-y-center">
      <div class="flex flex-x-between flex-y-center min-width">
        <div class="bannerimg">
          <!-- <img src="../../static/img/northring/banner1.png" alt=""> -->
        </div>
        <div class="form">
          <div class="form-head flex flex-y-center flex-x-center">安全登录</div>
          <div class="form-body" v-loading="loading">
            <el-form ref="form" :model="form" :rules="rules" style="margin-top: 20px;">
              <el-form-item label="用户昵称" prop="username">
                <div class="form-group">
                  <el-input
                    type="text"
                    v-model="form.username"
                    placeholder="请输入注册手机号码"
                    @keyup.enter.native="login"
                  >
                    <img slot="suffix" src="../../static/img/login_icon_user.png">
                  </el-input>
                </div>
              </el-form-item>
              <el-form-item label="用户昵称" prop="password">
                <div class="form-group">
                  <el-input
                    type="password"
                    v-model="form.password"
                    placeholder="请输入密码"
                    @keyup.enter.native="login"
                  >
                    <img slot="suffix" src="../../static/img/login_icon_password.png">
                  </el-input>
                </div>
              </el-form-item>
            </el-form>
            <!-- <div class="form-group">
							<el-input type="password" v-model="password" placeholder="请输入密码" @keyup.enter.native="login">
								<img slot="suffix" src="../../static/img/login_icon_password.png">
							</el-input>
            </div>-->
            <div class="form-group flex">
              <el-input type="text" placeholder="请输入验证码"></el-input>
              <img :src="verifyCodeSRC" @click="refreshVerifyCode">
            </div>
            <!-- <div class="form-group flex flex-x-end">
							<span class="forget">忘记密码？</span>
            </div>-->
            <div class="form-group" style="margin-top: 22px;">
              <shop-btn
                @click.native="login"
                text="登录"
                bgcolor="#F64811"
                border="1px #F64811"
                color="#fff"
                width="calc(100% - 2px)"
              />
            </div>
          </div>
          <div class="form-foot flex flex-y-center flex-x-center">
            <div class="flex flex-y-center">
              <!-- <img src="../../static/img/login_icon_right.png" @click="toReg" /> -->
              <div>没有账号？</div>
              <span @click="toReg" class="click-a">立即注册</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <div class="min-width flex">
        <div class="foot-l">
          <div class="QRcode">
            <div class="img">
              <img src="../../static/img/login_img_erweima.png" alt>
            </div>
            <p>关注微信</p>
            <p>获取最佳便捷生活</p>
          </div>
        </div>
        <div class="foot-r">
          <ul class="flex">
            <li class="flex flex-y-center">
              <img src="../../static/img/login_icon_gaoxiao.png">
              <div>
                <strong>高效</strong>
                <p>专业配送，精准高效</p>
              </div>
            </li>
            <li class="flex flex-y-center">
              <img src="../../static/img/login_icon_anquan.png">
              <div>
                <strong>安全</strong>
                <p>严格监控，层层把关</p>
              </div>
            </li>
            <li class="flex flex-y-center">
              <img src="../../static/img/login_icon_suyuan.png">
              <div>
                <strong>可溯源</strong>
                <p>来源可追溯，去向可查证</p>
              </div>
            </li>
          </ul>
          <div class="copyright">
            <!-- <p>免费服务热线：400-8558-783</p> -->
            <p>版权所有：宁夏农鲜汇农业科技发展有限公司</p>
          </div>
        </div>
      </div>
    </footer>
    <!-- 临时用户完善信息 -->
    <el-dialog title="临时用户完善信息" :visible.sync="dialogFormVisible">沙发大时代发</el-dialog>
  </div>
</template>

<script>
import ShopTop from "./components/header.vue";
import ShopFooter from "./components/footer.vue";
import { Input, Form, FormItem, Loading, Dialog } from "element-ui";
import btn from "./components/shopbtn.vue";
import configs from "../configs.js";

export default {
  components: {
    [ShopTop.name]: ShopTop,
    [ShopFooter.name]: ShopFooter,
    [Input.name]: Input,
    [btn.name]: btn,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      form: {
        username: "",
        password: "",
        verifiCode: ""
      },
      verifyCodeSRC: configs.api.replace(/\/api/,'') + "/login/auth/code",
      rules: {
        username: [
          {
            required: true,
            message: "请输入注册手机号码",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    refreshVerifyCode() {
      this.verifyCodeSRC = this.verifyCodeSRC + "?s=" + new Date().getTime();
    },
    toReg() {
      this.$router.push({
        name: "reg"
      });
    },
    getUserType(userId) {
      return new Promise((resolve, reject) => {
        this.postRequest("customer/queryById", {
          id: userId
        }).then(resp => {
          if (resp.data && resp.data.state == 0) {
            if (resp.data.aaData) {
              resolve(resp.data.aaData);
            } else {
              resolve(resp.data.msg);
            }
          }
        });
      });
    },
    login() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          this.postRequest(
            "",
            {
              loginName: this.form.username,
              password: this.form.password,
              systemId: 8,
              flag: 1,
              authCode: ""
            },
            true
          ).then(resp => {
            this.loading = false;
            if (resp && resp.status == 200) {
              if (resp.data && resp.data.state == 0) {
                let userInfo = resp.data.sessionUser;
                userInfo.token = resp.data.token;
                if (userInfo.typeId.indexOf("buyer") != -1) {
                  this.getUserType(userInfo.typeCode).then(d => {
                    let toName;
                    userInfo.userType = d.extend;
                    this.$store.commit("saveuserInfo", userInfo);
                    if (d.extend === "0") {
                      // 扫码购买过后产生的临时账号
                      this.$alert
                        .confirm("该账号为临时用户，请完善注册信息！", "提示", {
                          confirmButtonText: "确定",
                          cancelButtonText: "取消",
                          type: "warning"
                        })
                        .then(() => {
                          this.$store.state.temporarUserId = d.id;
                          this.$router.push({
                            name: "reg"
                          });
                        });
                    } else {
                      // 线上注册的正常账号
                      switch (d.extend) {
                        case "005": // 个人进入门店
                          toName = "PersonalBuyCenter";
                          break;
                        /** 这里需求变更二批门店又不在自营平台购买商品了 */
                        case "002": // 二批登录进入自营平台
                          toName = "RestaurantIndex";
                          break;
                        case "004": // 社区门店登录进入自营平台
                          toName = "RestaurantIndex";
                          break;
                        case "003": // 餐厅及团体单位登录进入自营平台
                          toName = "RestaurantIndex";
                          break;
                        case "008": // 餐厅及团体单位登录进入自营平台
                          toName = "RestaurantIndex";
                          break;
                        default:
                          // 其余用户在一批处购买商品
                          toName = "northRingIndex";
                          break;
                      }
                      this.$router.push({
                        name: toName
                      });
                    }
                  });
                } else {
                  this.$message.error(
                    "该账号注册为供应商账号，请使用采购商账号登录！"
                  );
                }
              } else {
                if (resp.data.state === 101) {
                  this.$alert
                    .confirm(
                      "该账号缺少必要信息，已被管理员停用，请完善注册必要信息再登录激活！",
                      "提示",
                      {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                      }
                    )
                    .then(() => {
                      if (resp.data.customerEntity) {
                        this.$router.push({
                          name: "completeRegInfo",
                          query: {
                            typeCode: resp.data.customerEntity.id
                          }
                        });
                      } else {
                        this.$message(
                          "未返回可用的用户信息，请联系管理员！"
                        );
                      }
                    });
                }
              }
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
#loginPage {
  .el-form-item__content {
    width: 100% !important;
  }
  .el-form-item__label {
    display: none;
  }
  .logo-l {
    width: 236px;
    height: 63px;
    background: url(../../static/img/northring/logo_new.png);
    margin-right: 10px;
  }
  .logo-r {
    width: 304px;
    height: 46px;
    background: url(../../static/img/login_img_slogo.png);
  }
  .form-container {
    .bannerimg {
      width: 628px;
      height: 484px;
      background: url(../../static/img/northring/banner1.png);
    }
    width: 100%;
    height: 568px; // background: url(../../static/img/loginbanner.png) no-repeat;
    background: #ffce17;
    background-size: 100% 100%;
    .form-text {
      width: 844px;
      height: 421px;
      padding-top: 127px;
      .title {
        width: 617px;
        height: 143px;
        background: url(../../static/img/title.png);
      }
      .btns {
        margin: 20px 0;
        div {
          background: #185f0c;
          color: #fff;
          height: 31px;
          line-height: 31px;
          padding: 0 10px;
          border-radius: 100px;
          margin-right: 10px;
        }
      }
      .texts p {
        color: #fff;
        font-size: 14px;
        text-align: center;
        margin-top: 5px;
      }
    }
    .form {
      width: 346px;
      height: 421px;
      background: #fff;
      .form-head {
        height: 50px;
        border-bottom: 1px solid #f4f4f4;
        font-weight: 600;
      }
      .form-body {
        padding-top: 20px;
        width: 306px;
        margin: 0 auto;
        height: 319px;
        .form-group {
          span.forget:hover {
            color: #ff4400;
            text-decoration: underline;
          }
          span.forget {
            cursor: pointer;
            font-size: 14px;
            color: #666;
          } // margin-top: 20px;
          .el-input.is-active .el-input__inner,
          .el-input__inner:focus {
            border-color: #ff4400;
          }
          .el-input {
            input {
              border-radius: 0;
              padding-left: 10px;
              padding-right: 35px;
            }
            .el-input__suffix {
              right: 10px;
              img {
                margin-top: 10px;
              }
            }
          }
        }
      }
      .form-foot {
        height: 50px;
        border-top: 1px solid #f4f4f4;
        background: #fcfcfc;
        span {
          padding-left: 5px;
          color: #f64811;
          cursor: pointer;
        }
      }
    }
  }
  footer {
    padding: 20px 0 80px;
    .foot-l {
      .QRcode {
        width: 146px;
        padding-bottom: 18px;
        -webkit-box-shadow: 0 0 10px 15px #e9eef2;
        -moz-box-shadow: 0 0 10px 15px #e9eef2;
        box-shadow: 0 0 10px 3px #e9eef2;
        text-align: center;
        overflow: hidden;
        .img {
          width: 110px;
          height: 110px;
          margin: 18px auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          font-size: 12px;
          color: #666;
        }
        p:last-child {
          margin-top: 5px;
        }
      }
    }
    .foot-r {
      margin-top: 50px;
      margin-left: 100px;
      width: 944px;
      .copyright {
        width: 608px;
        margin-top: 40px;
        p {
          font-size: 12px;
          color: #666;
          text-align: center;
          margin-top: 10px;
        }
      }
      ul {
        li {
          width: 33.3%;
          img {
            margin-right: 10px;
          }
          p {
            margin-top: 3px;
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
