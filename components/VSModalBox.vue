<!--
  コンポーネントの機能
    - VModal + VModalBox 役割
    - VModalにネストする必要がない
    - シンプルにこのコンポーネントだけを設置する目的で使用する

  interface
    - ModalableMixin と VModalBox を参照 : 両方のものを使用できる
    - props.modalBgColor : modal自体の背景色
    - props.bgColor : boxの背景色
-->

<template>
    <div
      v-if='ifState'
      :style='ModalableMixin_style'
      @click='clickBg'
      >

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

    </div>
</template>

<script>
import Modalable from '../mixin/Modalable';
import Positionable from '../mixin/Positionable';

export default {
  name: 'VSModalBox',
  mixins: [
    Modalable ,
    Positionable ,
  ],
  props: {
    // box part
    hideHeader : Boolean ,
    size : {
      type : String ,
      validator : (val) => ['sm', 'md', 'lg', 'xl', 'auto'].includes(val) ,
    },
    width : String ,
    minWidth : String ,
    maxWidth : String ,
    height : String ,
    minHeight : String ,
    maxHeight : String ,
    bgColor : String ,
    borderRadius : String ,
    padding : String ,
    overflowX : String ,
    overflowY : String ,
  },
  computed: {
    // box part
    contentStyle() {
      const obj = {
        borderRadius : this.borderRadius || '.3rem' ,
        width : this.localWidth ,
        minWidth : this.minWidth ,
        maxWidth : this.maxWidth ,
        height : this.height || 'auto' ,
        minHeight : this.minHeight ,
        maxHeight : this.maxHeight ,
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
