<script setup>
import { ref, nextTick } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

import { storeToRefs } from 'pinia';

import { ElMessage, ElMessageBox } from 'element-plus'


// pinia->useIsShowDialogsStore
import { useIsShowDialogsStore } from '@/stores/isShowDialogs'
let { isShowNavigationManagementDialog } = storeToRefs(useIsShowDialogsStore())

// pinia->useNavigationBarStore
import { useNavigationBarStore } from '@/stores/navigationBar'
let { allNavigationList, sortNameList, currentSortList, currentSortIndex } = storeToRefs(useNavigationBarStore())
const { changeCurrentNavigation, deleteSort, addSort } = useNavigationBarStore()

// pinia->useMenuLayoutStore
import { useMenuLayoutStore } from "@/stores/menuLayout";
let { menuClickSlove } = useMenuLayoutStore();

//是否正在被拖拽
let isDraging = ref(false);

//点击切换分类事件
const changeCurrentNavigationEvent = (index) => {
    changeCurrentNavigation(index);
}

//右键点击事件
const menuClickEvent = (e) => {
    e.preventDefault();
    menuClickSlove(e);
};

//删除分类栏目事件
const deleteNavigationEvent = (index) => {
    if (sortNameList.value.length <= 1) {
        return ElMessage({
            type: 'error',
            message: '至少保留一个分类',
        })
    }
    let { name, id } = sortNameList.value[index];

    ElMessageBox.confirm(
        `删除分类 ${name} 会删除其中的导航`,
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            deleteSort(index, id);
            ElMessage({
                type: 'success',
                message: '删除分类成功',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消删除分类',
            })
        })

}

//判断分类是否重名
const checkSortNameRepeat = (name) => {
    let isRepeat = false;
    sortNameList.value.forEach((item) => {

        if (item.name == name) {
            isRepeat = true;
        }
    })
    return isRepeat;
}

//新增分类事件
const addSortEvent = () => {
    ElMessageBox.prompt('分类名称', '新增分类', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '分类名称不能为空',
    })
        .then(({ value }) => {
            value = value.trim();
            if (!checkSortNameRepeat(value)) {
                addSort(value);
                ElMessage({
                    type: 'success',
                    message: `新增分类 ${value} 成功`,
                })
            } else {
                ElMessage({
                    type: 'error',
                    message: '分类名称重复',
                })
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消新增分类',
            })
        })
}


//关闭对话框（动画结束）
const closedDialog = () => {
    isShowNavigationManagementDialog.value = true;
}

//是否显示工具条
let isShowTooltip = ref(false)

//分类文本DOM组
let sortsTextList = ref([])

//分类文本DOM移入事件
const checkSortsTextOverflow = (index) => {
    let sortsText = sortsTextList.value[index];
    isShowTooltip.value = sortsText.offsetWidth < sortsText.scrollWidth;
}

//导航文本Dom组
let navigationTextList = ref([])

//导航文本Dom移入事件
const checkNavigationTextOverflow = (index) => {

    let navigationText = navigationTextList.value[index];
    isShowTooltip.value = navigationText.offsetWidth < navigationText.scrollWidth;
}

//栏目拖动开始事件
const onSortDragStart = (event) => {

    let { item } = event;
    //透明度设为0
    item.style.opacity = 0;
}


//拖动栏目结束
const onSortDragEnd = (event) => {
 
    let { oldIndex, newIndex, item } = event;
    item.style.opacity = 1;

    if (currentSortIndex.value == oldIndex) {
        changeCurrentNavigation(newIndex);
    } else if (currentSortIndex.value == newIndex) {
        changeCurrentNavigation(newIndex+1);
    }
    let tempOld = deepClone(allNavigationList.value[oldIndex]);
    allNavigationList.value.splice(oldIndex, 1)
    allNavigationList.value.splice(newIndex, 0, tempOld);

}

//深拷贝
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

//导航拖动开始事件
const onNavigationDragStart = (event) => {
    isDraging.value=true;
    let { item } = event;
    //透明度设为0
    item.style.opacity = 0;
}

//拖动导航结束
const onNavigationDragEnd = (event) => {
    isDraging.value=false;
    let { oldIndex, newIndex, item } = event;
    item.style.opacity = 1;
    let NavigationIndex = currentSortIndex.value;
    let currentNavigationList = allNavigationList.value[NavigationIndex].items
    let tempOld = deepClone(currentNavigationList[oldIndex]);
    currentNavigationList.splice(oldIndex, 1);
    currentNavigationList.splice(newIndex, 0, tempOld);
}

