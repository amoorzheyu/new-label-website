<script setup>
import headerPart from '@/components/headerPart.vue'
import mainPart from '@/components/mainPart.vue';
import footerPart from '@/components/footerPart.vue';
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
  </div>
</template>

<style scoped>
</style>
