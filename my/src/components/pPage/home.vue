<template>
  <div class="content">
    <div class="l-banner-1">
      <div class="l-banner-1-box"></div>
      <div class="l-banner-1-text-bg"></div>
      <div class="l-banner-1-text">
        <p class="p2 scroll-hide"><span>以支付技术为起点</span><br> <span>颠覆企商支付、客户管理、营销推广、会员管理、商业运作模式</span><br> <span>软件和硬件结合</span><br> <span>互联网与物联网联姻</span><br> <span>引领境内外企业进入未来商业时代</span><br> <span>支付流、资金流、客户流、信息流、多流合一、自动沉淀、智能分析</span><br> <span>迈入智能管理的大门</span> </p>
      </div>
    </div>
    <div class="l-banner-2">
      <div class="l-banner-2-box1"></div>
      <div class="l-banner-2-box2"></div>
      <div class="l-banner-2-text">
        <div class="p1 scroll-hide hh3"><span>8大产品线</span></div>
        <p class="p1 scroll-hide"><span>智能触屏POS机</span><span>收银APP</span></p>
        <p class="p1 scroll-hide"><span>足浴管理软件</span><span>餐饮管理软件</span></p>
        <p class="p1 scroll-hide"><span>丽人管理软件</span><span>商超管理软件</span></p>
        <p class="p1 scroll-hide"><span>聚合支付收银台卡</span><span>通用版管理软件</span></p>
      </div>
    </div>
    <div class="l-banner-3">
      <div class="l-banner-3-text">
        <div class="p1 scroll-hide hh3"><span>10大行业解决方案</span></div>
        <p class="scroll-hide"><span>智慧餐厅，智慧停车场，智慧车站，智慧景区，智慧园区，智慧医院，智慧通行，智慧农业，
	       	智慧无人酒店，智慧城市</span><br><span>解决行业和用户的痛点和企商一起成长，不断演进的解决方案灵活组合，个性定制</span> </p>
      </div>
    </div>
    <div class="l-banner-4">
      <div class="l-banner-4-bg"></div>
      <div class="l-banner-4-box">
        <div class="scroll-hide hh3"><span>10W+境内外企商共同的选择</span></div>
        <div class="scroll-hide hh4"><span class="active">合作伙伴</span><span>客户案例</span></div>
        <div class="l-banner-4-div-box">
          <div class="l-banner-4-div">
            <ul>
              <li class="banner4-1">
                <div></div>
                <p>银联商务</p>
              </li>
              <li class="banner4-2">
                <div></div>
                <p>中信银行</p>
              </li>
              <li class="banner4-3">
                <div></div>
                <p>浙江民泰商业银行</p>
              </li>
              <li class="banner4-4">
                <div></div>
                <p>浦发银行</p>
              </li>
              <li class="banner4-5">
                <div></div>
                <p>通联支付</p>
              </li>
              <li class="banner4-6">
                <div></div>
                <p>联动优势</p>
              </li>
              <li class="banner4-7">
                <div></div>
                <p>微信支付</p>
              </li>
              <li class="banner4-8">
                <div></div>
                <p>支付宝</p>
              </li>
            </ul>
            <div class="ul-bg"></div>
          </div>
          <div class="l-banner-4-div l-banner-4-div-2">
            <ul>
              <li class="banner4-1">
                <div></div>
                <p>银泰商业</p>
              </li>
              <li class="banner4-2">
                <div></div>
                <p>永辉超市</p>
              </li>
              <li class="banner4-3">
                <div></div>
                <p>两岸咖啡</p>
              </li>
              <li class="banner4-4">
                <div></div>
                <p>莫泰连锁旅店</p>
              </li>
              <li class="banner4-5">
                <div></div>
                <p>浙江衢州东方集团</p>
              </li>
              <li class="banner4-6">
                <div></div>
                <p>华联超市</p>
              </li>
              <li class="banner4-7">
                <div></div>
                <p>甘其食</p>
              </li>
              <li class="banner4-8">
                <div></div>
                <p>巴比馒头</p>
              </li>
              <li class="banner4-9">
                <div></div>
                <p>春丽</p>
              </li>
              <li class="banner4-10">
                <div></div>
                <p>85℃</p>
              </li>
            </ul>
            <div class="ul-bg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        $(".l-banner-4-box .hh4 span").eq(0).click(function() {
          $(".l-banner-4-div").eq(0).css({
            "opacity": 1,
            "transform": "rotateX(0deg)",
            "-webkit-transform": "rotateX(0deg)",
            "-moz-transform": "rotateX(0deg)",
            "-ms-transform": "rotateX(0deg)",
            "z-index": 3
          });
          $(".l-banner-4-div").eq(1).css({
            "opacity": 0,
            "transform": "rotateX(-180deg)",
            "-webkit-transform": "rotateX(-180deg)",
            "-moz-transform": "rotateX(-180deg)",
            "-ms-transform": "rotateX(-180deg)",
            "z-index": 1
          });
          $(this).siblings("span").removeClass("active");
          $(this).addClass("active");
        });
        $(".l-banner-4-box .hh4 span").eq(1).click(function() {
          $(".l-banner-4-div").eq(0).css({
            "opacity": 0,
            "transform": "rotateX(-180deg)",
            "-webkit-transform": "rotateX(-180deg)",
            "-moz-transform": "rotateX(-180deg)",
            "-ms-transform": "rotateX(-180deg)",
            "zIndex": 1
          });
          $(".l-banner-4-div").eq(1).css({
            "opacity": 1,
            "transform": "rotateX(0deg)",
            "-webkit-transform": "rotateX(0deg)",
            "-moz-transform": "rotateX(0deg)",
            "-ms-transform": "rotateX(0deg)",
            "zIndex": 3
          });
          $(this).siblings("span").removeClass("active");
          $(this).addClass("active");
        });
      }
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("../../../static/css/index.css");
</style>