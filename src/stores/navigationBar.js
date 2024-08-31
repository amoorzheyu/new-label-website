/**
 * @description 导航栏
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

//引入axios
import axios from 'axios'

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
                    name: '1111111111111111111111',
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
        },
        {
            id: 7,
            name: '导航 7',
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
            id: 8,
            name: '导航 8',
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

    //是否显示导航详情面板
    let isShowNavigationDetailPanel = ref(false);

    //导航详情面板作用
    let navigationDetailPanelType = ref('add')

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
    let deleteSort = (index, id) => {
        if (index == allNavigationList.value.length - 1) {
            currentSortIndex.value = currentSortIndex.value - 1
        }
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

    //获取网站图标
    let getWebsiteIcon = async (url) => {
        //向/getIcon发送请求
        return await axios.get('/getIcon', {
            params: {
                website: url
            }
        }).then(res => {

            if (res.status == 200) {
                if (typeof res?.data=='string') {
                    return res.data
                } else {
                    return -1;
                }
            } else {
                return -1;
            }
        })
    }

    //获取网站标题名
    let getWebsiteTitle = async (url) => {
        const originUrl = 'https://v2.api-m.com/api/title?url='

        url = originUrl + url

        return await axios.get(url).then(res => {
            if (res.data.code == 200) {
                if (typeof (res?.data?.data)=='string') {
                    return res.data.data
                } else {
                    return -1;
                }
            } else {
                return -1;
            }
        })
    }
    //获取网站信息
    let getWebsiteInfo = async (url) => {
        let iconUrl = await getWebsiteIcon(url)
        let title = await getWebsiteTitle(url)


        return {
            iconUrl: iconUrl,
            title: title
        }
    }

    //通过分类ID获取分类的导航的最大id+1
    let getNewNavigationIdById = (id) => {
        
        
        let index = allNavigationList.value.findIndex(item => item.id == id)
        
        let maxId = 0
        allNavigationList.value[index].items.forEach(item => {
            
            if (item.id > maxId) {
                maxId = item.id
            }
        })
        return maxId + 1
    }

    //添加新导航
    let addNewNavigation =  (item) => {
        
        let obj={};
       
        obj.url=item.url;
        
        obj.name=item.name;
        obj.iconType=item.iconType;
        obj.isShowOnDesktop=item.isShowOnDesktop;
        obj.icon=item.icon;
        obj.sortId=item.sortId;
        
        obj.id=getNewNavigationIdById(obj.sortId);

        allNavigationList.value.forEach(item => {
            if (item.id == obj.sortId) {
                item.items.push(obj)
            }
        })
    }

    return {
        showingNavigationList,
        allNavigationList,
        sortNameList,
        currentSortList,
        currentSortIndex,
        changeCurrentNavigation,
        deleteSort,
        addSort,
        isShowNavigationDetailPanel,
        navigationDetailPanelType,
        getWebsiteInfo,
        addNewNavigation
    }
})