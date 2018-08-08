<template>
  <div class="template-content  post-box">
    <div class="filter clearfloat">
      <div class="select-box clearfloat">
        <div class="title">KeyWord</div> <input type="text" class="keyWordText" v-model="keyWord" /> </div>
      <div class="select-box clearfloat">
        <div class="title">Username</div> <input type="text" class="authorText" v-model="userName" /> </div>
      <div class="select-box clearfloat">
        <div class="title">Start Time</div>
        <div class="calendar-box"> <input type="text" class="jeinput auditingStatusText" id="selectdateStart" readonly> <img src="../../assets/web/calendar.png" /> </div>
      </div>
      <div class="select-box clearfloat">
        <div class="title">End Time</div>
        <div class="calendar-box"> <input type="text" class="jeinput auditingStatusText" id="selectdateEnd" readonly> <img src="../../assets/web/calendar.png" /> </div>
      </div>
      <div class="refresh-btn" @click="resetSelectJson"> <img src="../../assets/web/refresh.png" /> </div>
      <div class="search-btn" @click="searchClick"> <img src="../../assets/web/search.png" /> </div>
    </div>
    <div class="content admin-post">
      <table border="0" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th width="9%">Content</th>
            <th width="9%">Username</th>
            <th width="9%">Location</th>
            <th width="7%">Page view</th>
            <th width="7%">Comments</th>
            <th width="8%">Psot id</th>
            <th width="9%">Time</th>
            <th width="11%">Deal with time</th>
            <th width="12%">Deal with reason</th>
            <th width="9%">Status</th>
            <th width="10%">Operate</th>
          </tr>
        </thead>
        <tr v-for="trLi in trList" :key="trLi.postId">
          <td :title='trLi.content?trLi.content:"--"' v-html="trLi.content?trLi.content:'--'"></td>
          <td :title='trLi.auth'>{{trLi.auth?trLi.auth:"--"}}</td>
          <td :title='trLi.location'>{{trLi.location?trLi.location:"--"}}</td>
          <td :title='trLi.pageView?trLi.pageView:"0"'>{{trLi.pageView?trLi.pageView:"0"}}</td>
          <td :title='trLi.replyNum?trLi.replyNum:"0"'>{{trLi.replyNum?trLi.replyNum:"0"}}</td>
          <td :title='trLi.postId?trLi.postId:"--"'>{{trLi.postId?trLi.postId:"--"}}</td>
          <td :title='trLi.time'>{{trLi.time?trLi.time:"--"}}</td>
          <td :title='trLi.delTime?trLi.delTime:"--"'>{{trLi.delTime?trLi.delTime:"--"}}</td>
          <td :title='trLi.delReason?trLi.delReason:"--"'>{{trLi.delReason?trLi.delReason:"--"}}</td>
          <td v-if="trLi.auditingStatus=='-1'" title="User-deleted"> User-deleted </td>
          <td v-else-if="trLi.auditingStatus=='-2'" title="Admin-deleted"> Admin-deleted </td>
          <td v-else title="Normal"> Normal </td>
          <td v-if="trLi.auditingStatus=='-1'"> <span class='view' @click="goPostDetail(trLi.postId)">Check</span> </td>
          <td v-else-if="trLi.auditingStatus=='-2'"> <span class='view' @click="goPostDetail(trLi.postId)">Check</span><span class='recover' @click="resumePost(trLi.postId)">Resume</span> </td>
					<td v-else> <span class='view' @click="goPostDetail(trLi.postId)">Check</span><span class='del' @click="showModle(trLi.postId,$event)">Delete</span> </td>
        </tr>
      </table>
      <div id="page"></div>
    </div>
    <v-delPost :titleText="delPostTitle" :isShow="delPostModalShow" :hintShow="delPostHintShow" @on-confirm="onDelPostConfirm($event)" @on-close="onDelPostModalShow"></v-delPost>
    <div id="resumePostModal"></div>
  </div>
