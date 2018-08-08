<template>
  <div class="template-content publish">
    <div class="header">
      <div class="btn-back" @click="goBack">Back</div>
      <div class="title"> Upload video </div>
    </div>
    <ul>
      <li> <label>Title</label> <input type="text" placeholder="Please enter the title" class="videoTitle" v-model="videoJson.title" /> </li>
      <li> <label>Description</label> <input type="text" placeholder="Please enter the video description" class="videoDescription" v-model="videoJson.description" /> </li>
      <li> <label>Difficulty level</label> <input type="number" placeholder="Please enter integer 1~5" class="level" v-model="videoJson.level" /> </li>
      <li> <span>Upload Video</span>
        <div class="upload-box">
          <video style="display:none;" controls="controls" id="video"></video> <input type=button id="filebutton" value="Choose the video" @click="filebuttonClick" class="addPicture"> <input type="textfield" id="filepath" value="" style="width: 300px;"> <input class="file" type="file" id="up" style="visibility:hidden;width: 1px;height: 1px;" v-on:change="fileChange($event)"> </div>
        <div class="upload-btn">
          <div class="startUpload" id="startUpload">Start upload</div>
          <div><span class="videoProgress">{{videoProgress}}</span></div>
        </div>
        <div></div>
      </li>
    </ul>
    <div class="article-hint">{{hint}}</div>
    <div class="bottom">
      <div class="cancle-btn" @click="goBack">Cancel</div>
      <div class="confirm-btn" @click="addVideo">Confirm </div>
    </div>
  </div>
</template>
<script>
  AWS.config.update({
    region: 'us-west-2',
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-west-2:e75b00b3-3db1-483f-aba6-b72d1db05897',
    })
  });
  var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {
      Bucket: 'h5lovebaby'
    }
  });
  export default {
    data() {
      return {
        liangliang: sessionStorage.getItem("liangliang").substring(0, sessionStorage.getItem("liangliang").length - 10),
        baseUrl: sessionStorage.getItem("baseUrl"),
        videoJson: {
          type: "1",
          title: "",
          description: "",
          level: "",
          videoId: "",
        },
        videoEleJson: {
          coverUrl: "",
          playUrl: "",
          duration: "0",
          title: "",
        },
        videoImgJson: {
          type: "11",
          ext: "jpg",
          file: ""
        },
        videoProgress: "",
        progressText: true,
        hint: ""
      }
    },
    mounted() {
      this.init();
    },
    watch: {
      '$route' (to, from) {}
    },
    methods: {
      init() {
        var that = this;
        /*视频配置sdk*/
        document.getElementById("startUpload").addEventListener('click', function(event) {
          that.uploadVideo("video");
        });
        document.getElementById("video").addEventListener('loadeddata', function() {
          let video = document.getElementById("video");
          setTimeout(function() {
            that.videoEleJson.duration = video.duration;
            let upVideoTitleTime = new Date();
            that.videoEleJson.title = upVideoTitleTime.getTime();
            let canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            that.videoImgJson.file = canvas.toDataURL("image/jpg").slice(canvas.toDataURL("image/jpg").indexOf(",") + 1);
            let imgStr = JSON.stringify(that.videoImgJson);
            $.ajax({
              url: that.baseUrl + "uploadFile",
              type: "POST",
              data: imgStr,
              headers: {
                'Authorization': that.liangliang,
              },
              dataType: "json",
              contentType: "application/json",
              success: function(rex) {
                if(rex.code == "200") {
                	console.log(rex.data.imageUrl);
                  that.videoEleJson.coverUrl = rex.data.imageUrl;
                  let videoEleStr = JSON.stringify(that.videoEleJson)
                  $.ajax({
                    url: that.baseUrl + "uploadVideo",
                    type: "POST",
                    data: videoEleStr,
                    headers: {
                      'Authorization': that.liangliang,
                    },
                    dataType: "json",
                    contentType: "application/json",
                    success: function(rex) {
                      if(rex.code == "200") {
                        that.videoJson.videoId = rex.data.videoId;
                        that.videoProgress = "Video file uploaded successfully";
                      }
                    }
                  })
                }
              }
            })
          }, 100)
        });
      },
      filebuttonClick() {
        let up = document.getElementById("up");
        up.click();
      },
      fileChange(event) {
        $("#filepath").val(event.currentTarget.value);
      },
      uploadVideo(albumName) {
        var that = this;
        var videoEle = document.getElementById("video");
        let files = document.getElementById('up').files;
        if(!files.length) {
          that.videoProgress = "Please choose a video file to upload first"
        } else {
          let file = files[0];
          let fileName = file.name;
          let point = fileName.lastIndexOf(".");
          let type = fileName.substr(point + 1).toLowerCase();
          if(type == "mp4" || type == "3gp" || type == "asx" || type == "mov" || type == "rm" || type == "ram" || type == "rmvb") {
            let albumVideoKey = encodeURIComponent(albumName) + '/';
            let upTime = new Date();
            let videoKey = albumVideoKey + upTime.getTime() + "." + type;
            if(that.progressText) {
              that.progressText = false;
              s3.upload({
                Key: videoKey,
                Body: file,
                ACL: 'public-read',
                ContentType: "video/mp4"
              }, function(err, data) {
                if(err) {
                  console.log(err);
                  that.hint = err.message;
                  that.progressText = true;
                } else {
                  that.videoEleJson.playUrl = data.Location;
                  that.progressText = true;
                  videoEle.src = URL.createObjectURL(file);
                  setTimeout(function() {
                    if(!(videoEle.duration > 0)) {
                      that.videoProgress = "Sorry, the format file is not supported"
                    }
                  }, 500)
                }
              }).on('httpUploadProgress', function(progress) {
                that.videoProgress = parseInt(progress.loaded / progress.total * 100) + ' %';
              });
            }
          } else {
            that.videoProgress = "Choose a common video format file, such as MP4";
          }
        }
      },
      addVideo() {
        var that = this;
        this.videoJson.type = this.$route.query.videoType || 1;
        if(that.videoJson.title) {
          if(that.videoJson.description) {
            if(that.videoJson.level == "1" || that.videoJson.level == "2" || that.videoJson.level == "3" || that.videoJson.level == "4" || that.videoJson.level == "5") {
              if(that.videoJson.videoId != "") {
                let addVideoStr = JSON.stringify(that.videoJson);
                $.ajax({
                  url: that.baseUrl + "addPetTraining",
                  type: "POST",
                  data: addVideoStr,
                  headers: {
                    'Authorization': that.liangliang,
                  },
                  dataType: "json",
                  contentType: "application/json",
                  success: function(rex) {
                    if(rex.code == "200") {
                      $(".article-hint").css("color", "green");
                      that.hint = "Success";
                      setTimeout(function() {
                        that.$router.push({
                          path: "video"
                        })
                      }, 1000)
                    }
                  }
                })
              } else {
                that.hint = "*Please upload video";
              }
            } else {
              that.hint = "*Please enter the difficulty level correctly";
            }
          } else {
            that.hint = "*Please enter the video description";
          }
        } else {
          that.hint = "*Please enter the title";
        }
      },
      goBack() {
        this.$router.go(-1);
      },
    }
  }
</script>
<style>
  @import url("../../../static/css/publish.css");
  ul>li>label {
    width: 120px;
  }
  ul>li>input {
    width: calc( 100% - 140px);
    height: 54px;
    float: left;
    color: #999;
    font-size: 14px;
  }
</style>