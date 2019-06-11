<!--
 * @Descripttion: 
 * @version: 
 * @Author: yangyh
 * @Date: 2019-03-15 14:21:38
 * @LastEditTime: 2019-06-03 16:35:54
 -->
<template>
  <div id="regPage">
    <!--logo-->
    <section class="shop-search flex flex-y-center">
      <div class="min-width">
        <ul class="flex flex-x-between flex-y-end">
          <li class="logo flex flex-y-end">
            <div class="logo-l"></div>
            <strong>完善注册信息</strong>
          </li>
          <li>
            <p>
              已有账号？
              <span class="click-a" @click="goback">请登录 ></span>
            </p>
          </li>
        </ul>
      </div>
    </section>
    <!--form-->
    <section class="form-container">
      <div class="step width578"></div>
      <div class="formlist">
        <template v-if="active == 2">
          <div style="color:#999;margin-bottom: 30px" class="flex flex-x-center">{{regTypeText}}</div>
          <div class="user_info flex flex-x-between flex-y-center">
            <div class="user_base_info">
              <el-form ref="form" :model="form" :rules="rules1">
                <el-form-item
                  label="手机号码"
                  prop="telephone"
                  :style="isUpdate?'background: #f5f7fa;':''"
                >
                  <div class="form-group flex flex-y-center">
                    <el-input
                      type="text"
                      placeholder="手机号码"
                      :maxlength="11"
                      v-model="form.telephone"
                      :disabled="isUpdate"
                    ></el-input>
                  </div>
                </el-form-item>

                <!-- :label="form.customerProperty != '005' && form.property!='2'?'公司名称':'用户昵称'" -->
                <el-form-item label="个人/公司名称" prop="name">
                  <div class="form-group flex flex-y-center">
                    <el-input type="text" placeholder="个人/公司名称" v-model="form.name" :maxlength="50"></el-input>
                  </div>
                </el-form-item>
                <!-- 渠道 -->
                <template
                  v-if="(form.customerProperty=='001'||form.customerProperty=='002')&&false"
                >
                  <el-form-item label="渠道" prop="selectedOptions2">
                    <div class="form-group flex flex-y-center">
                      <el-cascader
                        :options="options"
                        v-model="form.selectedOptions2"
                        style="width: 100%"
                        @change="handleChange"
                      >></el-cascader>
                    </div>
                  </el-form-item>
                  <!-- 其他渠道备注 -->
                  <el-form-item label="所在市场备注" prop="remark" v-if="form.channelCode=='QT'">
                    <div class="form-group flex flex-y-center">
                      <el-input type="text" placeholder="所在市场备注" v-model="form.remark"></el-input>
                    </div>
                  </el-form-item>
                </template>
                <!-- 经营户类型 -->
                <template v-if="form.customerProperty!='005'">
                  <el-form-item
                    label="经营户类型"
                    style="background: #f5f7fa;"
                    v-if="!(form.customerProperty=='001'||form.customerProperty=='002')"
                  >
                    <div class="form-group flex flex-y-center">
                      <el-select
                        v-model="defaultProperty"
                        placeholder="请选择经营户类型"
                        style="width: 100%;"
                        disabled
                      >
                        <el-option
                          v-for="d in customerTypeList"
                          :key="d.key"
                          :label="d.value"
                          :value="d.key"
                        ></el-option>
                      </el-select>
                    </div>
                  </el-form-item>
                  <el-form-item label="经营户类型" prop="property" v-else>
                    <div class="form-group flex flex-y-center">
                      <el-select
                        v-model="form.property"
                        placeholder="请选择经营户类型"
                        style="width: 100%;"
                      >
                        <el-option
                          v-for="d in customerTypeList"
                          :key="d.key"
                          :label="d.value"
                          :value="d.key"
                        ></el-option>
                      </el-select>
                    </div>
                  </el-form-item>
                </template>
                <!-- 一级批发商商品来源  是否为本地菜 -->
                <el-form-item label="商品来源" prop="isLocal" v-if="form.customerProperty=='001'">
                  <div class="form-group flex flex-y-center">
                    <el-select v-model="form.isLocal" placeholder="请选择供应商品来源" style="width: 100%;">
                      <el-option
                        v-for="d in isLocalList"
                        :key="d.value"
                        :label="d.name"
                        :value="d.value"
                      ></el-option>
                    </el-select>
                  </div>
                </el-form-item>
                <!-- 厂商供应商品分类 -->
                <el-form-item
                  label="供应商品分类"
                  prop="businessScope"
                  v-if="form.customerProperty=='007'||form.customerProperty=='001'"
                >
                  <div class="form-group flex flex-y-center">
                    <el-select
                      v-model="form.businessScope"
                      multiple
                      placeholder="请选择供应商品类型"
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="d in categoryTypeList"
                        :key="d.code"
                        :label="d.name"
                        :value="d.code"
                      ></el-option>
                    </el-select>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <div class="user_info_fengexin"></div>
            <div class="user_com_info">
              <el-form ref="form1" :model="form" :rules="rules1" class="formUserInfo">
                <template v-if="form.customerProperty !='005'">
                  <!-- <template v-if="!(form.customerProperty == '001' && form.isLocal == '0')"> -->
                  <el-form-item
                    label="营业执照号码"
                    prop="regId"
                    v-if="(!(form.customerProperty == '001' && form.isLocal == '0'))&&(defaultProperty!=2&&form.property!='2')"
                  >
                    <div class="form-group flex flex-y-center">
                      <el-input
                        type="text"
                        placeholder="请输入营业执照号码"
                        :maxlength="50"
                        v-model="form.regId"
                      ></el-input>
                    </div>
                  </el-form-item>
                  <!-- 选择个体户上传市场证明 必填 -->
                  <el-form-item
                    v-if="!(form.customerProperty == '001' && form.isLocal == '0')"
                    :label="defaultProperty!=2 && form.property!=2?'营业执照照片':'市场证明'"
                    prop="businessLicensePic"
                  >
                    <div
                      class="form-group flex flex-y-center"
                      style="height: 40px; padding-left: 15px;"
                    >
                      <el-upload
                        :action="uploadURL+'/imgUpload'"
                        :show-file-list="false"
                        :data="uploadData"
                        :on-success="businessLicensePicSuccess"
                        :before-upload="beforeAvatarUpload"
                        :file-list="fileList"
                      >
                        <el-button
                          type="danger"
                          size="mini"
                          icon="el-icon-plus"
                        >上传{{defaultProperty!=2 && form.property!=2?'营业执照':'市场证明'}}</el-button>
                      </el-upload>
                    </div>
                    <div class="uploadimgPre" v-if="form.businessLicensePic!=''">
                      <i class="el-icon-error" @click="closeUploadImg('businessLicensePic')"></i>
                      <img :src="imgURL+form.businessLicensePic" alt>
                    </div>
                  </el-form-item>
                </template>
                <!-- 食品流通许可证 -->
                <el-form-item
                  label="食品流通许可证"
                  prop="foodLicensePic"
                  v-if="form.customerProperty !='005' && form.customerProperty !='003' && form.property!=2"
                >
                  <div
                    class="form-group flex flex-y-center"
                    style="height: 40px; padding-left: 15px;"
                  >
                    <el-upload
                      :action="uploadURL+'/imgUpload'"
                      :show-file-list="false"
                      :data="uploadData"
                      :on-success="foodLicensePicSuccess"
                      :before-upload="beforeAvatarUpload"
                      :file-list="fileList"
                    >
                      <el-button type="danger" size="mini" icon="el-icon-plus">上传许可证</el-button>
                    </el-upload>
                  </div>
                  <div class="uploadimgPre" v-if="form.foodLicensePic">
                    <i class="el-icon-error" @click="closeUploadImg('foodLicensePic')"></i>
                    <img :src="imgURL+form.foodLicensePic" alt>
                  </div>
                </el-form-item>
                <!-- 清真食品准营证 -->
                <el-form-item
                  label="清真食品准营证"
                  prop="muslimfoodPermitPic"
                  v-if="form.customerProperty !='005' && form.customerProperty !='003'"
                >
                  <div
                    class="form-group flex flex-y-center"
                    style="height: 40px; padding-left: 15px;"
                  >
                    <el-upload
                      :action="uploadURL+'/imgUpload'"
                      :show-file-list="false"
                      :data="uploadData"
                      :on-success="muslimfoodPermitPicSuccess"
                      :before-upload="beforeAvatarUpload"
                      :file-list="fileList"
                    >
                      <el-button type="danger" size="mini" icon="el-icon-plus">上传清真食品准营证</el-button>
                    </el-upload>
                  </div>
                  <div class="uploadimgPre" v-if="form.muslimfoodPermitPic">
                    <i class="el-icon-error" @click="closeUploadImg('muslimfoodPermitPic')"></i>
                    <img :src="imgURL+form.muslimfoodPermitPic" alt>
                  </div>
                </el-form-item>
                <el-form-item
                  label="法人名称"
                  prop="legalpepresent"
                  v-if="form.customerProperty !='005'"
                >
                  <div class="form-group flex flex-y-center">
                    <el-input
                      type="text"
                      placeholder="请输入法人名称"
                      :maxlength="20"
                      v-model="form.legalpepresent"
                    ></el-input>
                  </div>
                </el-form-item>
                <el-form-item
                  label="法人照片"
                  prop="legalpepresentPic"
                  v-if="form.customerProperty !='005'"
                >
                  <div
                    class="form-group flex flex-y-center"
                    style="height: 40px; padding-left: 15px;"
                  >
                    <el-upload
                      :action="uploadURL+'/imgUpload'"
                      :show-file-list="false"
                      :data="uploadData"
                      :on-success="legalpepresentPicSuccess"
                      :before-upload="beforeAvatarUpload"
                      :file-list="fileList"
                    >
                      <el-button type="danger" size="mini" icon="el-icon-plus">上传法人照片</el-button>
                    </el-upload>
                  </div>
                  <div class="uploadimgPre" v-if="form.legalpepresentPic">
                    <i class="el-icon-error" @click="closeUploadImg('legalpepresentPic')"></i>
                    <img :src="imgURL+form.legalpepresentPic" alt>
                  </div>
                </el-form-item>
                <!-- 厂商配送商法人身份证正反面照片 -->
                <template v-if="form.customerProperty!='005'">
                  <el-form-item
                    label="身份证正面照"
                    prop="idCardPic_01"
                    v-if="form.customerProperty !='005'"
                  >
                    <div
                      class="form-group flex flex-y-center"
                      style="height: 40px; padding-left: 15px;"
                    >
                      <el-upload
                        :action="uploadURL+'/imgUpload'"
                        :show-file-list="false"
                        :data="uploadData"
                        :on-success="idCardPicSuccess"
                        :before-upload="beforeAvatarUpload"
                        :file-list="fileList"
                      >
                        <el-button type="danger" size="mini" icon="el-icon-plus">上传正面照</el-button>
                      </el-upload>
                    </div>
                    <div class="uploadimgPre" v-if="form.idCardPic_01">
                      <i class="el-icon-error" @click="closeUploadImg('idCardPic_01')"></i>
                      <img :src="imgURL+form.idCardPic_01" alt>
                    </div>
                  </el-form-item>
                  <el-form-item
                    label="身份证反面照"
                    prop="idCardPic_02"
                    v-if="form.customerProperty !='005'"
                  >
                    <div
                      class="form-group flex flex-y-center"
                      style="height: 40px; padding-left: 15px;"
                    >
                      <el-upload
                        :action="uploadURL+'/imgUpload'"
                        :show-file-list="false"
                        :data="uploadData"
                        :on-success="idCardPicSuccess1"
                        :before-upload="beforeAvatarUpload"
                        :file-list="fileList"
                      >
                        <el-button type="danger" size="mini" icon="el-icon-plus">上传反面照</el-button>
                      </el-upload>
                    </div>
                    <div class="uploadimgPre" v-if="form.idCardPic_02">
                      <i class="el-icon-error" @click="closeUploadImg('idCardPic_02')"></i>
                      <img :src="imgURL+form.idCardPic_02" alt>
                    </div>
                  </el-form-item>
                </template>
                <el-form-item label="门头照片" prop="storePic" v-if="form.customerProperty=='004'">
                  <div
                    class="form-group flex flex-y-center"
                    style="height: 40px; padding-left: 15px;"
                  >
                    <el-upload
                      :action="uploadURL+'/imgUpload'"
                      :show-file-list="false"
                      :data="uploadData"
                      :on-success="storePicSuccess"
                      :before-upload="beforeAvatarUpload"
                      :file-list="fileList"
                    >
                      <el-button type="danger" size="mini" icon="el-icon-plus">上传门头照片</el-button>
                    </el-upload>
                  </div>
                  <div class="uploadimgPre" v-if="form.storePic">
                    <i class="el-icon-error" @click="closeUploadImg('storePic')"></i>
                    <img :src="imgURL+form.storePic" alt>
                  </div>
                </el-form-item>
                <!-- 门店和个人在填写地址的时候必须通过地图选择获取经度纬度坐标计算距离 -->
                <el-form-item
                  label="地址"
                  prop="address"
                  v-if="form.customerProperty=='004' || form.customerProperty=='005'"
                >
                  <div
                    class="form-group flex flex-y-center"
                    style="height: 40px; padding-left: 15px;"
                  >
                    <el-button @click="openMap" type="danger" size="mini" icon="el-icon-plus">地图选择地址</el-button>
                    <!-- <el-input v-model="form.address">
                      <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="searchLocal(form.address)"
                      ></el-button>
                    </el-input>-->
                  </div>
                </el-form-item>
                <el-form-item label="经营地址" prop="address" v-else>
                  <div class="form-group flex flex-y-center">
                    <el-input
                      type="text"
                      placeholder="请输入地址"
                      :maxlength="200"
                      v-model="form.address"
                    ></el-input>
                  </div>
                </el-form-item>
              </el-form>
              <div
                id="addresstext"
                v-if="form.customerProperty=='004' || form.customerProperty=='005'"
              >{{selectedAddressStr}}</div>
              <!-- <div id="addresstext" v-else>{{form.address}}</div> -->
            </div>
          </div>
        </template>
        <div class="flex flex-x-center" style="margin-top: 30px;">
          <shop-btn
            v-show="active==2"
            @click.native="updateCusMerPic"
            text="保存"
            width="200px"
            height="38px"
            border="1px #F64811"
            color="#fff"
            bgcolor="#F64811"
            marginR="0"
          ></shop-btn>
        </div>
      </div>
    </section>
    <!--foot-->
    <footer>
      <div class="min-width">
        <p>免费服务热线：400-8558-783</p>
        <p>版权所有：宁夏农鲜汇农业科技发展有限公司</p>
      </div>
    </footer>
    <!--地图选位置弹窗-->
    <address-modal v-if="modalShow" :modal="modalShow" @close="modalClose" :params="modalParams"></address-modal>
  </div>
