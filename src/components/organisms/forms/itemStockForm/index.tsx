import { InputProductCode } from "@/components/atoms/Inputs/inputProductCode";
import { CreateItemStockRequest } from "@/services/itemStockService/dto";
import { FormProps } from "antd";
import { Form, Input } from "antd";

interface Props extends FormProps<CreateItemStockRequest> {}

export const ItemStockForm = ({ ...rest }: Props) => {
  return (
    <>
      <Form layout="vertical" {...rest}>
        <Form.Item
          label="Nome do Item"
          name={"name"}
          key={"name"}
          id="name"
          rules={[{ required: true, message: "Campo obrigatório!" }]}
        >
          <Input placeholder="Digite o nome do item de estoque" />
        </Form.Item>

        <Form.Item
          label="Código"
          name={"code"}
          key={"code"}
          id="code"
          rules={[{ required: true, message: "Campo obrigatório!" }]}
        >
          <InputProductCode placeholder="AAA-XXXX" />
        </Form.Item>

        <Form.Item
          label="Descrição"
          name={"description"}
          key={"description"}
          id="description"
        >
          <Input.TextArea
            placeholder="Digite uma descrição (opcional)"
            rows={4}
          />
        </Form.Item>
      </Form>
    </>
  );
};
