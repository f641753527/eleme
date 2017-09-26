<template>
	<div class="goods">
		<div class="menu-warp" ref='menuWrapper'>
          <ul class="menu-item-warp">
            <li class="menu-item menu-item-hook" v-for="(item, index) in goods" :class='{"active": index === curMenuItem}' 
            @click="locate(index, $event)">
              <p class='text border-1px'><support-icon v-if="item.type>0" :size="'size3'" :category='classMap[item.type]'></support-icon>{{item.name}}</p>
            </li>
          </ul>
		</div>
		<div class="goods-warp" ref='goodsWrapper'>
      <ul class="goods-sort">
        <li class="goods-item goods-item-hook" v-for="good in goods">
          <h1 class="goods-name">{{good.name}}</h1>
          <ul class="foods">
            <li class="food-item border-1px" v-for="food in good.foods" @click='detailOfCurFood(food, $event)'>
              <div class="icon">
                <img width="100%" height="100%"" :src="food.icon">
              </div>
              <div class="food-detail">
                <h2 class="food-name">{{food.name}}</h2>
                <p class="food-description">{{food.description}}</p>
                <p class="sell-detail">
                  <span class="month-sell">月售{{food.sellCount}}份</span>
                  <span class="food-rating">好评率{{food.rating}}%</span>
                </p>
                <p class="food-price">
                  <span class="dollar">￥</span>
                  <span class="price">{{food.price}}</span>
                  <span v-show="food.oldPrice !=''" class="oldPrice">￥{{food.oldPrice}}</span>
                </p>
                <div class="cart-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </div>
            </li> 
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :deliveryFee="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods" ref='cartcontrol'></shopcart>
    <food :currentFood='currentFood' ref='food'></food>
	</div>
</template>

<script>
import SupportIcon from '../icon/supportIcon';
import Cart from '../cart/showcart.vue';
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol';
import food from '../food/food';
export default {
  data () {
    return {
      goods: [],
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      heightList: [],
      scrollY: 0,
      curMenuItem: 0,
      currentFood: {}
    };
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
        probeType: 3,
        click: true
      });

      this.goodsScroll.on('scroll', function (pos) {
        this.scrollY = Math.abs(Math.round(pos.y));
      }.bind(this));
    },
    _calculateHeight () {
      let goodsItems = this.$refs.goodsWrapper.getElementsByClassName('goods-item-hook');
      let height = 0;
      this.heightList.push(height);
      for (let i = 0; i < goodsItems.length; i++) {
        height += goodsItems[i].clientHeight;
        this.heightList.push(height);
      }
    },
    locate (index, ev) {
      if (ev._constructed) {
        let goodsItems = this.$refs.goodsWrapper.getElementsByClassName('goods-item-hook');
        this.goodsScroll.scrollToElement(goodsItems[index], 500);
      }
    },
    sendLocation (target) {
      this.$refs.cartcontrol.drop(target);
    },
    detailOfCurFood (food, ev) {
      if (!ev._constructed) {
        return;
      }
      this.currentFood = food;
      this.$refs.food.showCurDetail();
    }
  },
  computed: {
    selectFoods () {
      let selected = [];
      this.goods.forEach(function (good) {
        good.foods.forEach(function (food) {
          if (food.count) {
            selected.push(food);
          }
        });
      });
      return selected;
    }
  },
  watch: {
    scrollY () {
      for (let i = 0; i < this.heightList.length - 1; i++) {
        let height1 = this.heightList[i];
        let height2 = this.heightList[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this.curMenuItem = i;
        }
      }
      let menuItems = this.$refs.menuWrapper.getElementsByClassName('menu-item-hook');
      this.menuScroll.scrollToElement(menuItems[this.curMenuItem], 200);
    }
  },
  components: {
    'support-icon': SupportIcon,
    'shopcart': Cart,
    'cart-control': cartcontrol,
    'food': food
  },
  mounted () {
    this.$http.jsonp('http://f641753527.3vzhuji.net/eleme/api/goods.js', {
      params: {}, jsonpCallback: 'pj_supprot_goods'
    }).then(function (res) {
      this.goods = res.body.data;
      this.$nextTick(function () {
        this._initScroll();
        this._calculateHeight();
      }.bind(this));
    });
  },
  created () {
    this.$root.eventHub.$on('cartToCart', function (target) {
      this.sendLocation(target);
    }.bind(this));
  }
};
</script>

<style lang="stylus" rel = "stylesheet/stylus" scoped>
@import "../../common/stylus/mini.styl"
.goods
  position: absolute
  width: 100%
  display: flex
  left: 0
  top: 174px
  bottom: 58px
  overflow: hidden
  .menu-warp
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    .menu-item-warp
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        &.active
          background: white
          z-index: 10
          .text
            border-1px-none()
            font-weight: 700
        .text
          display: table-cell
          vertical-align: middle
          height: 100%
          font-size: 12px
          line-height: 14px
          color: rgb(24, 20, 20)
          border-1px(rgba(7, 17, 27, 0.1))
  .goods-warp
    flex-grow: 1
    .goods-name
      padding-left: 14px
      font-size: 12px
      line-height: 26px
      color: rgb(147, 153, 159)
      border-left: 2px solid #d9dde1
      background: #f3f5f7
    .food-item
      display: flex
      margin: 18px
      border-1px(rgba(7, 17, 27, 0.1))
      padding-bottom: 18px
      &:last-child
        margin-bottom: 0
        border-1px-none()
      .icon
        width: 57px
        height: 57px
        flex: 0 0 57px
      .food-detail
        flex: 1 1 auto
        margin-left: 10px
        .food-name
          font-size: 14px
          line-height: 14px
          color: rgb(7, 17, 27)
          margin: 2px 0 8px 0
        .food-description
          font-size: 10px
          line-height: 12px
          color: rgb(147, 153, 159)
          margin-bottom: 8px
        .sell-detail
          font-size: 0
          line-height: 10px
          color: rgb(147, 153, 159)
          .month-sell
            font-size: 10px
            margin-right: 12px
          .food-rating
            font-size: 10px
        .food-price
          font-size: 0
          line-height: 24px
          .dollar
            font-size: 10px
            color: rgb(240, 20, 20)
          .price
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .oldPrice
            font-size: 10px
            color: rgb(147, 153, 159)
            font-weight: 700
            margin-left: 8px
            text-decoration: line-through
        .cart-wrapper
          position: absolute
          right: 0
          bottom: 12px
</style>