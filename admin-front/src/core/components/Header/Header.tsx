/** @format */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import styles from './Header.less';
import Logo from '../../../assets/img/midouzi.jpeg';

const { Header } = Layout;

const HeaderView = () => {
    const location = useLocation();
    const selectedKey = location.pathname.split('/')[1];
    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.headerContainer}>
                    <div className={styles.logo}>
                        <img src={Logo} alt="logo" height="50" />
                    </div>
                    <Menu mode="horizontal" selectedKeys={[selectedKey]}>
                        <Menu.Item className={styles.menuItem} key="home">
                            <Link to="/home">Home</Link>
                        </Menu.Item>
                        <Menu.Item className={styles.menuItem} key="article">
                            <Link to="/article">文章</Link>
                        </Menu.Item>
                        <Menu.Item className={styles.menuItem} key="task">
                            <Link to="/task">任务</Link>
                        </Menu.Item>
                        <Menu.Item className={styles.menuItem} key="leetcode">
                            <Link to="/leetcode">LeetCode</Link>
                        </Menu.Item>
                        <Menu.Item className={styles.menuItem} key="shortnote">
                            <Link to="/shortnote">便签</Link>
                        </Menu.Item>
                        <Menu.Item className={styles.menuItem} key="dev">
                            <Link to="/dev">开发</Link>
                        </Menu.Item>
                    </Menu>
                </div>
            </Header>
        </Layout>
    );
};

export default HeaderView;
