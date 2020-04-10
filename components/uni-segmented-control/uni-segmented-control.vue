<template>
  <view
    :class="{ text: styleType === 'text' }"
    class="segmented-control"
  >
  <!-- :style="{ borderColor: styleType === 'text' ? '' : activeColor }" -->
    <view
      v-for="(item, index) in values"
      :class="[{ text: styleType === 'text' }, { active: index === currentIndex },{bold:bold}]"
      :key="index"
      :style="{
        color:
          index === currentIndex
            ? styleType === 'text'
              ? activeColor
              : '#FF5A1F'
            : styleType === 'text'
              ? '#666'
              : activeColor,
        backgroundColor: index === currentIndex && styleType === 'button' ? '' : ''
      }"
      class="segmented-control-item"
      @click="_onClick(index)"
    >
      {{ item }}
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
	bold: {
	  type: Boolean,
	  default: false
	},
    values: {
      type: Array,
      default () {
        return []
      }
    },
    activeColor: {
      type: String,
      default: '#007aff'
    },
    styleType: {
      type: String,
      default: 'button'
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
		// if(this.bold) {
		// 	if(index==1) {
		// 		uni.showToast({
		// 			title: "长工功能正在努力开发中，敬请期待..."
		// 		});
		// 	}
		// 	this.currentIndex=0
		// }else {
			if (this.currentIndex !== index) {
			  this.currentIndex = index
			  this.$emit('clickItem', index)
			}
		// }
    }
  }
}
</script>

<style lang="scss">
.segmented-control {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	font-size: 34upx;
	font-weight: bold;
	box-sizing: border-box;
	overflow: hidden;
	margin: 24upx 0;
	// border: 1px solid;
	// border-radius: 10upx;

	&.text {
		border: 0;
		border-radius: 0;
	}
}

.segmented-control-item {
	text-align: left;
	line-height: 60upx;
	box-sizing: border-box;
	margin-right: 24upx;
	font-size: 34upx;
	// border-left: 1px solid;
	&.bold {
		font-weight: 400;
	}
	&.active {
		color: #fff;
		font-size: 36upx;
		font-weight: bold;
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
</style>
