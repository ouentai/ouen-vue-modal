# @ouen/vue-ouen-modal

## Basic usage / Documentation

### Install
- npm
  `npm install https://github.com/ouentai/vue-ouen-modal`

### Quickstart (Webpack, Vue-cli, Nuxt)

- import & register components
  ``` demo.vue
  <script>
  import {
    VModal as MRoot ,
    VModalBox as MBox ,
    VModalPosition as MPos ,
    VSimpleModalBox as SBox ,
    VSimpleModalPosition as SPos ,
  } from 'vue-ouen-modal';

  export default {
    components: {
      MRoot ,
      MBox  ,
      MPos  ,
      SBox  ,
      SPos  ,
    },
  };
  <script>
  ```


- use components in template
  ``` demo.vue
  <template>
    <MRoot
      :open='open1' // boolean
      @close='close' // example : close() {this.open1=false}
      >
      <MPos
        xPos='left' // string : default center
        yPos='botton' // string : default center
        >
        any content
      </MPos>
      <MBox
        :xPos='right'
        :x='-10px'
        >
        any content
      </MBox>
    </MRoot>

    <MRoot
      :open.sync='open2' // boolean : .sync => unneccesary @close event
      > // multi use OK
      <MBox
        :xPos='right'
        hideHeader
        >
        <button @click='open2=false'></button>
      </MBox>

    </MRoot>

    <SBox
      open
      overflowY='scroll'
      maxHeight='90vh'
      >
      any content
    </SBox>

    <SPos
      open
      overflowY='scroll'
      maxHeight='90vh'
      >
      any content
    </SPos>
  </template>
  ```


### usage point
  - VModal component must be ***top level*** of other Modal Items.
  - VModal component is multi use OK.
  - If you need, other component can be in VModal component as vue slot.
  - VModal : Discribe a dark back ground and has method of close function.
  - VModalBox : Simple Box.
  - VModalPosition : Set position for your contents.
  - Simple series components are expected to be used alone, they don't need VModal component as their parent.


- example

  - always open modal with v-if or vue-router
    ``` demo.vue
    <template>
      <MRoot open v-if='bool'>
        any content
      </MRoot>
    </template>
    ```

  - only modal box
    ``` demo.vue
    <template>
      <MRoot :open.sync='bool'>
        <MBox xPos='right' x='10px'>
          any content
        </MBox>
      </MRoot>
    </template>
    ```

  - use your contents
    ``` demo.vue
    <template>
      <MRoot :open.sync='bool'>
        <MPos yPos='top' y='100px' x='-30%'>
          any your content
        </MPos>

        <MPos yPos='top' y='200px' x='30%'>
          any your content
        </MPos>
      </MRoot>
    </template>
    ```

  - multi modal
    ``` demo.vue
    <template>
      <MRoot :open.sync='bool1'>
        <MPos yPos='top' y='100px' x='-30%'>
          any your content
          <button @click='bool2=true'>modal2 open</button>
        </MPos>
      </MRoot>

      <MRoot :open.sync='bool2'>
        <MBox xPos='right' x='10px'>
          any content
        </MBox>
      </MRoot>
    </template>
    ```


### interface

  - VModal as MRoot
    - input : props
      - open : boolean : modalを開くか閉じるか
      - zIndex : Number : このmodalのz-indexを指定できる : default では指定されない
      - openIf : boolean : 開閉の際 true:v-if / false:v-show を使うか : default false
      - disabledClose : boolean : modal背景クリックでの閉じを無効化する : default false
      - modalBgColor : string : 背景色の設定 : cssのrgba()の文字列 : default rgba(0,0,0,0.5)
    - output
      - emit : update:open : false : modalのcloseイベント
      - emit : close : void : modalのcloseイベント
    - example
      ``` demo.vue
      <template>
        <MRoot
          :open='bool'
          @close='bool=false'
          :zIndex='3'
          openIf
          disabledClose
          modalBgColor='#0F0'
          >
        </MRoot>
      </template>
      ```

  - VModalPosition as MPos
    - input : props
      - zIndex : Number : このmodalのz-indexを指定できる : default では指定されない
      - fixed : Boolean : true:fixed/false:absolute で style.position を変更できる : default absolute
      - xPos : String : left/center/right で align を指定できる
      - yPos : String : top/center/bottom で align を指定できる
      - x : String : css で使える文字列 で x 方向の位置調整用 : マイナスを使える : 単位pxなどが必要
      - y : String : css で使える文字列 で y 方向の位置調整用 : マイナスを使える : 単位pxなどが必要
    - output : なし
    - example
      ``` demo.vue
      <template>
        <MPos
          :zIndex='5'
          fixed
          xPos='right'
          x='20px'
          yPos='top'
          y='10%'
          >
        </MPos>
      </template>
      ```

  - VModalBox
    - VModalPositon にあるinterface全部使える
    - input : props
      - hideHeader : boolean : デフォルトのヘッダーを非表示にする
      - size : string : ['sm', 'md', 'lg', 'xl', 'auto']のどれか
      - width : string : css で使う文字列 : 無効文字列を入れるとstyle.widthを設定しない
      - minWidth : string : widthに同じ
      - maxWidth : string : widthに同じ
      - heigt : string : widthに同じ
      - minHeight : string : widthに同じ
      - maxHeight : string : widthに同じ
      - bgColor : string : css で使う文字列 : 文字列'null'でstyle.backgroundColorを設定しない
      - padding : string : widthに同じ
      - overflowX : string : widthに同じ
      - overflowY : string : widthに同じ
    - input : slot
      - default
      - header
    - output : なし
  - VSimpleModalBox : VModal + VModalBox
    - ModalableMixin と VModalBox を参照 : 両方のものを使用できる
    - props.modalBgColor : modal自体の背景色
    - props.bgColor : boxの背景色
  - VSimpleModalPosition : VModal + VModalPosition
    - ModalableMixin と PositionableMixin を参照 : 両方のものを使用できる

## Advanced usage

### Modalable.js @mixin folder

  - This
    - is mixin object to add modal function to your components.
    - needs a ***top lebel*** block element (like div) to add modal function of your component. See below expamle.

  - example
    ``` .javascript
    import mixinName from 'vue-ouen-modal/mixin/Positionable' ;

    export default {
      name: 'yourComponent',
      mixins: [
        mixinName ,
      ],
      ~~~~
    };
    ```
    ```
    <template>
        <div
          v-if='ifState'
          :style='ModalableMixin_style'
          @click='clickBg'
          >

          <slot/> <!-- any your contents -->

        </div>
    </template>
    ```


### Positionable.js @mixin folder

  - This
    - is mixin object to add position setting function to your component.

  - example
    ``` .javascript
    import mixinName from 'vue-ouen-modal/mixin/Positionable' ;

    export default {
      name: 'yourComponent',
      mixins: [
        mixinName ,
      ],
      ~~~~
    };
    ```
