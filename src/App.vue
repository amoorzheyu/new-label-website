<script setup>
import { onBeforeMount, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import headerPart from '@/components/headerPart.vue'
import mainPart from '@/components/mainPart.vue';
import footerPart from '@/components/footerPart.vue';

import menuPart from '@/components/mainParts/menuPart.vue'

import settings from '@/components/dialogParts/settings.vue'

// pinia->useThemeSwapStore
import { useThemeSwapStore } from '@/stores/themeSwap'
const { initTheme } = useThemeSwapStore()

//pinia->useBackgroundImageStore
import { useBackgroundImageStore } from '@/stores/backgroundImage'
let { currentImageUrl, currentImageDom, isShowManualMockBackground, manualMockBackgroundDom } = storeToRefs(useBackgroundImageStore())
const { initBackgroundImage } = useBackgroundImageStore()

// pinia->useMenuLayoutStore
import { useMenuLayoutStore } from '@/stores/menuLayout'
let { menuDom } = storeToRefs(useMenuLayoutStore())
let { menuClickSlove } = useMenuLayoutStore()


//右键点击事件
const menuClickEvent = (e) => {
  e.preventDefault()
  menuClickSlove(e)
}

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
  <div>
    <div ref="currentImageDom" @contextmenu="menuClickEvent"
      class="h-[100vh]  flex flex-col bg-cover bg-center text-[#fff] transition-all"
      style="transition: background-size 0.5s linear, background-image 0.5s;">
      <div v-show="isShowManualMockBackground" ref="manualMockBackgroundDom" class="h-[100vh] w-[100vw] z-0 fixed"
        style="transition: transform 0.3s linear;">
        <el-image :src="currentImageUrl" fit="cover" class="w-[100%] h-[100%] "></el-image>
      </div>
      <div>
        <headerPart></headerPart>
      </div>
      <div>
        <mainPart></mainPart>
      </div>
      <div>
        <footerPart></footerPart>
      </div>
    </div>
    <div>
      <div>
        <settings></settings>
      </div>
      <div ref="menuDom" class=" absolute z-[100] top-[50%] left-[50%] translate-x-[-50%]">
        <menuPart></menuPart>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
