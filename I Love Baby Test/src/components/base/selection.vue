<template>
  <div class="selection-component">
    <div class="selection-show" @click="toggleDrop"> <span>{{selectionactive}}</span>
      <div class="arrow"></div>
    </div>
    <div class="selection-list" v-if="isDrop">
      <ul>
        <li v-for="(item, index) in selections" @click="chooseSelection(index)">{{ item.label }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      selections: {
        type: Array,
        default: [{
          label: 'test',
          value: 0
        }]
      },
      selectionactive: {
        type: String,
        default: "All"
      }
    },
    data() {
      return {
        isDrop: false,
        nowIndex: 0
      }
    },
    methods: {
      toggleDrop() {
        this.isDrop = !this.isDrop
      },
      chooseSelection(index) {
        console.log(this.selections[this.nowIndex].label)
        this.nowIndex = index
        this.isDrop = false
        this.$emit('on-change', this.selections[this.nowIndex])
      }
    }
  }
</script>
<style scoped>
  .selection-component {
    position: relative;
    display: inline-block;
    width: 100%;
  }
  .selection-show {
    border: 1px solid #e8eaec;
    border-top-color: #898b8c;
    border-bottom-color: #e3e3e3;
    background: #f5f8fa;
    width: 100%;
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 32px;
    line-height: 30px;
    overflow: hidden;
  }
  .selection-show>span {
    float: left;
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
  .selection-show .arrow {
    float: left;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #999;
    width: 0;
    height: 0;
    margin-top: 10px;
    margin-left: 6px;
    margin-right: -14px;
    vertical-align: middle;
  }
  .selection-list {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 30px;
    width: 100%;
    background: #fff;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    z-index: 5;
  }
  .selection-list li {
    padding: 2px 4px 2px 4px;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    cursor: pointer;
    background: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  .selection-list li:hover {
    background: #e3e3e3;
  }
</style>