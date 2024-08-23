<script setup>
import { ref } from 'vue'

import { storeToRefs } from 'pinia';

import { ElMessage } from 'element-plus'


// pinia->useIsShowDialogsStore
import { useIsShowDialogsStore } from '@/stores/isShowDialogs'
let { isShowSettingDialog } = storeToRefs(useIsShowDialogsStore())

// pinia->useSettingOptStore
import { useSettingOptStore } from '@/stores/settingopt'
let { isDarkMode, isShowTopMenu, isShowDatePart, isShowNavigationBar, isAdaptiveNavigationWidth, isSwapTobuttomNavigation } = storeToRefs(useSettingOptStore())


//pinia->useBackgroundImageStore
import { useBackgroundImageStore } from '@/stores/backgroundImage'
let { presetImageUrls, customImageUrl, isShowManualMockBackground,useCustomImage, currentPresetImageIndex } = storeToRefs(useBackgroundImageStore())
const { customImageClick, presentImageClick } = useBackgroundImageStore()
//自定义图片点击事件
const customImageClickEvent = () => {
    customImageClick();

    ElMessage({
        message: '壁纸设置成功',
        type: 'success',
        duration: 1000,
        plain: true
    })

    ElMessage({
        message: '高清图片链接来源推荐彼岸壁纸网',
        type: 'info',
        duration: 3000,
        plain: true
    })
}

//预设图片点击事件
const presentImageClickEvent = (index) => {
    presentImageClick(index);

    ElMessage({
        message: '壁纸设置成功',
        type: 'success',
        duration: 1000,
        plain: true
    })

    ElMessage({
        message: '高清图片下载来源推荐哲风壁纸网',
        type: 'info',
        duration: 3000,
        plain: true
    })
}

//关闭对话框（动画结束）
const closedDialog=()=>{
    isShowManualMockBackground.value=true;
}

</script>
<template>
    <div>
        <div class=" overflow-hidden">
            <el-dialog modal-class="modal-myClass" @closed="closedDialog" v-model="isShowSettingDialog">
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
                                <div class="bg-[var(--background-color-dialog-area-box)] rounded-2xl mt-4">
                                    <div
                                        class="mx-5 pt-4 flex border-b-[1px] pb-2 border-[var(--background-color-dialog-area-box-under-line)]">
                                        <div class="">
                                            <div class="text-[20px]">自定义壁纸</div>
                                            <div class="text-[18px] mt-5">使用在线图片链接，建议直接在网上复制高分辨率图片链接</div>
                                            <div :class="`mt-[10px] ${customImageUrl ? 'w-[587px]' : 'w-[900px]'}`">
                                                <el-input v-model="customImageUrl" placeholder="请输入在线图片链接" clearable />
                                            </div>
                                        </div>
                                        <div v-show="customImageUrl" @click="customImageClickEvent"
                                            class=" border-[1px] border-[#cccc] w-[320px]  h-[150px] overflow-hidden  ml-3 rounded-xl relative el-image-box-class">
                                            <el-image :src="customImageUrl" fit="cover"
                                                class="w-[100%] h-[100%] rounded-xl el-image-class transition-all ">
                                                <template #error>
                                                    <div class=" absolute top-[-50%] right-[23%] scale-[65%]">
                                                        <el-empty description="图片地址无效" />
                                                    </div>
                                                </template>
                                            </el-image>
                                            <div v-show="!useCustomImage"
                                                class="hidden  absolute  bg-[#0006] w-[100%] h-[100%] top-0 left-0 rounded-xl el-image-moudle-class">
                                            </div>
                                            <div v-show="useCustomImage"
                                                class="absolute w-[100%] h-[100%] top-0 left-0 rounded-xl bg-[#0006] text-[#fff] flex justify-center items-center">
                                                <svg viewBox="0 0 24 24" width="1em" height="1em"
                                                    class="w-[30%] h-[30%] opacity-70">
                                                    <g fill="none" fill-rule="evenodd">
                                                        <path
                                                            d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z">
                                                        </path>
                                                        <path fill="currentColor"
                                                            d="M21.546 5.111a1.5 1.5 0 0 1 0 2.121L10.303 18.475a1.6 1.6 0 0 1-2.263 0L2.454 12.89a1.5 1.5 0 1 1 2.121-2.121l4.596 4.596L19.424 5.111a1.5 1.5 0 0 1 2.122 0Z">
                                                        </path>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mx-5 pt-4">
                                        <div class="text-[20px] mb-3">预设壁纸</div>
                                        <div>
                                            <ul class="flex justify-stretch flex-wrap image-item-ul">
                                                <li v-for="(item, index) in presetImageUrls"
                                                    class="w-[290px] h-[150px] relative mb-4 mr-[13px] ">
                                                    <div @click="presentImageClickEvent(index)"
                                                        class="w-[100%] h-[100%] rounded-xl el-image-box-class overflow-hidden ">
                                                        <el-image :src="item" fit="cover"
                                                            class="w-[100%] h-[100%] rounded-xl el-image-class transition-all ">
                                                            <template #error>
                                                                <div
                                                                    class=" absolute top-[-50%] right-[23%] scale-[65%]">
                                                                    <el-empty description="图片地址无效" />
                                                                </div>
                                                            </template>
                                                        </el-image>
                                                        <div v-show="(useCustomImage) || (currentPresetImageIndex != index)"
                                                            class="hidden absolute  bg-[#0006] w-[100%] h-[100%] top-0 left-0 rounded-xl el-image-moudle-class">
                                                        </div>
                                                        <div v-show="(!useCustomImage) && (currentPresetImageIndex == index)"
                                                            class="absolute w-[100%] h-[100%] top-0 left-0 rounded-xl bg-[#0006] text-[#fff] flex justify-center items-center">
                                                            <svg viewBox="0 0 24 24" width="1em" height="1em"
                                                                class="w-[30%] h-[30%] opacity-70">
                                                                <g fill="none" fill-rule="evenodd">
                                                                    <path
                                                                        d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z">
                                                                    </path>
                                                                    <path fill="currentColor"
                                                                        d="M21.546 5.111a1.5 1.5 0 0 1 0 2.121L10.303 18.475a1.6 1.6 0 0 1-2.263 0L2.454 12.89a1.5 1.5 0 1 1 2.121-2.121l4.596 4.596L19.424 5.111a1.5 1.5 0 0 1 2.122 0Z">
                                                                    </path>
                                                                </g>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div></div>
                                                </li>
                                            </ul>
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
.image-item-ul>li:nth-child(3n+3) {
 margin-right: 0px;
}

.el-image-box-class:hover .el-image-moudle-class {
    display: block;
}

.el-image-box-class:hover .el-image-class {
    transform: scale(1.2);
}

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

/* 以下为修改el遮罩的样式 */
::v-deep(.el-overlay-dialog) {
    @apply w-[100vw] h-[100vh] overflow-hidden;
}



/* 以下为修改el对话框的样式 */
::v-deep(.modal-myClass) {
    @apply backdrop-blur-xl
}

::v-deep(.el-dialog) {
    border-radius: 12px;
    @apply pl-[30px] pr-[8px] pt-[25px] bg-[var(--background-color-dialog-large-box)] w-[1000px] ;
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