<!--
  コンポーネントの機能
    - modal内で位置を指定する役割
    - Positionableの位置指定機能をMixinしている
    - このコンポーネントにアイテムをネストできる

  interface : mixin positionable の interface
    - input : props
      - zIndex : Number : このmodalのz-indexを指定できる : default では指定されない
      - fixed : Boolean : true:fixed/false:absolute で style.position を変更できる : default absolute
      - xPos : String : left/center/right で align を指定できる
      - yPos : String : top/center/bottom で align を指定できる
      - x : String : css で使える文字列 で x 方向の位置調整用 : マイナスを使える : 単位pxなどが必要
      - y : String : css で使える文字列 で y 方向の位置調整用 : マイナスを使える : 単位pxなどが必要
    - output : なし
-->

<template>
  <div :style='PositionableMixin_style'>
    <slot/>
  </div>
</template>

<script>
import Positionable from './mixin/Positionable';

export default {
  name: 'VModalPosition',
  mixins: [
    Positionable ,
  ],
};
</script>
