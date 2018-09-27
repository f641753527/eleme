<template>
  <div id="app">
    <e-header :seller='seller'></e-header>
    
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to='./goods'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='./ratings'>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to='./seller'>商家</router-link>
      </div>
    </div>  
    <keep-alive>
      <router-view class="content" :seller='seller'></router-view>
    </keep-alive>

  </div>
</template>

<script>
import Vue from 'vue';
import header from '@/components/header/header';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default {
  components: {
    'e-header': header
  },
  data () {
    return {
      seller: {}
    };
  },
  mounted () {
    this.$http.post('/api/seller', {
      params: {}, jsonpCallback: 'pj_support_seller_info'
    }).then(function (response) {
      this.seller = response.body.data;
    });
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
   @import "./common/stylus/mini.styl"

  .tab
    width: 100%
    height: 40px
    line-height: 40px
    display: flex
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
