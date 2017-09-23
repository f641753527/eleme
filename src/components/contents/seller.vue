<template>
  <div class="seller" ref='seller'>
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size='36' :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="pricing">
          <li class="block">
            <h2>起送价</h2>
            <p class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </p>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <p class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </p>
          </li>
          <li class="block">
            <h2>平均送达时间</h2>
            <p class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </p>
          </li>
        </ul>
        <div class="favorite">
          <span class="icon-favorite" :class='{"active": favoriteFlag}' @click="toggleFavorite"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="ads">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">
            {{seller.bulletin}}
          </p>
        </div>
        <ul class="supports">
          <li v-for="(item, index) in seller.supports" class="board-item border-1px">
            <support-icon :size='"size4"' :category="classMap[seller.supports[index].type]"></support-icon>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pics-wrapper" ref='picsWrapper'>
          <ul class="pics-list" ref='picsList'>
            <li class="pic" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import star from '../star/star';
import split from '../split/split';
import supportIcon from '../icon/supportIcon';
import {saveFavorite, fetchFavorite} from '../../common/js/util';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      favoriteFlag: (() => {
        return fetchFavorite('favorite');
      })()
    };
  },
  computed: {
    favoriteText () {
      return this.favoriteFlag ? '已收藏' : '收藏';
    }
  },
  methods: {
    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    _initPics () {
      if (this.seller.pics) {
        let WIDTH = 120;
        let MARGIN = 6;
        let LENGTH = (WIDTH + MARGIN) * this.seller.pics.length - MARGIN;
        this.$refs.picsList.style.width = LENGTH + 'px';
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picsWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          } else {
            this.picScroll.refresh();
          }
        });
      }
    },
    toggleFavorite () {
      this.favoriteFlag = !this.favoriteFlag;
      saveFavorite('favorite', this.favoriteFlag);
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  mounted () {
    this._initScroll();
    this._initPics();
  },
  components: {
    star,
    split,
    'support-icon': supportIcon
  },
  watch: {
    seller: {
      handler () {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mini.styl";
  .seller
    position: absolute
    left: 0
    top: 174px
    bottom: 0
    width: 100%
    overflow: hidden
    .overview
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        font-size: 14px
        line-height: 14px
        color: rgb(7, 17, 27)
      .desc
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0
        .star
          display: inline-block
          vertical-align: top
          margin-right: 8px
        .text
          display: inline-block
          vertical-align: top
          margin-right: 12px
          line-height: 18px
          font-size: 10px
          color: rgb(77, 85, 93)
      .pricing
        display: flex
        padding-top: 18px
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border: none
          h2
            margin-bottom: 4px
            font-size: 10px
            line-height: 10px
            color: rgb(147, 153 ,159)
          .content
            font-size: 10px
            font-weight: 200
            line-height: 24px
            color: rgb(7, 17, 27)
            .stress
              font-size: 24px
      .favorite
        position: absolute
        right: 18px
        top: 18px
        width: 40px
        text-align: center
        .icon-favorite
          display: block
          margin-bottom: 4px
          font-size: 24px
          line-height: 24px
          color: #d4d6d9
          &.active
            color: rgb(240, 20, 20)
        .text
          font-size: 10px
          line-height: 10px
          color: rgb(77, 85, 93)
    .ads
      padding: 18px 18px 0 18px
      .title
        margin-bottom: 8px
        font-size: 14px
        line-height: 14px
        color: rgb(7, 17, 27)
      .content-wrapper
        padding: 0 12px 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .content
          font-size: 12px
          line-height: 24px
          font-weight: 200
          color: rgb(240, 20, 20)
      .board-item
        padding: 16px 12px
        border-1px: rgba(7, 17, 27,0.1)
        &:last-child
          border-1px-none()
        .text
          display: inline-block
          vertical-align: top
          font-size: 12px
          line-height: 16px
          font-weight: 200
          color: rgb(7, 17, 27)
    .pics
      padding: 18px 0 18px 18px
      .title
        margin-bottom: 12px
        font-size: 14px
        line-height: 14px
        color: rgb(7, 17, 27)
      .pics-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        .pics-list
          font-size: 0
          .pic
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &: last-child
              margin: 0
    .info
      padding: 18px 18px 0 18px
      color: rgb(7, 17, 27)
      .title
        font-size: 14px
        line-height: 14px
        padding-bottom: 12px
        border-1px(rgba(7, 17, 27, 0.1))
      .info-item
        padding: 16px 12px
        font-size: 12px
        line-height: 16px
        font-weight: 200
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-1px-none()
</style>