import { formatCpfCnpj, formatPhone } from "@/utils/formaters/format";
import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { ActionsMenu } from "../../ActionsMenu";
import { Patient } from "@/services/patientService/dto";

interface Props extends TableProps<Patient> {
  onEdit?: (customer: Patient) => void;
  onView?: (customer: Patient) => void;
  onDisable?: (customer: Patient) => void;
  onEnable?: (customer: Patient) => void;
}

export const PatientTable = ({
  onEdit,
  onView,
  onDisable,
  onEnable,
  ...rest
}: Props) => {
  const columns: ColumnProps<Patient>[] = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (_, item) => (
        <Typography.Link
          className="w-full truncate flex items-center gap-2"
          title={item.profile?.name}
          onClick={() => onView?.(item)}
        >
          {item.profile?.name}
        </Typography.Link>
      ),
    },
    {
      title: "Documento",
      dataIndex: "document",
      key: "document",
      render: (_, { profile }) =>
        profile?.document ? formatCpfCnpj(profile?.document) : "-",
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      key: "phone",
      render: (_, { profile }) =>
        profile?.phone ? formatPhone(profile.phone) : "-",
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <ActionsMenu
          onEdit={onEdit ? () => onEdit?.(item) : undefined}
          onView={onView ? () => onView?.(item) : undefined}
        />
      ),
    },
  ];

  return <Table columns={columns} {...rest} />;
};
