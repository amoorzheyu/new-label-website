<script setup>
import { ref } from 'vue'
let isShow = ref(true)


</script>
<template>
    <div>
        <div>
            <el-dialog modal-class="modal-myClass" v-model="isShow">
                <template #footer>
                    <div>
                        设置
                    </div>
                </template>
            </el-dialog>
        </div>
    </div>
</template>
<style scoped>
::v-deep(.modal-myClass) {
    @apply backdrop-blur-xl
}

::v-deep(.el-dialog){
    border-radius: 12px;
}
</style>