<template>
  <div class="template-content post-box user-box">
    <div class="filter clearfloat">
      <div class="select-box clearfloat">
        <div class="title">Username</div> <input type="text" class="keyWordText" v-model="userJson.nickname" /> </div>
      <div class="select-box clearfloat">
        <div class="title">ID</div> <input type="text" class="authorText" v-model="userJson.userId" /> </div>
      <div class="select-box clearfloat">
        <div class="title">Location</div> <input type="text" class="authorText" v-model="userJson.location" /> </div>
      <div class="select-box clearfloat">
        <div class="title">Contact</div> <input type="text" class="authorText" v-model="userJson.username" /> </div>
      <div class="refresh-btn" @click="resetSelectJson"> <img src="../../assets/web/refresh.png" @click="searchClick" /> </div>
      <div class="search-btn" @click="searchClick"> <img src="../../assets/web/search.png" /> </div>
    </div>
    <div class="content report-content">
      <table border="0" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th width="13%">Username</th>
            <th width="11%">ID</th>
            <th width="7%">Grade</th>
            <th width="13%">Tell</th>
            <th width="16%">Email</th>
            <th width="12%">Location</th>
            <th width="12%">Status</th>
            <th width="16%">Operate</th>
          </tr>
        </thead>
        <tr v-for="trLi in trList" :key="trLi.identifier">
          <td :title="trLi.nickname?trLi.nickname:'--'">{{trLi.nickname?trLi.nickname:"--"}}</td>
          <td :title="trLi.identifier?trLi.identifier:'--'">{{trLi.identifier?trLi.identifier:"--"}}</td>
          <td :title="trLi.grade?trLi.grade:'--'">{{trLi.grade?trLi.grade:"--"}}</td>
          <td :title="trLi.phone?trLi.phone:'--'">{{trLi.phone?trLi.phone:"--"}}</td>
          <td :title="trLi.email?trLi.email:'--'">{{trLi.email?trLi.email:"--"}}</td>
          <td :title="trLi.location?trLi.location:'--'">{{trLi.location?trLi.location:"--"}}</td>
          <td v-if="trLi.status=='0'" title="Normal">Normal </td>
          <td v-else-if="trLi.status=='1'" title="Banned">Banned</td>
          <td v-else title="Blocked">Blocked</td>
          <td v-if="trLi.status=='0'"><span class="view" @click="checkUser(trLi.identifier)">Check</span><span class="banned" @click="bannedUser(trLi.identifier)">Banned</span><span class="closed" @click="clockedUser(trLi.identifier)">Blocked</span></td>
          <td v-else-if="trLi.status=='1'"><span class="view" @click="checkUser(trLi.identifier)">Check</span><span class="recover" @click="resumeUser(trLi.identifier)">Resume</span><span class="closed" @click="clockedUser(trLi.identifier)">Blocked</span></td>
          <td v-else><span class="view" @click="checkUser(trLi.identifier)">Check</span><span class="recover" @click="resumeUser(trLi.identifier)">Resume</span><span class="banned" @click="bannedUser(trLi.identifier)">Banned</span></td>
        </tr>
      </table>
      <div class="pageBox">
        <div id="pageUser"></div>
        <div class="totalNum">Sum：<span>{{totalNum}}</span></div>
      </div>
    </div>
    <div id="bannedModal"></div>
    <div id="clockedModal"></div>
    <div id="resumeModal"></div>
  </div>
