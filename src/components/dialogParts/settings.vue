<script setup>
import { ref } from 'vue'
let isShow = ref(true)


</script>
<template>
    <div>
        <div>
            <el-dialog modal-class="modal-myClass" v-model="isShow">
                <!-- <template #footer>
                    <div>
                        设置
                    </div>
                </template> -->
                <div>
                    <div class="text-[20px] font-[400]">
                        设置
                    </div>
                    <div>
                        <el-scrollbar always height="400px" class=" mt-[32px]">
                            <div>
                                <div class="bg-[#fff] mr-[23px] rounded-xl" >
                                    <div class="text-center" v-for="i in 100">{{ i }}</div>
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
::v-deep(.modal-myClass) {
    @apply backdrop-blur-xl
}

::v-deep(.el-dialog) {
    border-radius: 12px;
    @apply pl-[30px] pr-[8px] pt-[25px] bg-[#f5f5f5]
}

::v-deep(.el-dialog__header) {
    @apply inline-block absolute right-[20px] top-[20px]
}

::v-deep(.el-dialog__close) {
    @apply bg-transparent hover:bg-[#dfdfdf]  rounded  ;
    width: 1.5rem;
    height: 1.5rem;
}

::v-deep(.el-dialog__close>svg) {
    /* color: red; */
    @apply text-[#666666];
    width: 1.5rem;
    height: 1.5rem;
}

::v-deep(.el-dialog__headerbtn:hover){
    /* @apply bg-[#ccc] text */
}
</style>