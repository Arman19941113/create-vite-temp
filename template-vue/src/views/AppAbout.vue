<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useCommonStore } from '@/store'

const common = useCommonStore()
const { t } = useI18n()
</script>

<template>
  <div class="text-center">About</div>
  <div class="text-center">{{ t('hello.world') }}</div>
  <div class="text-center">lang: {{ common.lang }}</div>
  <div class="text-center">
    <button
      class="mr-4 rounded-md px-4 py-2 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50"
      @click="common.setLang('zh-cn')"
    >
      中文
    </button>
    <button
      class="rounded-md px-4 py-2 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50"
      @click="common.setLang('en-us')"
    >
      English
    </button>
  </div>
</template>
