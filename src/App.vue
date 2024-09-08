<script setup>
import { onBeforeMount, onMounted } from "vue";
import { storeToRefs } from "pinia";
import headerPart from "@/components/headerPart.vue";
import mainPart from "@/components/mainPart.vue";
import footerPart from "@/components/footerPart.vue";
import menuPart from "@/components/mainParts/menuPart.vue";
import settings from "@/components/dialogParts/settings.vue";
import navigationManagement from "@/components/dialogParts/navigationManagement.vue";
import navigationDetails from "@/components/dialogParts/navigationDetails.vue";
import dialogIcon from "@/components/iconComponents/dialogIcon.vue";

// pinia->useThemeSwapStore
import { useThemeSwapStore } from "@/stores/themeSwap";
const { initTheme } = useThemeSwapStore();

//pinia->useBackgroundImageStore
import { useBackgroundImageStore } from "@/stores/backgroundImage";

let {
  currentImageUrl,//当前背景图片URL
  currentImageDom,//当前背景图片所在Dom
  isShowManualMockBackground,//是否显示模板背景图片
  manualMockBackgroundDom,//模板背景图片所在Dom
} = storeToRefs(useBackgroundImageStore());

const { initBackgroundImage } = useBackgroundImageStore();

// pinia->useMenuLayoutStore
import { useMenuLayoutStore } from "@/stores/menuLayout";
let { menuDom } = storeToRefs(useMenuLayoutStore());
let { menuClickSlove } = useMenuLayoutStore();


//pinia->useIsFirstStore
import { useIsFirstStore } from "@/stores/isFirst";
let { isFirst } = storeToRefs(useIsFirstStore())
//右键点击事件
const menuClickEvent = (e) => {
  e.preventDefault();
  menuClickSlove(e);
};

//生命周期渲染之前
onBeforeMount(() => {
  initTheme();
});

//生命周期渲染之后
onMounted(() => {
  initBackgroundImage();
  if (isFirst.value) {
    welcomeAndTip();
  }

});

import { ElNotification } from 'element-plus'

const welcomeAndTip = () => {
  ElNotification({
    title: '桑桑新标签',
    duration: 60000,
    dangerouslyUseHTMLString: true,
    icon: dialogIcon,
    message: `欢迎来到桑桑新标签网站，这是一个简洁干净的导航管理网站,在设置中可以配置我们所需的界面布局,可作为您的浏览器新标签页。我们所有的导航及导航分类都可进行<span style="color:#628cd9 ;font-weight: bold;">可视化拖拽管理</span>并且可以使用<span style="color:#628cd9 ;font-weight: bold;">鼠标右键</span>唤出对应的应用菜单进行各种便捷操作。`,
  })
  isFirst.value = false;
}

</script>

<template>
  <div>
    <div @contextmenu="menuClickEvent" ref="currentImageDom"
      class="h-[100vh] flex flex-col bg-cover bg-center text-[#fff] transition-all"
      style="transition: background-size 0.5s linear, background-image 0.5s">
      <div v-show="isShowManualMockBackground" ref="manualMockBackgroundDom" class="h-[100vh] w-[100vw] z-0 fixed"
        style="transition: transform 0.3s linear">
        <el-image :src="currentImageUrl" fit="cover" class="w-[100%] h-[100%]"></el-image>
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
      <div>
        <navigationManagement></navigationManagement>
      </div>
      <div>
        <navigationDetails></navigationDetails>
      </div>
      <div ref="menuDom" class="absolute top-0 transition-opacity ease-in-out duration-500 z-[-1]">
        <menuPart></menuPart>
      </div>
    </div>
  </div>
</template>

<style>
.el-notification__icon {
  @apply scale-[1.5];
}

.el-notification__title {
  @apply !text-[20px] font-sans !font-normal;
}

.el-notification {
  @apply !p-[25px] !w-[450px];
}

.el-notification__content {
  @apply !mt-[20px] w-[340px] !text-[17px] tracking-[2px] !leading-[30px];
}

.el-notification__closeBtn {
  @apply scale-[1.4] !text-[#666666];
}

.el-notification__group {
  @apply !ml-[30px];
}
</style>
