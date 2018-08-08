<template>
  <div class="content post-box news-box">
    <div class="list-top">
      <div class="borde"></div>
      <div class="title-text">Notification list</div>
      <div class="add-btn news-add" @click="goNewsAdd"></div>
    </div>
    <table border="0" cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th width="10%">Username</th>
          <th width="10%">Notification ID</th>
          <th width="15%">Time</th>
          <th width="50%">Content</th>
          <th width="15%">Operate</th>
        </tr>
      </thead>
      <tr v-for="item in trList">
        <td>{{item.userId?item.userId:"All"}}</td>
        <td>{{item.messageId}}</td>
        <td>{{item.addtime}}</td>
        <td :title='item.content'>{{item.content}}</td>
        <td><span class="del" @click="delNews(item.messageId)"> Delete</span></td>
      </tr>
    </table>
    <div id="newsPage"></div>
    <div id="delNewsModal"></div>
  </div>
</template>
<script>
  import { mText, MPaging } from '../../../static/js/maWon.js'
  import { Modal } from '../../../static/js/modal.js'
  var MawenNews = "";
  var delNewsModal = "";
  export default {
    data() {
      return {
        liangliang: sessionStorage.getItem("liangliang").substring(0, sessionStorage.getItem("liangliang").length - 10),
        baseUrl: sessionStorage.getItem("baseUrl"),
        newsJson: {
          page: 1
        },
        trList: [],
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.paging();
        this.refreshNewsTable();
      },
      refreshNewsTable() {
        var that = this;
        let newsStr = JSON.stringify(that.newsJson);
        $.ajax({
          url: that.baseUrl + "listMessageSys",
          type: "POST",
          data: newsStr,
          headers: {
            'Authorization': that.liangliang,
          },
          dataType: "json",
          contentType: "application/json",
          success: function(rex) {
            if(rex.code == "200") {
              that.trList = rex.data;
              MawenNews.init({
                curPage: that.newsJson.page, //当前页码
                total: rex.page, //总页码
                jump: 'block', //显示跳转页节点
                callback: function(page) {
                  //返回页码的回调函数
                  that.newsJson.page = page;
                  that.refreshNewsTable();
                }
              })
            }
          }
        })
      },
      paging() {
        var that = this;
        MawenNews = new MPaging({
          el: newsPage, //挂载的盒子dom
          curPage: 1, //当前页码
          total: 10, //总页码
          hoverBackground: '', //hover状态下背景色
          curBackground: '#19b3e5', //当前页码背景色
          jump: 'block', //显示跳转页节点
          callback: function(page) {
            that.newsJson.page = page;
          }
        });
      },
      delNews(messageId) {
      	var that=this;
      	let newsIdStr=JSON.stringify({'messageSysId':messageId});
        delNewsModal = new Modal({
          "eleId": "delNewsModal",
          "title": "",
          "content": "Are you sure you want to delete the notification？<span class='recoverHint'></span>",
          success: function() {
            $.ajax({
              url: that.baseUrl + "delMessageSys",
              type: "POST",
              data: newsIdStr,
              headers: {
                'Authorization': that.liangliang,
              },
              dataType: "json",
              contentType: "application/json",
              success: function(rex) {
                if(rex.code == 200) {
                  $(".recoverHint").html("Success").css({
                    "color": "green",
                    "paddingLeft": "20px",
                    "fontSize": "16px"
                  });
                  setTimeout(function() {
                    $("#delNewsModal").hide();
                    that.refreshNewsTable();
                  }, 1000)
                }
              }
            })
          },
          cancel: function() {}
        });
      },
    	goNewsAdd(){
    		this.$router.push({
    			path:"news-add"
    		})
    	},
    },
  }
</script>
<style>
  @import url("../../../static/css/post.css");
  .list-top .add-btn {
    background: url(../../assets/web/add-btn.png);
  }
</style>