import { Button, Checkbox, Form, Input } from "antd";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginType } from "@/types";
import { AuthContext } from "@/contexts/AuthContext";
import CryptoJS from "crypto-js";
import { config } from "@/config";

export const LoginForm = () => {
  const [form] = Form.useForm<LoginType>();
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);
  const secret = config.SECRET_KEY;

  useEffect(() => {
    const rememberMe = localStorage.getItem("nectar_remember");
    const username = localStorage.getItem("nectar_username");
    const password = localStorage.getItem("nectar_password");

    const remember = rememberMe == "true";

    if (remember && username && password) {
      const decryptPass = CryptoJS.AES.decrypt(password, secret).toString(
        CryptoJS.enc.Utf8
      );

      form.setFieldsValue({
        username: username,
        password: decryptPass,
        remember: remember,
      });
    }
  }, [secret]);

  const onFinish = async (values: LoginType) => {
    try {
      setLoading(true);
      const result = await signIn({
        username: values.username,
        password: values.password,
      });

      if (values.remember) {
        const encryptPass = CryptoJS.AES.encrypt(
          values.password,
          secret
        ).toString();

        localStorage.setItem("nectar_remember", values.remember.toString());
        localStorage.setItem("nectar_username", values.username.toString());
        localStorage.setItem("nectar_password", encryptPass);
      } else {
        localStorage.removeItem("nectar_remember");
        localStorage.removeItem("nectar_username");
        localStorage.removeItem("nectar_password");
      }

      if (!result) toast.success("Login efetuado com sucesso!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <Form
      className="w-full flex flex-col gap-[18px]"
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <div className="flex flex-col gap-[16px]">
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Nenhum campo pode ficar vazio" }]}
          label="E-mail"
          layout="vertical"
          className="m-0"
        >
          <Input
            className="rounded-md"
            size="large"
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Nenhum campo pode ficar vazio" }]}
          label="Senha"
          layout="vertical"
          className="m-0"
        >
          <Input.Password
            className="rounded-md"
            id="password"
            type="password"
            placeholder="Digite sua senha"
            size="large"
            prefix={<LockOutlined />}
          />
        </Form.Item>
      </div>
       
      <Form.Item name="remember" noStyle>
        <Checkbox id="remember">Lembrar de mim</Checkbox>
      </Form.Item>

      <Form.Item className="m-0">
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          block
          className="w-full"
          loading={loading}
          disabled={loading}
        >
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
};
