<template>
  <div class="slider-check-box">
    <div class="slider-check" :class="rangeStatus ? 'success' : ''">
      <div class="dragBg" ref="dragBg"></div>
      <Icon :class="iconClasses()" :type="rangeStatus ? successIcon : startIcon" size="18" @mousedown="rangeMove" />
      <span :style="{color: innerHTMLColor}">{{ innerHTML }}</span>
    </div>
  </div>
</template>
<script>
import { postApi } from '@/api'
import mixiIndex from '@/mixins/index'
export default {
  mixins: [mixiIndex],
  name: 'sliderCheck',
  props: {
    // 开始的图标
    startIcon: {
      type: String,
      default: 'ios-arrow-forward'
    },
    // 成功图标
    successIcon: {
      type: String,
      default: 'ios-checkmark-circle'
    },
    // 失败之后的函数
    errorFun: {
      type: Function
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      disX: 0,
      rangeStatus: false,
      // 方块中文字自的颜色
      innerHTMLColor: '#575a61',
      // 方块中的文字
      innerHTML: '请拖住滑块，拖动到最右边',
      vfCode: ''
    }
  },
  watch: {
    isDisabled: {
      handler (val) {},
      immediate: true
    }
  },
  computed: {
    iconClasses () {
      return () => {
        const arr = []
        this.rangeStatus ? arr.push('dragBtn', 'dragBtnRight') : arr.push('dragBtn')
        if (this.isDisabled) arr.push('icon_disabled')
        return arr
      }
    }
  },
  methods: {
    getCode (ele) {
      postApi(this.API.umc_getVfcode, {}).then(res => {
        if (res) {
          this.vfCode = process.env.NODE_ENV === 'development' ? '1111' : res.vfCode
          this.rangeStatus = true
          this.innerHTMLColor = '#0C9957'
          this.innerHTML = '验证成功'
        } else {
          this.rangeStatus = false
          this.disX = 0
          ele.style.transition = '.5s all'
          ele.style.transform = 'translateX(' + this.disX + 'px)'
          this.innerHTMLColor = '#e41181'
          this.innerHTML = '验证失败'
        }
        this.$refs.dragBg.style.width = 0 + 'px'
      })
    },
    // 滑块移动
    rangeMove (e) {
      this.$refs.dragBg.style.transition = ''
      const ele = e.target
      const startX = e.clientX
      const eleWidth = ele.offsetWidth
      const parentWidth = ele.parentElement.offsetWidth
      const MaxX = parentWidth - eleWidth
      if (this.rangeStatus) {
        // 不运行
        return false
      }
      // 移动中
      document.onmousemove = e => {
        if (this.isDisabled) return
        const endX = e.clientX
        this.disX = endX - startX
        if (this.disX <= 0) {
          this.disX = 0
        }
        if (this.disX >= MaxX - eleWidth) {
          // 减去滑块的宽度,体验效果更好
          this.disX = MaxX
        }
        ele.style.transition = '.1s all'
        ele.style.transform = 'translateX(' + this.disX + 'px)'
        this.$refs.dragBg.style.width = this.disX + 40 + 'px'
        e.preventDefault()
      }
      // 鼠标抬起
      document.onmouseup = () => {
        if (this.disX !== MaxX) {
          ele.style.transition = '.5s all'
          ele.style.transform = 'translateX(0)'
          this.$refs.dragBg.style.transition = 'width 0.5s'
          this.$refs.dragBg.style.width = 0 + 'px'
        } else {
          // 执行成功的函数
          this.getCode(ele)
        }
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    // 重置滑块
    restbtn () {
      this.rangeStatus = false
      this.disX = 0
      document.getElementsByClassName('.dragBtn')[0].style.transition = '.5s all'
      document.getElementsByClassName('.dragBtn')[0].style.transform = 'translateX(0px)'
      this.innerHTMLColor = '#e41181'
      this.innerHTML = '验证失败'
      this.$refs.dragBg.style.width = 0 + 'px'
    }
  }
}
</script>
<style lang="less" scoped>
  .icon_disabled {
    cursor: not-allowed !important;
  }
  .slider-check-box {
    margin-bottom: 24px;
    .slider-check {
      background-color: #e9e9e9;
      position: relative;
      transition: 1s all;
      user-select: none;
      color: #585858;
      height: 40px;
      border-radius: 4px;
      text-align: center;
      line-height: 40px;
      .dragBg {
        width: 0px;
        left: 0;
        height: 100%;
        position: absolute;
        background-color: #edfff3;
      }
      &.success {
        background-color: #edfff3;
        color: #fff;
        i {
          color: #1cbe6b;
        }
      }
      .dragBtn {
        position: absolute;
        top: 3px;
        left: 4px;
        right: 4px;
        width: 34px;
        height: 34px;
        color: #cccccc;
        background-color: #fff;
        cursor: pointer;
        font-size: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
      }
      .dragBtnRight {
        left: -6px;
      }
    }
  }
</style>
