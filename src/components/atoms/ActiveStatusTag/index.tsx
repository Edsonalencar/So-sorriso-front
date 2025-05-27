import { ActiveStatus } from "@/types/authTypes";
import { ActiveStatusSerialize } from "@/utils/serializers";
import { Tag } from "antd";

export const ActiveStatusTag: React.FC<{ status?: ActiveStatus }> = ({
  status,
}) => {
  const getColor = (status?: ActiveStatus) => {
    switch (status) {
      case ActiveStatus.ACTIVE:
        return "green";
      case ActiveStatus.INACTIVE:
        return "red";
      default:
        return "default";
    }
  };

  return (
    <Tag color={getColor(status)} style={{ fontSize: 10, lineHeight: "none" }}>
      {ActiveStatusSerialize(status)}
    </Tag>
  );
};
