<template>
  <div class="content detail-content">
    <div class="header">
      <div class="btn-back" @click="goBack">Back</div>
      <div class="title">Post details</div>
    </div>
    <div class="post-box" id="post">
      <div class="post-title" v-if="postContent.title">{{postContent.title}}</div>
      <div class="post-information">
        <div class="author">Author：<span>{{postContent.author}}</span> </div>
        <div class="time">Time：<span>{{postContent.time}}</span> </div>
      </div>
      <div class="post-content">
        <div class="text" v-if="postContent.content" v-html="postContent.content"></div>
        <div class="pic-box" v-if="postContent.images"> <img v-for="img in postContent.images" :src="img.imageSrc" /> </div>
        <div class="post-video"> </div>
      </div>
    </div>
    <ul class="report-list1" v-if="reportList">
      <li v-for="(item,index1) in reportList">
        <div class="user-information"> <img :src='item.replyHeadImageUrl?item.replyHeadImageUrl:"../../assets/web/pic1.jpg"' class="portrait" />
          <div class="user-main">
            <div class="user-top">
              <div class="user-name">{{item.replyNickname}}</div>
            </div>
            <div class="user-bottom">
              <div class="floor">Floor <span>{{item.floor}}</span></div>
              <div class="time"> {{item.time}}</div>
            </div>
          </div>
        </div>
        <div class="report-content"> <span class="text" v-html="item.content"></span> <img v-for="imageLi in item.images" :src="imageLi.imageSrc" class="replylist1Img" /><span class="del delBtn" @click="delComment(item.postReplyId)">Delete</span></div>
        <ul class="report-list2" v-if="item.replyList">
          <li v-for="item2 in item.replyList" v-if="item2.replyNickname"> <span class="said-name">{{item2.replyNickname}}:</span> <span class="reply">reply</span> <span class="reply-name">{{item2.nickname}}:</span> <span class="said-text" v-html="item2.content.replace(/<tag/g,'<span class=selectedOne').replace(/<\/tag>/g,'</span>')"></span> <span class="del delBtn" @click="delComment(item.postReplyId)">Delete</span> </li>
          <li v-for="item2 in item.replyList" v-if="!item2.replyNickname"> <span class="said-name">{{item2.nickname}}</span>: <span class="said-text" v-html="item2.content.replace(/<tag/g,'<span class=selectedOne').replace(/<\/tag>/g,'</span>')"></span> <span class="del delBtn" @click="delComment(item.postReplyId)">Delete</span> </li>
        </ul>
      </li>
    </ul>
    <div class="more-report">There is nothing more</div>
    <div id="delComment"></div>
  </div>
</template>
<script>
  import { Modal } from '../../../static/js/modal.js'
  var delComment = "";
  var regNet = new RegExp("((http|https|ftp|ftps):\\/\\/)?([a-zA-Z0-9-]+\\.){1,5}(com|cn|net|org|hk|tw)((\\/(\\w|-)+(\\.([a-zA-Z]+))?)+)?(\\/)?(\\??([\\.%:a-zA-Z0-9_-]+=[#\\.%:a-zA-Z0-9_-]+(&amp;)?)+)?", "gi");
  export default {
    data() {
      return {
        liangliang: sessionStorage.getItem("liangliang").substring(0, sessionStorage.getItem("liangliang").length - 10),
        baseUrl: sessionStorage.getItem("baseUrl"),
        postContent: {},
        reportList: []
      }
    },
    mounted() {
      var that = this;
      this.init();
      $(".detail-content").on("click", ".selectedOne", function() {
        let identifier = $(this).attr("id");
        that.$router.push({
          path: "user-detail",
          query: {
            identifier: identifier
          }
        })
      })
    },
    methods: {
      init() {
        this.postDetail();
        this.replyList();
      },
      postDetail() {
        let that = this;
        this.postId = this.$route.query.checkPostId;
        $.ajax({
          url: that.baseUrl + "getPost",
          type: "POST",
          data: "{'postId':'" + that.postId + "'}",
          headers: {
            'Authorization': that.liangliang,
          },
          dataType: "json",
          contentType: "application/json",
          success: function(rex) {
            that.postContent = rex.data;
            if(that.postContent.content) {
              that.postContent.content = that.postContent.content.replace(/<tag/g, '<span class=selectedOne').replace(/<\/tag>/g, '</span>');
              that.postContent.content = that.postContent.content.replace(regNet, function(a) {
                 if(a.indexOf("http") != "0" && a.indexOf("ftp") != "0") {
                    a = "http://" + a;
                  }
                return '<a href="' + a + '" target="_blank">' + a + '</a>';
              });
            }
            if(rex.data.videoInfo.playUrl) {
              $(".post-video").html('<video src=' + rex.data.videoInfo.playUrl + '  controls="true" id="video1"></video>');
            }
          }
        })
      },
      replyList() {
        let that = this;
        $.ajax({
          url: that.baseUrl + "listPostReply",
          type: "POST",
          data: "{'postId':'" + that.postId + "'}",
          headers: {
            'Authorization': that.liangliang,
          },
          dataType: "json",
          contentType: "application/json",
          success: function(rex) {
            that.reportList = rex.data;
            that.reportList.forEach((x, i) => {
              if(that.reportList[i].content) {
                that.reportList[i].content = that.reportList[i].content.replace(/<tag/g, '<span class=selectedOne').replace(/<\/tag>/g, '</span>');
                that.reportList[i].content = that.reportList[i].content.replace(regNet, function(a) {
                  if(a.indexOf("http") != 0 && a.indexOf("ftp") != 0) {
                    a = "http://" + a;
                  }
                  return '<a href="' + a + '" target="_blank">' + a + '</a>';
                });
              }
              that.reportList[i].replyList.forEach((j, k) => {
                that.reportList[i].replyList[k].content = that.reportList[i].replyList[k].content.replace(/<tag/g, '<span class=selectedOne').replace(/<\/tag>/g, '</span>');
                that.reportList[i].replyList[k].content = that.reportList[i].replyList[k].content.replace(regNet, function(a) {
                   if(a.indexOf("http") != "0" || a.indexOf("ftp") != "0") {
                    a = "http://" + a;
                  }
                  return '<a href="' + a + '" target="_blank">' + a + '</a>';
                });
              })
            })
          }
        })
      },
      delComment(commentId) {
        let that = this;
        let delReason = "";
        let delReplyStr = "";
        delComment = new Modal({
          "eleId": "delComment",
          "title": "",
          "content": "<input type='text' placeholder='Please enter reasons' class='modal-reason'/><span class='modal-hint'></span>",
          success: function() {
            if($("#delComment input").val() == "") {
              $(".modal-hint").html("*Please enter reasons");
            } else {
              delReason = $("#delComment input").val();
              delReplyStr = JSON.stringify({
                "postReplyId": commentId,
                "reason": delReason
              });
              $.ajax({
                url: that.baseUrl + "delPostReply",
                type: "POST",
                data: delReplyStr,
                headers: {
                  'Authorization': that.liangliang,
                },
                dataType: "json",
                contentType: "application/json",
                success: function(rex) {
                  $(".modal-hint").html(rex.message).css("color", "green");
                  setTimeout(function() {
                    $("#delComment").hide();
                    that.replyList();
                  }, 2000)
                }
              })
            }
          },
          cancel: function() {}
        });
      },
      goBack() {
        this.$router.go(-1);
      }
    },
  }
</script>
<style>
  @import url("../../../static/css/post-detail.css");
</style>