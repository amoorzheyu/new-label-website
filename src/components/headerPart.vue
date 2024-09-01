<script setup>
import { storeToRefs } from 'pinia';

// pinia->useThemeSwapStore
import { useThemeSwapStore } from '@/stores/themeSwap'
let { nowThemeIndex } = storeToRefs(useThemeSwapStore())
const { changeTheme } = useThemeSwapStore()

// pinia->useIsShowDialogsStore
import { useIsShowDialogsStore } from '@/stores/isShowDialogs'
let { isShowSettingDialog,isShowNavigationManagementDialog } = storeToRefs(useIsShowDialogsStore())

// pinia-> useLayoutElementStore
import { useLayoutElementStore } from '@/stores/layoutElement'
let { isShowTopMenu } = storeToRefs(useLayoutElementStore())

//切换主题事件
const swapThemeEvent = () => {
  changeTheme(nowThemeIndex.value)
}

</script>
<template>
  <div class=" relative z-40">
    <div v-show="!isShowTopMenu" class="h-[58px]"></div>
    <div class="flex justify-end mr-2 mt-2" v-show="isShowTopMenu">
      <div class="button-class" @click="isShowNavigationManagementDialog=true">
        <svg class="svg-class" data-v-81d5a9b4="" viewBox="0 0 24 24" width="1em" height="1em">
          <path fill="none" stroke="currentColor" stroke-width="1.5"
            d="M3 7.4V3.6a.6.6 0 0 1 .6-.6h5.8a.6.6 0 0 1 .6.6v3.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6Zm11 13v-3.8a.6.6 0 0 1 .6-.6h5.8a.6.6 0 0 1 .6.6v3.8a.6.6 0 0 1-.6.6h-5.8a.6.6 0 0 1-.6-.6Zm0-8V3.6a.6.6 0 0 1 .6-.6h5.8a.6.6 0 0 1 .6.6v8.8a.6.6 0 0 1-.6.6h-5.8a.6.6 0 0 1-.6-.6Zm-11 8v-8.8a.6.6 0 0 1 .6-.6h5.8a.6.6 0 0 1 .6.6v8.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6Z">
          </path>
        </svg>
      </div>
      <div class="button-class" @click="swapThemeEvent">
        <svg v-show="nowThemeIndex == 0" class="svg-class" data-v-81d5a9b4="" viewBox="0 0 24 24" width="1em"
          height="1em">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12m10-6h1M12 2V1m0 22v-1m8-2l-1-1m1-15l-1 1M4 20l1-1M4 4l1 1m-4 7h1">
          </path>
        </svg>
        <svg v-show="nowThemeIndex == 1" class="svg-class" data-v-81d5a9b4="" viewBox="0 0 24 24" width="1em"
          height="1em" style="">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M3 11.507a9.493 9.493 0 0 0 18 4.219c-8.507 0-12.726-4.22-12.726-12.726A9.494 9.494 0 0 0 3 11.507">
          </path>
        </svg>
      </div>
      <div class="button-class" @click="isShowSettingDialog = true">
        <svg class="svg-class" data-v-81d5a9b4="" viewBox="0 0 24 24" width="1em" height="1em">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
            <path d="M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6"></path>
            <path
              d="m19.622 10.395l-1.097-2.65L20 6l-2-2l-1.735 1.483l-2.707-1.113L12.935 2h-1.954l-.632 2.401l-2.645 1.115L6 4L4 6l1.453 1.789l-1.08 2.657L2 11v2l2.401.656L5.516 16.3L4 18l2 2l1.791-1.46l2.606 1.072L11 22h2l.604-2.387l2.651-1.098C16.697 18.832 18 20 18 20l2-2l-1.484-1.75l1.098-2.652l2.386-.62V11z">
            </path>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>
<style scoped>
.button-class {
  @apply w-[50px] h-[50px] rounded-full text-[var(--ground-glass-icon-color)] flex justify-center items-center bg-[var(--ground-glass-background-color)] mx-[4px] backdrop-blur;
  @apply hover:scale-110 hover:bg-[var(--ground-glass-background-hover-color)] transition-all duration-[200ms] ease-in-out;
  border: 1px solid #fff3;
  box-shadow: 0px 0px 1px 0px #fffc;
}

.button-class:hover .svg-class {
  transition: all 0.2s ease-in-out;
  transform: scale(1.2);
}

.svg-class {
  @apply w-[30px] h-[30px]
}
</style>