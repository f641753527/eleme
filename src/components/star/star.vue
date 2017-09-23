<template>
  <div :class="starType" class="star">
    <span v-for="item in items" :class='item' class='item'></span>
  </div>
</template>

<script>
  const LEN = 5;
  const STAR_ON = 'on';
  const STAR_HALF = 'half';
  const STAR_OFF = 'off';
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star' + this.size;
      },
      items () {
        let status = [];
        let starOnNum = Math.floor(this.score);
        let hasHalfStar = Math.floor(this.score * 2) / 2 % 1 !== 0;
        for (let i = 0; i < starOnNum; i++) {
          status.push(STAR_ON);
        }
        if (hasHalfStar) {
          status.push(STAR_HALF);
        }
        while (status.length < LEN) {
          status.push(STAR_OFF);
        }
        return status;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mini.styl'

  .star
    font-size: 0
    .item
      display: inline-block
      background-repeat: no-repeat
    &.star48
      .item
        width: 20px
        height: 20px
        margin-left: 22px
        background-size: 20px 20px
        &:first-child
          margin-left: 0
        &.on
          bg-image('star48_on')
        &.off
          bg-image('star48_off')
        &.half
          bg-image('star48_half')
    &.star36
      .item
        width: 15px
        height: 15px
        margin-left: 6px
        background-size: 15px 15px
        &:first-child
          margin-left: 0
        &.on
          bg-image('star36_on')
        &.off
          bg-image('star36_off')
        &.half
          bg-image('star36_half')
    &.star24
      .item
        width: 10px
        height: 10px
        margin-left: 3px
        background-size: 10px 10px
        &:first-child
          margin-left: 0
        &.on
          bg-image('star24_on')
        &.off
          bg-image('star24_off')
        &.half
          bg-image('star24_half')
</style>