<template>
  <div class="template-content user-detail post-box">
    <div class="header">
      <div class="btn-back" @click="goBack">Back</div>
      <div class="title">User details</div>
    </div>
    <div class="user-detail-main">
      <div class="user-information"> <img :src="userinfo.headImageUrl" />
        <div class="user-name">{{userinfo.nickname}}</div>
        <div class="user-ID"> ID: <span>{{userinfo.identifier}}</span> </div>
        <div class="user-fans">
          <div><span>Followers：</span><span class="followNum">{{userinfo.followNum}}</span></div>
          <div><span>Fans：</span><span class="followedNum">{{userinfo.followedNum}}</span></div>
        </div>
        <div class="contact-information" v-if="userinfo.phone"><span>Tell：</span><span>{{userinfo.phone}}</span></div>
        <div class="contact-information" v-if="userinfo.email"><span>Email：</span><span>{{userinfo.email}}</span></div>
        <div class="contact-information" v-if="userinfo.location"><span>Location：</span><span>{{userinfo.location}}</span></div>
      </div>
      <div class="post-list-box">
        <div class="filter clearfloat">
          <div class="select-box clearfloat">
            <div class="title">Module</div>
            <div class="xiala-box">
              <v-selection :selections="moduleList" :selectionactive="moudleText" @on-change="onModleChange($event)"></v-selection>
            </div>
          </div>
          <div class="select-box clearfloat">
            <div class="title">Type</div>
            <div class="xiala-box">
              <v-selection :selections="postTypeList" :selectionactive="postType" @on-change="onTypeChange($event)"></v-selection>
            </div>
          </div>
          <div class="search-btn" @click="searchClick"> <img src="../../assets/web/search.png" /> </div>
        </div>
        <table border="0" cellspacing="0" cellpadding="0" class="issue">
          <thead>
            <tr>
              <th style="width: 18%;">Content</th>
              <th style="width: 18%;">Time</th>
              <th style="width: 14%;">Page view</th>
              <th style="width: 14%;">Comments</th>
              <th style="width: 18%;">Post id</th>
              <th style="width: 18%;">Operate</th>
            </tr>
          </thead>
          <tr v-for="item in trList">
            <td :title="item.content" v-if="item.content" v-html="item.content?item.content.replace(/<tag/g,'<span class=selectedOne').replace(/<\/tag>/g,'</span>'):'--'"></td>
            <td :title="item.remark" v-else-if="item.remark">{{item.remark}}</td>
            <td v-else>--</td>
            <td :title="item.time">{{item.time}}</td>
            <td :title="item.pageView">{{item.pageView}}</td>
            <td :title="item.replyNum">{{item.replyNum?item.replyNum:0}}</td>
            <td v-if="item.postId">{{item.postId}}</td>
            <td v-if="item.communionId">{{item.communionId}}</td>
            <td v-if="item.postId"><span class='view' @click="goPostDetail(item.postId)">Check</span></td>
            <td v-if="item.communionId"><span class='view' @click="goSocialDetail(item.communionId)">Check</span></td>
          </tr>
        </table>
        <div id="pageUserDetail"> </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VSelection from '../base/selection'
  import { mText, MPaging } from '../../../static/js/maWon.js'
  import { Modal } from '../../../static/js/modal.js'
  var MawenUserDetail = "";
  var userId = "";
  var pageForm = false;
   var regNet = new RegExp("((http|https|ftp|ftps):\\/\\/)?([a-zA-Z0-9-]+\\.){1,5}(com|cn|net|org|hk|tw)((\\/(\\w|-)+(\\.([a-zA-Z]+))?)+)?(\\/)?(\\??([\\.%:a-zA-Z0-9_-]+=[#\\.%:a-zA-Z0-9_-]+(&amp;)?)+)?", "gi");
  export default {
    components: {
      VSelection,
    },
    data() {
      return {
        liangliang: sessionStorage.getItem("liangliang").substring(0, sessionStorage.getItem("liangliang").length - 10),
        baseUrl: sessionStorage.getItem("baseUrl"),
        userinfo: {
          headImageUrl: "",
          nickname: "",
          followNum: "",
          followedNum: "",
          identifier: "",
        },
        moduleList: [{
          label: 'Ordinary post',
          value: 0
        }, {
          label: 'Social post',
          value: 1
        }],
        postTypeList: [{
          label: 'Post',
          value: 0
        }, {
          label: 'Comment',
          value: 1
        }],
        moudleText: "Ordinary post",
        postType: "Post",
        trList: [],
        userDetailActiveJson: {
          "page": 1,
          "userId": userId,
          "auditingStatus": 0
        },
        moudleProp: "listPost",
      }
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.url = from.path;
        if(from.path == "/home/user" || from.path == "/home/admin-user"|| from.path == "/home/post-detail"|| from.path == "/home/social-detail"){
          vm.restData();
          vm.init();
        }
      })
    },
    mounted() {
      userId = this.$route.query.identifier || "270";
      this.init();
    },
    activated(){
      userId = this.$route.query.identifier || "270"; 
    },
    methods: {
      init() {
        this.restUserInformation();
        this.paging();
        this.refreshUserDetailTable();
      },
      restData() {
        this.moduleList = [{
            label: 'Ordinary post',
            value: 0
          }, {
            label: 'Social post',
            value: 1
          }],
          this.postTypeList = [{
            label: 'Post',
            value: 0
          }, {
            label: 'Comment',
            value: 1
          }],
          this.moudleText = "Ordinary post";
        this.postType = "Post";
        this.userDetailActiveJson = {
          "page": 1,
          "userId": userId,
          "auditingStatus": 0
        }
        this.moudleProp = "listPost";
      },
      restUserInformation() {
        var that = this;
        $.ajax({
          url: that.baseUrl + "getUser",
          type: "POST",
          data: '{"userId":"' + userId + '"}',
          headers: {
            'Authorization': that.liangliang,
          },
          dataType: "json",
          contentType: "application/json",
          success: function(rex) {
            if(rex.code == "200") {
              that.userinfo.headImageUrl = rex.data.headImageUrl;
              that.userinfo.nickname = rex.data.nickname;
              that.userinfo.followNum = rex.data.followNum;
              that.userinfo.followedNum = rex.data.followedNum;
              that.userinfo.identifier = rex.data.identifier;
              that.userinfo.phone = rex.data.phone;
              that.userinfo.email = rex.data.email;
              that.userinfo.location = rex.data.location;
            }
          }
        })
      },
      onModleChange(val) {
        this.moudleText = val.label;
      },
      onTypeChange(val) {
        this.postType = val.label;
      },
      refreshUserDetailTable() {
        var that = this;
        this.userDetailActiveJson.userId=this.$route.query.identifier || "270"
        var refreshStr = JSON.stringify(this.userDetailActiveJson);
        $.ajax({
          url: that.baseUrl + that.moudleProp,
          type: "POST",
          data: refreshStr,
          headers: {
            'Authorization': that.liangliang,
          },
          dataType: "json",
          contentType: "application/json",
          success: function(rex) {
            if(rex.code == "200") {
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
              console.log(rex.page);
              MawenUserDetail.init({
                curPage: that.userDetailActiveJson.page, //当前页码
                total: rex.page, //总页码
                jump: 'block', //显示跳转页节点
                callback: function(page) {
                  //返回页码的回调函数
                  that.userDetailActiveJson.page = page;
                  that.refreshUserDetailTable();
                }
              })
            }
          }
        })
      },
      paging() {
        var that = this;
        MawenUserDetail = new MPaging({
          el: pageUserDetail,
          curPage: 1,
          total: 10,
          hoverBackground: '',
          curBackground: '#19b3e5',
          jump: 'block',
          callback: function(page) {}
        });
      },
      searchClick() {
        if(this.moudleText == "Ordinary post" && this.postType == "Post") {
          this.userDetailActiveJson = {
            "page": 1,
            "userId": userId,
            "auditingStatus": 0
          }
          this.moudleProp = "listPost"
          this.refreshUserDetailTable()
        } else if(this.moudleText == "Social post" && this.postType == "Post") {
          this.userDetailActiveJson = {
            "page": 1,
            "userId": userId,
            "auditingStatus": 0
          }
          this.moudleProp = "listPetCommunion"
          this.refreshUserDetailTable()
        } else if(this.moudleText == "Ordinary post" && this.postType == "Comment") {
          this.userDetailActiveJson = {
            "page": 1,
            "replyUserId": userId,
            "auditingStatus": 0
          }
          this.moudleProp = "listPost"
          this.refreshUserDetailTable()
        } else if(this.moudleText == "Social post" && this.postType == "Comment") {
          this.userDetailActiveJson = {
            "page": 1,
            "replyUserId": userId,
            "auditingStatus": 0
          }
          this.moudleProp = "listPetCommunion"
          this.refreshUserDetailTable()
        }
      },
      goPostDetail(postId) {
        this.$router.push({
          path: "post-detail",
          query:{
          	'checkPostId':postId
          }
        })
      },
      goSocialDetail(communionId) {
        this.$router.push({
          path: "social-detail",
          query:{
          	"checkSocialId":communionId
          }
        })
      },
      goBack(){
      	this.$router.go(-1);
      }
    },
  }
</script>
<style>
  @import url("../../../static/css/post.css");
  @import url("../../../static/css/user-detail.css");
</style>