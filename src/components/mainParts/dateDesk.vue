<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import calendar from 'js-calendar-converter'

// pinia-> useLayoutElementStore
import { useLayoutElementStore } from '@/stores/layoutElement'
let { isShowDatePart} = storeToRefs(useLayoutElementStore())

//年月日星期，时分秒
let dateDesk = reactive({
    year: '',
    month: '',
    day: '',
    week: '',
    hour: '',
    minute: '',
    second: '',
    IMonthCn: '',
    IDayCn: ''
})

//获取日期
let date = ref(new Date())

setInterval(() => {
    updateTime()
}, 1000)

//更新时间
function updateTime() {
    date.value = new Date()
    dateDesk.year = date.value.getFullYear()
    dateDesk.month = date.value.getMonth() + 1
    dateDesk.day = date.value.getDate()
    dateDesk.week = date.value.getDay()
    dateDesk.hour = date.value.getHours()
    dateDesk.minute = date.value.getMinutes()
    dateDesk.second = date.value.getSeconds()

    let { IMonthCn, IDayCn } = getChineseCalendar(dateDesk.year, dateDesk.month, dateDesk.day)
    dateDesk.IMonthCn = IMonthCn
    dateDesk.IDayCn = IDayCn
}


//前补零
function zeroHold(num) {
    return num < 10 ? '0' + num : num
}

//获取农历
const getChineseCalendar = (year, month, day) => {
    return calendar.solar2lunar(year, month, day)
}

//数字
const numName = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

//星期
const weekName = ['日', '一', '二', '三', '四', '五', '六']

//时钟时间字符串
const timeStr = computed(() => {
    return `${zeroHold(dateDesk.hour)} : ${zeroHold(dateDesk.minute)} : ${zeroHold(dateDesk.second)} `
})

//日期字符串
const dateStr = computed(() => {
    return `${dateDesk.year}年${zeroHold(dateDesk.month)}月${zeroHold(dateDesk.day)}日 星期${weekName[dateDesk.week]} ${dateDesk.IMonthCn}${dateDesk.IDayCn}`
})

onMounted(() => {
    updateTime()
})

</script>
<template>
    <div v-show="!isShowDatePart" class="h-[222px]">
    </div>
    <div v-show="isShowDatePart" class="font-bold text-[var(--date-text-color)] flex justify-center">
        <div class="w-[700px] flex flex-col items-end">
            <div class="text-[128px] font-bold">
                {{ timeStr }}
            </div>
            <div class="text-[20px] font-bold">{{ dateStr }}</div>
        </div>
    </div>
</template>
<style scoped></style>