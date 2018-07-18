var Modal = function(option) {
  this.option = {
    eleId: option.eleId,
    title: option.title,
    content: option.content,
    callbackConfirm: option.success,
    callbackCancel: option.cancel,
  };
  this.ele = document.getElementById(this.option.eleId);
  this.ele.innerHTML = "<div class='modalBody'><div class='tltle'><span></span></div><div class='content'><span></span></div><div class='bottom'><div class='cancel'>Cancel</div><div class='confirm'>Confirm</div></div></div><div class='modalMask'></div>"
  this.modalBody = this.ele.getElementsByClassName("modalBody")[0];
  this.modalMask = this.ele.getElementsByClassName("modalMask")[0];
  this.title = this.ele.getElementsByClassName("tltle")[0];
  this.content = this.ele.getElementsByClassName("content")[0];
  this.bottom = this.ele.getElementsByClassName("bottom")[0];
  this.cancel = this.ele.getElementsByClassName("cancel")[0];
  this.confirm = this.ele.getElementsByClassName("confirm")[0];
  this.ele.style.cssText = 'display: block;'
  this.modalBody.style.cssText = 'position: fixed;width: 40%;height: auto;left: 50%;top: 30%;margin-left: -20%;background: #fff;border-radius: 10px;overflow: hidden;border: 2px solid #eee;z-index: 1000;'
  this.modalMask.style.cssText = 'position: fixed;left: 0;top: 0;bottom: 0;right: 0;background: #000000;opacity: 0.7;z-index: 101;'
  this.title.style.cssText = 'width: 100%;height: 20px;line-height: 20px;color: #333;font-size: 24px;text-align: center;'
  this.content.style.cssText = 'width: 100%;height: auto;padding: 10px 10px 30px 10px;line-height: 24px;font-size: 18px;color: #666;background: #fff;'
  this.bottom.style.cssText = 'width: 100%;height: 36px;border-top: 1px solid #eee;line-height: 34px;font-size: 16px;text-align:center;'
  this.cancel.style.cssText = 'float: left;width: 50%;height: 36px;color: #333;box-sizing: border-box;border-right:1px solid #eee;'
  this.confirm.style.cssText = 'float: left;width: 50%;height: 36px;color: #008000;'
  this.title.innerHTML = this.option.title || "";
  this.content.innerHTML = this.option.content || "";
  var callBackConfirm = this.option.callbackConfirm;
  var callBackCancel = this.option.callbackCancel;
  var thatEle = this.ele;
  var thatShadow = this.shadow;
  this.cancel.onclick = function() {
    callBackCancel();
    thatEle.style.display = "none";
  };
  this.confirm.onclick = function() {
    callBackConfirm();
  };
}
export {
  Modal
}