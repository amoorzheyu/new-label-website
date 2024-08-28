/**
 * @description 搜索有关
 */

import { ref, computed, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useBackgroundImageStore } from '@/stores/backgroundImage'
import { ElNotification } from 'element-plus'

import fetchJsonp from 'fetch-jsonp';

export const useSearchPartStore = defineStore('searchPart', () => {
    let { manualMockBackgroundDom, isShowManualMockBackground } = storeToRefs(useBackgroundImageStore())

    let searchText = ref('')//搜索文本
    let isShowSearchMask = ref(false)//是否显示搜索遮罩
    let searchEnginesMess = ref([
        {
            id: 0,
            name: '必应',
            placeHolder: '必应搜索',
            searchUrlMod: 'https://cn.bing.com/search?q=#context#',
            searchTipsMod: 'https://api.bing.com/qsonhs.aspx?type=cb&q=#context#',
            jsonpKey: 'cb',
        }, {
            id: 1,
            name: '百度',
            placeHolder: '百度一下',
            searchUrlMod: 'https://www.baidu.com/s?wd="#context#"',
            searchTipsMod: 'https://suggestion.baidu.com/su?ie=UTF-8&wd=#context#',
            jsonpKey: 'cb',
        },
        {
            id: 2,
            name: '谷歌',
            placeHolder: 'Google',
            searchUrlMod: 'https://www.google.com/search?q=#context#',
            searchTipsMod: 'http://suggestqueries.google.com/complete/search?client=youtube&q=#context#&jsonp=window.google.ac.h',
            jsonpKey: 'jsonp',
        }
    ]) //搜素引擎信息

    let searchEngineIndex = ref(0)//当前搜索引擎索引

    let searchEngineName = computed(() => {//当前搜索引擎名字
        return searchEnginesMess.value[searchEngineIndex.value].name;
    })

    let searchPlaceHolder = computed(() => {//当前placeHolder文本
        return searchEnginesMess.value[searchEngineIndex.value].placeHolder;
    })

    //输入框Dom
    let inputDom = ref(null)

    //输入框Dom获取焦点
    const inputFocus = () => {
        inputDom.value.focus();
    }

    //切换当前搜索引擎
    const changeSearchEngine = (index) => {
        if (searchEngineIndex.value != 2) {
            getTipListsMess()
        }
        searchEngineIndex.value = index

        if (isShowSearchMask.value) {
            inputFocus()
        }
        closeTipListsMessErrorTimer()
    }

    let searchTips = ref([])//搜索提示列表

    //处理提示列表失败情况的定时器
    let getTipListsMessErrorTimer = null;

    let isShowSearchTips = computed(() => {//是否显示搜索提示列表
        return isShowSearchMask.value && searchTips.value.length > 0
    })

    //解析jsonp数据
    const getParseJsonpData = {
        0: (data) => {
            let Results = data['AS']['Results']
            let Result = [];
            if (!Results) return [];
            Results.forEach(element => {
                let Suggests = element['Suggests']
                Suggests.forEach(element => {
                    Result.push(element['Txt'])
                })
            });
            return Result;
        },
        1: (data) => {
            return data['s'];
        },
        2: (data) => {
            let result = []
            let dataList = data[1]
            dataList.forEach(element => {
                result.push(element[0])
            });
            return result;
        }
    }

    //关闭获取提示列表错误定时器
    const closeTipListsMessErrorTimer = () => {
        if (getTipListsMessErrorTimer) {
            clearTimeout(getTipListsMessErrorTimer)
        }
    }

    //获取搜索提示列表
    const getTipListsMess = () => {
        if (searchText.value.length == 0) return;
        let index = searchEngineIndex.value
        let text = searchText.value
        if (index == 1) {
            text = encodeURIComponent(text)
            text = text.replace(/([a-zA-Z])([a-zA-Z])/g, '\$1%20\$2%20')
        }
        let item = searchEnginesMess.value[index]
        let { searchTipsMod, jsonpKey } = item
        let url = searchTipsMod.replace('#context#', text)

        try {
            fetchJsonp(url, {
                jsonpCallback: jsonpKey,
            })
                .then(function (response) {
                    return response.json()
                }).then(function (data) {
                    if (searchText.value) {
                        searchTips.value = getParseJsonpData[index](data);
                    }

                }).catch(function (ex) {
                    closeTipListsMessErrorTimer();

                    getTipListsMessErrorTimer = setTimeout(() => {
                        getTipListsMessError(searchEngineIndex.value)
                    }, 1000)
                })
        }
        catch (err) {
            // console.log('err',err)
        }
    }

    //获取搜索提示失败处理
    const getTipListsMessError = (searchEngineIndex) => {
        if (searchEngineIndex == 2) {
            ElNotification({
                title: 'VPN未开启或网络异常',
                message: '请检查VPN及网络是否通畅',
                type: 'error',
            })
        }
    }
    //清空搜索框
    const clearSearchTextOnClick = () => {
        searchText.value = '';
        searchTips.value = []
    }

    //点击搜索按钮进行搜索
    const searchObtOnClick = () => {
        if (searchText.value.length == 0) return;
        let searchUrl = searchEnginesMess.value[searchEngineIndex.value].searchUrlMod.replace('#context#', searchText.value)
        window.open(searchUrl)
    }

    //点击搜索提示列表进行搜索
    const searchTipsOnClick = (index) => {
        let item = searchTips.value[index]
        let searchUrl = searchEnginesMess.value[searchEngineIndex.value].searchUrlMod.replace('#context#', item)
        window.open(searchUrl)
    }

    //记录原搜素内容
    let originalSearchText = ref('')

    //当前选择记录索引
    let nowSelectedSearchTipsIndex = ref(-1)

    //点击上下键事件
    const searchOnAndDownKeyDown = (value) => {
        if (searchTips.length == 0) return;
        //存储原输入框的搜索文本
        let keepOrinSearchText = () => {
            if (nowSelectedSearchTipsIndex.value == -1) {
                originalSearchText.value = searchText.value
            }
        }

        //转化为当前实际搜索记录的索引
        let toRealSearchTipsIndex = () => {
            let index = nowSelectedSearchTipsIndex.value
            let length = searchTips.value.length
            if (index == -2) {
                nowSelectedSearchTipsIndex.value = length - 1
            } else if (index == length) {
                nowSelectedSearchTipsIndex.value = -1
            }
        }

        //恢复原先文本
        let recoverOrinSearchText = () => {
            if (nowSelectedSearchTipsIndex.value == -1) {
                searchText.value = originalSearchText.value
            }
        }

        //设置当前搜索框内容
        let setSearchTextFromTips = () => {
            if (nowSelectedSearchTipsIndex.value != -1) {
                searchText.value = searchTips.value[nowSelectedSearchTipsIndex.value]
            }
        }
        keepOrinSearchText()
        switch (value) {
            case 'ArrowUp':
                nowSelectedSearchTipsIndex.value--
                break;
            case 'ArrowDown':
                nowSelectedSearchTipsIndex.value++
                break;
        }
        toRealSearchTipsIndex()
        setSearchTextFromTips()
        recoverOrinSearchText()
    }




    //监听搜索文本
    watch(searchText, (newValue, oldValue) => {
        if (newValue.length == 0) {
            nowSelectedSearchTipsIndex.value = -1
            searchTips.value = []
        } else {
            if (nowSelectedSearchTipsIndex.value == -1) {
                getTipListsMess()
            }
        }
    })

    //输入框获取焦点
    let searchOnFocus = () => {

        isShowManualMockBackground.value = true
        isShowSearchMask.value = true
        //放大
        manualMockBackgroundDom.value.style.transform = 'scale(1.1)'
    }

    //输入框失去焦点
    let searchOnBlur = () => {
        isShowSearchMask.value = false
        manualMockBackgroundDom.value.style.transform = 'scale(1)'
    }

    //手动去除焦点
    let searchOnManualBlur = () => {
        searchOnBlur();
        inputDom.value.blur()
    }

    //手动切换引擎
    let changeSearchEngineOnClick = () => {
        let index = searchEngineIndex.value + 1
        if (index == searchEnginesMess.value.length) {
            index = 0
        }
        changeSearchEngine(index)
    }

    //输入框按键事件
    let searchOnKeyup = (event) => {
        let keyCode = event.keyCode
        switch (keyCode) {
            case 13://回车
                searchObtOnClick()
                break;
            case 38://上键
                event.preventDefault();
                searchOnAndDownKeyDown('ArrowUp')
                break;
            case 40://下键
                event.preventDefault();
                searchOnAndDownKeyDown('ArrowDown')
                break;
            case 9: //tab键
                event.preventDefault();
                changeSearchEngineOnClick()
                break;
            case 27://esc键
                searchOnManualBlur();
                break;
            default:
                nowSelectedSearchTipsIndex.value = -1
                originalSearchText.value = searchText.value
                break;
        }
    }

    return { inputDom, searchText, searchPlaceHolder, searchEngineName, isShowSearchMask, searchTips, isShowSearchTips, searchEnginesMess, nowSelectedSearchTipsIndex, searchOnKeyup, searchOnFocus, searchOnBlur, getTipListsMess, changeSearchEngine, searchObtOnClick, searchTipsOnClick, inputFocus, clearSearchTextOnClick }
})