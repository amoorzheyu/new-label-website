/**
 * @description 布局元素store
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutElementStore = defineStore('layoutElement', () => {
    let isShowTopMenu = ref(true)// 是否显示顶部菜单
    let isShowDatePart = ref(true) //是否显示日期
    let isShowSearch = ref(true)// 是否显示搜索框
    let isShowNavigationBar = ref(true)// 是否显示导航栏

    return {
        isShowTopMenu,
        isShowDatePart,
        isShowSearch,
        isShowNavigationBar
    }
})