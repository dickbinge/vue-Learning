<template>
  <div class="list">
    <h3>列表首页</h3>
    <table cellspacing="0" width="100%">
      <colgroup>
        <col v-for="col of column" :key="col.code" :width="col.width + '%'"/>
      </colgroup>
      <thead>
        <tr>
          <th v-for="col of column" :key="col.code">
            {{col.label}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index" @click="$router.push({path:'/detail', query: item})">
          <td v-for="col of column" :key="col.code">
            <span v-if="col.temp && item[col.code]!==undefined" class="state" :class="{'pass': item[col.code]}">
              {{item[col.code] ? '通过' : '没通过'}}
            </span>
            <span v-else>
              {{item[col.code]}}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import EventEmitter from '../utils/eventEmitter';
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
@Component
export default class List extends Vue {
  /**
   * props
   */
  @Prop({
    type: Object,
    default: () => ({}),
    required: false,
  })
  private params !:object;
  // private props!: ItemInfo;
  // ！表示强制解析，: 表示类型声明

  /**
   * data
   */
  private list = [];
  private column = [
    {
      code: 'id',
      label: 'ID',
      width: 15,
    },
    {
      code: 'name',
      label: '姓名',
      width: 35,
    },
    {
      code: 'score',
      label: '分数',
      width: 30,
    },
    {
      code: 'pass',
      temp: true,
      label: '是否通过',
      width: 20,
    }
  ];
  /**
   * computed
   */
  private get testOptions() {
    return this.params;
  }

  /**
   * watch 监听
   */
  @Watch('params')
  paramsWatcher(val: any) {
    console.log(val);
  }
  private created() {
    EventEmitter.addListener('refreshList', (args: any) => {
      const index = this.list.findIndex(item => item.id === args.id);
      if (index !== -1) {
        this.$set(this.list, index, {
          ...this.list[index],
          ...args,
        });
      }
    });
  }
  private mounted() {
    axios.post(`${window.location.origin}/goods/list`)
    .then(({ data }) => {
      console.log(data);
      this.list = data.data.list;
    });
  }
}

</script>
<style scoped>
table th, table td{
  border: 1px solid #eee;
}
.pass{
  color: green;
}
</style>