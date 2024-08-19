/**
 * @description 主题样式
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeSwapStore = defineStore('themeSwap', () => {
    
    // 主题列表
    let themeList = ref([
        {
            id: 0,
            name: 'light',
            className: 'light-theme'
        },
        {
            id: 1,
            name: 'dark',
            className: 'dark-theme'
        }
    ])

    // 当前主题索引
    let nowThemeIndex = ref(0)

    //当前主题类名
    let nowThemeClassName = computed(() => {
        return themeList.value[nowThemeIndex.value].className
    })


    return {
        themeList,
        nowThemeIndex,
        nowThemeClassName
    }
})