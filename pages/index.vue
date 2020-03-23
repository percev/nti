<template>
  <div class="container">
    <el-card class="container__card">
      <Form/>
    </el-card>
  </div>
</template>

<script>
  import Form from '@/components/Form'

  export default {
    components: {
      Form
    },
    fetch ({ store }) {
      store.dispatch('setStorage')
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    &__card {
      width: 400px;
    }
  }
</style>
