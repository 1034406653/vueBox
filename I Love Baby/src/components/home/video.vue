<template>
  <div class="template-content">
    <div class="video-box dog-box list-box">
      <div class="list-top">
        <div class="borde"></div>
        <div class="title-text">Dog</div>
        <div class="add-btn dogVideo-publish" @click="goVideoAdd('1')"> </div>
      </div>
      <ul class="dogUl">
        <li v-for="(item,index) in dogList">
          <div class="delVideo" @click="delVideo(item.userPetCuringId)"> <img src="../../assets/web/del-btn.png" /> </div>
          <div class="li-left-content"> <!--<img src="../../assets/web/video-play.png" :videoUrl='item.playUrl' class="coverImg videoPlayBtn" />--> <img :src='item.coverUrl' :videoUrl='item.playUrl' class="coverImg" /> </div>
          <div class="li-right">
            <div class="li-right-text"> <span>Title：</span> <span :title='item.title'>{{item.title}}</span> </div>
            <div class="li-right-content" :title='item.description'> <span>Description：{{item.description}}</span> </div>
            <div class="li-bottom">
              <div> <span>Difficulty level：{{item.level}}</span>
                <div class="star-box"></div>
              </div>
              <div> <span>Page view：</span> <span>{{item.pv}}</span> </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div id="pageDog"></div>
    <div class="video-box cat-box list-box">
      <div class="list-top">
        <div class="borde"></div>
        <div class="title-text">Cat</div>
        <div class="add-btn catVideo-publish" @click="goVideoAdd('2')"> </div>
      </div>
      <ul class="catUl">
        <li v-for="(item,index) in catList">
          <div class="delVideo" @click="delVideo(item.userPetCuringId)"> <img src="../../assets/web/del-btn.png" /> </div>
          <div class="li-left-content"> 
          	<img src="../../assets/web/video-play.png" :videoUrl='item.playUrl' class="coverImg videoPlayBtn" /> 
          	<img :src='item.coverUrl' :videoUrl='item.playUrl' class="coverImg" /> </div>
          <div class="li-right">
            <div class="li-right-text"> <span>Title：</span> <span :title='item.title'>{{item.title}}</span> </div>
            <div class="li-right-content" :title='item.description'> <span>Description：{{item.description}}</span> </div>
            <div class="li-bottom">
              <div> <span>Difficulty level：{{item.level}}</span>
                <div class="star-box"></div>
              </div>
              <div> <span>Page view：</span> <span>{{item.pv}}</span> </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div id="pageCat"></div>
    <div id="delVideoModal"></div>
  </div>
</template>
<script>
  import { mText, MPaging } from '../../../static/js/maWon.js'
  import { Modal } from '../../../static/js/modal.js'
  var MawenDog = "";
  var MawenCat = "";
  var delVideoModal = "";
  export default {
    components: {},
    data() {
      return {
        liangliang: sessionStorage.getItem("liangliang").substring(0, sessionStorage.getItem("liangliang").length - 10),
        baseUrl: sessionStorage.getItem("baseUrl"),
        dogVideoJson: {
          "type": 1,
          "page": 1
        },
        catVideoJson: {
          "type": 2,
          "page": 1
        },
        dogList: [],
        catList: [],
      }
    },
    mounted() {
      this.init();
    },
    watch: {
      '$route' (to, from) {
      	this.refreshDog();
        this.refreshCat();
      }
    },
    methods: {
      init() {
        this.paging();
        this.refreshDog();
        this.refreshCat();
        /*视频播放*/
        $(".video-box").on("click", ".coverImg", function() {
          $(this).parents(".li-left-content").html('<video src=' + $(this).attr("videoUrl") + ' controls="controls" autoplay="autoplay"></video>');
        })
      },
      refreshDog() {
        var that = this;
        let dogVideoStr = JSON.stringify(this.dogVideoJson);
        $.ajax({
          url: that.baseUrl + "listPetTraining",
          type: "POST",
          data: dogVideoStr,
          headers: {
            'Authorization': that.liangliang,
          },
          dataType: "json",
          contentType: "application/json",
          success: function(rex) {
            that.dogList = rex.data;
            console.log(rex.data);
            MawenDog.init({
              curPage: that.dogVideoJson.page, //当前页码
              total: rex.page, //总页码
              jump: 'block', //显示跳转页节点
              callback: function(page) {
                //返回页码的回调函数
                that.dogVideoJson.page = page;
                that.refreshDog();
              }
            })
          }
        })
      },
      refreshCat() {
        var that = this;
        let catVideoStr = JSON.stringify(this.catVideoJson);
        $.ajax({
          url: that.baseUrl + "listPetTraining",
          type: "POST",
          data: catVideoStr,
          headers: {
            'Authorization': that.liangliang,
          },
          dataType: "json",
          contentType: "application/json",
          success: function(rex) {
            that.catList = rex.data;
            MawenCat.init({
              curPage: that.catVideoJson.page, //当前页码
              total: rex.page, //总页码
              jump: 'block', //显示跳转页节点
              callback: function(page) {
                //返回页码的回调函数
                that.catVideoJson.page = page;
                that.refreshCat();
              }
            })
          }
        })
      },
      paging() {
        var that = this;
        MawenDog = new MPaging({
          el: pageDog, //挂载的盒子dom
          curPage: 1, //当前页码
          total: 10, //总页码
          hoverBackground: '', //hover状态下背景色
          curBackground: '#19b3e5', //当前页码背景色
          jump: 'block', //显示跳转页节点
          callback: function(page) {
            that.dogVideoJson.page = page;
          }
        });
        MawenCat = new MPaging({
          el: pageCat, //挂载的盒子dom
          curPage: 1, //当前页码
          total: 10, //总页码
          hoverBackground: '', //hover状态下背景色
          curBackground: '#19b3e5', //当前页码背景色
          jump: 'block', //显示跳转页节点
          callback: function(page) {
            that.catVideoJson.page = page;
          }
        });
      },
      delVideo(videoId) {
      	var that=this;
        delVideoModal = new Modal({
          "eleId": "delVideoModal",
          "title": "",
          "content": "Are you sure you want to delete the video？",
          success: function() {
            $.ajax({
              url: that.baseUrl + "delPetTraining",
              type: "POST",
              data: "{'userPetTrainingId':" + videoId + "}",
              headers: {
                'Authorization': that.liangliang,
              },
              dataType: "json",
              contentType: "application/json",
              success: function(rex) {
                if(rex.code == "200") {
                	$("#delVideoModal").hide();
                  that.refreshCat();
                  that.refreshDog();
                }
              }
            })
          },
          cancel: function() {
           
          }
        });
      },
      goVideoAdd(videoType){
        this.$router.push({
          path: "video-add",
          query:{
          	"videoType":videoType
          }
        })
      },
    },
  }
</script>
<style>
  @import url("../../../static/css/base.css");
  @import url("../../../static/css/artical.css");
  @import url("../../../static/css/video.css");
</style>