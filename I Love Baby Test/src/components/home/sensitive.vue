<template>
	<div class="template-content sensitive-box">
		<div class="header">
			<div class="title">Sensitive words</div>
		</div>
		<div class="sensitive-main">
			<div class="selectLi"> <input type="text" placeholder="Please enter the sensitive word" v-model="inputText" /> <span class="search-sensitive-btn" @click="searchSensitive">
      		<img src="../../assets/web/search.png">
      	</span> <span class="add-sensitive-btn" @click="addSensitive">
      		<img src="../../assets/web/icon-add.png">
      	</span> </div>
			<div class="textbox" v-if="textBoxShow"> <span v-for="item in searchWordData"><span>{{item.word}}</span><img src="../../assets/web/del-btn.png" @click="delSensitiveWord(item.wordId,item.word)" /></span>
			</div>
			<div class="article-hint">{{hint}}</div>
		</div>
		<div id="delWordModal"></div>
		
	</div>
</template>
<script>
	import Vue from 'vue'
	import { Modal } from '../../../static/js/modal.js'
	import { quillEditor } from 'vue-quill-editor'

	var delWordModal = "";
	export default {
		data() {
			return {
				liangliang: sessionStorage.getItem("liangliang").substring(0, sessionStorage.getItem("liangliang").length - 10),
				baseUrl: sessionStorage.getItem("baseUrl"),
				inputText: "",
				textBoxShow: false,
				searchWordData: [],
				hint: "",
				content: null,
				editorOption: {}
			}
		},
		methods: {
			onEditorBlur() { //失去焦点事件
			},
			onEditorFocus() { //获得焦点事件
			},
			onEditorChange() { //内容改变事件
			},
			searchSensitive() {
				var that = this;
				if(this.inputText) {
					$.ajax({
						url: that.baseUrl + "searchSensitiveWord",
						type: "POST",
						data: "{'word':'" + that.inputText + "'}",
						headers: {
							'Authorization': that.liangliang,
						},
						dataType: "json",
						contentType: "application/json",
						success: function(rex) {
							if(rex.code == 200) {
								if(rex.data.length > 0) {
									that.searchWordData = rex.data;
									that.textBoxShow = true;
								} else {
									that.textBoxShow = false;
									that.hint = "*No sensitive word was found";
								}
							}
						}
					})
				} else {
					this.textBoxShow = false;
				}
			},
			addSensitive() {
				var that = this;
				that.textBoxShow = false;
				$.ajax({
					url: that.baseUrl + "addSensitiveWord",
					type: "POST",
					data: "{'word':'" + that.inputText + "'}",
					headers: {
						'Authorization': that.liangliang,
					},
					dataType: "json",
					contentType: "application/json",
					success: function(rex) {
						if(rex.message == "*The sensitive word already exists") {
							that.hint = "*The sensitive word already exists";
							setTimeout(function() {
								that.hint = "";
							}, 3000)
						}
						if(rex.code == 200) {
							$(".article-hint").css("color", "green");
							that.hint = "Success";
							setTimeout(function() {
								$(".article-hint").css("color", "red");
								that.hint = "";
							}, 3000)
						}
					}
				})
			},
			delSensitiveWord(wordId, sensitiveWord) {
				var that = this;
				delWordModal = new Modal({
					"eleId": "delWordModal",
					"title": "",
					"content": "Are you sure you want to delete the sensitive word “" + sensitiveWord + "”",
					success: function() {
						$.ajax({
							url: that.baseUrl + "delSensitiveWord",
							type: "POST",
							data: "{'wordId':'" + wordId + "'}",
							headers: {
								'Authorization': that.liangliang,
							},
							dataType: "json",
							contentType: "application/json",
							success: function(rex) {
								if(rex.code == "200") {
									$("#delWordModal").hide();
									that.searchSensitive();
								}
							}
						})
					},
					cancel: function() {}
				});
			}
		},
	}
</script>
<style>
	@import url("../../../static/css/base.css");
	@import url("../../../static/css/sensitive.css");
</style>