<template>
  <div class="content-box">
    <div class="header-box">
      <div class="header clearfloat">
        <h1>
      	<img src="../assets/img/web/logo.png"/>
        <div class="header-title">
            <p>支付技术创新Highland</p>
            <p>黑科技+VIP定制</p>
        </div>
      </h1>
        <ul class="nav clearfloat">
          <li v-for="(item,index) in nav1List" :class="item.li1class">
            <div class="li1-div"> <span @click="showOrNaV(item.nav2list,index,item.routerPath)" :routerPath="item.routerPath">{{item.li1text}}</span>
              <ul class="nav2 clearfloat" v-if="item.nav2show">
                <li v-for="item2 in item.nav2list">
                  <h4 v-if="item2.h4Text">{{item2.h4Text}}</h4>
                  <div class="nav3-box" v-if="item2.nav3List">
                    <ul class="nav3" v-for="item3 in item2.nav3List">
                      <li v-for="item4 in item3.nav4List"> <span :class="item4.li4Class">{{item4.li4text}} </span> </li>
                    </ul>
                  </div> <img :src="item2.imgPic" v-if="item.nav2show" /> </li>
              </ul>
              <div class="nav2-bg" v-if="item.nav2show"></div>
            </div>
          </li>
        </ul>
        <div class="change-word">
          <a>中文</a><span> / </span>
          <a>English</a>
        </div>
      </div>
    </div>
    <router-view/>
    <div class="footer-box">
      <div class="footer">
        <div class="hh2">引领支付技术物联网时代，赋能境内外企商</div>
        <ul class="footer-list clearfloat">
          <li>
            <div class="hh4">关于我们</div>
            <router-link tag="p" to="aboutUs">
              <a>公司介绍</a>
            </router-link>
            <router-link tag="p" to="aboutUs">
              <a>联系我们</a>
            </router-link>
            <router-link tag="p" to="aboutUs">
              <a>加入我们</a>
            </router-link>
          </li>
          <li>
            <div class="hh4">联系方式</div>
            <p>电话热线：0571-86803333</p>
            <p>工作时间：周一至周五9:00-17:00</p>
            <p>详细地址：浙江省杭州市下城区白石路365号12楼</p>
          </li>
          <li> <img src="../assets/img/web/QR-code.png" />
            <p>关注微信公众号</p>
          </li>
        </ul>
      </div>
      <div class="footer-bottom">©2017 杭州柏源科技有限公司. 2017 All Rights Reserved. 浙ICP备17048042号.<i></i>京公网安备 11010102002019号</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        nav1List: [{
          li1text: "首页",
          li1class: "active",
          li1Page: "home",
          nav2show: false,
          routerPath: "home"
        }, {
          li1text: "产品中心",
          li1class: "",
          li1Page: "home",
          nav2show: false,
          nav2list: [{
            h4Text: "支付产品线",
            nav3List: [{
              nav4List: [{
                li4text: "收银软件",
                li4Class: "li4title",
              }, {
                li4text: "餐饮版",
                li4Class: "li4Active",
              }, {
                li4text: "足浴版",
                li4Class: "li4Active",
              }, {
                li4text: "商超版",
                li4Class: "li4Active",
              }, {
                li4text: "丽人版",
                li4Class: "",
              }, {
                li4text: "通用版",
                li4Class: "",
              }, ],
            }, {
              nav4List: [{
                li4text: "收银APP",
                li4Class: "li4title",
              }, {
                li4text: "收银员版",
                li4Class: "li4Active",
              }, {
                li4text: "老板版",
                li4Class: "li4Active",
              }, {
                li4text: "单店版",
                li4Class: "li4Active",
              }, {
                li4text: "多门店版",
                li4Class: "li4Active",
              }, ],
            }, {
              nav4List: [{
                li4text: "智能POS机",
                li4Class: "li4title",
              }, {
                li4text: "智能POS机",
                li4Class: "li4Active",
              }],
            }, {
              nav4List: [{
                li4text: "收银台卡",
                li4Class: "li4title",
              }, {
                li4text: "收银台卡",
                li4Class: "li4Active",
              }],
            }],
          }, {
            h4Text: "智能硬件",
            nav3List: [{
              nav4List: [{
                li4text: "智能POS机",
                li4Class: "li4Active",
              }, {
                li4text: "蓝牙打印机",
                li4Class: "li4Active",
              }, {
                li4text: "无线扫描枪",
                li4Class: "li4Active",
              }, {
                li4text: "安卓触屏收银机",
                li4Class: "",
              }],
            }],
          }, {
            h4Text: "创新运营",
            nav3List: [{
              nav4List: [{
                li4text: "小程序",
                li4Class: "",
              }, {
                li4text: "店铺诊断",
                li4Class: "li4Active",
              }, {
                li4text: "会员画像",
                li4Class: "li4Active",
              }, {
                li4text: "客户建模",
                li4Class: "li4Active",
              }],
            }, {
              nav4List: [{
                li4text: "H5营销",
                li4Class: "",
              }, {
                li4text: "二维码营销",
                li4Class: "",
              }, {
                li4text: "微信公众号",
                li4Class: "",
              }, {
                li4text: "支付宝生活号",
                li4Class: "",
              }],
            }, {
              nav4List: [{
                li4text: "大数据分析",
                li4Class: "",
              }],
            }, ],
          }, {
            imgPic: require('../assets/img/web/pos.png')
          }]
        }, {
          li1text: "行业方案",
          li1class: "",
          li1Page: "home",
          nav2show: false,
          nav2list: [{
            h4Text: "行业解决方案",
            nav3List: [{
              nav4List: [{
                li4text: "智慧餐厅",
                li4Class: "li4Active",
              }, {
                li4text: "智慧医院",
                li4Class: "li4Active",
              }, {
                li4text: "智慧停车场",
                li4Class: "li4Active",
              }],
            }, {
              nav4List: [{
                li4text: "智慧车站",
                li4Class: "li4Active",
              }, {
                li4text: "智慧景区",
                li4Class: "li4Active",
              }, {
                li4text: "智慧园区",
                li4Class: "li4Active",
              }],
            }],
          }, {
            imgPic: require('../assets/img/web/scan-code.png')
          }, {
            h4Text: "物联网定制产品",
            nav3List: [{
              nav4List: [{
                li4text: "智慧农业",
                li4Class: "",
              }, {
                li4text: "智慧酒店",
                li4Class: "li4Active",
              }, {
                li4text: "智慧通行",
                li4Class: "",
              }],
            }],
          }, {
            imgPic: require('../assets/img/web/iot.png')
          }]
        }, {
          li1text: "支付技术",
          li1class: "",
          li1Page: "home",
          nav2show: false,
        }, {
          li1text: "安全中心",
          li1class: "",
          li1Page: "home",
          nav2show: false,
        }, {
          li1text: "关于我们",
          li1class: "",
          li1Page: "home",
          nav2show: false,
          routerPath: "aboutUs"
        }, ]
      }
    },
    mounted() {
      this.init()
    },
    watch: {
      "$route": "init"
    },
    methods: {
      init() {
      	var that=this;
      	function restClassName(){
      		that.nav1List.forEach((x,i)=>{
      			that.nav1List[i].li1class = "";
      		})
      	}
      	restClassName();
        if(this.$route.path == "/pPage/home") {
          this.nav1List[0].li1class = "active";
        }else if(this.$route.path == "/pPage/aboutUs"){
        	this.nav1List[5].li1class = "active";
        }
      },
      showOrNaV(nav2show, index, routerPath) {
        if(nav2show) {
          this.nav1List.forEach((x, i) => {
            if(i == index) {
              this.nav1List[index].nav2show = !this.nav1List[index].nav2show;
            } else {
              this.nav1List[i].nav2show = false;
            }
          })
          console.log(index);
        } else {
          this.nav1List.forEach((x, i) => {
            this.nav1List[i].nav2show = false;
          })
          this.$router.push({
            path: routerPath
          })
        }
      }
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>