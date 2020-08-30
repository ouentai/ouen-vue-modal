<!--
  コンポーネントの機能
    - modalの box 役割
    - Positionableの位置指定機能をMixinしている
    - width/heightでサイズを指定できる
    - sizeで簡易的に幅を指定できる : widthがない時のみ
    - 背景色を指定できる
    - borderRadiusを指定できる
    - header領域を表示OFFにできる
    - header用のスロットがある

  interface
    - input : props
      - hideHeader : boolean : デフォルトのヘッダーを非表示にする
      - size : string : ['sm', 'md', 'lg', 'xl', 'auto']のどれか
      - width : string : css で使う文字列 : 無効文字列を入れるとstyle.widthを設定しない
      - heigt : string : widthに同じ
      - bgColor : string : css で使う文字列 : 文字列'null'でstyle.backgroundColorを設定しない
      - padding : string : widthに同じ
      - overflowX : string : widthに同じ
      - overflowY : string : widthに同じ
    - input : slot
      - default
      - header
    - output : なし
-->

<template>
  <div :style='PositionableMixin_style'>

  <div :style='contentStyle' class='vm-box'>

    <slot name='header' v-if='!hideHeader'>
      <div class='d-flex'>
        <div class='header-content'></div>
        <div class='header-close' @click='close'><span>×</span></div>
      </div>
      <hr>
    </slot>

    <slot/>

  </div>

  </div>
</template>

<script>
import Positionable from './mixin/Positionable';

export default {
  name: 'VModalBox',
  inject: {
    closeModal : 'closeModal' ,
  },
  mixins: [
    Positionable ,
  ],
  props: {
    hideHeader : Boolean ,
    size : {
      type : String ,
      validator : (val) => ['sm', 'md', 'lg', 'xl', 'auto'].includes(val) ,
    },
    width : String ,
    height : String ,
    bgColor : String ,
    borderRadius : String ,
    padding : String ,
    overflowX : String ,
    overflowY : String ,
  },
  computed: {
    contentStyle() {
      const obj = {
        borderRadius : this.borderRadius || '.3rem' ,
        width : this.localWidth ,
        height : this.height || 'auto' ,
        padding : this.padding || '1rem' ,
        overflowX : this.overflowX ,
        overflowY : this.overflowY ,
      };
      if (this.bgColor !== 'null') {
        obj.backgroundColor = this.bgColor || '#FFF' ;
      }
      return obj ;
    },
    localWidth() {
      if (this.width) { return this.width ; }
      return this.size === 'sm' &&  '300px' ||
             this.size === 'md' &&  '500px' ||
             this.size === 'lg' &&  '800px' ||
             this.size === 'xl' && '1140px' ||
             this.size === 'auto' && 'auto' ||
             '500px' ;
    },
  },
  methods: {
    close() { this.closeModal(); },
  },
};
</script>

<style scoped>
.vm-box {
  --close-item-width : 40px;
}

.d-flex {
  display: flex;
}

.header-content {
  width : calc( 100% - var(--close-item-width));
}

.header-close {
  width : var(--close-item-width);
  font-size : 2rem;
}
</style>
