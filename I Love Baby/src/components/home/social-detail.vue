<template>
  <div class="content detail-content">
    <div class="header">
      <div class="btn-back" @click="goBack">Back</div>
      <div class="title">Post details </div>
    </div>
    <div class="post-box" id="post">
      <div class="post-title" v-if="postContent.type=='2'">Adoption</div>
      <div class="post-title" v-else-if="postContent.type=='3'">Lost and found</div>
      <div class="post-title" v-else>Pairing</div>
      <div class="post-information">
        <div class="author"> Author：<span>{{postContent.nickname}}</span> </div>
        <div class="time"> Time：<span>{{postContent.time}}</span> </div>
      </div>
      <div class="post-content">
        <div class="text">{{postContent.remark}}</div>
        <div class="pic-box" v-if="postContent.images"> <img v-for="img in postContent.images" :src="img.imageSrc" /> </div>
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
              <div class="floor"> Floor<span>{{item.floor}}</span></div>
              <div class="time"> {{item.time}}</div>
            </div>
          </div>
        </div>
        <div class="report-content"> <span class="text">{{item.content}}</span> <span class="del delBtn" @click="delComment(item.userPetCommunionReplyId)">Delete</span><img v-for="imageLi in item.images" :src="imageLi.imageSrc" class="replylist1Img" /></div>
        <ul class="report-list2" v-if="item.replyList">
          <li v-for="item2 in item.replyList" v-if="item2.replyNickname"> <span class="said-name">{{item2.replyNickname}}:</span> <span class="reply">Reply</span> <span class="reply-name">{{item2.nickname}}:</span> <span class="said-text">{{item2.content}}</span> <span class="del delBtn" @click="delComment(item.userPetCommunionReplyId)">Delete</span> </li>
          <li v-for="item2 in item.replyList" v-if="!item2.replyNickname"> <span class="said-name">{{item2.nickname}}</span>: <span class="said-text">{{item2.content}}</span> <span class="del delBtn" @click="delComment(item.userPetCommunionReplyId)">Delete</span> </li>
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
        reportList: [],
        postId: "",
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        var that = this;
        this.postId = this.$route.query.checkSocialId;
        $.ajax({
          url: that.baseUrl + "getPetCommunion",
          type: "POST",
          data: "{'petCommunionId':'" + that.postId + "'}",
          headers: {
            'Authorization': that.liangliang,
          },
          dataType: "json",
          contentType: "application/json",
          success: function(rex) {
            that.postContent = rex.data;
            if(that.postContent.remark) {
              that.postContent.remark = that.postContent.remark.replace(/<tag/g, '<span class=selectedOne').replace(/<\/tag>/g, '</span>');
              that.postContent.remark = that.postContent.remark.replace(regNet, function(a) {
                return '<a href="' + a + '" target="_blank">' + a + '</a>';
              });
            }
          }
        })
        that.replyList();
      },
      replyList() {
        let that = this;
        $.ajax({
          url: that.baseUrl + "listPetCommunionReply",
          type: "POST",
          data: "{'userPetCommunionId':'" + that.postId + "'}",
          headers: {
            'Authorization': that.liangliang,
          },
          dataType: "json",
          contentType: "application/json",
          success: function(rex) {
            that.reportList = rex.data;
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
              console.log(1);
              delReason = $("#delComment input").val();
              delReplyStr = JSON.stringify({
                "petCommunionReplyId": commentId,
                "reason": delReason
              });
              $.ajax({
                url: that.baseUrl + "delPetCommunionReply",
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