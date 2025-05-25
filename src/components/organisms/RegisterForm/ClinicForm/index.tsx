import { Button, Form, Input } from "antd";
import { UserOutlined, ScheduleOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { ClinicDataRegisterForm } from "@/types";
import { FormInstance } from "antd/lib";
import { isValidCNPJ } from "@/utils/validations";
import { InputCnpj } from "@/components/atoms/Inputs/InputCnpj";

type Props = {
  show: boolean
  handleSubmit: (values: ClinicDataRegisterForm) => unknown
  form: FormInstance<ClinicDataRegisterForm>
}
 
export const ClinicForm: React.FC<Props> = ({ show, handleSubmit, form }) => {
  return (
    <Form
      className={
        classNames("w-full flex flex-col gap-[32px]", { "hidden": !show })
      }
      name="registerClinicData"
      onFinish={handleSubmit}
      layout="vertical"
      form={form}
    >
      <div className="flex flex-col gap-[16px]">
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Nenhum campo pode ficar vazio" },
          ]}
          label="Nome da clínica"
          layout="vertical"
          className="m-0"
        >
          <Input
            className="rounded-md"
            size="large"
            id="name"
            placeholder="Digite o nome da sua clínica"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item
          name="cnpj"
          rules={[
            { required: true, message: "Nenhum campo pode ficar vazio" },
            {
              validator: (_, value) => {
                if (isValidCNPJ(value)) {
                  return Promise.resolve();
                }

                return Promise.reject("CNPJ inválido");
              }
            }
          ]}
          label="CPNJ"
          layout="vertical"
          className="m-0"
        >
          <InputCnpj
            placeholder="Insira o CNPJ da sua clínica"
            size="large"
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
