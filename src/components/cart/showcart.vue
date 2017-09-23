<template>
  <div>
    <div class="showcart">
      <div class="content">
        <div class="cart-left">
          <div class="logo-wrapper" @click="fold = !fold">
            <div class="logo" :class="{'highlight': foodCount>0}">
              <span class="logo-cart icon-shopping_cart" :class="{'highlight': foodCount>0}"></span>
            </div>
            <div class="num" v-show="foodCount>0">{{foodCount}}</div>
          </div>
          <div class="price" :class="{'highlight': totalPrice>0}">￥{{totalPrice}}</div>
          <div class="delivery_fee">另需配送费{{deliveryFee}}元</div>
        </div>
        <div class="cart-right">
          <div class="pay" :class="{'highlight': totalPrice >= minPrice}">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-wrapper">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-show="ball.status">
            <div class="inner" ref="inner"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name='list'>
      <div class="cart-list" v-show="cartListShowFlag">
        <div class="header">
          <span class='title clear'>购物车</span>
          <span class='removeAll clear' @click='removeAll'>清空</span>
        </div>
        <div class="list-content" ref='listContent'>
          <ul>
            <li class="list-food" v-for="food in selectFoods">
              <h3 class="food-name">{{food.name}}</h3>
              <div class="price-wrapper">￥<span class="price">{{food.price * food.count}}</span></div>
              <div class="cart-control-wrapper">
                <cart-control :food="food"></cart-control>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name='bg'>
      <div class="bg" v-show='cartListShowFlag' @click='changeFold'></div>
    </transition>
	</div>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol';
import BScroll from 'better-scroll';
export default{
  data () {
    return {
      ball: {
        status: false
      },
      fold: true
    };
  },
  methods: {
    drop (target) {
      if (!this.ball.status) {
        this.ball.status = true;
        this.ball.el = target;
      }
    },
    beforeEnter (el) {
      let inner = this.$refs.inner;
      if (this.ball.status) {
        let x = this.ball.el.getBoundingClientRect().left - 32;
        let y = window.innerHeight - this.ball.el.getBoundingClientRect().top - 22 - 16 - 12;
        el.style.transform = `translate3d(${x}px, 0, 0)`;
        inner.style.transform = `translate3d(0, -${y}px, 0)`;
      }
    },
    enter (el) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;
      let inner = this.$refs.inner;
      this.$nextTick(function () {
        el.style.transform = 'translate3d(0, 0, 0)';
        inner.style.transform = `translate3d(0, 0, 0)`;
      });
    },
    afterEnter (el) {
      if (this.ball.status) {
        this.ball.status = false;
        el.style.display = 'none';
      }
    },
    _initScroll () {
      this.listContent = new BScroll(this.$refs.listContent, {
        click: true
      });
    },
    removeAll () {
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
      this.fold = true;
    },
    changeFold () {
      this.fold = true;
    }
  },
  props: {
    deliveryFee: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default () {
        return [
          {
            price: 10,
            count: 0
          }
        ];
      }
    }
  },
  computed: {
    totalPrice () {
      let total = 0;
      this.selectFoods.forEach(function (food) {
        total += food.price * food.count;
      });
      if (total === 0) {
        this.fold = true;
      }
      return total;
    },
    foodCount () {
      let total = 0;
      this.selectFoods.forEach(function (food) {
        total += food.count;
      });
      return total;
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `${this.minPrice}起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差${diff}元起送`;
      } else {
        return `去结算`;
      }
    },
    cartListShowFlag () {
      if (this.fold) {
        return;
      }
      this.$nextTick(function () {
        if (!this.listContent) {
          this._initScroll();
        } else {
          this.listContent.refresh();
        }
      }.bind(this));
      return !(this.fold || !this.totalPrice);
    }
  },
  components: {
    'cart-control': cartcontrol
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mini.styl"
.showcart
  position: fixed
  bottom: 0
  left: 0
  width: 100%
  height: 48px
  z-index: 50
  background: #131d26
  .content
    display: flex
    font-size: 0
    color: rgba(255, 255, 255, 0.4)
    .cart-left
      flex: 1
      .logo-wrapper
        position: relative
        display: inline-block
        vertical-align: top
        width: 56px
        height: 56px
        top: -10px
        margin: 0 12px
        padding: 6px
        box-sizing: border-box
        border-radius:50%
        background: #131d26
        .logo
          width: 100%
          height: 100%
          border-radius:50%
          text-align: center
          background: #2b343c
          &.highlight
            background: #00a0dc
          .logo-cart
            font-size: 24px
            line-height: 44px
            &.highlight
              color: rgb(255, 255, 255)
        .num
          position: absolute
          right: 0
          top: 0
          width: 24px
          height: 16px
          line-height: 16px
          border-radius: 16px
          text-align: center
          font-size: 9px
          font-weight: 700
          color: rgb(255, 255, 255)
          background: rgb(240, 20, 20)
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        display: inline-block
        vertical-align: top
        margin: 12px 0 12px 0
        font-size: 16px
        line-height: 24px
        font-weight: 700
        padding-right: 12px
        box-sizing: border-box
        border-right: 1px solid rgba(255, 255, 255, 0.4)
        &.highlight
          color: #fff
      .delivery_fee
        display: inline-block
        margin: 12px 0 12px 12px
        font-size: 10px
        line-height: 24px
    .cart-right
      flex: 0 0 105px
      width: 105px
      .pay
        background: #2b343b
        font-size: 12px
        font-weight: 700
        text-align: center
        line-height: 48px
        &.highlight
          color: #fff
          background: #00b43c
  .ball-wrapper
    .ball
      position: fixed
      left: 32px
      bottom: 22px
      transition: transform .5s
      .inner
        width: 16px
        height: 16px
        background: rgb(0, 160, 220)
        border-radius: 50%
        transition: all .5s cubic-bezier(.49, -0.29, .75, .41)
.cart-list
  position: fixed
  bottom: 48px
  left: 0
  z-index: 45
  width: 100%
  .header
    height: 40px
    line-height: 40px
    padding: 0 18px
    border-bottom: 2px solid rgba(7, 17, 27, 0.1)
    background: #f3f5f7
    .title
      float: left
      font-size: 14
      font-weight: 200
      color: rgb(7, 17, 27)
    .removeAll
      float: right
      font-size: 12px
      color: rgb(0, 160, 220)  
  .list-content
    padding: 0 18px
    max-height: 240px
    overflow: hidden
    background: #fff
    .list-food
      display: flex
      padding: 6px 0
      font-size: 14px
      height: 36px
      line-height: 36px
      border-1px(rgba(7, 17, 27, 0.1))
      .food-name
        flex: 1 1 auto
      .price-wrapper
        flex: 0 0 24px
        width: 24px
        font-size: 10px
        color: rgb(240, 20, 20)
        .price
          font-size: 14px
          font-weight: 700
      .cart-control-wrapper
        flex: 0 0 96px
        width: 96px
        margin-left: 12px
.list-enter-active, .list-leave-active
  transition: all 0.5s linear
.list-enter-to, .list-leave
  transform: translate3d(0, 0, 0)
.list-enter, .list-leave-to
  transform: translate3d(0, 100%, 0)
.bg
  position: fixed
  left: 0
  top: 0
  width: 100%
  height: 100%
  z-index: 40
  background: rgba(7, 17, 27, 0.6)
  backdrop-filter: blur(10px)
.bg-leave-active, .bg-enter-active
  transition: all 0.5s
.bg-enter, .bg-leave-to
  opacity: 0
.bg-enter-to
  opacity: 1
</style>