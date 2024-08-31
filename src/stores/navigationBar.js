/**
 * @description 导航栏
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


import { ElMessage, ElMessageBox } from 'element-plus'

//引入axios
import axios from 'axios'

export const useNavigationBarStore = defineStore('navigationBar', () => {
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

    //通过下标删除分类
    let deleteSortByIndex = (index) => {
        if (index == allNavigationList.value.length - 1) {
            currentSortIndex.value = currentSortIndex.value - 1
        }
        allNavigationList.value.splice(index, 1)
    }

    //删除分类栏目及其提示封装
    const deleteNavigationWithNotice = (index) => {
        if (sortNameList.value.length <= 1) {
            return ElMessage({
                type: 'error',
                message: '至少保留一个分类',
            })
        }
        let { name, id } = sortNameList.value[index];

        ElMessageBox.confirm(
            `删除分类 ${name} 会删除其中的导航`,
            '警告',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(() => {
                deleteSortByIndex(index, id);
                ElMessage({
                    type: 'success',
                    message: '删除分类成功',
                })
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '已取消删除分类',
                })
            })

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

    //判断分类是否重名
    const checkSortNameRepeat = (name) => {
        let isRepeat = false;
        sortNameList.value.forEach((item) => {

            if (item.name == name) {
                isRepeat = true;
            }
        })
        return isRepeat;
    }

    //新增分类及其提示封装
    const addSortWithNotice = () => {
        ElMessageBox.prompt('分类名称', '新增分类', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /\S/,
            inputErrorMessage: '分类名称不能为空',
        })
            .then(({ value }) => {
                value = value.trim();
                if (!checkSortNameRepeat(value)) {
                    addSort(value);
                    ElMessage({
                        type: 'success',
                        message: `新增分类 ${value} 成功`,
                    })
                } else {
                    ElMessage({
                        type: 'error',
                        message: '分类名称重复',
                    })
                }
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '已取消新增分类',
                })
            })
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
                if (typeof res?.data == 'string') {
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
                if (typeof (res?.data?.data) == 'string') {
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
    let addNewNavigation = (item) => {

        let obj = {};

        obj.url = item.url;

        obj.name = item.name;
        obj.iconType = item.iconType;
        obj.isShowOnDesktop = item.isShowOnDesktop;
        obj.icon = item.icon;
        obj.sortId = item.sortId;

        obj.id = getNewNavigationIdById(obj.sortId);

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
        deleteSortByIndex,
        addSort,
        isShowNavigationDetailPanel,
        navigationDetailPanelType,
        getWebsiteInfo,
        addNewNavigation,
        deleteNavigationWithNotice,
        addSortWithNotice
    }
})