/** @format */
import React from 'react';
import { Layout, Menu } from 'antd';
import styles from './Header.less';

const { Header } = Layout;

const HeaderView = () => {
    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.logo} />
                <Menu mode="horizontal">
                    <Menu.Item key="home">Home</Menu.Item>
                    <Menu.Item key="article">文章</Menu.Item>
                    <Menu.Item key="task">任务</Menu.Item>
                    <Menu.Item key="leetcode">LeetCode</Menu.Item>
                </Menu>
            </Header>
        </Layout>
    );
};

export default HeaderView;
