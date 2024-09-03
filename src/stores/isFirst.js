/**
 * @description 是否为第一次进入网站
 */

import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

export const useIsFirstStore = defineStore('isFirst', () => {

    // 是否为第一次进入网站
    let isFirst = ref(true)


    return {isFirst}
},{
    persist: true
})