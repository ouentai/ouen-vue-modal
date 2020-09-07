<template>
  <div class='demo-wrap'>

    <div class="test-box">
      nomal contents
    </div>
    <button type="button" @click='open1=true'>modal</button>
    <button type="button" @click='clicked("clicked nomal contents")'>nomal contents</button>
    <input type="text" v-model='boxStyle.width'>
    <input type="text" v-model='boxStyle.height'>


    <VModal
      :open='open1'
      @close='close'
      >
      <VMBox
        size='md'
        :width='boxStyle.width'
        :height='boxStyle.height'
        bgColor='#fff'
        borderRadius='100px'
        >
        <template v-slot:header>
          header hoge hoge
        </template>
        <div>
          akaokjfaojfo
          <button type="button" name="button" @click='open2=true'>modal 2</button>
        </div>
      </VMBox>
      <VMPos
        yPos='top'
        >
        hoge fuga
      </VMPos>
    </VModal>

    <VModal
      :open.sync='open2'
      >
      <VMBox
        xPos='center'
        >
        box
      </VMBox>
    </VModal>

  </div>
</template>

<script>
import {
  VModal         as VModal ,
  VModalBox      as VMBox  ,
  VModalPosition as VMPos  ,
} from './index';

export default {
  name: 'Demo',
  components: {
    VModal ,
    VMBox  ,
    VMPos  ,
  },
  props: {},
  data () {
    return {
      open1 : false ,
      open2 : false ,
      boxStyle : {
        width : '100px' ,
        height: '100px' ,
        backgroundColor: 'yellow' ,
      },
    };
  },
  computed: {},
  methods: {
    clicked(tag, e) {
      console.log(tag,e);
      if (tag==='modal1-content') {
        this.open2=true;
      }
    },
    close() {
      this.open1 = false ;
    },
  },
};
</script>

<style>
html ,
body {
  height: 100%;
}

.demo-wrap {
  width: 50%;
  height: 150%;
  background-color: darkGreen;
}

.test-box {
  width: 50%;
  height: 50%;
  background-color: green;
}
</style>
