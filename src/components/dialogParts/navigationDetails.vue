<script setup>
import { ref, nextTick, computed } from 'vue'
import { storeToRefs } from 'pinia';
import { ElMessage, ElMessageBox } from 'element-plus'

// pinia->useNavigationBarStore
import { useNavigationBarStore } from '@/stores/navigationBar'
let { isShowNavigationDetailPanel, navigationDetailPanelType, sortNameList, navigationDetailItem } = storeToRefs(useNavigationBarStore())
const { addSort, getWebsiteInfo, addNewNavigation, saveNavigationDetailEdit } = useNavigationBarStore()

//表单dom
let form = ref(null)

//当前导航详情对话框类型名称
let navigationDetailPanelTypeName = computed(() => {
    switch (navigationDetailPanelType.value) {
        case 'add':
            return '新增导航'
        case 'fix':
            return '编辑导航'
    }
})

const rules = ref({
    url: [
        { required: true, message: '请输入完整网址', trigger: 'blur' },
        { type: 'url', message: '请输入正确的网址', trigger: ['blur', 'change'] }
    ],
    name: [
        { required: true, message: '请输入导航名称', trigger: 'blur' },
        //设置不全为空格
        {
            validator: (rule, value, callback) => {
                if (value.replace(/\s/g, '') == '') {
                    callback(new Error('导航名称不能为空'))
                } else {
                    callback()
                }
            }
        }
    ],
    icon: [
        { required: true, message: '请输入图标链接', trigger: 'blur' },
        { type: 'url', message: '请输入正确的图标链接', trigger: ['blur'] }
    ],
    sortId: [
        { required: true, message: '请选择分类', trigger: 'change' }
    ]
})

//新增分类输入框值
let newOptValue = ref('')

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
    let value = newOptValue.value;

    value = value.trim();


    if (!value) {
        ElMessage({
            message: '分类名不能为空',
            type: 'error',
        })
        return;
    }

    if (!checkSortNameRepeat(value)) {
        addSort(value);
        //新增分类的id
        let newSortId = sortNameList.value[sortNameList.value.length - 1].id;
        navigationDetailItem.value.sortId = newSortId;
        ElMessage({
            message: '新增分类成功',
            type: 'success',
        })
        newOptValue.value = '';
    } else {
        ElMessage({
            message: '分类名重复',
            type: 'error',
        })
    }

}

//当前是否正在加载网站信息
let isLoadingWebsiteInfo = ref(false);


//获取网站信息点击事件
const getWebsiteInfoEvent = async () => {

    let url = navigationDetailItem.value.url;
    url = url.trim();
    if (!url) {
        ElMessage({
            message: '网址不能为空',
            type: 'error',
        })
        return;
    }

    isLoadingWebsiteInfo.value = true;

    try {
        let { iconUrl, title } = await getWebsiteInfo(url);

        //去前后空格
        iconUrl = iconUrl.trim();
        title = title.trim();

        if (!iconUrl) {
            iconUrl = -1;
        }
        if (!title) {

            title = -1;
        }


        if (iconUrl == -1) {
            ElMessage({
                message: '获取图标失败',
                type: 'error',
            })
        } else {
            ElMessage({
                message: '获取图标成功',
                type: 'success',
            })
            navigationDetailItem.value.icon = iconUrl;
            navigationDetailItem.value.iconType = 'Icon';
        }

        if (title == -1) {
            ElMessage({
                message: '获取网站名称失败',
                type: 'error',
            })
        } else {
            ElMessage({
                message: '获取网站名称成功',
                type: 'success',
            })
            navigationDetailItem.value.name = title;
        }
        isLoadingWebsiteInfo.value = false;
    } catch (e) {
        ElMessage({
            message: '获取网站信息失败',
            type: 'error',
        })
        isLoadingWebsiteInfo.value = false;
    }
}

//保存我的提交
const saveMyChange = async () => {
    if (navigationDetailPanelType.value == 'add') {
        try {
            await form.value.validate();
            //添加导航
            addNewNavigation(navigationDetailItem.value)
            isShowNavigationDetailPanel.value = false;
            ElMessage({
                message: '新增导航成功',
                type: 'success',
            })
        } catch (e) {
            ElMessage({
                message: '请填写完整信息',
                type: 'error',
            })
        }
    } else if (navigationDetailPanelType.value == 'edit') {

        try {
            await form.value.validate();

            //保存当前导航修改
            saveNavigationDetailEdit();
            isShowNavigationDetailPanel.value = false;
            ElMessage({
                message: '编辑导航成功',
                type: 'success',
            })
        } catch (e) {
            console.error(e);
            ElMessage({
                message: '请填写完整信息',
                type: 'error',
            })
        }
    }
}

