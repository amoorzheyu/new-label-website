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
                    iconType: 'Icon',
                    isShowOnDesktop: true,
                    icon: 'https://blog.csdn.net/favicon.ico',
                    sortId: 0,
                },
                {
                    id: 1,
                    url: '',
                    name: '1',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 1,
                },
                {
                    id: 2,
                    url: '',
                    name: '2',
                    iconType: 'Icon',
                    isShowOnDesktop: true,
                    icon: 'https://blog.csdn.net/favicon.ico',
                    sortId: 0,
                },
                {
                    id: 3,
                    url: '',
                    name: '3',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 1,
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
        },
        {
            id: 4,
            name: '导航 4',
            items: [
                {
                    id: 5,
                    url: '',
                    name: '项目 4-1',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 5,
                    sortName: '项目 4-1'
                },
                {
                    id: 6,
                    url: '',
                    name: '项目 4-2',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 6,
                    sortName: '项目 4-2'
                }
            ]
        },
        {
            id: 5,
            name: '导航 5',
            items: [
                {
                    id: 0,
                    url: '',
                    name: '项目 5-1',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 5,
                    sortName: '项目 5-1'
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
        },
        {
            id: 6,
            name: '导航 6',
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
    let currentSortIndex = ref(0)

    //点击切换当前分类
    let changeCurrentNavigation = (index) => {
        currentSortIndex.value = index
    }
    
    //当前分类内容列表
    let currentSortList = computed(() => {
        return allNavigationList.value[currentSortIndex.value].items;
    })

    //导航栏名字列表
    let sortNameList = computed(() => {
        let list = []
        allNavigationList.value.forEach(item => {
            let newItem = {}
            newItem.id = item.id
            newItem.name = item.name
            list.push(newItem)
        })
        return list
    })

    //删除分类
    let deleteSort = (index,id) => {
        allNavigationList.value.splice(index, 1)
    }

    //新增分类
    let addSort = (value) => {
        let newSort = {
            id: getNewSortId(),
            name: value,
            items: []
        }
        allNavigationList.value.push(newSort)
    }

    //获取当前分类最大id的+1
    let getNewSortId = () => {
        let maxId = 0
        allNavigationList.value.forEach(item => {
            if (item.id > maxId) {
                maxId = item.id
            }
        })
        return maxId + 1
    }


    return {
        showingNavigationList,
        allNavigationList,
        sortNameList,
        currentSortList,
        currentSortIndex,
        changeCurrentNavigation,
        deleteSort,
        addSort
    }
})