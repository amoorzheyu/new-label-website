<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { VueDraggable } from 'vue-draggable-plus'

// pinia->useLayoutElementStore
import { useLayoutElementStore } from '@/stores/layoutElement'
let { isSwapTobuttomNavigation, isAdaptiveNavigationWidth, isShowNavigationBar } = storeToRefs(useLayoutElementStore())

// pinia->useNavigationBarStore
import { useNavigationBarStore } from '@/stores/navigationBar'
let { showingNavigationList } = storeToRefs(useNavigationBarStore())

//pinia->useSearchPartStore
import { useSearchPartStore } from '@/stores/searchPart'
let { isShowSearchMask } = storeToRefs(useSearchPartStore())

//是否显示工具条
let isShowTooltip = ref(false)

// 导航文本节点列表
const navigationTextList = ref([])

//是否正在被拖拽
let isDraging = ref(false);

//手动设置导航文本DOM防止默认乱序
const setNavItemRef = (el, index) => {
    if (el) {
        navigationTextList.value[index] = (el)
    }
}

//导航文本Dom移入事件
const checkNavigationTextOverflow = (index) => {
    let navigationText = navigationTextList.value[index];
    isShowTooltip.value = navigationText.offsetWidth < navigationText.scrollWidth;
}

//导航拖动开始事件
const onNavigationDragStart = (event) => {
    isDraging.value = true;
    let { item } = event;
    //透明度设为0
    item.style.opacity = 0;
}

//拖动导航结束
const onNavigationDragEnd = (event) => {
    isDraging.value = false;
    let { item } = event;
    item.style.opacity = 1;
}


//移动事件
const onMoveEvnet = (event) => {
    //被拖拽的元素
    const draggedElement = event.dragged;
    //目标被替换的元素
    const targetElement = event.related;

    if (targetElement.classList.contains('no-drag') || draggedElement.classList.contains('no-drag')) {
        // 阻止拖拽
        return false;
    }
};

//点击跳转网页
const clickToWebEvent=(url)=>{
    window.open(url)
}

</script>
<template>
    <div :class="` relative mt-[50px] max-w-[913px] mx-auto  ${isAdaptiveNavigationWidth ? 'flex' : 'w-[913px] '} ${isSwapTobuttomNavigation ? '!absolute bottom-[3%] left-[50%] translate-x-[-50%]' : ''}`"
        v-show="isShowNavigationBar&&!isShowSearchMask">
        <div
            class="px-[5px] overflow-hidden py-[5px]  min-h-[155px] max-h-[300px] mx-auto bg-[var(--ground-glass-boardr-color)] backdrop-blur-2xl rounded-[20px] shadow-md">
            <el-scrollbar :height="`${showingNavigationList.length>6?'290px':'145px'}`">
                <VueDraggable @move="onMoveEvnet" handle=".handleNavigation" :animation="250"
                    v-model="showingNavigationList" @end="onNavigationDragEnd" @start="onNavigationDragStart"
                    class="flex flex-wrap">
                    <div v-for="(item, index) in showingNavigationList" :key="item.id" @click="clickToWebEvent(item.url)"
                        @contextmenu="rightClickNavEvent(currentSortIndex, index)" menuName="deskNavigationItem"
                        :class="`bg-[#fff] handleNavigation relative overflow-hidden ${(!isDraging) ? 'hover:scale-[1.05] transition-transform  duration-200  ease-in-out' : ''}    pt-[5px] flex flex-col items-center justify-around mx-[10px] w-[130px] h-[125px] mt-[10px] mb-[10px] rounded-2xl shadow-lg border-[#00000013] border-[2px]`">
                        <div class=" relative z-10">
                            <div v-show="item.iconType == 'Icon'" class="w-[55px] h-[55px] rounded-2xl">
                                <img :src="item?.icon" alt="" srcset="" class="w-[100%] h-[100%] rounded-xl">
                            </div>
                            <div v-show="item.iconType == 'Text'"
                                class="text-[#94b1e5] w-[50px] h-[50px] flex text-[40px] justify-center font-[950] mt-[-5px]">
                                {{ item.name[0] }}
                            </div>
                        </div>
                        <div class=" text-[#656565] h-[30px] leading-[30px] w-[80%] relative z-50">
                            <el-tooltip class="box-item" :disabled="!isShowTooltip" effect="light" :content="item.name"
                                placement="bottom-start">
                                <div class="truncate  text-center  font-[550]"
                                    @mouseover="checkNavigationTextOverflow(index)"
                                    :ref="(el) => setNavItemRef(el, index)">{{ item.name }}</div>
                            </el-tooltip>
                        </div>
                        <div class="absolute opacity-15 -rotate-[40deg] top-[0%] left-[45%]">
                            <div v-show="item.iconType == 'Icon'"
                                class="w-[120px] h-[120px] rounded-2xl translate-x-[0%] translate-y-[10%] rotate-[10deg]">
                                <img :src="item?.icon" alt="" srcset="" class="w-[100%] h-[100%] rounded-2xl">
                            </div>
                            <div v-show="item.iconType == 'Text'"
                                class="text-[#94b1e5] text-[115px] justify-center font-[950] mt-[-10px]">
                                {{ item.name[0] }}
                            </div>
                        </div>

                    </div>
                </VueDraggable>
            </el-scrollbar>
        </div>
    </div>
</template>
<style scoped></style>