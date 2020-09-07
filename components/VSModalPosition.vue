<!--
  コンポーネントの機能
    - VModal + VModalBox 役割
    - VModalにネストする必要がない
    - シンプルにこのコンポーネントだけを設置する目的で使用する

  interface
    - ModalableMixin と PositionableMixin を参照 : 両方のものを使用できる
-->

<template>
    <div
      v-if='ifState'
      :style='ModalableMixin_style'
      @click='clickBg'
      >

      <div :style='PositionableMixin_style'>
        <slot/>
      </div>

    </div>
</template>

<script>
import Modalable from '../mixin/Modalable';
import Positionable from '../mixin/Positionable';

export default {
  name: 'VSModalPosition',
  mixins: [
    Modalable ,
    Positionable ,
  ],
};
</script>