</template>
<script>
  import VSelection from '../base/selection'
  import VDelPost from '../base/delPost'
  import Jedate from '../../../static/js/jquery.jedate.min.js'
  import { mText, MPaging } from '../../../static/js/maWon.js'
  import { Modal } from '../../../static/js/modal.js'
  var MawenUser = "";
  var bannedModal = "";
  var clockedModal = "";
  var resumeModal = "";
  export default {
    components: {
      VSelection,
      VDelPost,
    },
    data() {
      return {
        userSelectJson: {
          "page": 1,
          "adminId": sessionStorage.getItem('sysAdminId')
        },
        liangliang: sessionStorage.getItem("liangliang").substring(0, sessionStorage.getItem("liangliang").length - 10),
        baseUrl: sessionStorage.getItem("baseUrl"),
        userJson: {
          nickname: "",
          userId: "",
          location: "",
          username: "",
        },
        trList: [],
        totalNum: "0",
        //删除弹窗
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.paging();
        this.refreshUser();
      },
      refreshUser() {
        var selectStr = JSON.stringify(this.userSelectJson);
        var that = this;
        $.ajax({
          url: that.baseUrl + "listUser",
          type: "POST",
          data: selectStr,
          headers: {
            'Authorization': that.liangliang,
          },
          dataType: "json",
          contentType: "application/json",
          success: function(rex) {
            that.totalNum = rex.count;
            that.trList = rex.data;
            MawenUser.init({
              curPage: that.userSelectJson.page, //当前页码
              total: rex.page, //总页码
              jump: 'block', //显示跳转页节点
              callback: function(page) {
                //返回页码的回调函数
                that.userSelectJson.page = page;
                that.refreshUser();
              }
            })
          }
        })
      },
      paging() {
        var that = this;
        MawenUser = new MPaging({
          el: pageUser, //挂载的盒子dom
          curPage: 1, //当前页码
          total: 10, //总页码
          hoverBackground: '', //hover状态下背景色
          curBackground: '#19b3e5', //当前页码背景色
          jump: 'block', //显示跳转页节点
          callback: function(page) {
            that.userSelectJson.page = page;
          }
        });
      },
      searchClick() {
        this.userSelectJson.page = 1;
        if(this.userJson.nickname) {
          this.userSelectJson.nickname = this.userJson.nickname;
        } else {
          delete this.userSelectJson.nickname
        }
        if(this.userJson.userId) {
          this.userSelectJson.userId = this.userJson.userId;
        } else {
          delete this.userSelectJson.userId
        }
        if(this.userJson.location) {
          this.userSelectJson.location = this.userJson.location;
        } else {
          delete this.userSelectJson.location;
        }
        if(this.userJson.username) {
          this.userSelectJson.username = this.userJson.username;
        } else {
          delete this.userSelectJson.username;
        }
        if(this.userJson.status == "Normal") {
          this.userSelectJson.status = "0";
        } else if(this.userJson.status == "Banned") {
          this.userSelectJson.status = "1";
        } else if(this.userJson.status == "Blocked") {
          this.userSelectJson.status = "2";
        } else {
          delete this.userSelectJson.status;
        }
        this.refreshUser();
      },
      resetSelectJson() {
        this.userSelectJson={
          "page": 1,
          "adminId": sessionStorage.getItem('sysAdminId')
        };
        this.userJson={
          nickname: "",
          userId: "",
          location: "",
          username: "",
        }
        this.refreshUser();
      },
      bannedUser(identifier) {
        var that = this;
        bannedModal = new Modal({
          "eleId": "bannedModal",
          "title": "",
          "content": "<div class='input-box'><span>Banned user " + identifier + "</span><input type='number' placeholder='(1~100)' /><span> days</span><div><div class='reason-box'><input type='text' placeholder='Please enter reason'/><span class='noReasenhint'></span><div>",
          success: function() {
            let userBannedDay = parseInt($("#bannedModal input").val());
            if(userBannedDay >= 1 && userBannedDay <= 100) {
              if($(".reason-box input").val() != "") {
                let limitadminUserJson = {};
                limitadminUserJson.userId = identifier;
                limitadminUserJson.type = 1;
                limitadminUserJson.days = userBannedDay;
                limitadminUserJson.reason = $(".reason-box input").val();
                let limitUserStr = JSON.stringify(limitadminUserJson);
                $.ajax({
                  url: that.baseUrl + "limitUser",
                  type: "POST",
                  data: limitUserStr,
                  headers: {
                    'Authorization': that.liangliang,
                  },
                  dataType: "json",
                  contentType: "application/json",
                  success: function(rex) {
                    $("#bannedModal").hide();
                    that.refreshUser();
                  }
                })
              } else {
                $(".noReasenhint").html("*Please enter reason");
              }
            } else {
              $(".noReasenhint").html("*Please enter integer 1~100");
              $("input-box input").val(1);
            }
          },
          cancel: function() {}
        });
      },
      clockedUser(identifier) {
        var that = this;
        clockedModal = new Modal({
          "eleId": "clockedModal",
          "title": "",
          "content": "<div class='reason-box'><input type='text' placeholder='Please enter reason' class='liangModal'/><span class='noReasenhint'></span></div>",
          success: function() {
            if($(".reason-box input").val() == "") {
              $(".noReasenhint").html("*Please enter reason");
            } else {
              let limitadminUserJson = {};
              limitadminUserJson.userId = identifier;
              limitadminUserJson.type = 2;
              limitadminUserJson.days = -1;
              limitadminUserJson.reason = $(".reason-box input").val();
              let limitUserStr = JSON.stringify(limitadminUserJson);
              $.ajax({
                url: that.baseUrl + "limitUser",
                type: "POST",
                data: limitUserStr,
                headers: {
                  'Authorization': that.liangliang,
                },
                dataType: "json",
                contentType: "application/json",
                success: function(rex) {
                  $("#clockedModal").hide();
                  that.refreshUser();
                }
              })
            }
          },
          cancel: function() {}
        });
      },
      resumeUser(identifier) {
        var that = this;
        resumeModal = new Modal({
          "eleId": "resumeModal",
          "title": "",
          "content": "Are you sure you want to restore the normal operation of user " + identifier + "？",
          success: function() {
            let limitadminUserJson = {};
            limitadminUserJson.userId = identifier;
            limitadminUserJson.type = 0;
            let limitUserStr = JSON.stringify(limitadminUserJson);
            $.ajax({
              url: that.baseUrl + "limitUser",
              type: "POST",
              data: limitUserStr,
              headers: {
                'Authorization': that.liangliang,
              },
              dataType: "json",
              contentType: "application/json",
              success: function(rex) {
                $("#resumeModal").hide();
                that.refreshUser();
              }
            })
          },
          cancel: function() {}
        });
      },
      checkUser(identifier) {
        sessionStorage.setItem('identifier', identifier);
        this.$router.push({
          path: "user-detail",
          query: {
            identifier: identifier
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
  @import url("../../../static/css/user.css");
</style>