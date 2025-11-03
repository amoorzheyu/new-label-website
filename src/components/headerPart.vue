<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import axios from 'axios';

// pinia->useThemeSwapStore
import { useThemeSwapStore } from '@/stores/themeSwap'
let { nowThemeIndex } = storeToRefs(useThemeSwapStore())
const { changeTheme } = useThemeSwapStore()

// pinia->useIsShowDialogsStore
import { useIsShowDialogsStore } from '@/stores/isShowDialogs'
let { isShowSettingDialog,isShowNavigationManagementDialog } = storeToRefs(useIsShowDialogsStore())

// pinia-> useLayoutElementStore
import { useLayoutElementStore } from '@/stores/layoutElement'
let { isShowTopMenu } = storeToRefs(useLayoutElementStore())

// pinia->useSettingOptStore
import { useSettingOptStore } from '@/stores/settingopt'
let { weatherCity } = storeToRefs(useSettingOptStore())

//切换主题事件
const swapThemeEvent = () => {
  changeTheme(nowThemeIndex.value)
}

// 天气相关
const weatherData = ref(null);
const isLoadingWeather = ref(false);
const weatherError = ref(null);

// 获取天气信息
const getWeather = async (location, isRetry = false) => {
  try {
    isLoadingWeather.value = true;
    weatherError.value = null;
    const response = await axios.get('/api/weather', {
      params: { location }
    });
    
    if (response.data && response.data.results && response.data.results.length > 0) {
      weatherData.value = response.data.results[0];
      console.log('✅ 天气数据获取成功:', response.data.results[0].location?.name);
    }
  } catch (error) {
    console.error('获取天气失败:', error);
    if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data;
      const errorMsg = errorData?.error || errorData?.message || '获取天气失败';
      
      console.error('API错误:', status, errorMsg);
      
      
      weatherError.value = errorMsg;
      
      // 如果是403或401错误，显示更友好的提示
      if (status === 403 || status === 401) {
        weatherError.value = status === 403 
          ? '无法获取该位置的天气数据' 
          : 'API密钥无效';
      }
    } else {
      weatherError.value = '获取天气失败';
    }
  } finally {
    isLoadingWeather.value = false;
  }
};

// 获取天气城市（从设置中读取，如果没有则使用默认值"beijing"）
const getWeatherCity = () => {
  return weatherCity.value?.trim() || 'beijing';
};

// 组件挂载时获取天气
onMounted(() => {
  // 直接使用城市名（从设置中读取或使用默认值）
  const city = getWeatherCity();
  getWeather(city);
  
  // 监听城市名变化，自动更新天气
  watch(weatherCity, () => {
    const city = getWeatherCity();
    getWeather(city);
  });
  
  // 每30分钟更新一次天气
  setInterval(() => {
    const city = getWeatherCity();
    getWeather(city);
  }, 30 * 60 * 1000);
});