//移动事件
const onMoveEvnet = (event) => {
    //被拖拽的元素
    const draggedElement = event.dragged;
    //目标被替换的元素
    const targetElement = event.related;

    //添加类
    // if(targetElement)
    // targetElement.classList.add('node-move');

    if (targetElement.classList.contains('no-drag') || draggedElement.classList.contains('no-drag')) {
        // 阻止拖拽
        return false;
    }
};




</script>
<template>
    <div>
        <div class=" overflow-hidden">
            <el-dialog modal-class="modal-myClass" @closed="closedDialog" v-model="isShowNavigationManagementDialog">
                <div>
                    <div class="text-[22px] font-[400] text-[var(--dialog-text-color)]">
                        导航管理
                    </div>
                    <div @contextmenu="menuClickEvent" menuName="navigationManagementInner"
                        class="mt-[30px] mb-[20px]  mr-[20px] text-[var(--dialog-text-color)] flex bg-[#ffffff] h-[500px] rounded-xl shadow-sm p-[30px] pr-[15px]">
                        <!-- 分类名称列表 -->
                        <div class="h-[370px]">
                            <el-scrollbar>
                                <ul class="text-[18px] pr-[20px]">
                                    <VueDraggable v-model="sortNameList" :scroll="true" @end="onSortDragEnd" :animation="300"
                                        :scrollSensitivity="200" @start="onSortDragStart">
                                        <li v-for="(item, index) in sortNameList" menuName="sortItem"
                                            @click="changeCurrentNavigationEvent(index)" :key="item.id"
                                            :class="`sortsLi-Class ${currentSortIndex == index ? '!bg-[#edf2fbcc] text-[#759add]' : ''}`">
                                            <div class="sortText-class">
                                                <el-tooltip class="box-item" :disabled="!isShowTooltip" effect="light"
                                                    :content="item.name" placement="top">
                                                    <div class="truncate " @mouseover="checkSortsTextOverflow(index)"
                                                        ref="sortsTextList">{{ item.name }}</div>
                                                </el-tooltip>
                                            </div>
                                            <div class="sortSvg-class" @click="deleteNavigationEvent(index)">
                                                <svg viewBox="0 0 24 24" width="1.2em" height="1.2em">
                                                    <path fill="none" stroke="currentColor" stroke-linecap="round"
                                                        stroke-linejoin="round" stroke-width="1.5"
                                                        d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10">
                                                    </path>
                                                </svg>
                                            </div>
                                        </li>
                                    </VueDraggable>
                                </ul>
                            </el-scrollbar>
                            <div @click="addSortEvent"
                                class="h-[50px] flex items-center justify-center transition-all pr-[10px] leading-[50px] w-[230px] pl-[20px] mt-[8px] rounded-[7px] bg-[#5f8ad8] text-[#fff] text-[18px]">
                                <div class="sortText-class">添加分类</div>
                                <div class="flex items-center w-[38px] h-[38px] pt-[0.3px]">
                                    <svg viewBox="0 0 24 24" width="1em" height="1em"
                                        class="text-[#fff] w-[100%] h-[100%] my-1 mx-2 rounded-[10px] z-1">
                                        <path fill="none" stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="1.5"
                                            d="M8 12h4m4 0h-4m0 0V8m0 4v4m0 6c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- 导航列表 -->
                        <div>
                            <el-scrollbar>
                                <ul class="ml-[20px] flex flex-wrap mt-[-10px] pb-[30px] text-[18px] font-sans">
                                    <VueDraggable @move="onMoveEvnet" handle=".handleNavigation"  :animation="250"
                                        v-model="currentSortList" @end="onNavigationDragEnd"
                                        @start="onNavigationDragStart" class="flex flex-wrap">
                                        <li v-for="(item, index) in currentSortList" :key="item.id"
                                            menuName="navigationItem"
                                            :class="`bg-[#fff] handleNavigation relative overflow-hidden ${(!isDraging)?'hover:scale-[1.05] transition-transform  duration-200  ease-in-out':''}    pt-[5px] flex flex-col items-center justify-around mx-[10px] w-[130px] h-[125px] mt-[20px] rounded-2xl shadow-lg border-[#00000013] border-[2px]`">
                                            <div class=" relative z-10">
                                                <div v-show="item.iconType == 'Icon'"
                                                    class="w-[55px] h-[55px] rounded-2xl">
                                                    <img :src="item?.icon" alt="" srcset=""
                                                        class="w-[100%] h-[100%] rounded-xl">
                                                </div>
                                                <div v-show="item.iconType == 'Text'"
                                                    class="text-[#94b1e5] w-[50px] h-[50px] flex text-[40px] justify-center font-[950] mt-[-5px]">
                                                    {{ item.name[0] }}
                                                </div>
                                            </div>
                                            <div class=" text-[#656565] h-[30px] leading-[30px] w-[80%] relative z-50">
                                                <el-tooltip class="box-item" :disabled="!isShowTooltip" effect="light"
                                                    :content="item.name" placement="bottom-start">
                                                    <div class="truncate  text-center  font-[550]"
                                                        @mouseover="checkNavigationTextOverflow(index)"
                                                        ref="navigationTextList">{{ item.name }}</div>
                                                </el-tooltip>
                                            </div>
                                            <div class="absolute opacity-15 -rotate-[40deg] top-[0%] left-[45%]">
                                                <div v-show="item.iconType == 'Icon'"
                                                    class="w-[120px] h-[120px] rounded-2xl translate-x-[0%] translate-y-[10%] rotate-[10deg]">
                                                    <img :src="item?.icon" alt="" srcset=""
                                                        class="w-[100%] h-[100%] rounded-2xl">
                                                </div>
                                                <div v-show="item.iconType == 'Text'"
                                                    class="text-[#94b1e5] text-[115px] justify-center font-[950] mt-[-10px]">
                                                    {{ item.name[0] }}
                                                </div>
                                            </div>

                                        </li>

                                        <li
                                            class=" no-drag delay-75 hover:scale-[1.05] ease-in-out transition-all relative overflow-hidden pt-[5px] flex flex-col items-center justify-around mx-[10px] w-[130px] h-[125px] mt-[20px] rounded-2xl shadow-lg border-[#00000013] border-[2px]">
                                            <div class=" relative z-10">
                                                <div class="w-[50px] h-[50px]">
                                                    <svg viewBox="0 0 24 24" width="1em" height="1em"
                                                        class="text-[#3D7FDBFF] text-[#5f8ad8] w-[100%] h-[100%] mt-[5px] rounded-[10px] z-1">
                                                        <path fill="none" stroke="currentColor" stroke-linecap="round"
                                                            stroke-linejoin="round" stroke-width="1.5"
                                                            d="M8 12h4m4 0h-4m0 0V8m0 4v4m0 6c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10">
                                                        </path>
                                                    </svg>
                                                </div>

                                            </div>
                                            <div
                                                class="truncate font-[550] text-[#656565] h-[35px] leading-[30px] w-[80%] text-center">
                                                添加导航</div>
                                            <div class="absolute opacity-15 -rotate-[40deg] top-[0%] left-[45%]">
                                                <div
                                                    class="w-[110px] h-[110px] rounded-2xl translate-x-[-20%] translate-y-[10%] rotate-[0deg]">
                                                    <svg viewBox="0 0 24 24" width="1em" height="1em"
                                                        class="text-[#3D7FDBFF] text-[#5f8ad8] w-[100%] h-[100%] my-1 mx-2 rounded-[10px] z-1">
                                                        <path fill="none" stroke="currentColor" stroke-linecap="round"
                                                            stroke-linejoin="round" stroke-width="1.5"
                                                            d="M8 12h4m4 0h-4m0 0V8m0 4v4m0 6c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10">
                                                        </path>
                                                    </svg>
                                                </div>
                                            </div>

                                        </li>
                                    </VueDraggable>
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
::v-deep(.el-message-box) {
    @apply !w-[1000px];
}

.sortSvg-class {
    @apply hidden;
}

.sortSvg-class:hover {
    @apply scale-[1.2] transition-all ease-in-out duration-200;
}

.sortsLi-Class:hover .sortSvg-class {
    @apply block;
}

.sortsLi-Class:hover {
    @apply bg-[#89888833];
}


.sortText-class {
    @apply truncate;
}

.sortsLi-Class {
    @apply h-[50px] flex justify-between items-center  pr-[10px] leading-[50px] w-[230px] pl-[20px] mt-[8px] rounded-[7px];
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
    @apply pl-[30px] pr-[8px] pt-[25px] bg-[var(--background-color-dialog-large-box)] w-[1000px] h-[620px] ;
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

.node-move {
    transition: transform 5s ease-in-out;
    transform: translateX(-50px);
    /* 你可以调整这个值来实现动画效果 */
}
</style>