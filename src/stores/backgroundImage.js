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

    //设置背景图片
    const setBackgroundImage = (url) => {
        currentImageUrl.value = url
        currentImageDom.value.style.backgroundImage = `url(${url})`
    }

    //初始化背景图片
    const initBackgroundImage = () => {
        //初始化预设图片资源
        initPresetImageUrls()
       
        if(useCustomImage.value){
            setBackgroundImage(customImageUrl.value)
        }else{
            setBackgroundImage(presetImageUrls.value[currentPresetImageIndex.value])
        }
    }

    //初始化预设图片资源
    const initPresetImageUrls = () => {
        let imagePath='/src/assets/backgroundImages'
        let imagesName=['bg-1.png','bg-2.png','bg-3.png']

        presetImageUrls.value=[]
        imagesName.forEach(item => {
            let url= `${imagePath}/${item}`
            presetImageUrls.value.push(url)
        });

    }

    return { currentImageDom,currentImageUrl, currentPresetImageIndex,presetImageUrls,customImageUrl,initBackgroundImage }
},{
    persist: {
        enabled: true
    }
})