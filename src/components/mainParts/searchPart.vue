<script setup>
import { storeToRefs } from 'pinia'
// pinia-> useLayoutElementStore
import { useLayoutElementStore } from '@/stores/layoutElement'
import { ClickOutside as vClickOutside } from "element-plus";
let { isShowSearch } = storeToRefs(useLayoutElementStore())


//pinia-> useSearchPartStore
import { useSearchPartStore } from "@/stores/searchPart";
let { searchText, isShowSearchMask,inputDom, searchPlaceHolder,searchEngineName,searchTips, isShowSearchTips, searchEnginesMess } = storeToRefs(useSearchPartStore());
const { searchOnFocus,inputFocus, searchOnBlur, getTipListsMess,changeSearchEngine,searchTipsOnClick,searchObtOnClick,clearSearchTextOnClick } = useSearchPartStore();

//输入框获取焦点事件
const searchFocusEvent = () => {
    searchOnFocus();
}

//搜索框外整体点击事件
const searchBarOutClickEvent = () => {
    searchOnBlur();
}

//搜索所有部分点击事件
const searchBarClickEvent = () => {
    inputFocus();
}

</script>
<template>
    <div>
        <div v-show="isShowSearchMask" class="w-[100vw] h-[100vh] fixed bg-[#ffffff01] left-0 top-[0px]"
            style="backdrop-filter:blur(30px)">
        </div>
        <div v-show="!isShowSearch" class="h-[80px]"></div>
        <div v-show="isShowSearch" class="flex justify-center" @click="searchBarClickEvent" v-click-outside="searchBarOutClickEvent">
            <div class="w-[1000px] h-[80px] flex justify-center relative">
                <div
                    class="button-class absolute z-10 left-[65px] top-[16px] flex items-center justify-center bg-[var(--ground-glass-background-color)] backdrop-blur-2xl  rounded-[32px] w-[130px] h-[50px]">
                    <div class="button-inner-class">
                        <div>

                        </div>
                        <div class="font-bold ">{{ searchEngineName }}</div>
                    </div>
                </div>
                <!-- 搜索引擎下拉 -->
                <div class="button-dropList absolute left-[50px] top-[68px] z-10  pt-[20px]">
                    <div
                        class="flex-col items-center justify-center text-center p-2 bg-[var(--ground-glass-background-color)] backdrop-blur-xl rounded-[16px] ">
                        <div class="button-dropList-item rounded-[32px]  w-[130px] p-[10px] m-1"
                            v-for="(item, index) in searchEnginesMess" @click="changeSearchEngine(index)">
                            <div class="">
                                <div>
                                </div>
                                <div class="font-bold text-base">{{ item.name }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div><input ref="inputDom" :placeholder="searchPlaceHolder" @focus="searchFocusEvent"
                         v-model="searchText"
                        class="input-class bg-[var(--ground-glass-boardr-color)] backdrop-blur-xl w-[900px] h-[80px]  rounded-[52px] shadow-md" />
                </div>
                <!-- 清空搜索框 -->
                <div v-show="searchText.length != 0"
                    class="button-clear absolute z-10 right-[120px] top-[16px] flex items-center justify-center rounded-[32px] w-[50px] h-[50px]"
                    @click.stop="clearSearchTextOnClick">
                    <div class="w-[30px] h-[30px] text-[var(--ground-glass-icon-color)] button-inner-class">
                        <svg viewBox="0 0 24 24" class="icon">
                            <path fill="rgba(255,255,255,0.3)" stroke="none" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="1.5"
                                d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2Zm0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16ZM9.879 8.464L12 10.586l2.121-2.122a1 1 0 1 1 1.415 1.415l-2.122 2.12l2.122 2.122a1 1 0 0 1-1.415 1.415L12 13.414l-2.121 2.122a1 1 0 0 1-1.415-1.415L10.586 12L8.465 9.879a1 1 0 0 1 1.414-1.415Z">
                            </path>
                        </svg>
                    </div>
                </div>
                <!-- 搜索 -->
                <div @click="searchObtOnClick"
                    class="button-class absolute z-10 right-[60px] top-[16px] flex items-center justify-center bg-[var(--ground-glass-background-color)] backdrop-blur-2xl  rounded-[32px] w-[50px] h-[50px]">
                    <div class="w-[30px] h-[30px] text-[var(--ground-glass-icon-color)] button-inner-class">
                        <svg viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5" d="m17 17l4 4M3 11a8 8 0 1 0 16 0a8 8 0 0 0-16 0"></path>
                        </svg>
                    </div>
                </div>

                <!-- 搜索下拉框-->
                <div class="flex justify-center absolute top-[70px] " v-show="isShowSearchTips">
                    <div
                        class="w-[900px] bg-[#fff3] bg-[var(--ground-glass-boardr-color)] backdrop-blur-xl rounded-[26px] shadow-md mt-[20px] p-1">
                        <div class="flex items-center content-center m-2 p-3 rounded-[26px] search"
                            v-for="(item, index) in searchTips" @click="searchTipsOnClick(index)">
                            <div class="w-[30px] h-[30px] text-[var(--ground-glass-icon-color)] button-inner-class">
                                <svg viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="1.5"
                                        d="m17 17l4 4M3 11a8 8 0 1 0 16 0a8 8 0 0 0-16 0"></path>
                                </svg>
                            </div>
                            <div class="text-xl pl-3">
                                {{ item }}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.input-class {
    border: none;
    outline: none;
    display: block;
    padding-left: 170px;
    font-size: 21px;
}

.input-class::placeholder {
    color: #c0bdb8;
}

.button-class {
    border: 1px solid #fff3;
    /* 透明边框以避免影响布局 */
    box-shadow: 0px 0px 1px 0px #fffc;

    @apply hover:scale-110 hover:bg-[var(--ground-glass-background-hover-color)] transition-all duration-200 ease-in-out
}

.button-class:hover .button-inner-class {
    transition: all 0.2s ease-in-out;
    transform: scale(1.2);
}

/*** 清空搜索 ***/
.button-clear {

    @apply hover:scale-110 transition-all duration-200 ease-in-out
}

.button-clear:hover .icon>path {

    fill: #fff;
}


/*** 搜索下拉框 ***/
.search:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transition: all 0.1s ease-in-out;
}

/*** 搜索引擎 ***/
.button-dropList {

    transition: all 3s ease-in-out;
    display: none;
}

.button-class:hover+.button-dropList,
.button-dropList:hover {

    height: fit-content;
    display: block;
}

.button-dropList-item:hover {
    transition: all 0.1s ease-in-out;
    background-color: rgba(255, 255, 255, 0.2);
    color: rgba(72, 86, 88, 0.8);

}
</style>