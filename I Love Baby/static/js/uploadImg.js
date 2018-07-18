var imgJSON = {type:"11",ext:"",file:""};
function getImgStr(ele, eleFile, imgPrId) {
  var location = ele.value;
  let point = location.lastIndexOf(".");
  var type = location.substr(point + 1);
  if(type == "jpg" || type == "gif" || type == "JPG" || type == "GIF" || type == "png" || type == "PNG"|| type == "jpeg"|| type == "JPEG") {
  	if(type=="JPG"){
  		type == "jpg"
  	}else if(type == "GIF"){
  		type == "gif"
  	}else if(type == "PNG"){
  		type == "png"
  	}else if(type == "JPEG"){
  		type == "jpeg"
  	}
    imgJSON.ext = type;
    readFile(eleFile,imgPrId);
  }
  return imgJSON;
}
function readFile(eleFile,imgPrId) {
  var file = eleFile;
  //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件 
  if(!/image\/\w+/.test(file.type)) {
    alert("请确保文件为图像类型");
    return false;
  }
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(e) {
    let base64 = this.result;
    document.getElementById(imgPrId).src=this.result;
    base64 = base64.slice(base64.indexOf(",") + 1);
    imgJSON.file = base64;
  }
}
export {imgJSON,getImgStr,readFile}
