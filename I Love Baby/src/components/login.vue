<template>
  <div class="login-content">
    <div class="login-popup">
      <div class="login-head">Login</div>
      <div class="formDiv">
        <div><i class="login-username-icon"></i><input type="text" placeholder="Login account" class="userName" @keyup.enter="goHome"/></div>
        <div><i class="login-password-icon"></i><input type="password" placeholder="Login password" class="passWord" @keyup.enter="goHome"/></div>
        <div class="sub" @click="goHome">Login</div>
      </div>
      <div class="message"> </div>
      <div class="login-bg"></div>
    </div>
  </div>
</template>
<script>
  var goHmoeText = false;
  export default {
    data() {
      return {}
    },
    methods: {
      goHome() {
      	this.goHomeActive();
      },
      goHomeActive() {
      	let that = this; 
        let userName = $(".userName").val();
        sessionStorage.setItem("totalUserName", userName);
        let passWord = $(".passWord").val();
        $.ajax({
          url: "https://peten.boyuanpay.com/petadmin-en/api/login",
          type: "POST",
          data: "{'username':'" + userName + "','password':'" + passWord + "'}",
          dataType: "json",
          contentType: "application/json",
          success: function(rex) {
            if(rex.code == "403") {
              $(".message").html(rex.message + "!")
            } else if(rex.code == "200") {
              sessionStorage.setItem('liangliang', rex.data.token + "liangliang");
              sessionStorage.setItem('sysAdminId', rex.data.sysAdminId);
              sessionStorage.setItem('baseUrl', "https://peten.boyuanpay.com/petadmin-en/api/");
              sessionStorage.setItem('loginEnter', userName);
              that.$router.push({
                path: '/home'
              })
            }
          }
        })
      }
    },
  }
</script>
<style>
  .login-content {
    position: absolute;
    top: 64px;
    left: 0;
    bottom: 0;
		right: 0;
    background: url(../assets/login-bg.jpg);
    background-size: 100% 100%;
  }
  .login-popup {
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -220px;
    width: 500px;
    height: 440px;
  }
  .login-popup .login-head {
    width: 100%;
    height: 76px;
    line-height: 76px;
    text-align: center;
    color: #FFFFFF;
    font-size: 30px;
    background: #19b3e5;
    border-radius: 20px 20px 0 0;
  }
  .login-content .formDiv {
    left: 48px;
    top: 116px;
    position: absolute;
    width: 404px;
    height: auto;
    z-index: 1;
  }
  .login-content .formDiv>div {
    width: 100%;
    height: 50px;
    background: #fff;
    margin-bottom: 20px;
    overflow: hidden;
  }
  .login-content .formDiv>div i {
    float: left;
    width: 48px;
    height: 50px;
  }
  .login-content .formDiv>div .login-username-icon {
    background: url(../assets/username-icon.png) no-repeat center center;
  }
  .login-content .formDiv>div .login-password-icon {
    background: url(../assets/password-icon.png) no-repeat center center;
  }
  .login-content .formDiv div input {
    width: 300px;
    height: 50px;
    border: none;
    color: #666;
    line-height: 14px;
    font-size: 14px;
    border: none;
    float: left;
    padding: 18px 0;
    background-color: #fff;
  }
  input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
    background-color: rgb(0, 0, 0) !important;
    background-image: none !important;
    color: rgb(0, 0, 0) !important;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
  }
  .login-bg {
    width: 100%;
    height: 350px;
    background: black;
    background-size: 100% 100%;
    opacity: 0.5;
    position: absolute;
    left: 0;
    top: 76px;
    border-radius: 0 0 20px 20px;
  }
  .login-content .formDiv .sub {
    width: 100%;
    height: 50px;
    background: #19b3e5;
    color: #fff;
    font-size: 24px;
    line-height: 50px;
    text-align: center;
    border: none;
    cursor: pointer;
    margin-top: 50px;
  }
  .forget-password {
    position: absolute;
    color: #fff;
    width: auto;
    height: 14px;
    line-height: 14px;
    cursor: pointer;
    left: 370px;
    top: 364px;
    z-index: 1;
  }
  .message {
    position: absolute;
    left: 48px;
    bottom: 80px;
    width: auto;
    height: 100px;
    color: red;
    font-size: 16px;
    z-index: 10000;
  }
</style>