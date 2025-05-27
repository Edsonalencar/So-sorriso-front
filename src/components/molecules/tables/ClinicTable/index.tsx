import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { Clinic } from "@/services/clinicService/dto";
import { ActiveStatusTag } from "@/components/atoms/ActiveStatusTag";
import { ActionsMenu } from "../../ActionsMenu";
import { ActiveStatus } from "@/types/authTypes";

interface Props extends TableProps<Clinic> {
  onEdit?: (value: Clinic) => void;
  onView?: (value: Clinic) => void;
  onDisable?: (value: Clinic) => void;
  onEnable?: (value: Clinic) => void;
}

export const ClinicTable = ({
  onView,
  onDisable,
  onEdit,
  onEnable,
  ...rest
}: Props) => {
  const columns: ColumnProps<Clinic>[] = [
    {
      title: "Ind.",
      dataIndex: "id",
      key: "id",
      className: "text-sm",
      render: (_, item) => (
        <Typography.Link onClick={() => onView?.(item)}>
          {item.id?.substring(0, 8)}
        </Typography.Link>
      ),
    },
    {
      title: "Proprietário",
      dataIndex: "owner",
      key: "owner",
      render: (_, { owner }) => (
        <p
          className=" w-full truncate flex items-center gap-2"
          title={owner.profile?.name}
        >
          {owner.profile?.name}
          <ActiveStatusTag status={owner.status} />
        </p>
      ),
    },
    {
      title: "Email",
      dataIndex: "owner",
      key: "owner",
      render: (_, { owner }) => owner.auth?.username,
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <ActionsMenu
          onEdit={onEdit ? () => onEdit?.(item) : undefined}
          onView={onView ? () => onView?.(item) : undefined}
          onDisable={
            onDisable && item.owner.status != ActiveStatus.INACTIVE
              ? () => onDisable?.(item)
              : undefined
          }
          onEnable={
            onEnable && item.owner.status != ActiveStatus.ACTIVE
              ? () => onEnable?.(item)
              : undefined
          }
        />
      ),
    },
  ];

  return <Table columns={columns} {...rest} />;
};
