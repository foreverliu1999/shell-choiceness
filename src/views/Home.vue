<template>
  <div>
    <el-container>
      <el-header>
        <HeaderNav />
        <!-- <el-row :gutter="28">
          <el-col :span="3"
            ><div class="grid-content shell-choiceness">贝壳精选</div></el-col
          >
          <el-col :span="1"><div class="grid-content"></div></el-col>
          <el-col :span="2"><div class="grid-content"></div></el-col>

          <el-col :span="6"
            ><div
              style=""
              type="button"
              class="grid-content tab-button"
              :class="num == 1 ? 'active' : ''"
              @click="num = 1"
            >
              找商品
            </div></el-col
          >
          <el-col :span="6"
            ><div
              style=""
              type="button"
              class="grid-content tab-button"
              :class="num == 2 ? 'active' : ''"
              @click="num = 2"
            >
              找服务
            </div></el-col
          >
          <el-col :span="2"><div class="grid-content"></div></el-col>
          <el-col :span="2"><div class="grid-content"></div></el-col>
          <el-col :span="2"><div class="grid-content"></div></el-col>
        </el-row> -->
      </el-header>
      <el-main>
        <!-- <div v-if="num == 1" class="el-main-son"> -->
        <div>
          <IndexSearchBox @searchInput="getIndexSearchInput" />

          <IndexBannerBox />

          <HotRecommendBox />

          <IndexGoodsList />

          <!-- <GoodsSearchBox @searchInput="getGoodsSearchInput" />
          <GoodsBannerBox />
          <GoodsRecommand /> -->
        </div>
        <!-- <div v-if="num == 2" class="el-main-son">
          <ServiceSearchBox @searchInput="getServiceSearchInput" />
          <ServiceBannerBox />
          <SelectedService />
          <PartnerBox />
        </div> -->
      </el-main>
    </el-container>
    <Footer />
  </div>
</template>

<script>
import HeaderNav from "../components/HeaderNav.vue";
import Footer from "../components/Footer.vue";
import IndexSearchBox from "../components/IndexSearchBox.vue";
import IndexBannerBox from "../components/IndexBannerBox.vue";
import HotRecommendBox from "../components/HotRecommendBox.vue";
import IndexGoodsList from "../components/IndexGoodsList.vue";

// import GoodsSearchBox from "../components/GoodsSearchBox.vue";
import ServiceSearchBox from "../components/ServiceSearchBox.vue";
// import GoodsBannerBox from "../components/indexComponents/GoodsBannerBox.vue";
import ServiceBannerBox from "../components/indexComponents/ServiceBannerBox.vue";
import GoodsRecommand from "../components/GoodsRecommand.vue";
import SelectedService from "../components/SelectedService.vue";
import PartnerBox from "../components/PartnerBox.vue";

export default {
  // name: 'Home',
  data() {
    return {
      searchInput: "",
      num: 1,
    };
  },

  components: {
    HeaderNav,
    Footer,
    IndexSearchBox,
    IndexBannerBox,
    HotRecommendBox,
    IndexGoodsList,

    // GoodsSearchBox,
    ServiceSearchBox,
    // GoodsBannerBox,
    ServiceBannerBox,
    GoodsRecommand,
    SelectedService,
    PartnerBox,
  },

  methods: {
    getIndexSearchInput(value) {
      // console.log(value);
      this.$router.push({
        name: "goods-search-page",
        query: { name: value },
      });
    },

    // getGoodsSearchInput(value) {
    //   // console.log(value);
    //   this.$router.push({
    //     name: "goods-search-page",
    //     query: { name: value },
    //   });
    // },

    //   getServiceSearchInput(value) {
    //     // console.log(value);
    //     this.$router.push({
    //       name: "service-search-page",
    //       query: { name: value },
    //     });
    //   },
    // },
  },
};
</script>

<style lang="less" scoped>
.el-container {
  .el-header {
    padding: 0;
    height: 40px !important;
  }

  .el-main {
    padding: 0;
  }
}
</style>
