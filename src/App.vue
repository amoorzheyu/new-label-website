<script setup>
import { onBeforeMount,onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import headerPart from '@/components/headerPart.vue'
import mainPart from '@/components/mainPart.vue';
import footerPart from '@/components/footerPart.vue';

import settings from '@/components/dialogParts/settings.vue'

// pinia->useThemeSwapStore
import { useThemeSwapStore } from '@/stores/themeSwap'
const { initTheme } = useThemeSwapStore()

//pinia->useBackgroundImageStore
import { useBackgroundImageStore } from '@/stores/backgroundImage'
let {currentImageUrl,currentImageDom} = storeToRefs(useBackgroundImageStore())
const { initBackgroundImage } = useBackgroundImageStore()

//生命周期渲染之前
onBeforeMount(() => {
  initTheme()
  
})

//生命周期渲染之后
onMounted(() => {
  initBackgroundImage()
})


</script>

<template>
  <div ref="currentImageDom" class="h-[100vh]  flex flex-col bg-cover bg-center text-[#fff] bg-[url('@/assets/backgroundImages/bg-2.png')]">
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