</script>
<template>
    <div>
        <div class=" overflow-hidden">
            <el-dialog modal-class="modal-myClass" v-model="isShowNavigationDetailPanel">
                <div class="">
                    <div class="text-[22px] font-[400] text-[var(--dialog-text-color)]">
                        {{ navigationDetailPanelTypeName }}
                    </div>
                    <div class="flex mt-[30px] min-h-[505px] justify-between mr-[30px]">
                        <div
                            class="bg-[var(--background-color-dialog-area-box)] w-[655px] rounded-3xl shadow-sm flex flex-col px-[30px] pt-[30px] pb-[50px] text-[18px]">

                            <el-form :rules="rules" :model="navigationDetailItem" require-asterisk-position="right"
                                ref="form" label-width="auto" label-position="top">

                                <el-form-item label="完整网址" prop="url">
                                    <el-input v-model="navigationDetailItem.url"
                                        placeholder="https://szcyyds.blog.csdn.net"></el-input>
                                    <el-button size="large" type="primary" :loading="isLoadingWebsiteInfo"
                                        class="!w-[100px]" @click="getWebsiteInfoEvent">获取信息</el-button>
                                </el-form-item>
                                <el-form-item label="导航名称" prop="name">
                                    <el-input v-model="navigationDetailItem.name" placeholder="桑桑新标签"></el-input>
                                </el-form-item>
                                <el-form-item label="图标类型:"
                                    class="icon-type-part-class !flex items-center justify-center">
                                    <el-radio-group v-model="navigationDetailItem.iconType" class="">
                                        <el-radio label="Text">文字</el-radio>
                                        <el-radio label="Icon">图标</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="是否显示在桌面:" class="!flex items-center isShowOnDesktop-part-class">
                                    <el-switch v-model="navigationDetailItem.isShowOnDesktop" size="large"></el-switch>
                                </el-form-item>
                                <el-form-item v-if="navigationDetailItem.iconType == 'Icon'" label="图标链接" prop="icon">
                                    <el-input v-model="navigationDetailItem.icon"
                                        placeholder="https://szcyyds.blog.csdn.net/favicon.ico"></el-input>
                                </el-form-item>
                                <el-form-item label="分类" prop="sortId">
                                    <el-select v-model="navigationDetailItem.sortId" :teleported="false" filterable
                                        placeholder="请选择分类" popper-class="select-popper-class">
                                        <el-option v-for="item in sortNameList" :key="item.id" :label="item.name"
                                            :value="item.id" />
                                        <template #footer>
                                            <div class="flex">
                                                <el-input v-model="newOptValue" class="option-input mb-2 mt-2 h-[40px]"
                                                    placeholder="请输入新分类名" />
                                                <el-button type="primary" @click="addSortEvent" class="mt-[6px]">
                                                    确定
                                                </el-button>
                                            </div>

                                        </template>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div
                            class="bg-[var(--background-color-dialog-area-box)] w-[255px] rounded-3xl shadow-sm relative">
                            <div
                                class="text-[var(--dialog-text-color)] text-[20px] font-[548] top-[5%] left-[10%]  absolute">
                                预览</div>
                            <div
                                class="bg-[var(--deskNavigation-items-background-color)] text-[var(--deskNavigation-items-text-color)] handleNavigation absolute overflow-hidden pt-[5px] flex flex-col items-center justify-around mx-[10px] w-[130px] h-[125px] mt-[20px] rounded-2xl shadow-lg border-[#00000013] border-[2px] top-[35%] left-[46%] translate-x-[-50%]">
                                <div class=" relative z-10">
                                    <div v-show="navigationDetailItem.iconType == 'Icon'"
                                        class="w-[55px] h-[55px] rounded-2xl">
                                        <img :src="navigationDetailItem.icon" alt="" srcset=""
                                            class="w-[100%] h-[100%] rounded-xl">
                                    </div>
                                    <div v-show="navigationDetailItem.iconType == 'Text'"
                                        class="text-[#94b1e5] w-[50px] h-[50px] flex text-[40px] justify-center font-[950] mt-[-5px]">
                                        {{ navigationDetailItem.name[0] }}
                                    </div>
                                </div>
                                <div class=" h-[30px] leading-[30px] w-[80%] relative z-50">
                                    <el-tooltip class="box-item" :disabled="true" effect="light"
                                        :content="navigationDetailItem.name" placement="bottom-start">
                                        <div class="truncate  text-center  font-[550]" ref="navigationTextList">{{
                                            navigationDetailItem.name }}
                                        </div>
                                    </el-tooltip>
                                </div>
                                <div class="absolute opacity-15 -rotate-[40deg] top-[0%] left-[45%]">
                                    <div v-show="navigationDetailItem.iconType == 'Icon'"
                                        class="w-[120px] h-[120px] rounded-2xl translate-x-[0%] translate-y-[10%] rotate-[10deg]">
                                        <img :src="navigationDetailItem?.icon" alt="" srcset=""
                                            class="w-[100%] h-[100%] rounded-2xl">
                                    </div>
                                    <div v-show="navigationDetailItem.iconType == 'Text'"
                                        class="text-[#94b1e5] text-[115px] justify-center font-[950] mt-[-10px]">
                                        {{ navigationDetailItem.name[0] }}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end items-center mr-[30px] mb-[-15px] h-[100px] footer-part">
                        <el-button size="large" type="primary" @click="saveMyChange">保存</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<style scoped>
