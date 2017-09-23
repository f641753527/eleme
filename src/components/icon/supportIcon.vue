<template>
  <div class="icon-warp" :class="size">
    <span class="icon" :class="category"></span>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String
    },
    category: {
      type: String
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mini.styl'
  .icon-warp
    display: inline-block
    vertical-align: top
    &.size1
      width: 12px
      height: 12px
      margin-right: 4px
      .decrease
        bg-image ('decrease_1')
      .discount
        bg-image ('discount_1')
      .guarantee
        bg-image ('guarantee_1')
      .invoice
        bg-image ('invoice_1')
      .special
        bg-image ('special_1')
    &.size2
      width: 16px
      height: 16px
      margin-right: 6px
      .decrease
        bg-image ('decrease_2')
      .discount
        bg-image ('discount_2')
      .guarantee
        bg-image ('guarantee_2')
      .invoice
        bg-image ('invoice_2')
      .special
        bg-image ('special_2')
    &.size3
      width: 12px
      height: 12px
      margin-right: 2px
      .decrease
        bg-image ('decrease_3')
      .discount
        bg-image ('discount_3')
      .guarantee
        bg-image ('guarantee_3')
      .invoice
        bg-image ('invoice_3')
      .special
        bg-image ('special_3')
    &.size4
      width: 16px
      height: 16px
      margin-right: 2px
      .decrease
        bg-image ('decrease_4')
      .discount
        bg-image ('discount_4')
      .guarantee
        bg-image ('guarantee_4')
      .invoice
        bg-image ('invoice_4')
      .special
        bg-image ('special_4')
    .icon
      display: inline-block
      width: 100%
      height: 100%
      background-repeat: no-repeat
      background-size: 100% 100%
</style>