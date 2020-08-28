/**
  ミックスインの機能
    - このコンポーネントに位置指定機能をもたせる

  使い方
    - mixinしたあとに
    - コンポーネントのルートエレメントのstyle要素に PositionableMixin_style を設定する
          <div :style='PositionableMixin_style'>
    - 親コンポーネントでpropsを指定する

  interface
    - input : props
      - zIndex : Number : このmodalのz-indexを指定できる : default では指定されない
      - fixed : Boolean : true:fixed/false:absolute で style.position を変更できる : default absolute
      - xPos : String : left/center/right で align を指定できる
      - yPos : String : top/center/bottom で align を指定できる
      - x : String : css で使える文字列 で x 方向の位置調整用 : マイナスを使える : 単位pxなどが必要
      - y : String : css で使える文字列 で y 方向の位置調整用 : マイナスを使える : 単位pxなどが必要
    - output : なし
*/

export default {
  props: {
    zIndex : Number ,
    fixed : Boolean ,
    xPos : {
      // nullable
      type : String ,
      default : 'center' ,
      validator : (val) => ['left', 'center', 'right'].includes(val) ,
    },
    yPos : {
      // nullable
      type : String ,
      default : 'center' ,
      validator : (val) => ['top', 'center', 'bottom'].includes(val) ,
    },
    x : String ,
    y : String ,
  },
  data() {
    return {
      PositionableMixin_width : '0px' ,
      PositionableMixin_height: '0px' ,
    };
  },
  computed: {
    PositionableMixin_style() {
      const obj = {
        display : 'inline-block' ,
        position: this.fixed ? 'fixed' : 'absolute' ,
      };

      if (this.zIndex) {
        obj.zIndex = this.zIndex ;
      }

      // set vertical positon
      if (this.yPos==='top') {
        obj.top = this.y || '0' ;
      } else if (this.yPos==='bottom') {
        obj.bottom = this.y || '0' ;
      } else if (this.yPos==='center') {
        obj.top = `calc( (100vh - ${this.PositionableMixin_height}) / 2 + ${this.y||'0px'} )`
      }

      // set horizontal position
      if (this.xPos==='left') {
        obj.left = this.x || '0' ;
      } else if (this.xPos==='right') {
        obj.right = this.x || '0' ;
      } else if (this.xPos==='center') {
        obj.left = `calc( (100vw - ${this.PositionableMixin_width}) / 2 + ${this.x||'0px'} )`
      }

      return obj ;
    },
  },
  beforeUpdate() {
    this.PositionableMixin_setSize();
  },
  methods: {
    PositionableMixin_setSize() {
      this.PositionableMixin_width  = this.$el.clientWidth  + 'px' ;
      this.PositionableMixin_height = this.$el.clientHeight + 'px' ;
    },
  },
};
