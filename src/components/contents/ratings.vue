<template>
  <div class="ratings" ref='ratings'>
    <div class="rating-wrapper">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <h3 class="title">综合评分</h3>
          <span class="rank">高于周边{{seller.rankRate}}%的商家</span>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">食品评分</span>
            <star class='star' :size='36' :score='seller.foodScore'></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star class='star' :size='36' :score='seller.serviceScore'></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="deliverr-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :content='ratings' :selectType='copySelectType' :contentOnly='copyContentOnlyFlag'></ratingselect>
      <div class="rating-content">
        <ul>
          <li class="rating-item border-1px" v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)">
            <div class="rating-left">
              <img :src="rating.avatar" class="icon" width='28' height='28'>
            </div>
            <div class="rating-right">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star class='star' :size='24' :score='rating.score'></star>
                <span class="deleveryTime" v-show='rating.deliveryTime'>{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommand-wrapper" v-show='rating.recommend && rating.recommend.length'>
                <span class="icon-thumb_up"></span>
                <span class="recommand-item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <p class="time">{{rating.rateTime | formatDate}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star';
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect';
import {dateFormate} from '../../common/js/date';
import BScroll from 'better-scroll';
const ERR_OK = 0;
const ALL = 2;
export default {
  data () {
    return {
      ratings: [],
      copySelectType: ALL,
      copyContentOnlyFlag: false
    };
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    needShow (type, text) {
      if (this.copySelectType === ALL) {
        return this.copyContentOnlyFlag ? text : true;
      }
      return this.copyContentOnlyFlag ? (text && this.copySelectType === type) : this.copySelectType === type;
    }
  },
  components: {
    'star': star,
    'split': split,
    'ratingselect': ratingselect
  },
  mounted () {
    this.$http.get('https://github.com/f641753527/eleme-online-visit/tree/master/api/ratings.json').then(function (res) {
      let result = res.body;
      if (result.errno === ERR_OK) {
        this.ratings = result.data;
        this.$nextTick(function () {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        });
      }
    });
    this.$root.eventHub.$on('selectChange', function (type) {
      this.copySelectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }.bind(this));
    this.$root.eventHub.$on('contentOnlyFlagChange', function (flag) {
      this.copyContentOnlyFlag = flag;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }.bind(this));
  },
  filters: {
    formatDate (dateStr) {
      let date = new Date(dateStr);
      return dateFormate(date, 'yyyy-MM-dd hh:mm');
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mini.styl"
  .ratings
    position: absolute
    left: 0
    top: 174px
    bottom: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        width: 137px
        padding: 6px 0
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          font-size: 24px
          line-height: 28px
          color: rgb(255, 153, 0)
          margin-bottom: 6px
        .title
          font-size: 12px
          line-height: 12px
          color: rgb(7, 17, 27)
          margin-bottom: 8px
        .rank
          font-size: 10px
          line-height: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1 1 auto
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            vertical-align: top
            font-size: 12px
            line-height: 18px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            vertical-align: top
            padding:  0 12px
          .score
            display: inline-block
            vertical-align: top
            font-size: 12px
            line-height: 18px
            color: rgb(255, 153, 0)
        .deliverr-wrapper
          font-size: 0
          .title
            font-size: 12px
            line-height: 18px
            color: rgb(7, 17, 27)
          .time
             padding-left: 12px
             font-size: 12px
             line-height: 18px
             color: rgb(147, 153, 159)
    .rating-content
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .rating-left
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          .icon
            border-radius: 50%
        .rating-right
          position: relative
          flex: 1 1 auto
          .name
            font-size: 10px
            line-height: 12px
            color: rgb(7, 17, 27)
            margin-bottom: 4px
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              vertical-align: top
              margin-right: 6px
            .deleveryTime
              display: inline-block
              vertical-align: top
              font-size: 10px
              line-height: 12px
              font-weight: 200
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            font-size: 12px
            line-height: 18px
            color: rgb(7, 17, 27)
          .recommand-wrapper
            font-size: 0
            .icon-thumb_up, .recommand-item
              display: inline-block
              vertical-align: top
              line-height: 16px
              margin: 0 8px 4px 0
            .icon-thumb_up
              font-size: 12px
              color: rgb(0, 160, 220)
            .recommand-item
              padding: 0 6px
              font-size: 9px
              color: rgb(147, 153, 159)
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 2px
              background: rgb(255, 255, 255)
          .time
            position: absolute
            top: 0
            right: 0
            font-size: 10px
            line-height: 12px
            color: rgb(147, 153, 159)
            font-weight: 200
</style>