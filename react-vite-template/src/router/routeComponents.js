import App from '@/app';
import Layout from '@/layout/index';

import NotFount from '@/pages/notFound/index'; //404
import Login from '@/pages/login/index'; //login
import Home from '@/pages/home/index'; //首页
import Initialize from '@/pages/initialize/index'; //初始化进度
// 系统设置
import User from '@/pages/systemSettings/user/index'; //用户管理
import Role from '@/pages/systemSettings/role/index'; //角色管理
import Dict from '@/pages/systemSettings/dict/index'; //字典管理
import Auth from '@/pages/systemSettings/auth/index'; //权限管理
import Menu from '@/pages/systemSettings/menu/index'; //菜单管理
import Department from '@/pages/systemSettings/department/index'; //部门管理
// iframe
import Iframe from '@/pages/iframe/index';
// 组件
import Tree from '@/pages/components/tree/index'; //树组件

export default { App, Home, Login, NotFount, Layout, Initialize, User, Role, Dict, Auth, Menu, Department, Iframe, Tree };
