<template>
  <div class="list-detail">
    <h3>{{detail.name}}的详情</h3>
    <div class="content">
      <div class="detail">
        <span class="label">ID:</span>
        <span class="value">{{detail.id}}</span>
      </div>
      <div class="detail">
        <span class="label">姓名:</span>
        <span class="value">{{detail.name}}</span>
      </div>
      <div class="detail">
        <span class="label">分数:</span>
        <span class="value">{{detail.score}}</span>
      </div>
    </div>
    <div class="btn-content">
      <button v-for="btn in buttonList" :key="btn.code" @click="handlerClick(btn.code)">{{btn.label}}</button>
    </div>
  </div>
</template>
<script lang="ts">
import EventEmitter from '../utils/eventEmitter';
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
@Component
export default class List extends Vue {
  private get detail(){
    return this.$route.query;
  }
  private get buttonList() {
    let btn = [];
    if (this.detail.score > 60) {
      btn = [
        {
          code: 'back',
          label: '返回',
        },
        {
          code: 'pass',
          label: '通过',
        },
      ];
    } else {
        btn = [
        {
          code: 'back',
          label: '返回',
        },
        {
          code: 'noPass',
          label: '不通过',
        },
      ];
    }
    return btn;
  }
  private handlerClick(code: any) {
    this[code]();
  }
  back() {
    this.$router.back();
  }
  pass() {
    EventEmitter.emit('refreshList', {
      id: this.detail.id,
      pass: true,
    });
    this.$router.back();
  }
  noPass() {
    EventEmitter.emit('refreshList', {
      id: this.detail.id,
      pass: false,
    });
    this.$router.back();
  }
}
</script>
