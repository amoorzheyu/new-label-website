<script setup>
import headerPart from '@/components/headerPart.vue'
import mainPart from '@/components/mainPart.vue';
import footerPart from '@/components/footerPart.vue';

// import editor from '@/assets/svgs/menuSvg/editor.svg';
import editor from "./assets/svgs/menuSvg/editor.svg";
</script>

<template>
  <div class="h-[100vh]  flex flex-col">
    <el-header>
      <headerPart></headerPart>
    </el-header>
    <el-main>
   <div class="">
    <!-- <editor class="text-[#b81616]"/> -->
     <img class="w-[30px] h-[30px] text-[#982020]" :src="editor" alt="" srcset="">
   </div>
      <mainPart></mainPart>
    </el-main>
    <el-footer>
      <footerPart></footerPart>
    </el-footer>
  </div>
</template>

<style scoped></style>
