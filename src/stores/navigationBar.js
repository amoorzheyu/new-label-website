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
    let allNavigationList = ref([
        {
            id:0,
            name:'默认',
            items:[
                {
                    id:0,
                    url:'',
                    name:'',
                    iconType:'Text',
                    isShowOnDesktop:true,
                    icon:'',
                    sortId:0,
                    sortName:'默认'
                }
            ]
        }
    ]
    )
})