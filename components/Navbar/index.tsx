import type { NextPage } from 'next';
import { navs } from './config';
import Link from 'next/link';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { Button, Avatar, Dropdown, Menu } from 'antd';
import { useState } from 'react';
import Login from 'components/Login';
import { useStore } from 'store/index';
const Navbar: NextPage = () => {
  const { pathname } = useRouter();
  const [isShowLogin, setIsShowLogin] = useState(false);
  const store = useStore();
  const { userId, avatar } = store.user.userInfo;
  const handleLogin = () => {
    setIsShowLogin(true);
  };

  const handleGotoEditor = () => {};
  const handleCloseLogin = () => {
    setIsShowLogin(false);
  };
  const renderDropDownMenu = () => {
    return (
      <Menu>
        <Menu.Item key={1}>个人主页</Menu.Item>
        <Menu.Item key={2}>退出登录</Menu.Item>
      </Menu>
    );
  };
  return (
    <div className={styles['nav']}>
      <div className={styles['logo']}>BLOG</div>
      {/* 加？代表当navs不存在就不进行后面的操作 */}
      <div className={styles['link__items']}>
        {navs?.map((nav) => (
          <Link
            key={nav.label}
            href={nav.value}
            className={pathname === nav.value ? styles['active'] : ''}
          >
            {nav.label}
          </Link>
        ))}
      </div>
      <div className={styles['operation']}>
        <Button className={styles['editor']} onClick={handleGotoEditor}>
          写文章
        </Button>
        {userId ? (
          <Dropdown overlay={renderDropDownMenu()} placement="bottomLeft">
            <Avatar src={avatar} size={32} />
          </Dropdown>
        ) : (
          <Button
            className={styles['login']}
            type="primary"
            onClick={handleLogin}
          >
            登录
          </Button>
        )}

        {isShowLogin && <Login onClose={handleCloseLogin} />}
      </div>
    </div>
  );
};

export default Navbar;
