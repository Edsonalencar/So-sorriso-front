import { Button, Form, Input } from "antd";
import { ScheduleOutlined, UserOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { PersonalDataRegisterForm } from "@/types";
import { FormInstance } from "antd/lib";
import PhoneInput from "antd-phone-input";
import { InputCpf } from "@/components/atoms/Inputs/InputCpf";
import { isValidCPF } from "@/utils/validations";

type Props = {
  show: boolean
  handleSubmit: (values: PersonalDataRegisterForm) => unknown
  form: FormInstance<PersonalDataRegisterForm>
}
 
export const PersonalForm: React.FC<Props> = ({ show, handleSubmit, form }) => {
  return (
    <Form
      className={
        classNames("w-full flex flex-col gap-[32px]", { "hidden": !show })
      }
      name="registerPersonalData"
      onFinish={handleSubmit}
      layout="vertical"
      form={form}
    >
      <div className="flex flex-col gap-[16px]">
        <Form.Item
          name="ownerName"
          rules={[
            { required: true, message: "Nenhum campo pode ficar vazio" },
          ]}
          label="Seu nome"
          layout="vertical"
          className="m-0"
        >
          <Input
            className="rounded-md"
            size="large"
            id="name"
            placeholder="Digite seu nome"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Nenhum campo pode ficar vazio" },
            {
              validator: (_, {valid}) => {
                if (valid()) {
                  return Promise.resolve();
                }
                 
                return Promise.reject("Insira um número válido");
              }
            }
          ]}
          label="Telefone"
          layout="vertical"
          className="m-0"
        >
          <PhoneInput size="large" />
        </Form.Item>
        <Form.Item
          name="document"
          rules={[
            { required: true, message: "Nenhum campo pode ficar vazio" },
            {
              validator: (_, value) => {
                if (isValidCPF(value)) {
                  return Promise.resolve();
                }

                return Promise.reject("CPF inválido");
              }
            }
          ]}
          label="CPF"
          layout="vertical"
          className="m-0"
        >
          <InputCpf
            size="large"
            placeholder="Insira seu cpf"
            prefix={<ScheduleOutlined />}
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
