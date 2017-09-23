<template>
  <div class="ratingselect">
    <div class="dsec border-1px">
      <span class="block positive" :class="{'active': copySelectType === 2}" @click="select(2)">
      	{{desc.all}}
      	<span class='count'>{{content.length}}</span>
      </span>
      <span class='block positive' :class="{'active': copySelectType === 0}" @click="select(0)">
      	{{desc.positive}}
      	<span class='count'>{{contentPositive.length}}</span>
      </span>
      <span class="block negative" :class="{'active': copySelectType === 1}" @click="select(1)">
      	{{desc.negative}}
      	<span class='count'>{{contentNegative.length}}</span>
      </span>
    </div>
    <div class="switch" :class="{'on': copyContentOnly === true}">
      <span class="icon-check_circle" @click="contentOnlyFlag()"></span>
      <span class="content-only">只看有内容的评价</span>
    </div>
  </div>
</template>
 
<script>
const ALL = 2;
const POSITIVE = 0;
const NEGATIVE = 1;
export default {
  props: {
    content: {
      type: Array,
      default () {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        };
      }
    },
    contentOnly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      copySelectType: this.selectType,
      copyContentOnly: this.contentOnly
    };
  },
  methods: {
    select (type) {
      this.copySelectType = type;
      this.$root.eventHub.$emit('selectChange', this.copySelectType);
    },
    contentOnlyFlag () {
      this.copyContentOnly = !this.copyContentOnly;
      this.$root.eventHub.$emit('contentOnlyFlagChange', this.copyContentOnly);
    }
  },
  computed: {
    contentPositive () {
      return this.content.filter(function (rating) {
        return rating.rateType === POSITIVE;
      });
    },
    contentNegative () {
      return this.content.filter(function (rating) {
        return rating.rateType === NEGATIVE;
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mini.styl"
.ratingselect
  .dsec
    padding: 18px 0
    margin: 0 18px
    font-size: 0
    border-1px(rgba(7, 17, 27, 0.1))
    .block
      dispaly: inline-block
      padding: 8px 12px
      font-size: 12px
      color: rgb(77, 85, 93)
      line-height: 16px
      margin-right: 8px
      border-radius: 2px
      &.active
        color: #fff
      &.positive
        background: rgba(0, 160, 220, 0.2)
        &.active
          background: rgb(0, 160, 220)
      &.negative
        background: rgba(77, 85, 93, 0.2)
        &.active
          background: rgb(77, 85, 93)
      .count
        font-size: 8px
        margin-left: 2px
  .switch
    padding: 12px 18px
    font-size: 0
    color: rgb(147, 153, 159)
    line-height: 24px
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    &.on
      .icon-check_circle
        color: #00c850
    .icon-check_circle
      display: inline-block
      vertical-align: top
      font-size: 24px
      margin-right: 4px
    .content-only
      display: inline-block
      vertical-align: top
      font-size: 12px
</style>