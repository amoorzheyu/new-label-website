/**
 * @description: 背景图片store
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useBackgroundImageStore = defineStore('backgroundImage', () => {

    //当前背景图片所在Dom
    let currentImageDom = ref(null)

    //当前图片的url
    let currentImageUrl = ref('')

    //预设图片的url
    let presetImageUrls = ref([])

    //自定义图片的url
    let customImageUrl = ref('')

    //是否使用自定义图片
    let useCustomImage = ref(false)

    //当前使用预设图片下标
    let currentPresetImageIndex = ref(0)

    //是否显示手动模拟背景
    let isShowManualMockBackground = ref(true)

    //手动模拟背景Dom
    let manualMockBackgroundDom = ref(null)
    //自定义图片点击
    const customImageClick = () => {
        isShowManualMockBackground.value = false
        currentImageUrl.value = customImageUrl.value
        useCustomImage.value = true
        setBackgroundImage(currentImageUrl.value)
    }

    //预设图片点击
    const presentImageClick = (index) => {
        isShowManualMockBackground.value = false
        currentPresetImageIndex.value = index
        console.log(presetImageUrls.value[index])
        currentImageUrl.value = presetImageUrls.value[index]
        useCustomImage.value = false
        setBackgroundImage(currentImageUrl.value)
    }

    //设置背景图片
    const setBackgroundImage = (url) => {
        currentImageUrl.value = url
        currentImageDom.value.style.backgroundImage = `url(${url})`
    }

    //初始化背景图片
    const initBackgroundImage = () => {



        //初始化预设图片资源
        initPresetImageUrls()

        if (useCustomImage.value) {
            setBackgroundImage(customImageUrl.value)
        } else {
            setBackgroundImage(presetImageUrls.value[currentPresetImageIndex.value])
        }
    }

    //初始化预设图片资源
    const initPresetImageUrls = () => {

        const files = import.meta.glob('/public/backgroundImages/*')
    

        presetImageUrls.value = []
        Object.keys(files).forEach(item => {

            //将/public替换为.
            let itemNew = item.replace('/public', '.')
            if (itemNew.indexOf('bg') != -1) {
                presetImageUrls.value.push(itemNew)
            }
        })

    }

    return { currentImageDom, currentImageUrl,isShowManualMockBackground, manualMockBackgroundDom,customImageClick, presentImageClick, currentPresetImageIndex, useCustomImage, presetImageUrls, customImageUrl, initBackgroundImage }
}, {
    persist: {
        enabled: true
    }
})