/** @format */
import React, { useCallback } from 'react';
import { Button, Card, Input, message } from 'antd';
import Form, { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import styles from './Login.less';
import AuthContainer from '../../../core/store/auth';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const tailLayout = {
    wrapperCol: { offset: 10, span: 14 },
};

interface onFinishValues {
    username: string;
    password: string;
    remember: boolean;
}

const LoginView = () => {
    const [form] = useForm();
    const { login } = AuthContainer.useContainer();
    const history = useHistory();
    const onFinish = useCallback(async (values: onFinishValues) => {
        await login(values);
        message.success('登录成功');
        history.push('admin');
    }, []);
    return (
        <div className={styles['login-view']}>
            <Card className={styles['login-card']} headStyle={{ textAlign: 'center' }} title="登录" hoverable>
                <Form {...layout} name="login" initialValues={{ remember: true }} form={form} onFinish={onFinish}>
                    <FormItem
                        name="username"
                        label="用户名"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                        ]}
                        initialValue="zhou1996"
                    >
                        <Input placeholder="用户名" prefix={<UserOutlined />} />
                    </FormItem>

                    <FormItem
                        name="password"
                        label="密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                        initialValue="zhou1996"
                    >
                        <Input type="password" placeholder="密码" prefix={<LockOutlined />} />
                    </FormItem>
                    <FormItem {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>记住我</Checkbox>
                    </FormItem>
                    <FormItem {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </Card>
        </div>
    );
};

export default LoginView;
