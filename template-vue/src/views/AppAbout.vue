<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useCommonStore } from '@/store'

const common = useCommonStore()
const { t } = useI18n()
</script>

<template>
  <div>About</div>
  <div> {{ t('hello.world') }}</div>
  <div>lang: {{ common.lang }}</div>
  <div>
    <button @click="common.setLang('zh-cn')">
      中文
    </button>
    <button @click="common.setLang('en-us')">
      English
    </button>
  </div>
</template>
