<template>
  <div class="template-content news-add publish">
    <div class="header">
      <div class="btn-back" @click="goBack">Back</div>
      <div class="title">Send notification message</div>
    </div>
    <ul>
      <li> <span>Content</span>
        <div class="textareaBox"> <textarea v-model="newsContent"></textarea> </div>
      </li>
    </ul>
    <div class="selectUser">
      <div>Select the user who receives the notification</div>
      <div>
        <div class="selectBtn" :class="allUser" @click="allUserClick">All users</div>
        <div class="selectBtn" :class="oneUser" @click="oneUserClick">A user</div> <input type="text" placeholder="Please enter a user ID" v-if="inputShow" v-model="userId" /> </div>
    </div>
    <div class="article-hint">{{hint}}</div>
    <div class="bottom">
      <div class="cancle-btn" @click="goBack">Cancel</div>
      <div class="confirm-btn" @click=" confirmClick">Confirm</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        liangliang: sessionStorage.getItem("liangliang").substring(0, sessionStorage.getItem("liangliang").length - 10),
        baseUrl: sessionStorage.getItem("baseUrl"),
        addNewsJson: {
          "type": 0,
          "content": "",
        },
        allUser: "selectBtnActive",
        oneUser: "",
        inputShow: false,
        userId: "",
        hint: "",
        newsContent: "",
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {},
      allUserClick() {
        this.allUser = "selectBtnActive";
        this.oneUser = "";
        this.inputShow = false;
        this.addNewsJson.type="0";
      },
      oneUserClick() {
        this.allUser = "";
        this.oneUser = "selectBtnActive";
        this.inputShow = true;
        this.addNewsJson.type="1";
      },
      goBack() {
        this.$router.go(-1);
      },
      confirmClick() {
        if(this.addNewsJson.type == "1") {
          this.addNewsJson.userId = this.userId;
          let regNum = /^[0-9]+$/;
          if(!regNum.test(this.userId)) {
            this.hint = "*Please enter a user ID";
            this.userId = "";
          } else {
            if(this.newsContent != "") {
              this.postNews();
            } else {
              this.hint = "*Please enter content";
            }
          }
        } else {
          delete this.addNewsJson.userId;
          if(this.newsContent != "") {
            this.postNews();
          } else {
            this.hint = "*Please enter content";
          }
        }
      },
      postNews() {
      	let that=this;
        this.addNewsJson.content = this.newsContent;
        let addNewsStr = JSON.stringify(this.addNewsJson);
        console.log(addNewsStr);
        $.ajax({
          url: that.baseUrl + "addMessageSys",
          type: "POST",
          data: addNewsStr,
          headers: {
            'Authorization': that.liangliang,
          },
          dataType: "json",
          contentType: "application/json",
          success: function(rex) {
            if(rex.code == 200) {
              $(".article-hint").css("color", "green");
              that.hint="Success";
              setTimeout(function() {
                $(".article-hint").css("color", "red");
                that.hint="";
              }, 3000)
            }
          }
        })
      }
    },
  }
</script>
<style>
  @import url("../../../static/css/news-add.css");
  @import url("../../../static/css/publish.css");
</style>