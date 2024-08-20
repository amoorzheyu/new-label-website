<script setup>

</script>
<template>
    <div class="flex justify-center">
        <div class="w-[1000px] h-[80px] flex justify-center relative">
            <div
                class="button-class absolute z-10 left-[65px] top-[16px] flex items-center justify-center bg-[#fff] bg-opacity-15 backdrop-blur-2xl  rounded-[32px] w-[130px] h-[50px]">
                <div class="button-inner-class">
                    <div>

                    </div>
                    <div>百度</div>
                </div>
            </div>
            <div><input placeholder="百度一下"
                    class="input-class bg-[#fff] bg-opacity-10 backdrop-blur-xl w-[900px] h-[80px]  rounded-[52px] shadow-md" />
            </div>
            <div
                class="button-class absolute z-10 right-[60px] top-[16px] flex items-center justify-center bg-[#fff] bg-opacity-15 backdrop-blur-2xl  rounded-[32px] w-[50px] h-[50px]">
                <div class="w-[30px] h-[30px] text-[#dddedb] button-inner-class">
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
    box-shadow: 0px 0px 2px 0px #fffc;

    @apply hover:scale-110  hover:bg-[#fff] hover:text-[#e8e6e6] hover:bg-opacity-20 transition-all duration-200 ease-in-out
}

.button-class:hover .button-inner-class {
    transition: all 0.2s ease-in-out;
    transform: scale(1.2);
}
</style>