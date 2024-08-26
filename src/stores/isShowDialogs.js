/**
 * @description  控制各种对话框的显示
 */


import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useIsShowDialogsStore = defineStore('isShowDialogs', () => {
    let isShowSettingDialog = ref(false)
    

    let isShowNavigationManagementDialog = ref(false)
    

    return { isShowSettingDialog,isShowNavigationManagementDialog }
})