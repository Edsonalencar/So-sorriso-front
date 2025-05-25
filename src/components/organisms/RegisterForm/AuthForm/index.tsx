import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { AuthenticationRegisterForm } from "@/types";
import { FormInstance } from "antd/lib";

type Props = {
  show: boolean
  handleSubmit: (values: AuthenticationRegisterForm) => unknown
  form: FormInstance<AuthenticationRegisterForm>
}
 
export const AuthForm: React.FC<Props> = ({ show, handleSubmit, form }) => {
  return (
    <Form
      className={
        classNames("w-full flex flex-col gap-[32px]", { "hidden": !show })
      }
      name="registerAuthData"
      onFinish={handleSubmit}
      layout="vertical"
      form={form}
    >
      <div className="flex flex-col gap-[16px]">
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Nenhum campo pode ficar vazio" },
            { type: "email", message: "Insira um email válido" }
          ]}
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
            autoComplete="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Nenhum campo pode ficar vazio" },
            { min: 10, message: "Insira pelo menos 10 caracteres" }
          ]}
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
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item
          name="passwordConfirmation"
          rules={[
            {
              required: true,
              message: "Nenhum campo pode ficar vazio"
            },
            {
              validator: (_, value) => {
                if (!value || form.getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("A confirmação da senha deve ser igual à senha"));
              }
            }
          ]}
          label="Confirmar senha"
          layout="vertical"
          className="m-0"
        >
          <Input.Password
            className="rounded-md"
            id="passwordConfirmation"
            type="password"
            placeholder="Confirme sua senha"
            size="large"
            prefix={<LockOutlined />}
            autoComplete="new-password"
          />
        </Form.Item>
      </div>

      <Form.Item className="m-0">
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          block
          className="w-full"
        >
          Continuar
        </Button>
      </Form.Item>
    </Form>
  )
}
