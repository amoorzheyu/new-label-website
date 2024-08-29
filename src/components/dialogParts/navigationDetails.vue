<script setup>
import { ref, nextTick, computed } from 'vue'
import { storeToRefs } from 'pinia';
import { ElMessage, ElMessageBox } from 'element-plus'

// pinia->useNavigationBarStore
import { useNavigationBarStore } from '@/stores/navigationBar'
let { isShowNavigationDetailPanel, navigationDetailPanelType } = storeToRefs(useNavigationBarStore())

//TODO:test
isShowNavigationDetailPanel.value = true

//当前导航详情对话框类型名称
let navigationDetailPanelTypeName = computed(() => {
    switch (navigationDetailPanelType.value) {
        case 'add':
            return '新增导航'
        case 'fix':
            return '编辑导航'
    }
})

//当前默认内容
let navigationDetailItem = ref({
    url: '',
    name: '',
    iconType: 'Text',
    isShowOnDesktop: false,
    icon: '',
})


</script>
<template>
    <div>
        <div class=" overflow-hidden">
            <el-dialog modal-class="modal-myClass" @closed="closedDialog" v-model="isShowNavigationDetailPanel">
                <div>
                    <div class="text-[22px] font-[400] text-[var(--dialog-text-color)]">
                        {{ navigationDetailPanelTypeName }}
                    </div>
                    <div class="flex mt-[30px] min-h-[505px] justify-between mr-[30px]">
                        <div
                            class="bg-[#fff] w-[655px] rounded-3xl shadow-sm flex flex-col px-[30px] pt-[30px] pb-[50px] text-[18px]">
                            <div>
                                <div class="title-part-class">完整网址</div>
                                <div>
                                    <div><el-input v-model="input" style="width: 240px" placeholder="Please input"
                                            clearable /></div>
                                    <div></div>
                                </div>
                            </div>
                            <div>
                                <div class="title-part-class">导航名称</div>
                                <div></div>
                            </div>
                            <div>
                                <div class="title-part-class">图标类型</div>
                                <div></div>
                            </div>
                            <div>
                                <div class="title-part-class">显示在桌面</div>
                                <div></div>
                            </div>
                            <div v-show="navigationDetailItem.iconType == 'Icon'">
                                <div class="title-part-class">图标链接</div>
                                <div></div>
                            </div>
                            <div>
                                <div class="title-part-class">分类</div>
                                <div></div>
                            </div>
                        </div>
                        <div class="bg-[#fff] w-[255px] rounded-3xl shadow-sm"></div>
                    </div>
                    <div class="flex justify-end items-center mr-[30px] mb-[-15px] h-[100px]">
                        <el-button size="large" type="primary">保存</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<style scoped>

.title-part-class{
    padding-bottom: 10px;
}

.title-part-class::after {
    content: '*';
    color: red;
    margin-left: 5px;
}

/* 以下为修改el按钮的样式 */
::v-deep(.el-button) {
    @apply w-[80px] h-[50px] rounded-xl text-[18px];
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
    @apply pl-[30px] pr-[8px] pt-[25px] bg-[var(--background-color-dialog-large-box)] w-[1000px] mt-0 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%];
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