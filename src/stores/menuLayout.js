/**
 * @description 菜单元素store
 */

import { ref, computed,watch } from 'vue'
import { defineStore } from 'pinia'

export const useMenuLayoutStore = defineStore('menuLayout', () => {

    //菜单Dom
    let menuDom = ref(null)

    //是否显示菜单
    let isShowMenu = ref(false)

    watch(() => isShowMenu.value, (newValue) => {
        if (newValue) {
            menuDom.value.style.zIndex = 999;
        } else {
            menuDom.value.style.zIndex = -1;
        }
    })

    //是否显示编辑
    let isShowEdit = ref(false)

    //是否显示移出桌面
    let isShowRemoveFromDeskTop = ref(false)

    //是否显示添加为桌面导航
    let isShowAddToDeskTop = ref(false)

    //是否显示删除
    let isShowDelete = ref(false)

    //是否显示添加导航
    let isShowAddNavigation = ref(false)

    //是否显示全部导航
    let isShowAllNavigations = ref(false)

    //是否显示设置
    let isShowSetting = ref(false)

    //是否显示切换主题
    let isShowSwitchTheme = ref(false)

    //右键点击
    let menuClickSlove = (e) => {
        let {clientX, clientY,target } = e

        //视窗宽高
        let { innerWidth, innerHeight } = window
        // console.log(innerWidth,innerHeight)
        //菜单宽高
        let { width, height } = menuDom.value.getBoundingClientRect()

        //TODO:判断触发元素并设置菜单内容

        //TODO:判断触发位置及边角距离设置菜单位置

        //无逻辑测试
        let posX = clientX+width/2;
        let posY = clientY;

        console.log(clientX,clientY)
        menuDom.value.style.left = posX + 'px'
        menuDom.value.style.top = posY + 'px'

        isShowMenu.value = true
    }

    return {
        menuDom,
        isShowMenu,
        isShowEdit,
        isShowRemoveFromDeskTop,
        isShowAddToDeskTop,
        isShowDelete,
        isShowAddNavigation,
        isShowAllNavigations,
        isShowSetting,
        isShowSwitchTheme,
        menuClickSlove
    }

})