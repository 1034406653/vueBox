<template>
  <div class="container">
    <!--左侧导航-->
    <div class="nav">
      <ul class="list1">
        <li v-for="(list,index) in lists" :class="list.Li1className">
          <div class="list1-div" v-bind:data-id="list.id1" @click="list1Click($event)">
            <div class="nav-icon"><img :src="list.list1DivIcon" /></div>
            <div class="text">{{list.list1DivText}}</div>
            <div class="btn"></div>
          </div>
          <ul class="list2">
            <li v-for="list2Li in list.list2" class="router-li" :class="list2Li.Li2className" v-bind:data-id="list.id1" v-bind:data-idd="list2Li.id2" @click="list2Click($event)" :key="list2Li.id2">
              <div class="text">{{list2Li.Li2Text}}</div>
              <div class="borde"></div>
            </li>
          </ul>
        </li>
        </li>
      </ul>
    </div>
    <div class="main">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        lists: [{
          "id1": "0",
          "Li1className": "li1-active",
          "list1DivIcon": require('../assets/web/icon-nav-community.png'),
          "list1DivText": "Community",
          "list2": [{
            "id2": "0",
            "Li2className": "li2-active",
            "Li2Text": "Normal post",
            "path": "post",
          }, {
            "id2": "1",
            "Li2className": "",
            "Li2Text": "Social post",
            "path": "social",
          }, {
            "id2": "2",
            "Li2className": "",
            "Li2Text": "Add article",
            "path": "artical",
          }, {
            "id2": "3",
            "Li2className": "",
            "Li2Text": "Add video",
            "path": "video",
          }, {
            "id2": "4",
            "Li2className": "",
            "Li2Text": "Reported N",
            "path": "reported-post",
          }, {
            "id2": "5",
            "Li2className": "",
            "Li2Text": "Reported S",
            "path": "reported-social",
          }, ]
        }, {
          "id1": "1",
          "Li1className": "",
          "list1DivIcon": require("../assets/web/icon-nav-community.png"),
          "list1DivText": "Users",
          "list2": [{
            "id2": "0",
            "Li2className": "",
            "Li2Text": "Users",
            "path": "user",
          }, ]
        }, {
          "id1": "2",
          "Li1className": "",
          "list1DivIcon": require("../assets/web/icon-nav-information.png"),
          "list1DivText": "Notification",
          "list2": [{
            "id2": "0",
            "Li2className": "",
            "Li2Text": "Notification",
            "path": "news",
          }, ]
        }, {
          "id1": "3",
          "Li1className": "",
          "list1DivIcon": require("../assets/web/icon-nav-system.png"),
          "list1DivText": "System",
          "list2": [{
            "id2": "0",
            "Li2className": "",
            "Li2Text": "Sensitive words",
            "path": "sensitive",
          }, ]
        }, {
          "id1": "4",
          "Li1className": "",
          "list1DivIcon": require("../assets/web/icon-nav-admin.png"),
          "list1DivText": "Admin",
          "list2": [{
            "id2": "0",
            "Li2className": "",
            "Li2Text": "Deleted N",
            "path": "admin-post",
          }, {
            "id2": "1",
            "Li2className": "",
            "Li2Text": "Deleted S",
            "path": "admin-social",
          }, {
            "id2": "2",
            "Li2className": "",
            "Li2Text": "Blocked users",
            "path": "admin-user",
          }, ]
        }, ]
      }
    },
    mounted() {
      this.init()
    },
    watch: {
      "$route": "init"
    },
    methods: {
      init() {
        let that = this;
        if(sessionStorage.getItem("liangliang") || this.$route.path == "/login") {
        } else {
          that.$router.push({
            path: '/'
          })
        }

        function restClassName() {
          that.lists.forEach(function(x, i) {
            x.Li1className = "";
            x.list2.forEach(function(x, i) {
              x.Li2className = "";
            })
          })
        }
        if(this.$route.path == "/home/post") {
          restClassName()
          this.lists[0].Li1className = "li1-active";
          this.lists[0].list2[0].Li2className = "li2-active";
        } else if(this.$route.path == "/home/social") {
          restClassName()
          this.lists[0].Li1className = "li1-active";
          this.lists[0].list2[1].Li2className = "li2-active";
        } else if(this.$route.path == "/home/artical") {
          restClassName()
          this.lists[0].Li1className = "li1-active";
          this.lists[0].list2[2].Li2className = "li2-active";
        } else if(this.$route.path == "/home/artical-add") {
          restClassName()
          this.lists[0].Li1className = "li1-active";
          this.lists[0].list2[2].Li2className = "li2-active";
        } else if(this.$route.path == "/home/video") {
          restClassName()
          this.lists[0].Li1className = "li1-active";
          this.lists[0].list2[3].Li2className = "li2-active";
        } else if(this.$route.path == "/home/video-add") {
          restClassName()
          this.lists[0].Li1className = "li1-active";
          this.lists[0].list2[3].Li2className = "li2-active";
        } else if(this.$route.path == "/home/reported-post") {
          restClassName()
          this.lists[0].Li1className = "li1-active";
          this.lists[0].list2[4].Li2className = "li2-active";
        } else if(this.$route.path == "/home/reported-social") {
          restClassName()
          this.lists[0].Li1className = "li1-active";
          this.lists[0].list2[5].Li2className = "li2-active";
        } else if(this.$route.path == "/home/user") {
          restClassName()
          this.lists[1].Li1className = "li1-active";
          this.lists[1].list2[0].Li2className = "li2-active";
        } else if(this.$route.path == "/home/news") {
          restClassName()
          this.lists[2].Li1className = "li1-active";
          this.lists[2].list2[0].Li2className = "li2-active";
        } else if(this.$route.path == "/home/news-add") {
          restClassName()
          this.lists[2].Li1className = "li1-active";
          this.lists[2].list2[0].Li2className = "li2-active";
        } else if(this.$route.path == "/home/sensitive") {
          restClassName()
          this.lists[3].Li1className = "li1-active";
          this.lists[3].list2[0].Li2className = "li2-active";
        } else if(this.$route.path == "/home/admin-post") {
          restClassName()
          this.lists[4].Li1className = "li1-active";
          this.lists[4].list2[0].Li2className = "li2-active";
        } else if(this.$route.path == "/home/admin-post") {
          restClassName()
          this.lists[4].Li1className = "li1-active";
          this.lists[4].list2[0].Li2className = "li2-active";
        } else if(this.$route.path == "/home/admin-social") {
          restClassName()
          this.lists[4].Li1className = "li1-active";
          this.lists[4].list2[1].Li2className = "li2-active";
        } else if(this.$route.path == "/home/admin-user") {
          restClassName()
          this.lists[4].Li1className = "li1-active";
          this.lists[4].list2[2].Li2className = "li2-active";
        }
      },
      list1Click(e) {
        let idNum = e.currentTarget.getAttribute('data-id');
        this.lists.forEach(function(x, i) {
          x.Li1className = "";
        })
        this.lists[idNum].Li1className = "li1-active";
        let pathText = this.lists[idNum].list2[0].path;
        this.lists.forEach(function(x, i) {
          x.list2.forEach(function(x, i) {
            x.Li2className = "";
          })
        })
        this.lists[idNum].list2[0].Li2className = "li2-active";
        this.$router.push({
          path: pathText,
        })
      },
      list2Click(e) {
        let idNum1 = e.currentTarget.getAttribute('data-id');
        let idNum2 = e.currentTarget.getAttribute('data-idd');
        if(this.lists[idNum1].list2[idNum2].path) {
          this.lists.forEach(function(x, i) {
            x.list2.forEach(function(x, i) {
              x.Li2className = "";
            })
          })
          this.lists[idNum1].list2[idNum2].Li2className = "li2-active";
          let pathText = this.lists[idNum1].list2[idNum2].path;
          this.$router.push({
            path: pathText,
          })
        }
      }
    }
  }
</script>
<style>

</style>