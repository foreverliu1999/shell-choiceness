<template>
  <div>
    <div class="person-tab-box">
      <div class="button-box">
        <button
          :class="personContainer == 0 ? 'active' : ''"
          @click="personContainer = 0"
        >
          基础信息
        </button>
        <button
          :class="personContainer == 1 ? 'active' : ''"
          @click="personContainer = 1"
        >
          地址信息
        </button>
      </div>
    </div>
    <!-- <p>{{this.information}}</p> -->
    <div class="person-container">
      <div class="person-form" v-if="personContainer == 0">
        <h3>负责人信息</h3>
        <el-form
          :model="personInformationForm"
          status-icon
          :rules="personRules"
          ref="personInformationForm"
          label-width="100px"
          class="personForm"
        >
          <el-form-item label="真实姓名" prop="realName">
            <el-input
              placeholder="请输入您的真实姓名"
              v-model="personInformationForm.realName"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="IDNumber">
            <el-input
              placeholder="请输入您的身份证号"
              v-model="personInformationForm.IDNumber"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input
              placeholder="请输入您的手机号码"
              v-model="personInformationForm.phone"
            ></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-cascader
              ref="cascaderAddr"
              v-model="receivePlaceValue"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
            ></el-cascader>
            <el-input
              placeholder="区/街道/小区/栋/单元"
              v-model="personInformationForm.address"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            @click="submitForm('personInformationForm')"
            style="margin-top: 12px; margin-left: 40%"
            >提交</el-button
          >
        </el-form>
      </div>
      <PersonInformationAdress
        v-if="personContainer == 1"
      ></PersonInformationAdress>
      <!-- <div class="address-table">
        <el-button type="primary">新增地址</el-button>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="收货人" width="250">
          </el-table-column>
          <el-table-column prop="name" label="手机号码" width="250">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="400"
          ></el-table-column>
          <el-table-column prop="address" label="操作" width="300">
            <template slot-scope="scope">
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">设为默认</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div> -->
    </div>
  </div>
</template>

<script>
import city from "../assets/city/city";
import { getUserImformation } from "../request/api.js";
import { updateUserImformation } from "../request/api.js";
import PersonInformationAdress from "../components/PersonInformationAdress.vue";
export default {
  // props: ["information"],
  props: {
    information: {
      default: () => ({}),
    },
  },
  data() {
    return {
      // 因为在子组件中，不能修改由父组件传来的props数据，所以创建一个容器来存放数据
      personInformationContainer: [],
      options: null,
      // 个人是基础信息还是地址信息
      personContainer: 0,
      receivePlaceValue: [
        Number(this.information.provinceCode),
        Number(this.information.cityCode),
        Number(this.information.areaCode),
      ],
      personInformationForm: {
        realName: this.information.realname,
        IDNumber: this.information.idCard,
        phone: this.information.phone,
        address: this.information.address,
      },
      personRules: {
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        IDNumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    PersonInformationAdress,
  },
  methods: {
    submitForm(formName) {
      // console.log("personInformationForm---", this.personInformationForm);
      // console.log("receivePlaceValue---", this.receivePlaceValue);
      // console.log("级联选择器---", this.$refs['cascaderAddr'].currentLabels);

      // console.log(
      //   "级联选择器---",
      //   this.$refs["cascaderAddr"].getCheckedNodes()[0].pathLabels
      // );

      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateUserImformation({
            // 要传的参数
            // id
            id: this.information.id,
            // realname
            realname: this.personInformationForm.realName,
            // phone
            phone: this.personInformationForm.phone,
            // province
            province:
              this.$refs["cascaderAddr"].getCheckedNodes()[0].pathLabels[0],
            // provinceCode
            provinceCode: this.receivePlaceValue[0],
            // city
            city: this.$refs["cascaderAddr"].getCheckedNodes()[0].pathLabels[1],
            // cityCode
            cityCode: this.receivePlaceValue[1],
            // area
            area: this.$refs["cascaderAddr"].getCheckedNodes()[0].pathLabels[2],
            // areaCode
            areaCode: this.receivePlaceValue[2],
            // address
            address: this.personInformationForm.address,
            // idCard
            idCard: this.personInformationForm.IDNumber,
          }).then((res) => {
            // console.log("commit-res---", res);
            if (res.code == 200) {
              this.$message({
                showClose: true,
                message: "信息提交成功!",
                type: "success",
              });
            }
            getUserImformation()
              // 如果提交成了了就再请求一次

              .then((res) => {
                console.log("提交成功再次请求---", res);
                // this.information = res.result;
                this.$emit("callback", res.result);
              })
              .catch((e) => {
                console.log("e---", e);
              });
          });
        } else {
          this.$message({
            showClose: true,
            message: e.message,
            type: "error",
          });
          return false;
        }
      });
    },
    // 请求个人信息
    getUserImformationMethod() {
      getUserImformation()
        .then((res) => {
          console.log("res---", res);
          this.personInformationContainer = res.result;
          // console.log(
          //   "personInformationContainer---",
          //   this.personInformationContainer,
          // );
        })
        .catch((e) => {
          console.log("e---", e);
        });
    },
  },
  computed: {
  },
  mounted() {
    this.options = city;
    this.getUserImformationMethod();
    // console.log("父组件请求传给子组件", this.information);
    // console.log("父组件请求传给子组件的id", this.information.id);

    // this.$set(this.personInformationForm, "realName", this.information.username);
    // this.$set(this.personInformationForm, "IDNumber", this.information.idCard);
    // this.$set(this.personInformationForm, "phone", this.information.phone);
    // this.$set(this.personInformationForm, "address", this.information.address);
  },
};
</script>

<style lang="less" scoped>
.person-tab-box {
  width: 100%;
  margin-top: 50px;
  .button-box {
    display: flex;
    justify-content: space-between;
    height: 35px;
    width: 200px;

    button {
      border: none;
      border-radius: 15px;
      width: 80px;
      background: #ffffff;
    }

    button:focus {
      outline: 0;
    }

    .active {
      color: #409eff;
      background-color: #f2f3f8;
    }
  }
}
.person-container {
  margin-top: 30px;
  .person-form {
    width: 50%;
    h3 {
      margin-bottom: 20px;
    }
  }
  .address-table {
    width: 100%;
  }
}
/deep/.el-cascader {
  // flex: 1;
  width: 100%;
}
</style>