</template>

<script>
import ShopTop from "./components/header.vue";
import ShopFooter from "./components/footer.vue";
import addressModal from "./northviews/addressMapModal.vue";
import {
  Input,
  Step,
  Steps,
  Radio,
  RadioGroup,
  Select,
  Option,
  Checkbox,
  CheckboxGroup,
  Form,
  FormItem,
  Button,
  Upload,
  Cascader
} from "element-ui";
import btn from "./components/shopbtn.vue";
import mixin from "../utils/mixin.js";
export default {
  mixins: [mixin],
  components: {
    [ShopTop.name]: ShopTop,
    [ShopFooter.name]: ShopFooter,
    [Input.name]: Input,
    [btn.name]: btn,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Select.name]: Select,
    [Option.name]: Option,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Button.name]: Button,
    [Upload.name]: Upload,
    [addressModal.name]: addressModal,
    [Cascader.name]: Cascader
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value == "" || value == undefined) {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.password !== "") {
          this.form.password = value;
          // this.$refs.formpsw.validateField('password');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value == "" || value == undefined) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      options: [],
      locationVal: null,
      isUpdate: "",
      address_param: "",
      regTypeText: "",
      selectedAddressStr: "",
      userSelectAddressInfo: null,
      active: 2,
      radio: 1,
      second: 5,
      fileList: [],
      businessLicensePic: "",
      legalpepresentPic: "",
      storePic: "",
      foodLicensePic: "",
      muslimfoodPermitPic: "",
      uploadData: {
        savePath: "registerNewtwo"
      },
      isLocalList: [
        {
          name: "本地",
          value: "0"
        },
        {
          name: "外地",
          value: "1"
        }
      ],
      identityList: [
        {
          name: "批发商",
          value: "001"
        },
        {
          name: "厂商",
          value: "007"
        },
        {
          name: "二级批发/早市/农贸市场",
          value: "002"
        },
        {
          name: "小区门店",
          value: "004"
        },
        {
          name: "配送公司",
          value: "008"
        },
        {
          name: "餐饮店/团体单位",
          value: "003"
        },
        {
          name: "个人",
          value: "005"
        }
      ],
      form: {
        selectedOptions2: [],
        name: "",
        telephone: "",
        password: "",
        customerProperty: "003", // 五类客户类型
        // 完善资料字段
        regId: "", //营业执照号码
        businessLicensePic: "", //执照照片
        legalpepresent: "", //法人
        legalpepresentPic: "", //法人照片
        storePic: "", //门头照片
        idCard: "", // 身份证正反面照片 '正面照片Url,反面Url'
        address: "",
        foodLicensePic: "",
        muslimfoodPermitPic: "",
        type: "", // 供应商类型
        property: "",
        businessScope: [], // 经营范围，多个商品分类用"/"分割
        idCardPic_01: "",
        idCardPic_02: "",
        isLocal: "", // 是否本地
        remark: ""
      },
      idCardPic_01: "",
      idCardPic_02: "",
      ChannelOption: [],
      defaultChannelCode: "",
      defaultProperty: "1",
      rules1: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          },
          {
            min: 2,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur"
          }
        ],
        telephone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          }
        ],
        regId: [
          {
            required: true,
            message: "请输入营业执照号码",
            trigger: "blur"
          }
        ],
        legalpepresent: [
          {
            required: true,
            message: "请输入法人名称",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入地址",
            trigger: "blur"
          }
        ],
        selectedOptions2: [
          {
            type: "array",
            required: true,
            message: "请选择渠道",
            // validator: validateChannelCode,
            trigger: "change"
          }
        ],
        remark: [
          {
            required: true,
            message: "请输入所在市场备注",
            trigger: "blur"
          }
        ],
        customerProperty: [
          {
            required: true,
            message: "请选择身份",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ],
        repassword: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur"
          }
        ],
        property: [
          {
            required: true,
            message: "请选择经营户类型",
            trigger: "change"
          }
        ],
        defaultProperty: [
          {
            required: true,
            message: "请选择经营户类型",
            trigger: "change"
          }
        ],
        isLocal: [
          {
            required: true,
            message: "请选择供应商商品来源",
            trigger: "change"
          }
        ],
        businessScope: [
          {
            type: "array",
            required: true,
            message: "请选择供应商品类型",
            trigger: "change"
          }
        ],
        legalpepresentPic: [
          {
            required: true,
            message: "请上传法人照片"
          }
        ],
        idCardPic_01: [
          {
            required: true,
            message: "请上传法人身份证正面照"
          }
        ],
        idCardPic_02: [
          {
            required: true,
            message: "请上传法人身份证反面照"
          }
        ],
        idCardPic_02: [
          {
            required: true,
            message: "请上传法人身份证反面照"
          }
        ],
        businessLicensePic: [
          {
            required: true,
            message: "请上传营业执照或市场证明"
          }
        ],
        foodLicensePic: [
          {
            required: true,
            message: "请上传食品流通许可证"
          }
        ],
        muslimfoodPermitPic: [
          {
            required: true,
            message: "请上传清真食品准营证"
          }
        ]
        // businessLicensePic: [
        //   {
        //     required: true,
        //     message: "此项为必填项",
        //     trigger: "change"
        //   }
        // ],
      },
      repassword: "",
      channelList: [],
      timer: null,
      customerTypeList: [],
      categoryTypeList: []
    };
  },
  created() {
    /**
     * 获取默认渠道
     */
    this.postRequest("channel/list", {
      level: 3,
      deleted: 0,
      isDefault: 1
    }).then(d => {
      if (d.data && d.data.state == 0) {
        if (d.data.aaData.length > 0) {
          this.defaultChannelCode = d.data.aaData[0].code;
        }
      }
    });
    this.postRequest("channel/listByParent", {
      parentChannelCode: "001"
    }).then(d => {
      if (d.data && d.data.state == 0) {
        this.ChannelOption = d.data.aaData;
        let options = [];
        for (let item of d.data.aaData) {
          let lv2Obj = {
            value: item.code,
            label: item.name,
            children: []
          };
          for (let lv3item of item.childChannel) {
            let lv3Obj = {
              value: lv3item.code,
              label: lv3item.name
            };
            lv2Obj.children.push(lv3Obj);
          }
          options.push(lv2Obj);
        }
        options.push({
          value: "QT",
          label: "其他"
        });
        this.options = options;
        // console.log(options)
        // this.getChannelOptions()
      }
    });
    // 获取用户注册的步骤
    if (this.$route.query.regStep) {
      this.active = Number(this.$route.query.regStep);
    }
    // 获取用户已经填写的个人信息
    if (sessionStorage.getItem("jz_saveInputInfo")) {
      this.form = JSON.parse(sessionStorage.getItem("jz_saveInputInfo"));
    }
    this.getCustomerType();
    this.getChannel();
    this.getCategoryType();
    // 获取用户选择的地址
    if (sessionStorage.getItem("jz_getAddrByMap")) {
      var getAddrByMap = JSON.parse(sessionStorage.getItem("jz_getAddrByMap"));
      this.userSelectAddressInfo = getAddrByMap;
      this.selectedAddressStr = `${getAddrByMap.pname}${getAddrByMap.cityname}${
        getAddrByMap.adname
      }${getAddrByMap.address}`;
      if (
        this.form.customerProperty == "004" ||
        this.form.customerProperty == "005"
      ) {
        this.form.address = this.selectedAddressStr;
        // 提交地址传参数
        this.address_param = getAddrByMap.address;
      }
    }
    // 获取临时用户更新注册信息
    if (this.$route.query.typeCode) {
      this.postRequest("customer/list", {
        id: this.$route.query.typeCode
      }).then(resp => {
        if (resp.data && resp.data.state == 0) {
          if (resp.data.aaData.length > 0) {
            let customerEntity = resp.data.aaData[0];
            this.form.name = customerEntity.name;
            this.form.telephone = customerEntity.tel;
            this.form.customerProperty = customerEntity.extend;
            this.form.regId = customerEntity.regId;
            this.form.property = customerEntity.property;
            this.form.legalpepresent = customerEntity.legalpepresent;

            this.form.businessLicensePic = customerEntity.businessLicensePic;
            this.form.legalpepresentPic = customerEntity.legalpepresentPic;
            this.form.storePic = customerEntity.storePic;
            this.form.foodLicensePic = customerEntity.foodLicensePic;
            this.form.muslimfoodPermitPic = customerEntity.muslimfoodPermitPic;
            this.form.address = customerEntity.address;
            this.form.selectedOptions2 = [customerEntity.channelCode];
            this.form.channelCode = customerEntity.channelCode;

            if (customerEntity.idCard) {
              this.form.idCardPic_01 = customerEntity.idCard.split(";")[0];
              this.form.idCardPic_02 = customerEntity.idCard.split(";")[1];
            }

            this.form.isLocal = customerEntity.islocal.toString();
            if (customerEntity.businessScope) {
              this.form.businessScope = customerEntity.businessScope.split("/");
            }
          }
        }
      });
    }
  },
  methods: {
    /**
     * @description:
     * @param {type}
     * @return:
     */
    getChannelOptions(arr, childs) {
      for (let item of arr) {
        console.log(item);
        if (childs > 0) {
          this.getChannelOptions(arr, childs);
        }
      }
    },
    handleChange(value) {
      if (value[1]) {
        this.form.channelCode = value[1];
      } else {
        this.form.channelCode = "QT";
      }
    },
    goback() {
      clearInterval(this.timer);
      if (this.$route.query.type === "mjzx") {
        window.history.back(-1);
        return false;
      }
      this.$router.push({
        name: "login"
      });
    },
    closeUploadImg(img) {
      this.form[img] = "";
    },
    /**
     * @description: 提交临时用户完善注册信息
     * @param {type}
     * @return:
     */
    submitUpdate() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          this.$refs["form1"].validate(valid1 => {
            if (valid1) {
              // 如果是门店或个人必要通过地图选择位置获取经纬度
              if (
                this.form.customerProperty == "004" ||
                this.form.customerProperty == "005"
              ) {
                this.updateRegPost(true);
              } else {
                this.updateRegPost();
              }
            } else {
              return false;
            }
          });
        } else {
          return false;
        }
      });
    },
    /**
     * 确认注册
     */
    updateCusMerPic() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          this.$refs["form1"].validate(valid1 => {
            if (valid1) {
              // 如果是门店或个人必要通过地图选择位置获取经纬度
              if (
                this.form.customerProperty == "004" ||
                this.form.customerProperty == "005"
              ) {
                this.regPost(true);
              } else {
                this.regPost();
              }
            } else {
              return false;
            }
          });
        } else {
          return false;
        }
      });
    },
    /**
     * 调用接口
     * @param 是否个人门店注册
     */
    regPost(isgrOrMd) {
      let param = this.checkParam();
      param.id = this.$route.query.typeCode;
      param.disableType = 0;

      this.postRequest("customer/updateCusMerPic", param).then(d => {
        if (d.data && d.data.state == 0) {
          // 门店个人注册需要添加地址信息
          if (isgrOrMd) {
            if (this.userSelectAddressInfo) {
              this.createUserAddress(d.data.aaData.id);
            }
          } else {
            this.$message({
              message: "完善信息上传成功！",
              type: "success",
              onClose: () => {
                if (this.$route.query.type === "mjzx") {
                  window.history.back(-1);
                  return false;
                }
                this.$router.push({ name: "login" });
              }
            });
          }
        }
      });
    },
    /**
     * @description: 临时用户完善注册信息提交接口
     * @param {type} isgrOrMd
     * @return:
     */
    updateRegPost(isgrOrMd) {
      let param = this.checkParam();
      param.id = this.$store.state.temporarUserId;
      param.extend = this.form.customerProperty;
      this.postRequest("customer/update", param).then(d => {
        if (d.data && d.data.state == 0) {
          this.$store.state.temporarUserId = null;
          // 门店个人注册需要添加地址信息
          if (isgrOrMd) {
            if (this.userSelectAddressInfo) {
              this.createUserAddress(this.$store.state.temporarUserId);
            }
          } else {
            this.active++;
            this.timer = setInterval(() => {
              this.second--;
              if (this.second == 0) {
                clearInterval(this.timer);
                this.goback();
              }
            }, 1000);
          }
        }
      });
    },
    searchLocal(val) {
      this.locationVal.search(val);
    },
    /**
     * @description: 封装注册参数
     * @param {type}
     * @return:
     */
    checkParam() {
      let param = {
        isGetId: 1,
        name: this.form.name,
        telephone: this.form.telephone,
        password: this.form.password,
        customerProperty: this.form.customerProperty,
        regId: this.form.regId,
        businessLicensePic: this.form.businessLicensePic,
        legalpepresent: this.form.legalpepresent,
        legalpepresentPic: this.form.legalpepresentPic,
        foodLicensePic: this.form.foodLicensePic,
        muslimfoodPermitPic: this.form.muslimfoodPermitPic,
        storePic: this.form.storePic,
        address: this.form.address,
        type: this.form.type
      };
      if (this.form.idCardPic_01 != "" && this.form.idCardPic_02 != "") {
        param.idCard = `${this.form.idCardPic_01};${this.form.idCardPic_02}`;
      }

      if (param.customerProperty == "007" || param.customerProperty == "001") {
        this.form.businessScope
          ? (param.businessScope = this.form.businessScope.join("/"))
          : (param.businessScope = "");
      }
      // 4，厂商，团体，门店，配送公司，个人不需要渠道,经营户类型默认到公司
      if (param.customerProperty == "001" || param.customerProperty == "002") {
        if (this.form.channelCode == "QT") {
          param.channelCode = "";
          param.remark = this.form.remark;
        } else {
          param.channelCode = this.form.channelCode;
          param.remark = "";
        }
      } else {
        param.channelCode = "";
        param.remark = "";
      }
      // 1p商品来源
      if (param.customerProperty == "001") {
        param.islocal = this.form.isLocal;
      }
      // 1,2p选这经营户类型
      if (param.customerProperty == "001" || param.customerProperty == "002") {
        param.property = this.form.property;
      } else if (param.customerProperty != "005") {
        param.property = this.defaultProperty;
      }
      // 出一批二批默认渠道
      if (param.channelCode == "" && param.remark == "") {
        param.channelCode = this.defaultChannelCode;
      }

      return param;
    },
    /**
     * 添加地址
     */
    createUserAddress(customerId) {
      var url = "address/create";
      var param = {
        provinceCode: this.userSelectAddressInfo.pcode,
        cityCode: this.userSelectAddressInfo.cityCode,
        districCode: this.userSelectAddressInfo.adcode,
        detailedAddress: this.address_param,
        contacts: this.form.name,
        phoneNumber: this.form.telephone,
        customerId: customerId,
        comment: "",
        latitude: this.userSelectAddressInfo.location.lat,
        longitude: this.userSelectAddressInfo.location.lng
      };
      // 获取cityCode
      this.postRequest("comArea/list", {
        parentAreaCode: param.provinceCode,
        level: 2
      }).then(d => {
        if (d.data && d.data.state == 0) {
          for (let a = 0; a < d.data.aaData.length; a++) {
            if (
              d.data.aaData[a].areaName == this.userSelectAddressInfo.cityname
            ) {
              param.cityCode = d.data.aaData[a].areaCode;
              break;
            }
          }
          // 调用新增地址接口
          this.postRequest(url, param).then(d => {
            if (d.data && d.data.state == 0) {
              this.active++;
              this.timer = setInterval(() => {
                this.second--;
                if (this.second == 0) {
                  clearInterval(this.timer);
                  this.goback();
                }
              }, 1000);
              sessionStorage.removeItem("jz_getAddrByMap");
              sessionStorage.removeItem("jz_saveInputInfo");
            }
          });
        }
      });
    },
    /**
     * 上传执照图片成功回调
     */
    businessLicensePicSuccess(res, file) {
      if (res.state == 0 && res.aaData) {
        // this.businessLicensePic = URL.createObjectURL(file.raw);
        this.form.businessLicensePic = res.aaData.path;
      }
    },
    /**
     * 上传食品流通许可证成功回调
     */
    foodLicensePicSuccess(res, file) {
      if (res.state == 0 && res.aaData) {
        // this.foodLicensePic = URL.createObjectURL(file.raw);
        this.form.foodLicensePic = res.aaData.path;
      }
    },
    /**
     * 上传清真食品准营证成功回调
     */
    muslimfoodPermitPicSuccess(res, file) {
      if (res.state == 0 && res.aaData) {
        // this.muslimfoodPermitPic = URL.createObjectURL(file.raw);
        this.form.muslimfoodPermitPic = res.aaData.path;
      }
    },
    /**
     * 上传法人成功回调
     */
    legalpepresentPicSuccess(res, file) {
      if (res.state == 0 && res.aaData) {
        // this.legalpepresentPic = URL.createObjectURL(file.raw);
        this.form.legalpepresentPic = res.aaData.path;
      }
    },
    /**
     * 上传法人身份证正面成功回调
     */
    idCardPicSuccess(res, file) {
      if (res.state == 0 && res.aaData) {
        // this.idCardPic_01 = URL.createObjectURL(file.raw);
        this.form.idCardPic_01 = res.aaData.path;
      }
    },
    /**
     * 上传法人身份证反面成功回调
     */
    idCardPicSuccess1(res, file) {
      if (res.state == 0 && res.aaData) {
        // this.idCardPic_02 = URL.createObjectURL(file.raw);
        this.form.idCardPic_02 = res.aaData.path;
      }
    },
    /**
     * 上传门店图成功回调
     */
    storePicSuccess(res, file) {
      if (res.state == 0 && res.aaData) {
        // this.storePic = URL.createObjectURL(file.raw);
        this.form.storePic = res.aaData.path;
      }
    },
    /**
     * 上传图片之前的操作
     */
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      //         if (!isJPG) {
      //           this.$message.error('上传头像图片只能是 JPG 格式!');
      //         }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      // return isJPG && isLt2M;
    },
    /**
     * 获取经营户类型
     */
    // getCustomerType() {
    //   this.postRequest("datadic/list", {
    //     dataType: "CUSTOMER_TYPE",
    //     extendVal: "merchant"
    //   }).then(d => {
    //     if (d.data && d.data.state == 0) {
    //       if (d.data.aaData) {
    //         this.customerTypeList = d.data.aaData;
    //       }
    //     }
    //   });
    // },
    /**
     * 获取经营户性质
     */
    getCustomerType() {
      this.postRequest("datadic/list", {
        dataType: "CUSTOMER_PROPERTY"
        // extendVal: "merchant"
      }).then(d => {
        if (d.data && d.data.state == 0) {
          if (d.data.aaData) {
            this.customerTypeList = d.data.aaData;
          }
        }
      });
    },
    /**
     * 获取渠道
     */
    getChannel() {
      //查询渠道数据
      this.postRequest("channel/list", {
        level: 3,
        enabled: 1,
        deleted: 0
      }).then(d => {
        if (d.data && d.data.state == 0) {
          if (d.data.aaData) {
            d.data.aaData.push({
              code: "QT",
              name: "其他"
            });
            this.channelList = d.data.aaData;
          }
        }
      });
    },
    /**
     * 获取供应商品分类
     */
    getCategoryType() {
      this.postRequest("category/list", {
        level: 1,
        enabled: 1
      }).then(d => {
        if (d.data && d.data.state == 0) {
          if (d.data.aaData) {
            this.categoryTypeList = d.data.aaData;
          }
        }
      });
    },
    /**
     * 验证手机号码
     */
    telephoneMatche() {
      return new Promise((resolve, reject) => {
        this.postRequest("customer/telephoneMatche", {
          telephone: this.form.telephone
        }).then(d => {
          resolve(d);
        });
      });
    },
    /**
     * 打开地图选地址
     */
    openMap(d, type) {
      window.sessionStorage.setItem(
        "jz_saveInputInfo",
        JSON.stringify(this.form)
      );
      this.$router.push({
        name: "selectAddrByMap"
      });
    }
  }
};
</script>
<style lang="scss">
#regPage {
  .uploadimgPre {
    width: 121px;
    height: 121px;
    border-radius: 3px;
    margin: 10px 10px 10px 136px;
    position: relative;
    .el-icon-error {
      position: absolute;
      right: -8px;
      color: red;
      font-size: 16px;
      top: -8px;
      cursor: pointer;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }

  .el-button--danger {
    background-color: rgb(246, 72, 17);
    border-color: rgb(246, 72, 17);
  }

  .el-step__head.is-finish {
    color: #ff4400;
    border-color: #ff4400;

    .el-step__icon.is-text {
      background: #ff4400;
      color: #fff;
    }
  }

  .el-step__title.is-finish {
    color: #ff4400;
  }

  .el-radio__input.is-checked .el-radio__inner {
    border-color: #ff4400;
    background: #ff4400;
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: #ff4400;
  }

  .shop-search {
    height: 100px;
    box-shadow: 0 0 10px #e6e9e3;

    .logo-l {
      width: 236px;
      height: 63px;
      background: url(../../static/img/northring/logo_new.png);
      margin-right: 10px;
    }

    .click-a {
      color: #f64811;
      margin-left: 10px;
    }
  }

  .formUserInfo {
    .el-form-item__label {
      width: 132px !important;
    }
  }

  .form-container {
    .width578 {
      width: 578px;
      margin: 0 auto;
    }

    .el-form-item__label {
      width: 90px;
      text-align: left;
      padding: 0 12px 0 !important;
    }

    .el-form-item__content {
      border: 1px solid #bdbdbd;
    }

    width: 1024px;
    margin: 0 auto;

    .step {
      padding: 90px 0 30px;
    }

    .formlist {
      .form-group {
        .user-type {
          p {
            padding: 4px 0;
          }
        }

        span.name {
          width: 120px;
          display: block;
          height: 40px;
          line-height: 40px;
          padding-left: 16px;
        }

        .el-input__inner {
          border: none;
          font-size: 16px;
        }
      }

      .regsuc {
        border-bottom: 1px solid #d9d9d9;
        padding-bottom: 30px;

        .text {
          font-size: 36px;
          color: #f64811;
          margin-left: 30px;
        }
      }

      p.tips {
        padding-top: 55px;
        text-align: center;

        span.click-a {
          color: #1e88e5;
        }
      }
    }
  }

  footer {
    .min-width {
      border-top: 1px solid #e5e5e5;
      padding: 33px 0 100px;
      margin-top: 74px;
      text-align: center;

      p {
        font-size: 14px;
        color: #666;
      }
    }
  }

  // 选择身份
  p.identity-title {
    color: #999;
    margin-bottom: 20px;
  }

  ul.identity-list {
    li {
      flex-wrap: wrap;

      .item {
        cursor: pointer;
        width: 268px;
        height: 58px;
        border: 1px solid #bdbdbd;
        margin-bottom: 20px;

        img {
          margin-right: 12px;
        }

        p {
          color: #666;
        }
      }
    }

    .item:last-child {
      width: 100%;
      height: 58px;
    }
  }

  // 用户信息
  .user_info {
    width: 1024px;
    margin: 0 auto;

    .user_info_fengexin {
      width: 1px;
      height: 300px;
      background: #bdbdbd;
    }

    .user_base_info,
    .user_com_info {
      width: 398px;
    }

    .user_base_info {
      .el-form-item__label {
        width: 122px !important;
      }
    }
  }
}
</style>
