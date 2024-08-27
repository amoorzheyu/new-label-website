<script setup>
import { ref } from "vue";
import { ClickOutside as vClickOutside } from "element-plus";
import { storeToRefs } from "pinia";

// pinia->useMenuLayoutStore
import { useMenuLayoutStore } from "@/stores/menuLayout";

let {
  isShowMenu,
  isShowEdit,
  isShowRemoveFromDeskTop,
  isShowAddToDeskTop,
  isShowDelete,
  isShowAddNavigation,
  isShowAllNavigations,
  isShowAddClass,
  isShowSetting,
  isShowSwitchTheme,
} = storeToRefs(useMenuLayoutStore());

// pinia->useThemeSwapStore
import { useThemeSwapStore } from '@/stores/themeSwap'
let { nowThemeIndex } = storeToRefs(useThemeSwapStore())
const { changeTheme } = useThemeSwapStore()

// 切换主题
const changeThemeEvent = () => {
  changeTheme(nowThemeIndex.value);
};

//点击菜单之外
const clickMenuOutsideEvent = () => {
  isShowMenu.value = false;
};
</script>
<template>
  <div v-click-outside="clickMenuOutsideEvent">
    <div class="bg-[#fff] text-[#000] px-[18px] py-[10px] rounded-xl shadow">
      <div v-show="isShowEdit" class="menuItem">
        <div>
          <div>
            <svg viewBox="0 0 24 24" width="1em" height="1em">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M3 21h18M12.222 5.828L15.05 3L20 7.95l-2.828 2.828m-4.95-4.95l-5.607 5.607a1 1 0 0 0-.293.707v4.536h4.536a1 1 0 0 0 .707-.293l5.607-5.607m-4.95-4.95l4.95 4.95"
              ></path>
            </svg>
          </div>
          <div>编辑</div>
        </div>
      </div>
      <div v-show="isShowRemoveFromDeskTop" class="menuItem">
        <div>
          <div>
            <svg viewBox="0 0 24 24" width="1em" height="1em">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              >
                <path
                  d="M7.143 16.995c-.393 0-.775-.043-1.143-.123c-2.29-.506-4-2.496-4-4.874c0-2.714 2.226-4.923 5-4.996m6.318 2.632A5.517 5.517 0 0 0 11 7.5"
                ></path>
                <path
                  d="M16.857 7c.393 0 .775.043 1.143.124c2.29.505 4 2.495 4 4.874c0 2.76-2.302 4.997-5.143 4.997h-1.714c-2.826 0-5.143-2.506-5.143-4.997c0 0 0-.998.5-1.498M3 3l18 18"
                ></path>
              </g>
            </svg>
          </div>
          <div>移出桌面</div>
        </div>
      </div>
      <div v-show="isShowAddToDeskTop" class="menuItem">
        <div>
          <div>
            <svg viewBox="0 0 24 24" width="1em" height="1em">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              >
                <path
                  d="M14 11.998C14 9.506 11.683 7 8.857 7H7.143C4.303 7 2 9.238 2 11.998c0 2.378 1.71 4.368 4 4.873a5.3 5.3 0 0 0 1.143.124"
                ></path>
                <path
                  d="M10 11.998c0 2.491 2.317 4.997 5.143 4.997h1.714c2.84 0 5.143-2.237 5.143-4.997c0-2.379-1.71-4.37-4-4.874A5.304 5.304 0 0 0 16.857 7"
                ></path>
              </g>
            </svg>
          </div>
          <div>添加为桌面导航</div>
        </div>
      </div>
      <div v-show="isShowDelete" class="menuItem">
        <div>
          <div>
            <svg viewBox="0 0 24 24" width="1em" height="1em">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"
              ></path>
            </svg>
          </div>
          <div>删除</div>
        </div>
      </div>
      <div v-show="isShowAddNavigation" class="menuItem">
        <div>
          <div>
            <svg viewBox="0 0 24 24" width="1em" height="1em">
              <g fill="none" stroke="currentColor" stroke-width="1.5">
                <path
                  d="M2 19V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2 7h20M9 14h3m3 0h-3m0 0v-3m0 3v3"
                ></path>
              </g>
            </svg>
          </div>
          <div>添加导航</div>
        </div>
      </div>
      <div v-show="isShowAllNavigations" class="menuItem">
        <div>
          <div>
            <svg viewBox="0 0 24 24" width="1em" height="1em">
              <path
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                d="M3 7.4V3.6a.6.6 0 0 1 .6-.6h5.8a.6.6 0 0 1 .6.6v3.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6Zm11 13v-3.8a.6.6 0 0 1 .6-.6h5.8a.6.6 0 0 1 .6.6v3.8a.6.6 0 0 1-.6.6h-5.8a.6.6 0 0 1-.6-.6Zm0-8V3.6a.6.6 0 0 1 .6-.6h5.8a.6.6 0 0 1 .6.6v8.8a.6.6 0 0 1-.6.6h-5.8a.6.6 0 0 1-.6-.6Zm-11 8v-8.8a.6.6 0 0 1 .6-.6h5.8a.6.6 0 0 1 .6.6v8.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6Z"
              ></path>
            </svg>
          </div>
          <div>导航管理</div>
        </div>
      </div>
      <div v-show="isShowAddClass" class="menuItem">
        <div>
          <div>
            <svg viewBox="0 0 24 24" width="1em" height="1em">
              <g fill="none" stroke="currentColor" stroke-width="1.5">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.992 17h3m3 0h-3m0 0v-3m0 3v3"
                ></path>
                <path
                  d="M4 9.4V4.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6v4.8a.6.6 0 0 1-.6.6H4.6a.6.6 0 0 1-.6-.6Zm0 10v-4.8a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6v4.8a.6.6 0 0 1-.6.6H4.6a.6.6 0 0 1-.6-.6Zm10-10V4.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6v4.8a.6.6 0 0 1-.6.6h-4.8a.6.6 0 0 1-.6-.6Z"
                ></path>
              </g>
            </svg>
          </div>
          <div>添加分类</div>
        </div>
      </div>
      <div
        v-show="isShowSetting"
        class="menuItem border-t-[1px] border-[#ccc9]"
      >
        <div>
          <div>
            <svg viewBox="0 0 24 24" width="1em" height="1em">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              >
                <path d="M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6"></path>
                <path
                  d="m19.622 10.395l-1.097-2.65L20 6l-2-2l-1.735 1.483l-2.707-1.113L12.935 2h-1.954l-.632 2.401l-2.645 1.115L6 4L4 6l1.453 1.789l-1.08 2.657L2 11v2l2.401.656L5.516 16.3L4 18l2 2l1.791-1.46l2.606 1.072L11 22h2l.604-2.387l2.651-1.098C16.697 18.832 18 20 18 20l2-2l-1.484-1.75l1.098-2.652l2.386-.62V11z"
                ></path>
              </g>
            </svg>
          </div>
          <div>设置</div>
        </div>
      </div>
      <div v-show="isShowSwitchTheme" @click="changeThemeEvent" class="menuItem">
        <div>
          <div>
            <svg viewBox="0 0 24 24" width="1em" height="1em">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              >
                <path d="M12 14.5a6 6 0 1 0 0-12a6 6 0 0 0 0 12"></path>
                <path d="M16 21.5a6 6 0 1 0 0-12a6 6 0 0 0 0 12"></path>
                <path d="M8 21.5a6 6 0 1 0 0-12a6 6 0 0 0 0 12"></path>
              </g>
            </svg>
          </div>
          <div>切换主题</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.menuItem > div {
  @apply flex h-[47px] justify-start items-center text-[18px] px-[10px];
}

.menuItem > div {
  @apply rounded-lg my-[5px] mx-[5px] transition-all;
}

.menuItem > div:hover {
  @apply bg-[#f3f3f5];
}

.menuItem > div > div > svg {
  @apply w-[24px] h-[24px] mr-[10px];
}
</style>
