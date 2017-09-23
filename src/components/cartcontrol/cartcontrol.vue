<template>
  <div class="cartcontrol">
    <transition name="cart">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="cartDecrease"></div>
    </transition>
    <transition name="count">
      <div class="count" v-show="food.count>0">{{food.count}}</div>
    </transition>
    
    <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (ev) {
      if (!ev._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      this.$root.eventHub.$emit('cartToCart', ev.target);
    },
    cartDecrease (ev) {
      if (!ev._constructed) {
        return;
      }
      this.food.count--;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.cartcontrol
  font-size: 0
  .cart-decrease, .cart-add
    display: inline-block
    vertical-align: top
    padding: 6px
    font-size: 24px
    line-height: 24px
    color: rgb(0, 160, 220)
  .count
    display: inline-block
    vertical-align: top
    padding: 6px 0
    width: 24px
    text-align: center
    font-size: 10px
    line-height: 24px
    color: rgb(147, 153, 159)
  
  .cart-enter-active, .cart-leave-active, .count-enter-active, .count-leave-active
    transition: all .5s linear

  .count-enter, .count-leave-to, .cart-enter, .cart-leave-to
    opacity: 0
  .cart-leave-to, .cart-enter
    transform: translate3D(36px, 0, 0) rotate(180deg)
</style>