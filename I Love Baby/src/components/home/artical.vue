<template>
  <div class="template-content">
    <div class="banner list-box">
      <div class="list-top">
        <div class="borde"></div>
        <div class="title-text">Banners</div>
        <div class="add-btn add-banner" @click="goAddArtical('1')"> </div>
      </div>
      <div class="banner-main">
        <div class="banner-box" v-for="item in bannerList" @click="goArtical(item.url)"> <img :src='item.coverUrl' />
          <div class="banner-text">{{item.title}}</div>
          <div class="banner-bottom">
            <div><span>Author</span>:<span>{{item.author}}</span></div>
            <div><span>Page view</span>:<span>{{item.pv}}</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-box list-box">
      <div class="list-top">
        <div class="borde"></div>
        <div class="title-text">Articles</div>
        <div class="add-btn add-article" @click="goAddArtical('0')"> </div>
      </div>
      <ul class="article-list">
        <li v-for="item in articalList" @click="goArtical(item.url)">
          <div class="delArticle"> <img src="../../assets/web/del-btn.png" @click.stop="delArtical(item.userPetCuringId)" /> </div> <img :src='item.coverUrl' />
          <div class="li-right">
            <div class="li-right-text">{{item.title}}</div>
            <div class="li-bottom">
              <div><span>Page view：</span><span>{{item.author}}</span></div>
              <div><span>Page view：</span><span>{{item.pv}}</span></div>
            </div>
          </div>
        </li>
      </ul>
      <div id="articalPage"></div>
    </div>
    <div id="modal"></div>
  </div>
</template>
<script>
  import { mText, MPaging } from '../../../static/js/maWon.js'
  import { Modal } from '../../../static/js/modal.js'
  var Mawen = "";
  var delArticalModal = "";
  export default {
    components: {},
    data() {
      return {
        liangliang: sessionStorage.getItem("liangliang").substring(0, sessionStorage.getItem("liangliang").length - 10),
        baseUrl: sessionStorage.getItem("baseUrl"),
        bannerList: [],
        articalList: [],
        articalListPage: 1,
      }
    },
    mounted() {
      this.init();
      this.paging();
    },
    watch: {
      '$route' (to, from) {
        this.init();
      }
    },
    methods: {
      init() {
        this.refreshBanner();
        this.refreshArticle();
      },
      refreshBanner() {
        var that = this;
        $.ajax({
          url: that.baseUrl + "listPetCuringBroadcast",
          type: "POST",
          data: "",
          headers: {
            'Authorization': that.liangliang,
          },
          dataType: "json",
          contentType: "application/json",
          success: function(rex) {
            if(rex.code == "200") {
              that.bannerList = rex.data;
            }
          }
        })
      },
      refreshArticle() {
        var that = this;
        $.ajax({
          url: that.baseUrl + "listPetCuring",
          type: "POST",
          data: "{'page':" + that.articalListPage + "}",
          headers: {
            'Authorization': that.liangliang,
          },
          dataType: "json",
          contentType: "application/json",
          success: function(rex) {
            if(rex.code == "200") {
              that.articalList = rex.data;
              Mawen.init({
                curPage: that.articalListPage, //当前页码
                total: rex.page, //总页码
                jump: 'block', //显示跳转页节点
                callback: function(page) {
                  //返回页码的回调函数
                  that.articalListPage = page;
                  that.refreshArticle();
                }
              })
            }
          }
        })
      },
      paging() {
        var that = this;
        Mawen = new MPaging({
          el: articalPage, //挂载的盒子dom
          curPage: 1, //当前页码
          total: 10, //总页码
          hoverBackground: '', //hover状态下背景色
          curBackground: '#19b3e5', //当前页码背景色
          jump: 'block', //显示跳转页节点
          callback: function(page) {
            that.articalListPage = page;
          }
        });
      },
      delArtical(articalId) {
        var that = this;
        delArticalModal = new Modal({
          "eleId": "modal",
          "title": "",
          "content": "Are you sure you want to delete this article",
          success: function() {
            $.ajax({
              url: that.baseUrl + "delPetCuring",
              type: "POST",
              data: "{'userPetCuringId':" + articalId + "}",
              headers: {
                'Authorization': that.liangliang,
              },
              dataType: "json",
              contentType: "application/json",
              success: function(rex) {
                that.refreshArticle();
                that.refreshBanner();
                $("#modal").hide();
              }
            })
          },
          cancel: function() {}
        });
      },
      goArtical(articalUrl) {
        window.open(articalUrl);
      },
      goAddArtical(articalType) {
        this.$router.push({
          path: "artical-add",
          query:{
          	"articalType":articalType
          }
        })
      }
    },
  }
</script>
<style>
  @import url("../../../static/css/base.css");
  @import url("../../../static/css/artical.css");
</style>