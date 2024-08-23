/**
 * @description 主题样式
 */

import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

// pinia-> useSettingOptStore
import { useSettingOptStore } from '@/stores/settingopt'

export const useThemeSwapStore = defineStore('themeSwap', () => {

    let { isDarkMode } = storeToRefs(useSettingOptStore())
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
    const changeTheme=(index)=> {
        if (index == 0) {
            index = 1
            isDarkMode.value = true;
        }
        else {
            index = 0
            isDarkMode.value = false;
        }
        nowThemeIndex.value = index
        document.body.className = nowThemeClassName.value
    }

    //初始化主题
    const initTheme=()=> {
        document.body.className = nowThemeClassName.value
    }

    return {
        themeList,
        nowThemeIndex,
        nowThemeClassName,
        initTheme,
        changeTheme
    }
}, {
    persist: {
        storage: localStorage,
        paths: ['nowThemeIndex']
    }
})