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
                    <div class="button-inner-class flex text-[20px] items-center justify-between w-[95px]">
                        <div class="">
                            <svg data-v-92a36aee="" viewBox="0 0 24 24" width="1em" height="1em" class="text-3xl"><path d="M6.217 12.486c1.964-.422 1.693-2.772 1.637-3.287c-.096-.788-1.028-2.172-2.291-2.061c-1.588.141-1.821 2.44-1.821 2.44c-.216 1.06.515 3.33 2.475 2.908m3.646-3.944c1.084 0 1.959-1.251 1.959-2.792c0-1.537-.871-2.785-1.955-2.785c-1.086 0-1.966 1.242-1.966 2.785s.88 2.792 1.965 2.792m4.671.186c1.454.195 2.38-1.355 2.568-2.53c.188-1.166-.754-2.528-1.776-2.763c-1.031-.237-2.303 1.411-2.431 2.484c-.136 1.318.188 2.627 1.634 2.813m5.751 1.973c0-.562-.46-2.253-2.19-2.253c-1.729 0-1.965 1.596-1.965 2.726c0 1.077.089 2.573 2.247 2.528c2.148-.052 1.913-2.438 1.913-3.002M18.1 15.626s-2.247-1.739-3.557-3.613c-1.776-2.768-4.304-1.64-5.144-.239c-.845 1.418-2.153 2.306-2.339 2.544c-.188.232-2.709 1.596-2.147 4.079c.563 2.483 2.528 2.439 2.528 2.439s1.446.142 3.133-.234c1.686-.375 3.13.091 3.13.091s3.92 1.317 5.005-1.212c1.072-2.537-.61-3.847-.61-3.847" fill="currentColor"></path></svg>
                        </div>
                        <div class="font-bold">{{ searchEngineName }}</div>
                        <div>
                        <svg data-v-92a36aee="" viewBox="0 0 24 24" width="1em" height="1em"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 9l6 6l6-6"></path></svg>
                    </div>
                    </div>
                </div>
                <!-- 搜索引擎下拉 -->
                <div class="button-dropList absolute left-[50px] top-[68px] z-10  pt-[20px]">
                    <div
                        class="flex-col items-center justify-center text-center p-2 bg-[var(--ground-glass-background-color)] backdrop-blur-xl rounded-[16px] ">
                        <div class="button-dropList-item rounded-[32px]  w-[130px] p-[10px] m-1 text-[20px]"
                            v-for="(item, index) in searchEnginesMess" @click="changeSearchEngine(index)">
                            <div class="flex justify-center items-center">
                                <div class="mr-[5px]">
                                    <div v-show="index==0"><svg data-v-92a36aee="" viewBox="0 0 24 24" width="1em" height="1em" class="text-3xl"><path d="M6.217 12.486c1.964-.422 1.693-2.772 1.637-3.287c-.096-.788-1.028-2.172-2.291-2.061c-1.588.141-1.821 2.44-1.821 2.44c-.216 1.06.515 3.33 2.475 2.908m3.646-3.944c1.084 0 1.959-1.251 1.959-2.792c0-1.537-.871-2.785-1.955-2.785c-1.086 0-1.966 1.242-1.966 2.785s.88 2.792 1.965 2.792m4.671.186c1.454.195 2.38-1.355 2.568-2.53c.188-1.166-.754-2.528-1.776-2.763c-1.031-.237-2.303 1.411-2.431 2.484c-.136 1.318.188 2.627 1.634 2.813m5.751 1.973c0-.562-.46-2.253-2.19-2.253c-1.729 0-1.965 1.596-1.965 2.726c0 1.077.089 2.573 2.247 2.528c2.148-.052 1.913-2.438 1.913-3.002M18.1 15.626s-2.247-1.739-3.557-3.613c-1.776-2.768-4.304-1.64-5.144-.239c-.845 1.418-2.153 2.306-2.339 2.544c-.188.232-2.709 1.596-2.147 4.079c.563 2.483 2.528 2.439 2.528 2.439s1.446.142 3.133-.234c1.686-.375 3.13.091 3.13.091s3.92 1.317 5.005-1.212c1.072-2.537-.61-3.847-.61-3.847" fill="currentColor"></path></svg></div>
                                    <div v-show="index==1"><svg data-v-92a36aee="" viewBox="0 0 24 24" width="1em" height="1em" class="text-3xl"><path d="M5.71 3l3.593 1.264v12.645l5.061-2.919l-2.48-1.165l-1.566-3.897l7.974 2.802v4.073l-8.984 5.183l-3.595-2L5.71 3z" fill="currentColor"></path></svg></div>
                                    <div v-show="index==2"><svg data-v-92a36aee="" viewBox="0 0 24 24" width="1em" height="1em" class="text-3xl"><path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28a5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934a8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934c0-.528-.081-1.097-.202-1.625z" fill="currentColor"></path></svg></div>
                                </div>
                                <div class="font-bold">{{ item.name }}</div>
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
    padding-right: 120px;
    font-size: 21px;
}

.input-class::placeholder {
    color: #c0bdb8;
}

.button-class {
    border: 1px solid #fff3;
    /* 透明边框以避免影响布局 */
    box-shadow: 0px 0px 1px 0px #fffc;

    @apply hover:scale-[105%] hover:bg-[var(--ground-glass-background-hover-color)] transition-all duration-200 ease-in-out
}

.button-class:hover .button-inner-class {
    transition: all 0.2s ease-in-out;
    transform: scale(1.1);
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