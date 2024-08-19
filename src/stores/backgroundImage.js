/**
 * @description: 背景图片store
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBackgroundImageStore = defineStore('backgroundImage', () => {

    //当前图片的url
    let currentImageUrl = ref('')

    //预设图片的url
    let presetImageUrls = ref([])

    return { currentImageUrl, presetImageUrls }
})