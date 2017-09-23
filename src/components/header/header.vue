<template>
	<div class="header">
      <div class="content-warp">
        <div class="logo">
          <img width="64" height="64" :src="seller.avatar"/>
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟到达
          </div>
          <div v-if="seller.supports" class="support">
            <support-icon :size='"size1"' :category="classMap[seller.supports[0].type]"></support-icon>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
          <div class="support-warp" v-if="seller.supports" @click="showDetail">
            <span class="support-count">{{seller.supports.length}}个</span>
            <span class='icon-keyboard_arrow_right'></span>
          </div>
        </div>
      </div>
      <div class="boards" @click="showDetail">
        <span class="boards-img"></span><span class="boards-text">{{seller.bulletin}}</span>
        <span class='icon-keyboard_arrow_right'></span>
      </div>
      <div class="bg">
        <img :src="seller.avatar" width="100%" height="100%">
      </div>
      <transition name="fade" @before-enter="beforeEnter" @after-leave="afterLeave">
        <div class="detail" v-show="detailShowFlag" :class="addBlur">
          <div class="detail-warp clear">
            <div class="detail-content">
              <h1 class="name">{{seller.name}}</h1>
              <div class="star-warp">
                <star :size="48" :score="seller.score"></star>
              </div>
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul class="supports">
                <li v-for="(item, index) in seller.supports" class="board-item">
                  <support-icon :size='"size2"' :category="classMap[seller.supports[index].type]"></support-icon>
                  <span class="text">{{seller.supports[index].description}}</span>
                </li>
              </ul>
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="boards-show">
                <p class="text">{{seller.bulletin}}</p>
              </div>
            </div>
          </div>
          <div class="detail-close" @click='hiddenDetail'>
            <span class='icon-close'></span>
          </div>
        </div>
      </transition>  
	</div>
</template>

<script>
  import Star from '../star/star';
  import SupportIcon from '../icon/supportIcon';
  export default {
    data () {
      return {
        detailShowFlag: false,
        addBlur: ''
      };
    },
    methods: {
      showDetail () {
        this.detailShowFlag = true;
      },
      hiddenDetail () {
        this.detailShowFlag = false;
      },
      beforeEnter (el) {
        this.addBlur = 'addBlur';
      },
      afterLeave (el) {
        this.addBlur = '';
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    mounted () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      'star': Star,
      'support-icon': SupportIcon
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mini.styl'

  .header
    color: #fff
    position: relative
    background: rgba(7, 17, 27, 0.5)
    overflow: hidden
    .content-warp
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .logo
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        .title
          padding: 2px 0 8px 0
          .brand
            width: 30px
            height: 18px
            display: inline-block
            bg-image ('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
            vertical-align: top
          .name
            font-size: 16px
            line-height: 18px
            font-bold: bold
            margin-left: 6px
        .description
          line-height: 12px
          font-size: 12px
          margin-bottom: 10px

        .support
          .text
            line-height: 12px
            font-size: 10px

      .support-warp
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        text-align: center
        border-radius: 14px
        background: rgba(0, 0, 0, 0.2)
        .support-count
          vertical-align: top
          font-size: 10px
          line-height: 24px
        .icon-keyboard_arrow_right
          margin-left: 2px
          font-size: 10px
          line-height: 24px
    .boards
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      background: rgba(7, 17, 27, 0.2)
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      .boards-img
        display: inline-block
        width: 22px
        height: 12px
        bg-image ('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
        vertical-align: middle
      .boards-text
        font-size: 10px
        margin-left: 4px
      .icon-keyboard_arrow_right
        position: absolute
        top: 8px
        right: 12px
    .bg
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      img
        filter: blur(5px)
    
    .fade-enter-active,.fade-leave-active
      transition: 0.5s all ease
    .fade-enter, .fade-leave-to
      opacity: 0
    .fade-enter-to
      opacity: 1

    .detail
      position: fixed
      width: 100%
      height: 100%
      left: 0
      top: 0
      z-index: 100
      overflow: auto
      background: rgba(7, 17, 27, 0.8)
      &.addBlur
        backdrop-filter: blur(4px)
      .detail-warp
        min-height: 100%
        width: 100%
        .detail-content
          margin-top: 64px
          padding-bottom: 64px
          .name
            font-size: 16px
            line-height: 16px
            font-weight: 700
            text-align: center
          .star-warp
            padding: 16px 0 28px 0
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 0 auto 24px auto
            .line
              position: relative
              flex: 1
              top: -6px
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .text
              font-size: 14px
              padding: 0 12px
              font-weight: 700
          .supports
            width: 80%
            margin: 0 auto 28px auto
            .board-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .text
                margin-left: 6px
                font-size:12px
                line-height: 16px
          .boards-show
            width: 80%
            padding: 0 12px
            margin: 0 auto
            .text
              font-size: 12px
              line-height: 24px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0
        font-size: 32px
        clear: both
</style>