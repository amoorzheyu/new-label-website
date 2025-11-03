/**
 * 应用配置
 * 网站名称配置：可通过环境变量 VITE_APP_NAME_PREFIX 自定义前缀，默认为"桑桑"
 */
export const APP_NAME_PREFIX = import.meta.env.VITE_APP_NAME_PREFIX || '桑桑';
export const APP_FULL_NAME = `${APP_NAME_PREFIX}新标签`;

