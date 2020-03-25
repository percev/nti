<template>
  <el-form
    :model="form"
    @submit.native.prevent="onSubmit"
    :rules="rules"
    ref="form"
    v-loading.fullscreen.lock="getAppState"
    class="search-form"
  >
    <el-form-item label="Строка поиска" prop="text" class="search-form__label">
      <el-input v-model="form.text" class="search-form__input"></el-input>
    </el-form-item>
    <Button
      type="primary"
      native-type="submit"
      :loading="loading"
      class="search-form__button"
    >
      Ищи
    </Button>
    <div v-if="result > 0 && !loading" class="search-form__result">
      {{ `Найдено ${ result } совпадения за ${searchTime} мс` }}
    </div>
    <div v-else-if="result === 0 && !loading" class="search-form__result">
      {{ 'Ничего не найдено' }}
    </div>
  </el-form>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Button from '@/components/elements/Button'

  export default {
      components: {
        Button
      },
      data() {
        return {
          form: {
            text: ''
          },
          result: null,
          rules: {
            text: [{ required: true, message: 'Введите строку поиска', trigger: 'blur' }]
          },
          loading: false,
          searchTime: 0
        }
      },
      computed: {
        ...mapGetters([
          'getAppState'
        ])
      },
      methods: {
        async onSubmit() {
          this.$refs.form.validate(async (valid) => {
            if (valid) {
              this.loading = true
              const startSearchTime = Date.now()
              const result = await this.$store.dispatch('findResults', this.form.text)
              if (result === null) {
                this.$message.error('Ошибка при выполнении запроса')
              } else {
                this.result = result
              }
              this.searchTime = Date.now() - startSearchTime
              console.log('text', this.form.text, 'res', result, 'time', this.searchTime)
              this.loading = false
            } else {
              return false
            }
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  .search-form {
    &__button {
      margin-top: 1rem;
    }
    &__result {
      margin-top: 1rem;
      color: #606266;
    }
  }
</style>
