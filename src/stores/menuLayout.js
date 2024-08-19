/**
 * @description 菜单元素store
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMenuLayoutStore = defineStore('menuLayout', () => {
    //菜单元素列表
    const menuList = ref({
        'global·': [
            {
                0: {
                    id: 0,
                    name: '添加导航',
                    svgUrl: ''
                },
                1: {
                    id: 1,
                    name: '全部应用',
                    svgUrl: ''
                }
            },
            {
                0: {
                    id: 0,
                    name: '设置',
                    svgUrl: ''
                },
                1: {
                    id: 1,
                    name: '切换主题',
                    svgUrl: ''
                }
            }
        ],
        'navigation': {

        }
    })
})