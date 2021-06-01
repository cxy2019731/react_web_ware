// 初始化connect
import '@/configs/_runConcent';
// 初始化国际化
import { registerI18n, sm } from 'cxy-react-i18n';
import i18nLocal from '@/i18n/index';

// 绑定常量到window
window.env = import.meta.env;
registerI18n();
sm(i18nLocal);
