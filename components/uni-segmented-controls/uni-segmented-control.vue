<template>
  <view
    :class="{ text: styleType === 'text' }"
    class="segmented-control"
  >
  <!-- :style="{ borderColor: styleType === 'text' ? '' : activeColor }" -->
    <view
      v-for="(item, index) in values"
      :class="[{ text: styleType === 'text' }, { active: index === currentIndex },{color: color}]"
      :key="index"
      :style="{
        color:
          index === currentIndex
            ? styleType === 'text'
              ? activeColor
              : '#fff'
            : styleType === 'text'
              ? '#666'
              : activeColor,
        backgroundColor: index === currentIndex && styleType === 'button' ? '' : ''
      }"
      class="segmented-control-item"
      @click="_onClick(index)"
    >
      {{ item }}
	  <view :class="{ active1: index == currentIndex}" v-if="index==1&&father>0" style="background: #FF2727;width: 16upx;height: 16upx;border-radius: 50%;position: absolute;top: 12upx;left: 90upx;z-index: 1;"></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'UniSegmentedControl',
  props: {
    current: {
      type: Number,
      default: 0
    },
    values: {
      type: Array,
      default () {
        return []
      }
    },
	color: {
		type: Boolean,
		default: false
	},
    activeColor: {
      type: String,
      default: '#007aff'
    },
    styleType: {
      type: String,
      default: 'button'
    },
	father: {
		type: Number,
		default:0
	}
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  watch: {
    current (val) {
      if (val !== this.currentIndex) {
        this.currentIndex = val
      }
    }
  },
  created () {
    this.currentIndex = this.current
  },
  methods: {
    _onClick (index) {
      if (this.currentIndex !== index) {
        this.currentIndex = index
        this.$emit('clickItem', index)
      }
    }
  }
}
</script>

<style lang="scss">
.segmented-control {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	font-size: 30upx;
	box-sizing: border-box;
	overflow: hidden;
	margin: 24upx 0 14upx;
	// border: 1px solid;
	// border-radius: 10upx;

	&.text {
		border: 0;
		border-radius: 0;
	}
}
.active1 {
	// position: absolute;top: 4upx !important;left: 104upx !important;z-index: 1;
}
.segmented-control-item {
	text-align: left;
	line-height: 60upx;
	box-sizing: border-box;
	// margin-right: 24upx;
	opacity:0.6;
	position: relative;
	font-size:30upx;
	padding-bottom: 0upx;
	// border-left: 1px solid;

	&.active {
		color: #fff;
		opacity:1;
		font-weight: bold;
		border-bottom: 4upx solid #fff;
	}

	&.text {
		border-left: 0;
		color: #000;

		&.active {
			border-bottom-style: solid;
			font-size: 32upx;
		}
	}

	&:first-child {
		border-left-width: 0;
	}
}
.color {
	opacity:1;
	&.active {
		color: #FF5A1F !important;
		font-weight: bold;
		border-bottom: 4upx solid #FF5A1F;
	}
}
</style>
