/**
 * @description 导航栏
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNavigationBarStore = defineStore('navigationBar', () => {

    /**
     * 获取网站图标APIhttps://api.oioweb.cn/api/site/favicon?url=
     * 获取网站标题 https://v2.api-m.com/api/title?url=
     */
    //显示的导航栏
    let showingNavigationList = ref([])

    //所有导航栏
    //🌹编了一些数据
    let allNavigationList = ref([
        {
            id: 0,
            name: '默认1111111111111111111',
            items: [
                {
                    id: 0,
                    url: '',
                    name: '项目1-0',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 0,
                },
                {
                    id: 1,
                    url: '',
                    name: '项目 1-1',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 1,
                },
                {
                    id: 2,
                    url: '',
                    name: '项目 1-2',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 2,
                },   {
                    id: 1,
                    url: '',
                    name: '项目 1-1',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 1,
                },
                {
                    id: 2,
                    url: '',
                    name: '项目 1-2',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 2,
                },
                {
                    id: 0,
                    url: '',
                    name: '项目1-0',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 0,
                },
                {
                    id: 1,
                    url: '',
                    name: '项目 1-1',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 1,
                },
                {
                    id: 2,
                    url: '',
                    name: '项目 1-2',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 2,
                },   {
                    id: 1,
                    url: '',
                    name: '项目 1-1',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 1,
                },
                {
                    id: 2,
                    url: '',
                    name: '项目 1-2',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 2,
                },
                {
                    id: 1,
                    url: '',
                    name: '项目 1-1',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 1,
                },
                {
                    id: 2,
                    url: '',
                    name: '项目 1-2',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 2,
                },   {
                    id: 1,
                    url: '',
                    name: '项目 1-1',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 1,
                },
                {
                    id: 2,
                    url: '',
                    name: '项目 1-2',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 2,
                }
            ]
        },
        {
            id: 1,
            name: '导航 1',
            items: [
                {
                    id: 1,
                    url: '',
                    name: '项目 1-1',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 1,
                },
                {
                    id: 2,
                    url: '',
                    name: '项目 1-2',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 2,
                }
            ]
        },
        {
            id: 2,
            name: '导航 2',
            items: [
                {
                    id: 3,
                    url: '',
                    name: '项目 2-1',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 3,
                    sortName: '项目 2-1'
                },
                {
                    id: 4,
                    url: '',
                    name: '项目 2-2',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 4,
                    sortName: '项目 2-2'
                }
            ]
        },
        {
            id: 3,
            name: '导航 3',
            items: [
                {
                    id: 5,
                    url: '',
                    name: '项目 3-1',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 5,
                    sortName: '项目 3-1'
                },
                {
                    id: 6,
                    url: '',
                    name: '项目 3-2',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 6,
                    sortName: '项目 3-2'
                }
            ]
        }
    ]);

    //当前选中分类索引
    let currentNavigationIndex = ref(0)

    //点击切换当前分类
    let changeCurrentNavigation = (index) => {
        currentNavigationIndex.value = index
    }
    
    //当前分类内容列表
    let currentNavigationList = computed(() => {
        return allNavigationList.value[currentNavigationIndex.value].items
    })

    //导航栏名字列表
    let navigationNameList = computed(() => {
        let list = []
        allNavigationList.value.forEach(item => {
            let newItem = {}
            newItem.id = item.id
            newItem.name = item.name
            list.push(newItem)
        })
        return list
    })

    return {
        showingNavigationList,
        allNavigationList,
        navigationNameList,
        currentNavigationList,
        currentNavigationIndex,
        changeCurrentNavigation
    }
})