::v-deep(.el-form-item) {
    @apply !mb-[35px];
}

::v-deep(.el-select-dropdown__item) {
    @apply !text-[18px] !h-[45px] leading-[45px];
}

::v-deep(.el-select__wrapper) {
    @apply h-[45px] rounded-lg text-[18px];
}

::v-deep(.isShowOnDesktop-part-class .el-switch) {
    @apply mt-[-5px];
}

::v-deep(.icon-type-part-class .el-radio__label) {
    @apply !text-[18px];
}

::v-deep(.icon-type-part-class .el-radio-group) {
    @apply mt-[-8px] ml-5;
}

::v-deep(.icon-type-part-class .el-radio__input) {
    @apply flex items-center justify-center;
}

::v-deep(.icon-type-part-class .el-radio__inner) {
    @apply w-[20px] h-[20px];
}


::v-depp(.el-form-item) {
    @apply !mb-[50px];
}

::v-deep(.el-form-item__label) {
    @apply !text-[18px];
}

::v-deep(.el-form-item__content) {
    @apply flex-nowrap;
}

::v-deep(.el-button:active) {
    @apply !bg-[var(--navDetail-getMess-button-active-background-color)]
}

::v-deep(.el-button:hover) {
    @apply text-[#4e7dd4] bg-[var(--navDetail-getMess-button-hover-background-color)];
}

::v-deep(.el-button) {
    @apply !w-[120px] h-[43px] rounded-lg text-[18px] ml-3 text-[#4e7dd4] bg-[var(--navDetail-getMess-button-background-color)] border-none;
}

::v-deep(.el-form-item:nth-child(1) .el-input__wrapper) {
    @apply rounded-lg h-[42px] text-[18px];
}

::v-deep(.el-form-item:nth-child(2) .el-input__wrapper) {
    @apply rounded-lg h-[42px] text-[18px];
}

::v-deep(.el-form-item:nth-child(5) .el-input__wrapper) {
    @apply rounded-lg h-[42px] text-[18px];
}

::v-deep(.el-form-item__label) {
    @apply text-[var(--dialog-text-color)]
}

::v-deep(.el-radio__label) {
    @apply text-[var(--dialog-text-color)]
}

.title-part-class {
    padding-bottom: 10px;
    margin-top: 30px;
}

.title-part-class::after {
    content: '*';
    color: red;
    margin-left: 5px;
}

/* 以下为修改el开关的样式 */
::v-deep(.el-switch__core) {
    @apply bg-[var(--switch-background-color)] border-none;
}

::v-deep(.el-switch--large) {
    @apply scale-[120%];
}

/* 以下为修改el按钮的样式 */
::v-deep(.footer-part .el-button) {
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

::v-deep(.el-input__wrapper) {
    @apply bg-[var(--navDetail-input-inner-background-color)];
}

::v-deep(.el-input__inner) {
    @apply text-[var(--dialog-text-color)];
}

::v-deep(.el-select__wrapper) {
    @apply bg-[var(--navDetail-input-inner-background-color)];
}

::v-deep(.el-select-dropdown) {
    @apply bg-[var(--navDetail-input-inner-background-color)];
}

::v-deep(.is-hovering) {
    @apply !bg-[var(--navDetail-input-inner-background-color)];
}

::v-deep(.el-select__selected-item) {
    @apply text-[var(--navDetail-select-text-color)];
}

::v-deep(.el-select-dropdown__item) {
    @apply text-[var(--navDetail-select-text-color)];
}
</style>