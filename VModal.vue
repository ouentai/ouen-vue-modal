<!--
  コンポーネントの機能
    - modal の役割
    - modal背景のクリックで閉じることができる
    - modalの中身は使うところで指定できる
    - いくつかのプロパティで機能を切り替えられる
    - 複数設置に対応
    - 親コンポーネントから :open.sync='変数' をつけるだけ

  interface : mixin modalable の interface
    - input : props
      - open : boolean : modalを開くか閉じるか
      - zIndex : Number : このmodalのz-indexを指定できる : default では指定されない
      - openIf : boolean : 開閉の際 true:v-if / false:v-show を使うか : default false
      - disabledClose : boolean : modal背景クリックでの閉じを無効化する : default false
      - modalBgColor : string : 背景色の設定 : cssのrgba()の文字列 : default rgba(0,0,0,0.5)
    - output
      - emit : update:open : false : modalのcloseイベント
      - emit : close : void : modalのcloseイベント
-->

<template>
    <div
      v-if='ifState'
      :style='ModalableMixin_style'
      @click='clickBg'
      >

      <slot/>

    </div>
</template>

<script>
import Modalable from './mixin/Modalable';

export default {
  name: 'VModal',
  mixins: [
    Modalable ,
  ],
};
</script>