</template>
<script>
  import VSelection from '../base/selection'
  import VDelPost from '../base/delPost'
  import Jedate from '../../../static/js/jquery.jedate.min.js'
  import { mText, MPaging } from '../../../static/js/maWon.js'
  import { Modal } from '../../../static/js/modal.js'
  var Mawen = "";
  var resumePostModal = "";
  var regNet = new RegExp("((http|https|ftp|ftps):\\/\\/)?([a-zA-Z0-9-]+\\.){1,5}(com|cn|net|org|hk|tw)((\\/(\\w|-)+(\\.([a-zA-Z]+))?)+)?(\\/)?(\\??([\\.%:a-zA-Z0-9_-]+=[#\\.%:a-zA-Z0-9_-]+(&amp;)?)+)?", "gi");
  export default {
    components: {
      VSelection,
      VDelPost,
    },
    data() {
      return {
        postSelectJson: {
          "page": 1,
          "adminId": sessionStorage.getItem("sysAdminId"),
        },
        liangliang: sessionStorage.getItem("liangliang").substring(0, sessionStorage.getItem("liangliang").length - 10),
        baseUrl: sessionStorage.getItem("baseUrl"),
        keyWord: "",
        userName: "",
        status: "",
        startTime: "",
        endTime: "",
        buyTypes: [{
          label: '全部',
          value: 0
        }, {
          label: 'Normal',
          value: 1
        }, {
          label: 'User-deleted',
          value: 2
        }, {
          label: 'Admin-deleted',
          value: 2
        }],
        trList: [],
        //Delete弹窗
        delPostModalShow: false,
        delPostId: "1",
        delPostTitle: "",
        delPostHintShow: false,
      }
    },
    mounted() {
      this.init();
      this.paging();
      this.refresh(this.postSelectJson);
    },
    methods: {
      init() {
        $("#selectdateStart").jeDate({
          format: "YYYY-MM-DD hh:mm:ss",
        });
        $("#selectdateEnd").jeDate({
          format: "YYYY-MM-DD hh:mm:ss",
        });
      },
      onParamChange(val) {
        this.status = val.label;
      },
      refresh(option) {
        var selectStr = JSON.stringify(option);
        var that = this;
        $.ajax({
          url: that.baseUrl + "listPost",
          type: "POST",
          data: selectStr,
          headers: {
            'Authorization': that.liangliang,
          },
          dataType: "json",
          contentType: "application/json",
          success: function(rex) {
            that.trList = rex.data;
            that.trList.forEach(function(x, i) {
              if(x.content) {
                that.trList[i].content = x.content.replace(regNet, function(a) {
                  if(a.indexOf("http") != 0 && a.indexOf("ftp") != 0) {
                    a = "http://" + a;
                  }
                  return '<a href="' + a + '" target="_blank">' + a + '</a>';
                });
                that.trList[i].content = x.content.replace(/<tag/g, '<span class=selectedOne').replace(/<\/tag>/g, '</span>');
              }
            })
            Mawen.init({
              curPage: option.page, //当前页码
              total: rex.page, //总页码
              jump: 'block', //显示跳转页节点
              callback: function(page) {
                //返回页码的回调函数
                that.postSelectJson.page = page;
                that.refresh(that.postSelectJson);
              }
            })
          }
        })
      },
      paging() {
        var that = this;
        Mawen = new MPaging({
          el: page, //挂载的盒子dom
          curPage: 1, //当前页码
          total: 10, //总页码
          hoverBackground: '', //hover状态下背景色
          curBackground: '#19b3e5', //当前页码背景色
          jump: 'block', //显示跳转页节点
          callback: function(page) {
            postSelectJson.page = page;
          }
        });
      },
      searchClick() {
        this.postSelectJson.page = 1;
        if(this.keyWord) {
          this.postSelectJson.keyword = this.keyWord;
        } else {
          delete this.postSelectJson.keyword
        }
        if(this.userName) {
          this.postSelectJson.author = this.userName;
        } else {
          delete this.postSelectJson.author
        }
        if($("#selectdateStart").val()) {
          this.postSelectJson.sTime = $("#selectdateStart").val();
        } else {
          delete this.postSelectJson.sTime;
        }
        if($("#selectdateEnd").val()) {
          this.postSelectJson.eTime = $("#selectdateEnd").val();
        } else {
          delete this.postSelectJson.eTime;
        }
        if(this.status == "Normal") {
          this.postSelectJson.auditingStatus = "0";
        } else if(this.status == "User-deleted") {
          this.postSelectJson.auditingStatus = "-1";
        } else if(this.status == "Admin-deleted") {
          this.postSelectJson.auditingStatus = "-2";
        } else {
          delete this.postSelectJson.auditingStatus;
        }
        this.refresh(this.postSelectJson);
      },
      resetSelectJson() {
        this.postSelectJson = {
          "page": 1,
          "adminId": sessionStorage.getItem("sysAdminId"),
        };
        this.keyWord = "";
        this.userName = "";
        $("#selectdateStart").val("");
        $("#selectdateEnd").val("");
        this.refresh(this.postSelectJson);
      },
      showModle(postId) {
        this.delPostModalShow = true;
        this.delPostTitle = postId;
        this.delPostId = postId;
      },
      onDelPostModalShow() {
        this.delPostModalShow = false;
      },
      onDelPostConfirm(reasonText) {
        let that = this;
        if(reasonText.length > 0) {
          this.delPostHintShow = false;
          $.ajax({
            url: that.baseUrl + "delPost",
            type: "POST",
            data: "{'postId':'" + this.delPostId + "','reason':'" + reasonText + "'}",
            headers: {
              'Authorization': that.liangliang,
            },
            dataType: "json",
            contentType: "application/json",
            success: function(rex) {
              that.refresh(that.postSelectJson);
              that.delPostModalShow = false;
            }
          })
        } else {
          this.delPostHintShow = true;
        }
      },
      resumePost(resumePostId) {
        let that = this;
        resumePostModal = new Modal({
          "eleId": "resumePostModal",
          "title": "",
          "content": "Are you sure you want to resume the post " + resumePostId + "？<span class='resumeHint'></span>",
          success: function() {
            $.ajax({
              url: that.baseUrl + "revokePost",
              type: "POST",
              data: "{'postId':'" + resumePostId + "'}",
              headers: {
                'Authorization': that.liangliang,
              },
              dataType: "json",
              contentType: "application/json",
              success: function(rex) {
                if(rex.code == 200) {
                  $(".resumeHint").html("Success").css({
                    "color": "green",
                    "paddingLeft": "20px",
                    "fontSize": "16px"
                  });
                  setTimeout(function() {
                    $("#resumePostModal").hide();
                    that.refresh(that.postSelectJson);
                  }, 1000)
                }
              }
            })
          },
          cancel: function() {}
        });
      },
      goPostDetail(checkPostId) {
        this.$router.push({
          path: 'post-detail',
          query:{
          	'checkPostId':checkPostId
          }
        })
      },
    },
  }
</script>
<style>
  @import url("../../../static/css/base.css");
  @import url("../../../static/css/jedate.css");
  @import url("../../../static/css/post.css");
</style>