import { Descriptions } from "antd";
import { Clinic } from "@/services/clinicService/dto";
import { formatDateAndTime } from "@/utils/formaters/formatTime";

interface Props {
  data: Clinic;
  title?: React.ReactNode | string;
}

export const ClinicDescription: React.FC<Props> = ({ data, title }) => {
  return (
    <Descriptions
      title={title}
      layout="vertical"
      column={{ xxl: 4, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
    >
      <Descriptions.Item label="Nome">{data.name}</Descriptions.Item>
      <Descriptions.Item label="Criado Em">
        {formatDateAndTime(data.createdAt)}
      </Descriptions.Item>
    </Descriptions>
  );
};
