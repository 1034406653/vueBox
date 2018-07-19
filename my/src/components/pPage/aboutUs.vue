<template>
  <div class="content">
    <div class="part1">
      <div class="part1-bg"></div>
      <div class="part1-main">
        <div class="hh3">关于我们</div>
        <p>杭州柏源科技有限公司为境内外企商提供基于支付的行业解决方案。<br/> 融合物联网和互联网黑科技，创新产品组合，赋能亿万企商</p>
      </div>
    </div>
    <div class="part2">
      <div class="hh2">企业简介</div>
      <p>来自支付之城--杭州<br/> 柏源科技运用互联网思维，整合物联网技术，针对不断演变的支付场景，<br/> 为企商量身定制支付产品组合和解决方案。<br/> 颠覆传统商业模式，7行代码3秒钟帮助企商降低运维成本，<br/> 实现智能支付，自动获客，精准大数据分析，会员建模以及获取多元化增值服务。</p>
    </div>
    <div class="part3">
      <div class="hh2">企业文化</div>
      <div class="part3-main">
        <div class="d1">
          <div class="hh4">使命</div>
          <p>让现在离未来更近</p>
        </div>
        <div class="d2">
          <div class="hh4">愿景</div>
          <p>释放科技价值 创见智慧生活</p>
        </div>
        <div class="d3">
          <div class="hh4">品牌理念</div>
          <p>科技 自由 乐享</p>
        </div>
        <div class="d4">
          <div class="hh4">价值观</div>
          <p>超越预期 创造价值 追求卓越</p>
        </div>
        <div class="d5">
          <div class="hh4">核心竞争力</div>
          <p>超越预期 创造价值 追求卓越</p>
        </div>
        <div class="d6">
          <div class="hh4">企业精神</div>
          <p>现在就最到最好</p>
        </div>
        <div class="d7">
          <div class="hh4">人才策略</div>
          <p>唯德是用 唯才是用 德才兼备</p>
        </div>
        <div class="d8">
          <div class="hh4">经营宗旨</div>
          <p>把笑话变成神话<br/>成就最具幸福感的企业合伙人</p>
        </div>
      </div>
    </div>
    <div class="part4">
      <div class="hh2">产品研发时间线</div>
      <ul class="part4-list">
        <li>
          <div class="part4-list-left">
            <div class="hh4">• 2017年12月大型电商支付技术方案上线</div> <img src="../../assets/img/web/aboutAs/aboutAs-part4-pic3.png" /> </div>
          <div class="part4-list-right"> </div>
        </li>
        <li>
          <div class="part4-list-left"></div>
          <div class="part4-list-right">
            <div class="hh4">• 2017年11月发布足浴管理软件</div> <img src="../../assets/img/web/aboutAs/aboutAs-part4-pic2.png" /> </div>
        </li>
        <li>
          <div class="part4-list-left">
            <div class="hh4">• 2017年7月无感停车场系统发布</div> <img src="../../assets/img/web/aboutAs/aboutAs-part4-pic1.png" /> </div>
          <div class="part4-list-right"></div>
        </li>
        <li>
          <div class="part4-list-left"> </div>
          <div class="part4-list-right">
            <div class="hh4">• 2017年5月智慧点餐系统发布/<br/> 智慧农业APP </div> <img src="../../assets/img/web/aboutAs/aboutAs-part4-pic4.png" /> </div>
        </li>
        <li>
          <div class="part4-list-left">
            <div class="hh4">• 2016年10月支付管理后台<br/> 上线/APP发布2.1.1/智慧高速<br/> 通行 </div> <img src="../../assets/img/web/aboutAs/aboutAs-part4-pic6.png" /> </div>
          <div class="part4-list-right"> </div>
        </li>
        <li>
          <div class="part4-list-left"> </div>
          <div class="part4-list-right">
            <div class="hh4">• 2016年4月支付APP发布</div> <img src="../../assets/img/web/aboutAs/aboutAs-part4-pic7.png" /> </div>
        </li>
        <li>
          <div class="part4-list-left">
            <div class="hh4">• 2016年2月手持智能POS机发布</div> <img src="../../assets/img/web/aboutAs/aboutAs-part4-pic5.png" /> </div>
          <div class="part4-list-right"> </div>
        </li>
        <li>
          <div class="part4-list-left"> </div>
          <div class="part4-list-right">
            <div class="hh4">• 2010年柏源科技有限公司成立</div> <img src="../../assets/img/web/aboutAs/aboutAs-part4-pic8.png" /> </div>
        </li>
        <div class="part4-list-b"> <b class="b1"><b><b></b></b>
          </b> <b class="b2"></b> <b class="b3"></b> <b class="b4"></b> <b class="b5"></b> <b class="b6"></b> <b class="b7"></b> <b class="b8"></b> </div>
      </ul>
    </div>
    <div class="part5">
      <div class="hh2">联系我们</div>
      <div class="map-box">
        <div class="map" id="container"></div>
      </div>
      <ul class="part5-bottom">
        <li> <img src="../../assets/img/web/aboutAs/aboutAs-part5-pic1.png" />
          <p>0571-86803333</p>
        </li>
        <li> <img src="../../assets/img/web/aboutAs/aboutAs-part5-pic2.png" />
          <p>service@boyuanpay.com</p>
        </li>
        <li> <img src="../../assets/img/web/aboutAs/aboutAs-part5-pic3.png" />
          <p>浙江省杭州市拱墅区白石巷365号</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
  	/*aaa*/
    mounted() {
      var map = new BMap.Map("container"); // 创建Map实例
      var poi = new BMap.Point(120.17230, 30.323299);
      map.centerAndZoom(poi, 20);
      map.enableScrollWheelZoom(true);
      var top_left_control = new BMap.ScaleControl({
        anchor: BMAP_ANCHOR_TOP_LEFT
      }); // 左上角，添加比例尺
      var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
      var top_right_navigation = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        type: BMAP_NAVIGATION_CONTROL_SMALL
      });

      function add_control() {
        map.addControl(top_left_control);
        map.addControl(top_left_navigation);
        map.addControl(top_right_navigation);
      }
      add_control();
      var content = '<div style="margin:0;line-height:20px;padding:2px;padding-top:10px">' + '联系电话：0571-86803333 ' + '</div><div style="margin:0;line-height:20px;padding:2px;">' + '公司邮箱：service@boyuanpay.com ' + '</div><div style="margin:0;line-height:20px;padding:2px;">' + '地址：浙江省杭州市下城区白石路365号12楼' + '</div>';
      //创建检索信息窗口对象
      var searchInfoWindow = null;
      searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
        title: "柏源科技", //标题
        width: 290, //宽度
        height: 100, //高度
        panel: "panel", //检索结果面板
        enableAutoPan: true, //自动平移
        searchTypes: [
          BMAPLIB_TAB_SEARCH, //周边检索
          BMAPLIB_TAB_TO_HERE, //到这里去
          BMAPLIB_TAB_FROM_HERE //从这里出发
        ]
      });
      var marker = new BMap.Marker(poi); //创建marker对象
      /*marker.enableDragging(); */ //marker可拖拽
      marker.addEventListener("click", function(e) {
        searchInfoWindow.open(marker);
      });
      searchInfoWindow.open(marker);
      map.addOverlay(marker); //在地图中添加marker
      //样式1
      var searchInfoWindow1 = new BMapLib.SearchInfoWindow(map, "信息框1内容", {
        title: "信息框1", //标题
        panel: "panel", //检索结果面板
        enableAutoPan: true, //自动平移
        searchTypes: [
          BMAPLIB_TAB_FROM_HERE, //从这里出发
          BMAPLIB_TAB_SEARCH //周边检索
        ]
      });

      function openInfoWindow1() {
        searchInfoWindow1.open(new BMap.Point(120.17230, 30.323299));
      }
    }
  }
</script>
<style>
  @import url("../../../static/css/aboutAs.css");
</style>