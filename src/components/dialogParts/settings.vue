<script setup>
import { ref } from 'vue'

import { storeToRefs } from 'pinia';

import { Picture as IconPicture } from '@element-plus/icons-vue'



// pinia->useIsShowDialogsStore
import { useIsShowDialogsStore } from '@/stores/isShowDialogs'
let { isShowSettingDialog } = storeToRefs(useIsShowDialogsStore())

// pinia->useSettingOptStore
import { useSettingOptStore } from '@/stores/settingopt'
let { isDarkMode, isShowTopMenu, isShowDatePart, isShowNavigationBar, isAdaptiveNavigationWidth, isSwapTobuttomNavigation } = storeToRefs(useSettingOptStore())


//pinia->useBackgroundImageStore
import { useBackgroundImageStore } from '@/stores/backgroundImage'
let { presetImageUrls, customImageUrl } = storeToRefs(useBackgroundImageStore())


</script>
<template>
    <div>
        <div>
            <el-dialog modal-class="modal-myClass" v-model="isShowSettingDialog">
                <div>
                    <div class="text-[22px] font-[400] text-[var(--dialog-text-color)]">
                        设置
                    </div>
                    <div>
                        <el-scrollbar always height="620px" class=" mt-[30px]  text-[var(--dialog-text-color)]">
                            <div class="mr-[23px]">
                                <div class="h-[370px] bg-[var(--background-color-dialog-area-box)] rounded-2xl">
                                    <ul class="mx-5">
                                        <li class="setting-item-line">
                                            <div>夜间模式</div>
                                            <div>
                                                <el-switch v-model="isDarkMode" size="large"></el-switch>
                                            </div>
                                        </li>
                                        <li class="setting-item-line">
                                            <div>顶部菜单</div>
                                            <div>
                                                <el-switch v-model="isShowTopMenu" size="large"></el-switch>
                                            </div>
                                        </li>
                                        <li class="setting-item-line">
                                            <div>桌面时间</div>
                                            <div>
                                                <el-switch v-model="isShowDatePart" size="large"></el-switch>
                                            </div>
                                        </li>
                                        <li class="setting-item-line">
                                            <div>桌面导航栏</div>
                                            <div>
                                                <el-switch v-model="isShowNavigationBar" size="large"></el-switch>
                                            </div>
                                        </li>
                                        <li class="setting-item-line">
                                            <div>导航栏宽度跟随数量变化</div>
                                            <div>
                                                <el-switch v-model="isAdaptiveNavigationWidth" size="large"></el-switch>
                                            </div>
                                        </li>
                                        <li class="setting-item-line border-none">
                                            <div>切换为底部导航栏</div>
                                            <div>
                                                <el-switch v-model="isSwapTobuttomNavigation" size="large"></el-switch>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="h-[400px] bg-[var(--background-color-dialog-area-box)] rounded-2xl mt-4">
                                    <div class="mx-5 pt-4 flex">
                                        <div class="">
                                            <div class="text-[20px]">自定义壁纸</div>
                                            <div class="text-[18px] mt-3">使用在线图片链接，建议直接在网上复制高分辨率图片链接</div>
                                            <div :class="`mt-[10px] ${customImageUrl?'w-[587px]':'w-[900px]'}`"><el-input v-model="customImageUrl"
                                                    placeholder="请输入在线图片链接" clearable /></div>
                                        </div>
                                        <div v-show="customImageUrl" class=" border-[1px] border-[#ccc] w-[320px]  h-[150px]  ml-3 rounded-xl ">
                                            <el-image :src="customImageUrl" fit="cover" class="w-[100%] h-[100%] rounded-xl">
                                                <template #error>
                                                    <div class=" absolute top-[-50%] right-[23%] scale-[65%]">
                                                        <el-empty description="图片地址无效" />
                                                    </div>
                                                </template>
                                            </el-image>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<style scoped>
.setting-item-line {
    line-height: 61px;
    @apply flex pr-[5px] justify-between items-center text-[20px] border-b-[1px] border-[var(--background-color-dialog-area-box-under-line)];
}

/*  */
::v-deep(.el-input__wrapper) {
    @apply h-[50px] rounded-xl;
}

::v-deep(.el-input__inner::placeholder) {
    @apply text-[18px];
}


/* 以下为修改el开关的样式 */
::v-deep(.el-switch__core) {
    @apply bg-[var(--switch-background-color)] border-none;
}

::v-deep(.el-switch--large) {
    @apply scale-[120%];
}


/* 以下为修改el对话框的样式 */
::v-deep(.modal-myClass) {
    @apply backdrop-blur-xl
}

::v-deep(.el-dialog) {
    border-radius: 12px;
    @apply pl-[30px] pr-[8px] pt-[25px] bg-[var(--background-color-dialog-large-box)] w-[1000px] mt-[280px] h-[730px]
}

::v-deep(.el-dialog__header) {
    @apply inline-block absolute right-[20px] top-[20px]
}

::v-deep(.el-dialog__close) {
    @apply bg-transparent hover:bg-[#89888833] rounded-md;
    transition: all 0.2s ease-in-out;
    width: 1.5rem;
    height: 1.5rem;
}

::v-deep(.el-dialog__close>svg) {
    @apply text-[#666666];
    width: 1.5rem;
    height: 1.5rem;
}

/* TODO: 想要修改叉叉的线条宽度，没成功*/

/* 以下为修改el滚动条样式 */
::v-deep(.el-scrollbar__thumb) {
    background-color: #464649ff;
}
</style>