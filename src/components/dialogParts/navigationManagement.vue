<script setup>
import { ref } from 'vue'

import { storeToRefs } from 'pinia';


// pinia->useIsShowDialogsStore
import { useIsShowDialogsStore } from '@/stores/isShowDialogs'
let { isShowNavigationManagementDialog } = storeToRefs(useIsShowDialogsStore())

// pinia->useNavigationBarStore
import { useNavigationBarStore } from '@/stores/navigationBar'
let { navigationNameList ,currentNavigationList,currentNavigationIndex} = storeToRefs(useNavigationBarStore())
const {changeCurrentNavigation} = useNavigationBarStore()

//点击切换分类事件
const changeCurrentNavigationEvent=(index)=>{
    changeCurrentNavigation(index);
}

//关闭对话框（动画结束）
const closedDialog=()=>{
    isShowNavigationManagementDialog.value=true;
}

</script>
<template>
    <div>
        <div class=" overflow-hidden">
            <el-dialog modal-class="modal-myClass" @closed="closedDialog" v-model="isShowNavigationManagementDialog">
                <div>
                    <div class="text-[22px] font-[400] text-[var(--dialog-text-color)]">
                        导航管理
                    </div>
                    <div class="mt-[30px] mb-[20px]  mr-[20px] text-[var(--dialog-text-color)] flex bg-[#ffffff] h-[515px] rounded-xl shadow-sm p-[30px] pr-[15px]">
                        <div>
                            <el-scrollbar>
                                <ul class="text-[18px]">
                                    <li v-for="(item, index) in navigationNameList" @click="changeCurrentNavigationEvent(index)" :key="item.id" :class="`sortsLi-Class ${currentNavigationIndex==index?'!bg-[#edf2fbcc] text-[#759add]':''}`">
                                        <div class="sortText-class">
                                            {{ item.name }}
                                        </div>
                                        <div class="sortSvg-class">
                                            <svg viewBox="0 0 24 24" width="1em" height="1em"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"></path></svg>
                                        </div>
                                    </li>
                                    <li class="sortsLi-Class">
                                        <div class="sortText-class">新增分类</div>
                                        <div class="sortSvg-class">
                                        </div>
                                    </li>
                                </ul>
                            </el-scrollbar>
                        </div>
                        <div>
                            <el-scrollbar>
                                <ul class="ml-[40px] flex flex-wrap mt-[-10px]">
                                    <li v-for="(item, index) in currentNavigationList" :key="item.id" class=" mx-[10px] w-[130px] h-[130px] mt-[20px] rounded-2xl shadow-lg border-[#00000011] border-[1px]">
                                       <div>{{ item.name }}</div>
                                       <div></div> 
                                    </li>
                                    <li class=" mx-[10px] w-[130px] h-[130px] mt-[20px] rounded-2xl shadow-md border-[#00000011] border-[1px]">
                                        <div>添加导航</div>
                                        <div>
                                            
                                        </div>
                                    </li>
                                </ul>
                            </el-scrollbar>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<style scoped>
.sortSvg-class{
    @apply hidden;
}

.sortSvg-class:hover{
    @apply scale-[1.2] transition-all;
}

.sortsLi-Class:hover .sortSvg-class{
    @apply block;
}

.sortsLi-Class:hover{
    @apply bg-[#89888833] ;
}


.sortText-class{
    @apply truncate ;
}

.sortsLi-Class{
    @apply h-[50px] flex justify-between items-center transition-all pr-[10px] leading-[50px] w-[230px] pl-[20px] mt-[8px] rounded-[7px];
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
    @apply pl-[30px] pr-[8px] pt-[25px] bg-[var(--background-color-dialog-large-box)] w-[1000px] h-[635px] top-[180px] ;
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