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

    //点击切换主题
    function changeTheme(index) {
        if(index==0) index = 1
        else index = 0
        nowThemeIndex.value = index
        document.body.className = nowThemeClassName.value
    }

    //初始化主题
    function initTheme() {
        document.body.className = nowThemeClassName.value
    }

    return {
        themeList,
        nowThemeIndex,
        nowThemeClassName,
        initTheme,
        changeTheme
    }
},{
    persist: {
        storage: localStorage,
        paths: ['nowThemeIndex']
    }
})