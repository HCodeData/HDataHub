import { createRouter, createWebHistory } from 'vue-router';
import auth from './auth';
import console from './console';
import chat from './chat';
import midjourney from './midjourney';
import distribution from './distribution';
import chatdoc from './chatdoc';
import qrart from './qrart';
import luma from './luma';
import headshots from './headshots';
import suno from './suno';
import site from './site';
import profile from './profile';
import { initializeCookies } from '@/utils/initializer';

import {
  ROUTE_INDEX,
  ROUTE_SUPPORT,
  ROUTE_MIDJOURNEY_TUTORIALS,
  ROUTE_AI_TUTORIALS,
  ROUTE_AI_TUTORIALS2,
  ROUTE_AI_TUTORIALS3
} from './constants';
import { DEFAULT_LOCALE, setI18nLanguage } from '@/i18n';
import { getCookie } from 'typescript-cookie';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Index.vue'),
    children: [
      {
        path: '',
        name: ROUTE_INDEX,
        component: () => import('@/pages/index/Index.vue')
      },
      {
        path: 'support',
        name: ROUTE_SUPPORT,
        component: () => import('@/pages/index/Support.vue')
      },
      {
        path: 'ai_tutorials',
        name: ROUTE_AI_TUTORIALS,
        component: () => import('@/pages/index/AiTutorials.vue')
      },
      {
        path: 'ai_tutorials2',
        name: ROUTE_AI_TUTORIALS2,
        component: () => import('@/pages/index/AiTutorials2.vue')
      },
      {
        path: 'ai_tutorials3',
        name: ROUTE_AI_TUTORIALS3,
        component: () => import('@/pages/index/AiTutorials3.vue')
      },
      {
        path: 'midjourney_tutorials',
        name: ROUTE_MIDJOURNEY_TUTORIALS,
        component: () => import('@/pages/index/MidjourneyTutorials.vue')
      }
    ]
  },
  console,
  chatdoc,
  auth,
  chat,
  qrart,
  luma,
  headshots,
  suno,
  midjourney,
  distribution,
  site,
  profile
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const locale = getCookie('LOCALE') || DEFAULT_LOCALE;
  await setI18nLanguage(locale);
  if (to.path === '/') {
    await initializeCookies();
  }
  return next();
});

export default router;

export * from './constants';
