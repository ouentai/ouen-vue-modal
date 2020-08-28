<!--
  コンポーネントの機能
    - modal の役割
    - modal背景のクリックで閉じることができる
    - modalの中身は使うところで指定できる
    - いくつかのプロパティで機能を切り替えられる
    - 複数設置に対応
    - 親コンポーネントから :open.sync='変数' をつけるだけ

  interface
    - input : props
      - open : boolean : modalを開くか閉じるか
      - zIndex : Number : このmodalのz-indexを指定できる : default では指定されない
      - openIf : boolean : 開閉の際 true:v-if / false:v-show を使うか : default false
      - disabledClose : boolean : modal背景クリックでの閉じを無効化する : default false
      - bgColor : string : 背景色の設定 : cssのrgba()の文字列 : default rgba(0,0,0,0.5)
    - output
      - emit : update:open : false : modalのcloseイベント
      - emit : close : void : modalのcloseイベント
-->

<template>
  <div :style='{zIndex}' class='modal-frame'>
    <div
      v-if='ifState'
      v-show='open'
      ref='modal-bg'
      :style='{backgroundColor:bgColor}'
      class='modal-bg'
      @click='clickBg'
      >

      <slot/>

    </div>
  </div>
</template>

<script>
export default {
  name: 'VModal',
  provide() {
    // リアクティブな状態でproviedeする方法
    const obj = {};
    Object.defineProperty(obj,'closeModal',{enumerable:true,get:()=>this.close});
    return obj ;
  },
  props: {
    open : Boolean ,
    zIndex : Number ,
    openIf : Boolean ,
    disabledClose : Boolean ,
    bgColor : {
      type : String ,
      default : 'rgba(0,0,0,.5)'
    },
  },
  computed: {
    ifState () { return this.openIf ? this.open : true ; },
  },
  methods: {
    close() {
      this.$emit('update:open', false);
      this.$emit('close');
    },
    clickBg(e) {
      if (!this.disabledClose && e.target===this.$refs['modal-bg']) {
        this.close();
      }
    },
  },
};
</script>

<style scoped>
.modal-frame {
  position:fixed;
  top: 0;
  left: 0;
}

.modal-bg {
  width: 100vw;
  height: 100vh;
}
</style>
