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
    let showingNavigationList = ref([
        {
            id: 0,
            url: 'https://blog.csdn.net/m0_73756108?type=blog',
            name: '代码对我眨眼睛-CSDN博客',
            iconType: 'Icon',
            isShowOnDesktop: true,
            icon: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
            navIndex: 0,
            sortId: 0,
        },
        {
            id: 1,
            url: 'https://uiverse.io/profile/adamgiebl',
            name: 'uiverse',
            iconType: 'Text',
            isShowOnDesktop: true,
            icon: '',
            navIndex: 1,
            sortId: 0,
        }
    ])

    //所有导航栏
    //🌹编了一些数据
    let allNavigationList = ref([
        {
            id: 0,
            name: '默认',
            items: [
                {
                    id: 0,
                    url: 'https://blog.csdn.net/m0_73756108?type=blog',
                    name: '代码对我眨眼睛-CSDN博客',
                    iconType: 'Icon',
                    isShowOnDesktop: true,
                    icon: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
                    sortId: 0,
                },
                {
                    id: 1,
                    url: 'https://uiverse.io/profile/adamgiebl',
                    name: 'uiverse',
                    iconType: 'Text',
                    isShowOnDesktop: true,
                    icon: '',
                    sortId: 0,
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


    //当前添加或修改导航默认内容
    let navigationDetailItem = ref({
        url: '',
        name: '',
        iconType: 'Text',
        isShowOnDesktop: false,
        icon: '',
        sortId: 0
    })

    //复原当前添加或修改导航默认内容
    let resetNavigationDetailItem = () => {
        navigationDetailItem.value = {
            url: '',
            name: '',
            iconType: 'Text',
            isShowOnDesktop: false,
            icon: '',
            sortId: 0
        }
    }

    //右键选中的分类下标
    let rightClickSortIndex = ref(0)

    //右键选中的导航下标
    let rightClickNavIndex = ref(0)
    //点击切换当前分类
    let changeCurrentNavigation = (index) => {
        currentSortIndex.value = index
    }

    //当前分类内容列表
    let currentSortInnerNavList = computed(() => {
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
        allNavigationList.value[index].items.forEach(item => {
            deleteNavigationFromManageChangeDeskNav(index, item.id)
        })

        //如果前面删了一位，则需要重新计算下标
        if (index < currentSortIndex.value) {
            currentSortIndex.value = currentSortIndex.value - 1
        }

        allNavigationList.value.splice(index, 1)
    }

    //删除分类栏目及其提示封装
    const deleteSortWithNotice = (index) => {
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

        if (allNavigationList.value[index].items.length == 0) {
            return maxId
        }
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

        //判断是否添加到桌面
        if (obj.isShowOnDesktop) {
            addNewNavigationToDesktop(obj)
        }
    }

    //获取桌面导航下最大id+1
    const getNewNavigationIdOnDesktopIdNext = () => {
        if (showingNavigationList.value.length == 0) {
            return 0;
        }

        let maxId = 0
        showingNavigationList.value.forEach(item => {
            if (item.id > maxId) {
                maxId = item.id
            }
        })
        return maxId + 1

    }
    //添加新导航到桌面
    const addNewNavigationToDesktop = (obj) => {
        let newObj = {}
        newObj.id = getNewNavigationIdOnDesktopIdNext();
        newObj.name = obj.name;
        newObj.url = obj.url;
        newObj.icon = obj.icon;
        newObj.iconType = obj.iconType;
        newObj.isShowOnDesktop = obj.isShowOnDesktop;
        newObj.sortId = obj.sortId;
        newObj.navIndex = obj.id;
        showingNavigationList.value.push(newObj);
    }



    //当前分类id
    let currentSortId = computed(() => {
        return allNavigationList.value[currentSortIndex.value].id
    })

    //在桌面触发的添加导航
    let addNavigationOnDesktop = () => {
        isShowNavigationDetailPanel.value = true;
        navigationDetailPanelType.value = 'add';
        resetNavigationDetailItem();
        navigationDetailItem.value.isShowOnDesktop = true;
    }

    //在导航管理触发的添加导航
    let addNavigationOnNavigationManagement = () => {
        isShowNavigationDetailPanel.value = true;
        navigationDetailPanelType.value = 'add';
        resetNavigationDetailItem();
        navigationDetailItem.value.isShowOnDesktop = false;
        navigationDetailItem.value.sortId = currentSortId.value;
    }

    //通过菜单删除分类栏目事件
    let deleteSortFromMenu = () => {
        deleteSortWithNotice(rightClickSortIndex.value)
    }

    //通过菜单编辑分类名
    let editSortName = () => {
        ElMessageBox.prompt('分类名称', '编辑分类', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /\S/,
            inputErrorMessage: '分类名称不能为空',
            inputValue: allNavigationList.value[rightClickSortIndex.value].name

        })
            .then(({ value }) => {
                value = value.trim();
                if (!checkSortNameRepeat(value)) {
                    allNavigationList.value[rightClickSortIndex.value].name = value;
                    ElMessage({
                        type: 'success',
                        message: `编辑分类 ${value} 成功`,
                    })
                } else {
                    ElMessage({
                        type: 'error',
                        message: '分类名称重复',
                    })
                }
            })
    }

    //导航管理中删除导航触发的桌面导航变化
    const deleteNavigationFromManageChangeDeskNav = (sortId, navIndex) => {
        let deskNavIndex = getDesktopNavigationIndexBySortIdAndNavId(sortId, navIndex)
        if (deskNavIndex != -1) {
            showingNavigationList.value.splice(deskNavIndex, 1)
        }
    }

    //通过菜单在导航管理中删除导航
    let deleteSortWithNoticeOnManagement = () => {
        ElMessageBox.confirm('确定删除该导航吗？', '删除导航', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(() => {
                let { id, sortId } = allNavigationList.value[rightClickSortIndex.value].items[rightClickNavIndex.value]
                let rightClickSelectedSortItemsList = allNavigationList.value[rightClickSortIndex.value].items;
                rightClickSelectedSortItemsList.splice(rightClickNavIndex.value, 1)
                deleteNavigationFromManageChangeDeskNav(sortId, id);
                ElMessage({
                    type: 'success',
                    message: '删除导航成功',
                })
            })
            .catch((e) => {
                console.error(e)
                ElMessage({
                    type: 'info',
                    message: '已取消删除导航',
                })
            })
    }

    //通过菜单添加为桌面导航
    let addNavigationToDesktop = () => {
        let item = allNavigationList.value[rightClickSortIndex.value].items[rightClickNavIndex.value]

        if (item.isShowOnDesktop) {
            ElMessage({
                type: 'error',
                message: '该导航已添加到桌面',
            })
        } else {

            let sortId = rightClickSortIndex.value
            let navId = rightClickNavIndex.value
            let item = allNavigationList.value[sortId].items[navId]
            item.isShowOnDesktop = true;
            saveNavigationDetailEditChangeOnNavigationManagement(item, sortId)

            ElMessage({
                type: 'success',
                message: '添加桌面导航成功',
            })
        }
    }

    //在导航管理中通过菜单编辑导航
    let editNavigationOnNavigationManagement = () => {
        let item = allNavigationList.value[rightClickSortIndex.value].items[rightClickNavIndex.value]

        isShowNavigationDetailPanel.value = true;
        navigationDetailPanelType.value = 'edit';
        resetNavigationDetailItem();
        navigationDetailItem.value.url = item.url;
        navigationDetailItem.value.name = item.name;
        navigationDetailItem.value.iconType = item.iconType;
        navigationDetailItem.value.isShowOnDesktop = item.isShowOnDesktop;
        navigationDetailItem.value.icon = item.icon;
        navigationDetailItem.value.sortId = item.sortId;
    }

    //通过分类id与导航id返回对应桌面导航的索引
    let getDesktopNavigationIndexBySortIdAndNavId = (sortId, navIndex) => {
        return showingNavigationList.value.findIndex(item => (item.navIndex == navIndex) && (item.sortId == sortId))
    }

    //处理修改导航对桌面导航的修改
    let saveNavigationDetailEditChangeOnNavigationManagement = (item, oldSortId) => {
        let deskNavIndex = getDesktopNavigationIndexBySortIdAndNavId(oldSortId, item.id);
        if (deskNavIndex == -1) {
            let nextDeskNavId = getNewNavigationIdOnDesktopIdNext();
            let obj = {
                id: nextDeskNavId
            }
            showingNavigationList.value.push(obj)
            deskNavIndex = showingNavigationList.value.length - 1
        }
        let showDeskNavItem = showingNavigationList.value[deskNavIndex];
        showDeskNavItem.url = item.url;
        showDeskNavItem.name = item.name;
        showDeskNavItem.iconType = item.iconType;
        showDeskNavItem.icon = item.icon;
        showDeskNavItem.sortId = item.sortId;
        showDeskNavItem.isShowOnDesktop = item.isShowOnDesktop;
        showDeskNavItem.navIndex = item.id;
    }

    //保存当前导航修改
    let saveNavigationDetailEdit = () => {
        //右击时的分类id
        let rightClickSortId = allNavigationList.value[rightClickSortIndex.value].id;

        //修改后的分类id
        let fixSortId = navigationDetailItem.value.sortId;
        let endItem = allNavigationList.value[rightClickSortIndex.value].items[rightClickNavIndex.value];
        let oldSortId = endItem.sortId
        //修改前该导航是否在桌面上
        let isShowOnDesktopBefore = endItem.isShowOnDesktop;

        //修改后的分类下标
        let fixSortIndex = allNavigationList.value.findIndex(item => item.id == fixSortId);
        if (rightClickSortId == fixSortId) {

        } else {
            allNavigationList.value[rightClickSortIndex.value].items.splice(rightClickNavIndex.value, 1)
            let newNavIndex = getNewNavigationIdById(fixSortId);
            let newObj = {};
            allNavigationList.value[fixSortIndex].items.push(newObj);
            endItem = allNavigationList.value[fixSortIndex].items[newNavIndex];
            endItem.id = newNavIndex;
            currentSortIndex.value = fixSortIndex;
        }

        endItem.url = navigationDetailItem.value.url;
        endItem.name = navigationDetailItem.value.name;
        endItem.iconType = navigationDetailItem.value.iconType;
        endItem.isShowOnDesktop = navigationDetailItem.value.isShowOnDesktop;
        endItem.icon = navigationDetailItem.value.icon;
        endItem.sortId = navigationDetailItem.value.sortId;

        saveNavigationDetailEditChangeOnNavigationManagement(endItem, oldSortId);
    }
    return {
        showingNavigationList,
        allNavigationList,
        sortNameList,
        currentSortInnerNavList,
        currentSortIndex,
        changeCurrentNavigation,
        deleteSortByIndex,
        addSort,
        isShowNavigationDetailPanel,
        navigationDetailPanelType,
        getWebsiteInfo,
        addNewNavigation,
        deleteSortWithNotice,
        addSortWithNotice,
        currentSortId,
        navigationDetailItem,
        addNavigationOnDesktop,
        addNavigationOnNavigationManagement,
        rightClickSortIndex,
        rightClickNavIndex,
        deleteSortFromMenu,
        editSortName,
        deleteSortWithNoticeOnManagement,
        addNavigationToDesktop,
        editNavigationOnNavigationManagement,
        saveNavigationDetailEdit
    }
})