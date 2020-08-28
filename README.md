# @ouen/vue_modal

## Basic usage / Documentation

### Quickstart (Webpack, Vue-cli, Nuxt)

- import & register components
  ``` demo.vue
  <script>
  import {
    VModal as MRoot ,
    VModalBox as MBox ,
    VModalPosition as MPos ,
  } from 'vue-ouen-modal';

  export default {
    components: {
      MRoot ,
      MBox  ,
      MPos  ,
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
  </template>
  ```


- usage point
  - VModal component must be ***top level*** of other Modal Items.
  - VModal component is multi use OK.
  - If you need, other component can be in VModal component as vue slot.
  - VModal : Discribe a dark back ground and has method of close function.
  - VModalBox : Simple Box.
  - VModalPosition : Set position for your contents.


- example

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


- interface

  - VModal as MRoot
    - input : props
      - open : boolean : modalを開くか閉じるか
      - zIndex : Number : このmodalのz-indexを指定できる : default では指定されない
      - openIf : boolean : 開閉の際 true:v-if / false:v-show を使うか : default false
      - disabledClose : boolean : modal背景クリックでの閉じを無効化する : default false
      - bgColor : string : 背景色の設定 : cssのrgba()の文字列 : default rgba(0,0,0,0.5)
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
          bgColor='#0F0'
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
      - heigt : string : widthに同じ
      - bgColor : string : css で使う文字列 : 文字列'null'でstyle.backgroundColorを設定しない
    - input : slot
      - default
      - header
    - output : なし


## Advanced usage

- Positionable.js @mixin folder

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
