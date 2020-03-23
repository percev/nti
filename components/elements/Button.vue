<template>
    <el-button v-bind="$attrs" class="button">
      <slot type=""default></slot>
    </el-button>
</template>

<script>
  export default {
      name: "Button"
  }
</script>

<style lang="scss" scoped>
  .button {
    border-radius: 0;
    background-color: gold;
    box-shadow: 1px 1px 1px lightgray;
    text-shadow: 1px 1px 1px lightgray;
    border: none;
    &:hover {
      box-shadow: 2px 2px 1px lightgray;
      text-shadow: 2px 2px 1px lightgray;
    }
  }
</style>
