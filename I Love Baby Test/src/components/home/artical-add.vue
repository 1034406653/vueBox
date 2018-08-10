<template>
  <div class="template-content publish">
    <div class="header">
      <div class="btn-back" @click="goBack">Back</div>
      <div class="title" v-if="postJson.type=='0'">Post Article</div>
      <div class="title" v-else>Post Article</div>
    </div>
    <ul>
      <li> <label>Title</label> <input type="text" placeholder="Please enter the title" class="article-title" v-model="postJson.title" /> </li>
      <li> <label>Author</label> <input type="text" placeholder="Please enter the author" class="article-author" v-model="postJson.author" /> </li>
      <li> <span>Cover picture</span>
        <div class="upload-box"> <input type="button" id="filebutton" value="Upload" @click="filebuttonClick" class="addPicture" /> <input type="textfield" id="filepath" value=""> <input class="file" type="file" id="up" style="visibility:hidden;width: 1px;height: 1px;" v-on:change="fileChange($event)" /> <img id="ImgPr" class="file_img" src=""> </div>
      </li>
      <li> <span>Content</span>
        
        <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)" style="width: 96%;margin: 0 auto;padding-bottom: 30px;">
		</quill-editor>
      </li>
    </ul>
    <div class="article-hint">{{hint}}</div>
    <div class="bottom">
      <div class="cancle-btn" @click="goBack">Cancle</div>
      <div class="confirm-btn" @click="postArtical">Cofirm</div>
    </div>
  </div>
</template>
<script>
  import { imgJSON, getImgStr, readFile } from '../../../static/js/uploadImg.js'
  import { quillEditor } from 'vue-quill-editor'
  export default {
    data() {
      return {
        liangliang: sessionStorage.getItem("liangliang").substring(0, sessionStorage.getItem("liangliang").length - 10),
        baseUrl: sessionStorage.getItem("baseUrl"),
        articalType: "1",
        articalTitle: "",
        articalAuthor: "",
        postJson: {
          title: '',
          content: '',
          coverImgId: '',
          author: '',
          type: '1',
        },
        imgJson: {
          type: "11",
          ext: "",
          file: ""
        },
        hint: "",
        content: null,
				editorOption: {}
      }
    },
    mounted() {
      this.init();
    },
    
    methods: {
      init() {
        var that = this;
        this.postJson.type = this.$route.query.articalType;
      },
      onEditorBlur() { //失去焦点事件
      	console.log(this.content)
			},
			onEditorFocus() { //获得焦点事件
			},
			onEditorChange(
				
			) { //内容改变事件
			},
      filebuttonClick() {
        let up = document.getElementById("up");
        up.click();
      },
      fileChange(event) {
        $("#filepath").val(event.currentTarget.value);
        var eleFile = event.currentTarget.files[0];
        this.imgJson = getImgStr(event.currentTarget, eleFile, 'ImgPr');
      },
      postArtical() {
        var that = this;
        if(this.imgJson.ext != "" && this.imgJson.file != "") {
          let imgStr = JSON.stringify(imgJSON);
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
                that.postJson.coverImgId = rex.data.imageId;
              }
              if(that.postJson.title != "") {
                if(that.content) {
                  that.postJson.content = that.content;
                  //上传文章
                  let articleStr = JSON.stringify(that.postJson);
                  console.log(articleStr);
                  $.ajax({
                    url: that.baseUrl + "addPetCuring",
                    type: "POST",
                    data: articleStr,
                    headers: {
                      'Authorization': that.liangliang,
                    },
                    dataType: "json",
                    contentType: "application/json",
                    success: function(rex) {
                      console.log(rex);
                      if(rex.code == "200") {
                        $(".article-hint").css("color", "green");
                        that.hint = "Success";
                        setTimeout(function() {
                          that.$router.push({
                          path: "artical"
                        })
                        }, 1000)
                      }
                    }
                  })
                } else {
                  that.hint = "*Please enter the content of the article";
                }
              } else {
                that.hint = "*Please enter the title of the article";
              }
            }
          })
        } else {
          that.hint = "*Please upload the cover picture";
        }
      },
      goBack() {
        this.$router.go(-1);
      },
    },
  }
</script>
<style>
  @import url("../../../static/css/publish.css");

</style>