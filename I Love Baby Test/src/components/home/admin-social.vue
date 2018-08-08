<template>
  <div class="template-content  post-box">
    <div class="filter clearfloat">
      <div class="select-box clearfloat">
        <div class="title">Type</div>
        <div class="xiala-box">
          <v-selection :selections="postTypeList" :selectionactive="postType" @on-change="onTypeChange($event)"></v-selection>
        </div>
      </div>
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
      <div class="refresh-btn"@click="resetSelectJson"> <img src="../../assets/web/refresh.png" /> </div>
      <div class="search-btn" @click="searchClick"> <img src="../../assets/web/search.png" /> </div>
    </div>
    <div class="content admin-social">
      <table border="0" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th width="8%">Type</th>
            <th width="8%">Content</th>
            <th width="8%">Username</th>
            <th width="7%">Location</th>
            <th width="8%">Time</th>
            <th width="7%">Page view</th>
            <th width="8%">Comments</th>
            <th width="8%">Psot id</th>
            <th width="10%">Deal with time</th>
            <th width="10%">Deal with reason</th>
            <th width="8%">Status</th>
            <th width="10%">Operate</th>
          </tr>
        </thead>
        <tr v-for="trLi in trList" :key="trLi.communionId">
          <td v-if="trLi.type == '2'" title="Adoption">Adoption </td>
          <td v-else-if="trLi.type == '3'" title="Lost and found">Lost and found </td>
          <td v-else title="Pairing">Pairing</td>
          <td :title="trLi.remark?trLi.remark:'--'">{{trLi.remark?trLi.remark:"--"}}</td>
          <td :title="trLi.nickname">{{trLi.nickname?trLi.nickname:"--"}}</td>
          <td :title="trLi.location">{{trLi.location?trLi.location:"--"}}</td>
          <td :title="trLi.time">{{trLi.time?trLi.time:"--"}}</td>
          
          <td :title='trLi.pageView?trLi.pageView:"0"'>{{trLi.pageView?trLi.pageView:"0"}}</td>
          <td :title='trLi.replyNum?trLi.replyNum:"0"'>{{trLi.replyNum?trLi.replyNum:"0"}}</td>
          <td :title='trLi.communionId?trLi.communionId:"--"'>{{trLi.communionId?trLi.communionId:"--"}}</td>
          <td :title='trLi.delTime?trLi.delTime:"--"'>{{trLi.delTime?trLi.delTime:"--"}}</td>
          <td :title='trLi.delReason?trLi.delReason:"--"'>{{trLi.delReason?trLi.delReason:"--"}}</td>
          <td v-if="trLi.auditingStatus=='-1'" title="User-deleted">User-deleted </td>
          <td v-else-if="trLi.auditingStatus=='-2'" title="Admin-deleted">Admin-deleted </td>
          <td v-else title="Normal">Normal </td>
          <td v-if="trLi.auditingStatus=='-1'"> <span class='view' @click="goPostDetail(trLi.communionId)">Check</span> </td>
          <td v-else-if="trLi.auditingStatus=='-2'"> <span class='view' @click="goPostDetail(trLi.communionId)">Check</span><span class='recover' @click="resumePost(trLi.communionId)">Resume</span> </td>
          <td v-else> <span class='view' @click="goPostDetail(trLi.communionId)">Check</span><span class='del' @click="showModle(trLi.communionId,$event)">Delete</span> </td>
        </tr>
      </table>
      <div id="socailPage"></div>
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
  export default {
    components: {
      VSelection,
      VDelPost,
    },
    data() {
      return {
        socialSelectJson: {
          "page": 1,
          "adminId":sessionStorage.getItem("sysAdminId")
        },
        liangliang: sessionStorage.getItem("liangliang").substring(0, sessionStorage.getItem("liangliang").length - 10),
        baseUrl: sessionStorage.getItem("baseUrl"),
        postType: "All",
        keyWord: "",
        userName: "",
        startTime: "",
        endTime: "",
        postTypeList: [{
          label: 'All',
          value: 0
        }, {
          label: 'Pairing',
          value: 1
        }, {
          label: 'Lost and found',
          value: 2
        }, {
          label: 'Adoption',
          value: 3
        }],
        postStatusList: [{
          label: 'All',
          value: 0
        }, {
          label: 'Normal',
          value: 1
        }, {
          label: 'User-deleted',
          value: 2
        }, {
          label: 'Admin-deleted',
          value: 3
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
      this.refresh(this.socialSelectJson);
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
      onTypeChange(val) {
        this.postType = val.label;
      },
      refresh(option) {
        var selectStr = JSON.stringify(option);
        var that = this;
        $.ajax({
          url: that.baseUrl + "listPetCommunion",
          type: "POST",
          data: selectStr,
          headers: {
            'Authorization': that.liangliang,
          },
          dataType: "json",
          contentType: "application/json",
          success: function(rex) {
            that.trList = rex.data;
            Mawen.init({
              curPage: option.page, //当前页码
              total: rex.page, //总页码
              jump: 'block', //显示跳转页节点
              callback: function(page) {
                //返回页码的回调函数
                that.socialSelectJson.page = page;
                that.refresh(that.socialSelectJson);
              }
            })
          }
        })
      },
      paging() {
        var that = this;
        Mawen = new MPaging({
          el: socailPage, //挂载的盒子dom
          curPage: 1, //当前页码
          total: 10, //总页码
          hoverBackground: '', //hover状态下背景色
          curBackground: '#19b3e5', //当前页码背景色
          jump: 'block', //显示跳转页节点
          callback: function(page) {
            socialSelectJson.page = page;
          }
        });
      },
      searchClick() {
        this.socialSelectJson.page = 1;
        if(this.keyWord) {
          this.socialSelectJson.keyword = this.keyWord;
        } else {
          delete this.socialSelectJson.keyword;
        }
        if(this.userName) {
          this.socialSelectJson.author = this.userName;
        } else {
          delete this.socialSelectJson.author;
        }
        if($("#selectdateStart").val()) {
          this.socialSelectJson.sTime = $("#selectdateStart").val();
        } else {
          delete this.socialSelectJson.sTime;
        }
        if($("#selectdateEnd").val()) {
          this.socialSelectJson.eTime = $("#selectdateEnd").val();
        } else {
          delete this.socialSelectJson.eTime;
        }
        if(this.postType == "Pairing") {
          this.socialSelectJson.type = "1";
        } else if(this.postType == "Adoption") {
          this.socialSelectJson.type = "2";
        } else if(this.postType == "Lost and found") {
          this.socialSelectJson.type = "3";
        } else {
          delete this.socialSelectJson.type;
        }
        if(this.postStatus == "Normal") {
          this.socialSelectJson.auditingStatus = "0";
        } else if(this.postStatus == "Admin-deleted") {
          this.socialSelectJson.auditingStatus = "-2";
        } else if(this.postStatus == "User-deleted") {
          this.socialSelectJson.auditingStatus = "-1";
        } else {
          delete this.socialSelectJson.auditingStatus;
        }
        this.refresh(this.socialSelectJson);
      },
      resetSelectJson() {
        this.socialSelectJson={
          "page": 1,
          "adminId":sessionStorage.getItem("sysAdminId")
        };
        this.keyWord = "";
        this.userName = "";
        $("#selectdateStart").val("");
        $("#selectdateEnd").val("");
        this.postType="All";
        this.refresh(this.socialSelectJson);
      },
      showModle(communionId) {
        this.delPostModalShow = true;
        this.delPostTitle =communionId;
        this.delPostId = communionId;
      },
      onDelPostModalShow() {
        this.delPostModalShow = false;
      },
      onDelPostConfirm(reasonText) {
        let that = this;
        if(reasonText.length > 0) {
          this.delPostHintShow = false;
          $.ajax({
            url: that.baseUrl + "delPetCommunion",
            type: "POST",
            data: "{'petCommunionId':'" + this.delPostId + "','reason':'" + reasonText + "'}",
            headers: {
              'Authorization': that.liangliang,
            },
            dataType: "json",
            contentType: "application/json",
            success: function(rex) {
              that.refresh(that.socialSelectJson);
              that.delPostModalShow = false;
            }
          })
        } else {
          that.delPostHintShow = true;
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
              url: that.baseUrl + "revokePetCommunion",
              type: "POST",
              data: "{'petCommunionId':'" + resumePostId + "'}",
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
                    that.refresh(that.socialSelectJson);
                  }, 1000)
                }
              }
            })
          },
          cancel: function() {
            
          }
        });
      },
      goPostDetail(checkSocialId) {
        this.$router.push({
          path: 'social-detail',
          query:{
          	'checkSocialId':checkSocialId
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