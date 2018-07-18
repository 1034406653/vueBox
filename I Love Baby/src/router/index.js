import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home'
import Post from '@/components/home/post'
import Social from '@/components/home/social'
import AdminPost from '@/components/home/admin-post'
import AdminSocial from '@/components/home/admin-social'
import AdminUser from '@/components/home/admin-user'
import Artical from '@/components/home/artical'
import Video from '@/components/home/video'
import User from '@/components/home/user'
import News from '@/components/home/news'
import NewsAdd from '@/components/home/news-add'
import Sensitive from '@/components/home/sensitive'
import RepostedPost from '@/components/home/reported-post'
import RepostedSocial from '@/components/home/reported-social'
import PostDetail from '@/components/home/post-detail'
import SocialDetail from '@/components/home/social-detail'
import ArticalAdd from '@/components/home/artical-add'
import VideoAdd from '@/components/home/video-add'
import UserDetail from '@/components/home/user-detail'
Vue.use(Router)
export default new Router({
  routes: [
  	{
      path: '/',
      name: 'Login',
      component: Login
   },
  	{
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/home/post',
      children: [
        { path: 'post', name: 'Post',component: Post, meta: { keepAlive: true }},
				{ path: 'social', name: 'Social',component: Social, meta: { keepAlive: true }},
				{ path: 'admin-post', name: 'AdminPost',component: AdminPost, meta: { keepAlive: true }},
				{ path: 'admin-social', name: 'AdminSocial',component: AdminSocial, meta: { keepAlive: true }},
				{ path: 'admin-user', name: 'AdminUser',component: AdminUser, meta: { keepAlive: true }},
				{ path: 'artical', name: 'Artical',component: Artical, meta: { keepAlive: true }},
				{ path: 'video', name: 'Video',component: Video, meta: { keepAlive: true }},
				{ path: 'user', name: 'User',component: User, meta: { keepAlive: true }},
				{ path: 'news', name: 'News',component: News, meta: { keepAlive: false }},
				{ path: 'news-add', name: 'NewsAdd',component: NewsAdd, meta: { keepAlive: true }},
				{ path: 'sensitive', name: 'Sensitive',component: Sensitive, meta: { keepAlive: true }},
				{ path: 'reported-post', name: 'RepostedPost',component: RepostedPost, meta: { keepAlive: true }},
				{ path: 'reported-social', name: 'RepostedSocial',component: RepostedSocial, meta: { keepAlive: true }},
				{ path: 'post-detail', name: 'PostDetail',component: PostDetail, meta: { keepAlive: false }},
				{ path: 'social-detail', name: 'SocialDetail',component: SocialDetail, meta: { keepAlive: false }},
				{ path: 'artical-add', name: 'ArticalAdd',component: ArticalAdd, meta: { keepAlive: false }},
				{ path: 'video-add', name: 'VideoAdd',component: VideoAdd, meta: { keepAlive: true }},
				{ path: 'user-detail', name: 'UserDetail',component: UserDetail, meta: { keepAlive: false }},
      ]
   },
  ]
})
