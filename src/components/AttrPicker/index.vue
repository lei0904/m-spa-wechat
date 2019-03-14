<template>
  <div>
    <mt-popup ref="popup"
              pop-transition="popup-fade"
              position="bottom"
              class="cui-attr-picker"
              v-model="visible"
              :modal="popupVisible"
    >
      <mt-picker ref="picker"
              :slots="attrSlots"
                  @change="onAttrChange"
                  :value-key="valueKey" :visible-item-count="5" show-toolbar>
        <span class="cui-attr-picker-action cui-attr-picker-cancel"
                  @click.stop="close">{{ cancelText }}</span>
        <span class="cui-attr-picker-action cui-attr-picker-confirm"
              @click.stop="confirm">{{ confirmText }}</span>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<style>
  .cui-attr-picker {
    width: 100%;
  }
  .cui-attr-picker .picker-slot-wrapper,
  .cui-attr-picker .picker-item {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .cui-attr-picker .picker-toolbar {
    border-bottom: solid 1px #eaeaea;
  }
  .cui-attr-picker-action {
    display: inline-block;
    width: 50%;
    text-align: center;
    line-height: 40px;
    font-size: 16px; /*no*/
    color: #26a2ff;
  }
  .cui-attr-picker-cancel {
    float: left;
  }
  .cui-attr-picker-confirm {
    float: right;
  }
</style>
<script>
  import Vue from 'vue'
  import Mint from 'mint-ui'
  import 'mint-ui/lib/style.css'
  Vue.use(Mint);
  export  default {
    name: 'cui-attr-picker',
    props: {
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      listArr:{
        type:Array
      },
      popupVisible:{
          type:Boolean,
          default:true
      }
    },
    data: function() {
        let _tempValue=[];
        if(this.listArr>0){
            _tempValue =this.listArr
        }else{
            _tempValue=[
                {"name":'暂无数据',"code":'-'}
            ];
        }
      return {
        visible: false,
        attrSlots: [{
          flex: 1,
          values:_tempValue
        }],
        valueKey: 'name',
        attr:"",
        attrCode:""
      };
    },
    watch:{
        listArr (v) {
            this.listArr = v;
            this.$set(this.attrSlots, 0, {
                flex: 1,
                values: this.listArr,
                defaultIndex: 0,
                className: 'slot1'
            })
        },
        popupVisible(v){
            console.log('v--------',v)
        }
    },
    methods: {
      onAttrChange: function (picker, value) {
        this.attr = value[0].name;
        this.attrCode = value[0].code || value[0].id;
      },
      confirm: function(e) {
        this.close();
        this.visible = false;
        this.$emit('confirm', this.attr,this.attrCode);
      },

      open: function(e) {
          this.visible = true;
          this.$refs['popup'].currentValue = true;
      },

      close: function() {
        this.visible = false;
        this.$refs['popup'].currentValue = false;
        console.log('------close',this.visible)
      }
    }
  }
</script>
