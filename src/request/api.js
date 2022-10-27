// import service from "./index";
import {
    post,
    get
} from "./index";

// 登录
export function login(data) {
    return post({
        url: "/bio/user/login",
        data
    })
}

// 注册
export function register(data) {
    return post({
        url: "/bio/user/register",
        data
    })
}

// 商品推荐列表
// export function goodsRecommendList (data) {
//     return service({
//         url: "/bio/app/bioItem/recommended/list",
//         method: "get",
//         data
//     })
// }

// 商品推荐列表
export function goodsRecommendList(data) {
    return get({
        url: "/bio/app/bioItem/recommended/list",
        data
    })
}

// 商品详情返回id
export function getGoodsDetail(data) {
    // console.log("api---", data);
    return get({
        url: "/bio/app/bioItem/queryById?id=" + data,

    })
}

// 商品详情sku
export function getGoodsDetailSku(data) {
    // console.log("api---", data);
    return get({
        url: "/bio/app/bioSku/queryItemId?itemId=" + data,
    })
}

// 商品推荐轮播图
export function getGoodsRecommendBanner(data) {
    return get({
        url: "/bio/app/bioBanner/app/list?bannerType="+data
    })
}



// 精选服务列表
export function choicenessServiceList() {
    return service({
        url: "choicenessServiceList",
        method: "GET"
    })
}

// 搜索商品
export function searchGoods() {
    return service({
        url: "searchGoods",
        method: "GET"
    })
}

// 搜索商品
export function searchServices() {
    return service({
        url: "searchServices",
        method: "GET"
    })
}

// 商品列表
export function getGoodsList() {
    return service({
        url: "/getGoodsList",
        method: "GET"
    })
}