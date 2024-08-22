/**
 * @description 搜索有关
 */

import { ref, computed } from 'vue'
import { defineStore ,storeToRefs} from 'pinia'
import {useBackgroundImageStore} from '@/stores/backgroundImage'
export const useSearchPartStore = defineStore('searchPart', () => {
    let {currentImageDom} =storeToRefs(useBackgroundImageStore())

    let searchText = ref('')//搜索文本
    let isShowSearchMask = ref(false)//搜索遮罩

    //输入框获取焦点
    let searchOnFocus = () => {
        isShowSearchMask.value = true
         currentImageDom.value.style.backgroundSize = '110%'
        //修改backfround-size
        setTimeout(() => {
            currentImageDom.value.style.backgroundSize = '120%'
        }, 100)
    }

    //输入框失去焦点
    let searchOnBlur = () => {
        isShowSearchMask.value = false
        currentImageDom.value.style.backgroundSize = 'cover'
    }

    return { searchText, isShowSearchMask,searchOnFocus,searchOnBlur }
})