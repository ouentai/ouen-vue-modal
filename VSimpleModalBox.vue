<!--
  コンポーネントの機能
    - VModal + VModalBox 役割
    - VModalにネストする必要がない
    - シンプルにこのコンポーネントだけを設置する目的で使用する

  interface
    - VModal と VModalBox を参照 : 両方のものを使用できる
    - VModal の props.bgColor は 名前が衝突しているので modalBgColor に変更されている
-->

<template>
  <div :style='{zIndex}' class='modal-frame'>
    <div
      v-if='ifState'
      v-show='open'
      ref='modal-bg'
      :style='{backgroundColor:modalBgColor}'
      class='modal-bg'
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
  </div>
</template>

<script>
import Positionable from './mixin/Positionable';

export default {
  name: 'VSimpleModalBox',
  mixins: [
    Positionable ,
  ],
  props: {
    // modal part
    open : Boolean ,
    zIndex : Number ,
    openIf : Boolean ,
    disabledClose : Boolean ,
    modalBgColor : {
      type : String ,
      default : 'rgba(0,0,0,.5)'
    },

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
    // modal part
    ifState () { return this.openIf ? this.open : true ; },

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
