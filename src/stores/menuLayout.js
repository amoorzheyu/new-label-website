/**
 * @description 菜单元素store
 */

import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useMenuLayoutStore = defineStore('menuLayout', () => {

    //菜单Dom
    let menuDom = ref(null)

    //是否显示菜单
    let isShowMenu = ref(false)

    watch(() => isShowMenu.value, (newValue) => {
        if (newValue) {
            menuDom.value.style.zIndex = 9999;
            menuDom.value.style.opacity = 1;

        } else {
            menuDom.value.style.zIndex = -1;
            menuDom.value.style.opacity = 0;
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

    //是否添加分类
    let isShowAddClass = ref(false)

    //是否显示设置
    let isShowSetting = ref(false)

    //是否显示切换主题
    let isShowSwitchTheme = ref(false)

    //将所有显示状态设为false
    let setAllFalse = () => {
        isShowEdit.value = false
        isShowRemoveFromDeskTop.value = false
        isShowAddToDeskTop.value = false
        isShowDelete.value = false
        isShowAddNavigation.value = false
        isShowAllNavigations.value = false
        isShowAddClass.value = false
        isShowSetting.value = false
        isShowSwitchTheme.value = false
    }

    //不同情况的菜单文本操作函数
    const menuTextStateFuns = {
        comment: () => {
            isShowAddNavigation.value = true
            isShowAllNavigations.value = true
            isShowSetting.value = true
            isShowSwitchTheme.value = true
        },
        sortItem: () => {
            isShowEdit.value = true
            isShowDelete.value = true
            isShowAddClass.value = true
            isShowSetting.value = true
            isShowSwitchTheme.value = true
        },
        navigationManagementInner: () => {
            isShowAddNavigation.value = true
            isShowAddClass.value = true
            isShowSetting.value = true
            isShowSwitchTheme.value = true
        },
        navigationItem: () => {
            isShowEdit.value = true
            isShowAddToDeskTop.value = true
            isShowDelete.value = true
            isShowAddNavigation.value = true
            isShowSetting.value = true
            isShowSwitchTheme.value = true
        }
    }

    //找到最近拥有menuName属性的父元素或自身
    let findParentWithMenuName = (dom) => {
        //如果为根元素
        if (dom === document.body) {
            return '';
        }

        let returnMenuName = '';
        let getMenuNameDomToParent = (dom) => {
            if (dom.hasAttribute('menuName')) {
                returnMenuName = dom.getAttribute('menuName')
                return;
            } else {
                //如果为根元素
                if (dom === document.body) {
                    return '';
                }
                if (dom.parentNode) {
                    getMenuNameDomToParent(dom.parentNode, returnMenuName)
                }
                else {
                    return;
                }
            }
        }
        if (dom.hasAttribute('menuName')) {

            returnMenuName = dom.getAttribute('menuName')
        } else {
            getMenuNameDomToParent(dom, returnMenuName)
        }
        return returnMenuName;
    }

    //设置菜单文本
    const setMenuTextState = (target) => {

        setAllFalse();
        let menuName = findParentWithMenuName(target);
        switch (menuName) {
            case 'sortItem':
                menuTextStateFuns['sortItem']();
                break;
            case 'navigationManagementInner':
                menuTextStateFuns['navigationManagementInner']();
                break;
            case 'navigationItem':
                menuTextStateFuns['navigationItem']();
                break;
            default:
                menuTextStateFuns['comment']();
                break;
        }


    }

    //通过坐标设置菜单位置
    const setMenuPosition = (x, y, Dx, Dy, dx, dy) => {
        let posX = (x + dx <= Dx) ? x : x - dx;
        let posY = (y + dy <= Dy) ? y : y - dy;

        return { posX, posY };
    }

    //右键点击
    let menuClickSlove = (e) => {
        let { clientX, clientY, target } = e

        //视窗宽高
        let { innerWidth, innerHeight } = window

        //菜单宽高
        let { width, height } = menuDom.value.getBoundingClientRect()

        setMenuTextState(target)

        let { posX, posY } = setMenuPosition(clientX, clientY, innerWidth, innerHeight, width, height)

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
        isShowAddClass,
        isShowSetting,
        isShowSwitchTheme,
        menuClickSlove
    }

})