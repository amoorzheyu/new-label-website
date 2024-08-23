/**
 * @description 设置有关选项
 */

import { ref, computed, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

// pinia->useThemeSwapStore
import { useThemeSwapStore } from '@/stores/themeSwap'


// pinia-> useLayoutElementStore
import { useLayoutElementStore } from '@/stores/layoutElement'

export const useSettingOptStore = defineStore('settingOpt', () => {

    const  themeSwap  = useThemeSwapStore()
    let isDarkMode = ref(false)// 是否为暗黑模式

    //监听暗黑模式
    watch(isDarkMode, (newValue, oldValue) => {
        if (newValue) {
            themeSwap.changeTheme(0)
        } else {
            themeSwap.changeTheme(1)
        }
    })

    let { isShowTopMenu, isShowDatePart, isShowSearch, isShowNavigationBar, isAdaptiveNavigationWidth, isSwapTobuttomNavigation } = storeToRefs(useLayoutElementStore())

    return { isDarkMode, isShowTopMenu, isShowDatePart, isShowSearch, isShowNavigationBar, isAdaptiveNavigationWidth, isSwapTobuttomNavigation }
})