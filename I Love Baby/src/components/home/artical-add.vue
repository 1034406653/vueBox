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
        <div class="textareaBox" style="width: 100%;height: auto;padding: 0 28px;"> <textarea id="editor_id" name="content" style="width:100%;height:320px;"></textarea> </div>
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
  import Editor from '../../../static/js/kindeditor/kindeditor-all.js'
  import EditorEg from '../../../static/js/kindeditor/lang/en.js'
  var editor;
  var kBox = null;
  export default {
    data() {
      return {
        liangliang: sessionStorage.getItem("liangliang").substring(0, sessionStorage.getItem("liangliang").length - 10),
        baseUrl: sessionStorage.getItem("baseUrl"),
        articalType: "1",
        articalTitle: "",
        articalAuthor: "",
        postJson: {
          title: "",
          content: "",
          coverImgId: "",
          author: "",
          type: "1",
        },
        imgJson: {
          type: "11",
          ext: "",
          file: ""
        },
        hint: "",
      }
    },
    mounted() {
      this.init();
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.url = from.path;
        if(from.path == "/home/artical") {
          vm.$router.go(0);
        }
      })
    },
    methods: {
      init() {
        var that = this;
        this.postJson.type = this.$route.query.articalType;
        kBox = null;
        $(".textareaBox").html('<textarea id="editor_id" name="content" style="width:100%;height:320px;"></textarea>');
        kBox = KindEditor.ready(function(K) {
          editor = K.create('#editor_id', {
            fixToolBar: true,
            langType: 'en',
            items: ['source', '|', 'undo', 'redo', '|', 'preview','cut', 'copy', 'paste', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image',  'emoticons'],
            uploadJson: that.baseUrl + 'editorUploadFile', //上传图片的java代码，只不过放在jsp中
          });
        });
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
        editor.sync();
        console.log($("#editor_id").val());
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
                if($("#editor_id").val()) {
                  that.postJson.content = $("#editor_id").val();
                  //上传文章
                  let articleStr = JSON.stringify(that.postJson);
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
  @import url("../../../static/js/kindeditor/themes/default/default.css");
</style>