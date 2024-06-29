import React from 'react';
import { Form, Input, Button, Image, Flex } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { isLoading, signIn, setStatus, signOut } from 'features/authentication/authenticationSlice';
import { NotificationType, UserBodyRequest, UserBodyResponse } from 'types';
import { useMutation } from '@tanstack/react-query';
import { login } from 'features/authentication/authenticationAPI';
import { notification } from 'antd'
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';

const LoginPage: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(isLoading)
  const navigate = useNavigate();
  const { t } = useTranslation();


  const openNotificationWithIcon = (type: NotificationType, message: string, description: string, duration: number) => {
    api[type]({
      message,
      description,
      duration
    });
  };



  const onFinish = async (values: { email: string, password: string }) => {
    const user: UserBodyRequest = { email: values.email, password: values.password }
    //  await dispatch(doLogin(user))
    //  navigate("/home")
    await dispatch(setStatus("loading"));
    mutation.mutate(user);
  };

  const loginHandle = async (user: UserBodyRequest) => {
    return login(user);
  }

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: loginHandle,
    onSuccess: async (data: UserBodyResponse) => {
      await dispatch(signIn(data))
      openNotificationWithIcon("success", t("loginPage.notification.loginSuccess"), t("loginPage.notification.redirecting"), 2)
      navigate("/home")
    },
    onError(error: AxiosError) {
     
      if (error.code == 'ERR_BAD_REQUEST') {
        openNotificationWithIcon("error", t("loginPage.notification.loginFailed"),t("erroCodes.100010"), 0)
      }
      dispatch(signOut())

    },
    onSettled: async () => {
      await dispatch(setStatus("idle"))
    },
  })

  return (
    <Flex style={{ height: "100%" }} gap="middle" justify='center' align='center' vertical>
      {contextHolder}
      <Image
        width={400}
        src=".\logo.jpg"
        preview={false}
      />
      <Form onFinish={onFinish}>
        <Form.Item name="email" rules={[{ required: true, message: t("loginPage.validationMessage.emailField") }]}>
          <Input disabled={loading} prefix={<UserOutlined />} placeholder={t("loginPage.placeholder.email")} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: t("loginPage.validationMessage.passwordField") }]}>
          <Input disabled={loading} prefix={<LockOutlined />} type="password" placeholder={t("loginPage.placeholder.password")} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            {t("loginPage.loginButton")}
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default LoginPage;
