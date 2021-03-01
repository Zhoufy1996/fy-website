/** @format */
import React, { useCallback } from 'react';
import { Button, Card, Input, message } from 'antd';
import Form, { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './Login.less';
import AuthContainer from '../../core/store/auth';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

interface onFinishValues {
    username: string;
    password: string;
    remember: boolean;
}

const LoginView = () => {
    const [form] = useForm();
    const { login } = AuthContainer.useContainer();
    const onFinish = useCallback(async (values: onFinishValues) => {
        await login(values);
        message.success('登录超过');
    }, []);
    return (
        <div className={styles['login-view']}>
            <Card title="登录" hoverable>
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
                    >
                        <Input placeholder="用户名" prefix={<UserOutlined />} />
                    </FormItem>

                    <FormItem
                        name="passoword"
                        label="密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input type="password" placeholder="密码" prefix={<LockOutlined />} />
                    </FormItem>
                    <FormItem name="remember" valuePropName="checked">
                        <Checkbox>记住我</Checkbox>
                    </FormItem>
                    <FormItem>
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
