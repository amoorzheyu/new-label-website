<script setup>
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import headerPart from '@/components/headerPart.vue'
import mainPart from '@/components/mainPart.vue';
import footerPart from '@/components/footerPart.vue';

import settings from '@/components/dialogParts/settings.vue'

// pinia->useThemeSwapStore
import { useThemeSwapStore } from '@/stores/themeSwap'
const { initTheme } = useThemeSwapStore()


//生命周期渲染之前
onBeforeMount(() => {
  initTheme()
})

</script>

<template>
  <div class="h-[100vh]  flex flex-col bg-[url('@/assets/backgroundImages/bg-1.png')] bg-cover bg-center text-[#fff] ">
    <div>
      <headerPart></headerPart>
    </div>
    <div>
      <mainPart></mainPart>
    </div>
    <div>
      <footerPart></footerPart>
    </div>
    <div>
      <settings></settings>
    </div>
  </div>
</template>

<style scoped></style>
