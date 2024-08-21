<script setup>
import { storeToRefs } from 'pinia'
// pinia-> useLayoutElementStore
import { useLayoutElementStore } from '@/stores/layoutElement'
let { isShowSearch } = storeToRefs(useLayoutElementStore())

</script>
<template>
    <div v-show="!isShowSearch " class="h-[80px]" ></div>
    <div v-show="isShowSearch" class="flex justify-center">
        <div class="w-[1000px] h-[80px] flex justify-center relative">
            <div
                class="button-class absolute z-10 left-[65px] top-[16px] flex items-center justify-center bg-[var(--ground-glass-background-color)] backdrop-blur-2xl  rounded-[32px] w-[130px] h-[50px]">
                <div class="button-inner-class">
                    <div>

                    </div>
                    <div>百度</div>
                </div>
            </div>
            <div><input placeholder="百度一下"
                    class="input-class bg-[var(--ground-glass-boardr-color)] backdrop-blur-xl w-[900px] h-[80px]  rounded-[52px] shadow-md" />
            </div>
            <div
                class="button-class absolute z-10 right-[60px] top-[16px] flex items-center justify-center bg-[var(--ground-glass-background-color)] backdrop-blur-2xl  rounded-[32px] w-[50px] h-[50px]">
                <div class="w-[30px] h-[30px] text-[var(--ground-glass-icon-color)] button-inner-class">
                    <svg viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="1.5" d="m17 17l4 4M3 11a8 8 0 1 0 16 0a8 8 0 0 0-16 0"></path>
                    </svg>
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

    @apply hover:scale-110  hover:bg-[var(--ground-glass-background-hover-color)] transition-all duration-200 ease-in-out
}

.button-class:hover .button-inner-class {
    transition: all 0.2s ease-in-out;
    transform: scale(1.2);
}
</style>