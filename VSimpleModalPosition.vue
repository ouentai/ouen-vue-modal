<!--
  コンポーネントの機能
    - VModal + VModalBox 役割
    - VModalにネストする必要がない
    - シンプルにこのコンポーネントだけを設置する目的で使用する

  interface
    - ModalableMixin と PositionableMixin を参照 : 両方のものを使用できる
-->

<template>
  <div :style='ModalableMixin_style_1'>
    <div
      v-if='ifState'
      ref='modal-bg'
      :style='ModalableMixin_style_2'
      @click='clickBg'
      >

      <div :style='PositionableMixin_style'>
        <slot/>
      </div>

    </div>
  </div>

</template>

<script>
import Modalable from './mixin/Modalable';
import Positionable from './mixin/Positionable';

export default {
  name: 'VSimpleModalPosition',
  mixins: [
    Modalable ,
    Positionable ,
  ],
};
</script>
