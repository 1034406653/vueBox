<template>
  <div class="delPost-box">
    <div class="modal" v-if="isShow">
      <div class="modal-top">
        <div class="modal-title">Delete posts</div>
      </div>
      <div class="modal-content">
        <div class="post-title"> Post id：{{titleText}} </div>
        <div class="reason-checkbox">
          <div v-for="(reason,index) in reasons" class="reason-btn-box" :class="{'reason-btn-box-active':reason.isClassActive}" @click="reasonBtnActiv(index)">
            <div class="btn"> </div>
            <div class="text"> {{reason.reasonText}} </div>
          </div>
        </div>
        <div class="reason-text"> <span>Other reasons：</span><input type="text" v-model="reasonOther" /> </div>
        <p class="hint" v-if="hintShow">*Please enter the reasons.</p>
        <div class="modal-bottom">
          <div class="modal-cancel" @click="closeModle"> Cancel </div>
          <div class="modal-confirm" @click="postReason"> Confirm </div>
        </div>
      </div>
    </div>
    <div class="mask" v-if="isShow"> </div>
  </div>
</template>
<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      hintShow: {
        type: Boolean,
        default: false
      },
      titleText: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        nowIndex: 0,
        reasonOther: "",
        reasons: [{
          isClassActive: false,
          reasonText: "Pornography"
        }, {
          isClassActive: false,
          reasonText: "Terrorism"
        }, {
          isClassActive: false,
          reasonText: "racism"
        }, {
          isClassActive: false,
          reasonText: "Irregularities"
        }],
        reasonTotalText: "",
      }
    },
    methods: {
      reasonBtnActiv(index) {
        this.reasons[index].isClassActive = !this.reasons[index].isClassActive;
      },
      closeModle() {
        this.reasonOther = "";
        this.reasons.forEach(function(x, i) {
          x.isClassActive = false;
          if(i == 0) {
            x.isClassActive = true;
          }
        })
        this.$emit('on-close');
      },
      postReason() {
        var that = this;
        this.reasonTotalText = "";
        this.reasons.forEach(function(x, i) {
          if(x.isClassActive) {
            that.reasonTotalText += x.reasonText + ",";
          }
        })
        this.reasonTotalText += this.reasonOther;
        if(this.reasonTotalText.endsWith(",")) {
          this.reasonTotalText = this.reasonTotalText.substring(0, this.reasonTotalText.length - 1);
        }
        this.$emit('on-confirm', this.reasonTotalText);
      },
    }
  }
</script>
<style>
  /*弹窗*/
  .delPost-box .mask {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #000000;
    opacity: 0.7;
    z-index: 101;
    display: block;
  }
  .delPost-box .modal {
    width: 800px;
    height: auto;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -400px;
    margin-top: -290px;
    background: #fff;
    z-index: 102;
    display: block;
  }
  .delPost-box .modal-top {
    width: 100%;
    height: 54px;
    background: #19b3e5;
    line-height: 54px;
    color: #fff;
    font-size: 18px;
    text-align: center;
    position: relative;
  }
  .delPost-box .modal-title {
    width: 100%;
    height: 54px;
    text-align: center;
  }
  .delPost-box .modal-content {
    width: 100%;
    height: auto;
    padding: 0 32px;
  }
  .delPost-box .modal .post-title {
    width: 100%;
    height: 46px;
    background: #eaf1f3;
    line-height: 46px;
    color: #999;
    font-size: 14px;
    padding: 0 24px;
    text-align: left;
    margin-top: 40px;
  }
  .delPost-box .reason-checkbox {
    width: 100%;
    height: auto;
    padding-top: 30px;
    overflow: hidden;
  }
  .delPost-box .reason-btn-box {
    width: auto;
    height: 22px;
    color: #999;
    margin-bottom: 40px;
    overflow: hidden;
    float: left;
    margin-left: 16px;
    margin-right: 80px;
    cursor: pointer;
    overflow: hidden;
    font-size: 14px;
  }
  .delPost-box .reason-btn-box .btn {
    width: 22px;
    height: 22px;
    background: url(../../assets/web/select-btn.png);
    float: left;
  }
  .delPost-box .reason-btn-box .text {
    width: auto;
    float: left;
    line-height: 22px;
    padding-left: 10px;
  }
  .delPost-box .reason-btn-box-active .btn {
    background: url(../../assets/web/select-btn-active.png);
  }
  .delPost-box .reason-btn-box:nth-of-type(4n) {
    margin-right: 0;
  }
  .delPost-box .reason-text {
    width: 100%;
    height: 60px;
    color: #999;
  }
  .delPost-box .reason-text span {
    font-size: 14px;
    float: left;
    width: 120px;
    line-height: 60px;
    color: #999;
  }
  .delPost-box .reason-text input {
    float: left;
    height: 38px;
    margin-top: 11px;
    width: calc( 100% - 120px);
    font-size: 14px;
    line-height: 38px;
    border: 1px solid #ddd;
    padding-left: 20px;
    color: #999;
    background: #fff;
  }
  .delPost-box .modal .hint {
    color: red;
    font-size: 18;
    width: 100%;
    height: 40px;
    padding: 0 40px;
    line-height: 40px;
  }
  .delPost-box .modal-bottom {
    width: 100%;
    height: 100px;
    color: #fff;
    text-align: center;
    line-height: 38px;
    padding-top: 30px;
  }
  .delPost-box .modal-cancel {
    width: 110px;
    height: 38px;
    border-radius: 19px;
    background: #cccccc;
    float: left;
    margin: 0 32px 0 270px;
    cursor: pointer;
  }
  .delPost-box .modal-confirm {
    width: 110px;
    height: 38px;
    border-radius: 19px;
    background: #19b3e5;
    float: left;
    cursor: pointer;
  }
</style>