</script>
<template>
  <div class=" relative z-50" >
    <div v-show="!isShowTopMenu" class="h-[58px]"></div>
    <div class="flex justify-between items-center mx-2 mt-2" v-show="isShowTopMenu">
      <!-- 左侧天气信息 -->
      <div class="weather-container">
        <div v-if="isLoadingWeather" class="weather-loading">
          <svg class="animate-spin" viewBox="0 0 24 24" width="16" height="16">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
        </div>
        <div v-else-if="weatherData" class="weather-info">
          <span class="weather-city">{{ weatherData.location?.name || '未知' }}</span>
          <span class="weather-text">{{ weatherData.now?.text || '-' }}</span>
          <span class="weather-temp">{{ weatherData.now?.temperature || '-' }}°C</span>
        </div>
        <div v-else-if="weatherError" class="weather-error">{{ weatherError }}</div>
      </div>
      
      <!-- 右侧按钮组 -->
      <div class="flex">
      <div class="button-class" @click="isShowNavigationManagementDialog=true">
        <svg class="svg-class" data-v-81d5a9b4="" viewBox="0 0 24 24" width="1em" height="1em">
          <path fill="none" stroke="currentColor" stroke-width="1.5"
            d="M3 7.4V3.6a.6.6 0 0 1 .6-.6h5.8a.6.6 0 0 1 .6.6v3.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6Zm11 13v-3.8a.6.6 0 0 1 .6-.6h5.8a.6.6 0 0 1 .6.6v3.8a.6.6 0 0 1-.6.6h-5.8a.6.6 0 0 1-.6-.6Zm0-8V3.6a.6.6 0 0 1 .6-.6h5.8a.6.6 0 0 1 .6.6v8.8a.6.6 0 0 1-.6.6h-5.8a.6.6 0 0 1-.6-.6Zm-11 8v-8.8a.6.6 0 0 1 .6-.6h5.8a.6.6 0 0 1 .6.6v8.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6Z">
          </path>
        </svg>
      </div>
      <div class="button-class" @click="swapThemeEvent">
        <svg v-show="nowThemeIndex == 0" class="svg-class" data-v-81d5a9b4="" viewBox="0 0 24 24" width="1em"
          height="1em">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12m10-6h1M12 2V1m0 22v-1m8-2l-1-1m1-15l-1 1M4 20l1-1M4 4l1 1m-4 7h1">
          </path>
        </svg>
        <svg v-show="nowThemeIndex == 1" class="svg-class" data-v-81d5a9b4="" viewBox="0 0 24 24" width="1em"
          height="1em" style="">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M3 11.507a9.493 9.493 0 0 0 18 4.219c-8.507 0-12.726-4.22-12.726-12.726A9.494 9.494 0 0 0 3 11.507">
          </path>
        </svg>
      </div>
      <div class="button-class" @click="isShowSettingDialog = true">
        <svg class="svg-class" data-v-81d5a9b4="" viewBox="0 0 24 24" width="1em" height="1em">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
            <path d="M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6"></path>
            <path
              d="m19.622 10.395l-1.097-2.65L20 6l-2-2l-1.735 1.483l-2.707-1.113L12.935 2h-1.954l-.632 2.401l-2.645 1.115L6 4L4 6l1.453 1.789l-1.08 2.657L2 11v2l2.401.656L5.516 16.3L4 18l2 2l1.791-1.46l2.606 1.072L11 22h2l.604-2.387l2.651-1.098C16.697 18.832 18 20 18 20l2-2l-1.484-1.75l1.098-2.652l2.386-.62V11z">
            </path>
          </g>
        </svg>
      </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.button-class {
  @apply w-[50px] h-[50px] rounded-full text-[var(--ground-glass-icon-color)] flex justify-center items-center bg-[var(--ground-glass-background-color)] mx-[4px] backdrop-blur-2xl;
  @apply hover:scale-110 hover:bg-[var(--ground-glass-background-hover-color)] transition-all duration-[200ms] ease-in-out;
  border: 1px solid #fff3;
  box-shadow: 0px 0px 1px 0px #fffc;
}

.button-class:hover .svg-class {
  transition: all 0.2s ease-in-out;
  transform: scale(1.2);
}

.svg-class {
  @apply w-[30px] h-[30px]
}

.weather-container {
  @apply flex items-center;
}

.weather-loading {
  @apply text-[var(--ground-glass-icon-color)] flex items-center;
}

.weather-info {
  @apply flex items-center gap-2 px-4 py-2 rounded-full text-[var(--ground-glass-icon-color)] bg-[var(--ground-glass-background-color)] backdrop-blur-2xl;
  border: 1px solid #fff3;
  box-shadow: 0px 0px 1px 0px #fffc;
}

.weather-city {
  @apply font-medium text-sm;
}

.weather-text {
  @apply text-sm;
}

.weather-temp {
  @apply font-bold text-sm;
}

.weather-error {
  @apply text-[var(--ground-glass-icon-color)] text-xs px-3 py-1;
}
</style>