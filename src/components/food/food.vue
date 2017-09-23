<template>
  <transition name='food'>
    <div class="food" v-show="foodShowFlag" ref='foodwrapper'>
      <div class="food-content">
        <div class="close" @click='hidden'>
          <span class='icon-arrow_lift'></span>
        </div>
        <div class="image-header">
          <img :src="currentFood.image">
        </div>
        <div class="content">
          <div class="title">{{currentFood.name}}</div>
          <div class="detail">
            <span class="sell-count">月售{{currentFood.sellCount}}份</span>
            <span class="rating">好评率{{currentFood.rating}}%</span>
          </div>
          <div class="price">
            <span class="dollor">￥</span>
            <span class="curPrice">{{currentFood.price}}</span>
            <span class="oldPrice" v-show='currentFood.oldPrice'>￥{{currentFood.oldPrice}}</span>
          </div>
          <div class="cartcontrolwrapper">
            <cartcontrol :food="currentFood"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="addFirst" @click="addFirst" v-show="!currentFood.count || currentFood.count === 0">
              加入购物车
            </div>
          </transition>
        </div>
        <split v-show="currentFood.info"></split>
        <div class="info" v-show="currentFood.info">
          <h1 class="title">商品介绍</h1>
          <p class="text">{{currentFood.info}}</p>
        </div>
        <split></split>
        <div class="rating-select-wrapper">
          <h1 class="title">商品评价</h1>
          <ratingselect :selectType='selectType' :contentOnly='contentOnly' :content="currentFood.ratings" :desc='desc'></ratingselect>
        </div>
        <div class="rating-wrapper">
          <p class="no-rating" v-show="!currentFood.ratings || !currentFood.ratings.length">暂无评价</p>
          <ul class="ratings" v-show="currentFood.ratings && currentFood.ratings.length">
            <li class="rating-item border-1px" v-for="rating in selectedRatings">
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <p class="rating-text">
                <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>
                <span class="text">{{rating.text}}</span>
              </p>
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img :src="rating.avatar" class="photo" width="12" height="12">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol';
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect';
import {dateFormate} from '../../common/js/date';
export default {
  data () {
    return {
      foodShowFlag: false,
      selectType: 2,
      contentOnly: false,
      desc: {
        all: '全部',
        positive: '满意',
        negative: '不满意'
      }
    };
  },
  props: {
    currentFood: {
      type: Object
    }
  },
  methods: {
    showCurDetail () {
      this.foodShowFlag = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodwrapper, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hidden () {
      this.foodShowFlag = false;
    },
    addFirst (ev) {
      this.$root.eventHub.$emit('cartToCart', ev.target);
      Vue.set(this.currentFood, 'count', 1);
    }
  },
  components: {
    'cartcontrol': cartcontrol,
    'split': split,
    'ratingselect': ratingselect
  },
  filters: {
    formatDate (dateStr) {
      let date = new Date(dateStr);
      return dateFormate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  computed: {
    selectedRatings () {
      if (this.selectType === 2) {
        if (this.contentOnly) {
          return this.currentFood.ratings.filter(function (rating) {
            return rating.text;
          });
        }
        return this.currentFood.ratings;
      }
      if (this.selectType === 1) {
        if (this.contentOnly) {
          return this.currentFood.ratings.filter(function (rating) {
            return (rating.rateType === 1) && rating.text;
          });
        }
        return this.currentFood.ratings.filter(function (rating) {
          return rating.rateType === 1;
        });
      }
      if (this.selectType === 0) {
        if (this.contentOnly) {
          return this.currentFood.ratings.filter(function (rating) {
            return (rating.rateType === 0) && rating.text;
          });
        }
        return this.currentFood.ratings.filter(function (rating) {
          return rating.rateType === 0;
        });
      }
    }
  },
  mounted () {
    this.$root.eventHub.$on('selectChange', function (type) {
      this.selectType = type;
    }.bind(this));
    this.$root.eventHub.$on('contentOnlyFlagChange', function (flag) {
      this.contentOnly = flag;
    }.bind(this));
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@import "../../common/stylus/mini.styl"
.food-enter-active, .food-leave-active
  transition: all .5s
.food-enter-to, .food-leave
  transform: translate3d(0, 0, 0)
.food-enter, .food-leave-to
  transform: translate3d(100%, 0, 0)
.food
  position: fixed
  width: 100%
  left: 0
  top: 0
  bottom: 48px
  z-index: 30
  background: #fff
  overflow: hidden
  .food-content
    position: relative
    .close
      position: absolute
      left: 0
      top: 10px
      z-index: 31
      .icon-arrow_lift
        font-size: 14px
        padding: 10px
        color: rgba(255, 255, 255, 0.5)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-bottom: 100%
      img
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
    .content
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        line-height: 14px
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          line-height: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-size: 0
        line-height: 24px
        .dollor
          font-size: 10px
          color: rgb(240, 20, 20)
        .curPrice
          font-size: 14px
          font-weight: 700
          color: rgb(240, 20, 20)
          margin-right: 8px
        .oldPrice
          font-size: 10px
          font-weight: 700
          color: rgb(147, 153, 159)
          text-decoration: line-through
      .cartcontrolwrapper
        position: absolute
        right: 12px
        bottom: 12px
      .addFirst
        position: absolute
        right: 18px
        bottom: 18px
        padding: 0 12px
        height: 24px
        line-height: 24px
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
      .fade-enter-active, .fade-leave-active
        transition: all 0.5s
        opacity: 0
      .fade-enter-to, .fade-leave
        opacity: 1
    .info
      padding: 18px
      .title
        margin-bottom: 6px
        font-size: 14px
        line-height: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .text
        padding: 0 8px
        font-size: 12px
        line-height: 24px
        font-weight: 200
        color: rgb(77, 85, 93)
    .rating-select-wrapper
      padding-top: 18px
      .title
        margin-left: 18px
        font-size: 14px
        line-height: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        position: relative
        padding: 16px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .user
          position: absolute
          right: 0
          top: 16px
          font-size: 0
          line-height: 12px
          .name
            vertical-align: top
            margin-right: 6px
            font-size: 10px
            line-height: 12px
            color: rgb(147, 153, 159)
          .photo
            border-radius: 50%
        .time
          margin-bottom: 6px
          font-size: 10px
          line-height: 12px
          color: rgb(147, 153, 159)
        .rating-text
          font-size: 0
          .text
            display: inline-block
            vertical-align: top
            font-size: 12px
            line-height: 16px
            color: rgb(71 17, 27)
          .icon-thumb_up, .icon-thumb_down
            margin-right: 4px
            font-size: 12px
            line-height: 16px
          .icon-thumb_down
            color: rgb(147, 153, 159)
          .icon-thumb_up
            color: rgb(0, 160, 220)
      .no-rating
        padding: 16px 0
        font-size: 12px
        color: rgb(147, 153, 159)
</style>