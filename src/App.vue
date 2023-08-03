<template>
  <div>123</div>
</template>
<script>
import { postApi } from '@/api/index'
import mixiIndex from '@/mixins/index'
export default {
  name: 'App',
  mixins: [mixiIndex],
  data () {
    return {
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      postApi(this.API.login, {
        pageNo: 1,
        pageSize: 10,
        projectCode: 'product'
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
