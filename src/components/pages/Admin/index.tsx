import { Button, Card, Flex, Radio, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { BasePagination } from "@/components/atoms/BasePagination";
import { CreateClinicModal } from "@/components/molecules/modais/CreateClinicModal";
import { ClinicTable } from "@/components/molecules/tables/ClinicTable";
import { Clinic } from "@/services/clinicService/dto";
import { Pageable } from "@/types";
import { ClinicService } from "@/services/clinicService/service";
import { ActiveStatus } from "@/types/authTypes";
import { useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search";
import { UserService } from "@/services/userService/service";

export const AdminPage = () => {
  const [createClinicModal, setCreateClinicModal] = useState<boolean>(false);
  const [selectedEditClinic, setSelectedEditClinic] = useState<Clinic>();
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [resource, setResource] = useState<Pageable<Clinic>>();
  const [status, setStatus] = useState<ActiveStatus>(ActiveStatus.ACTIVE);

  const navigate = useNavigate();

  const handleView = (value: Clinic) => {
    navigate(`/admin/${value.id}`);
  };

  const fetchPage = async (query?: string) => {
    setLoading(true);
    try {
      const { data } = await ClinicService.getPage(page, {
        query,
        status,
      });
      console.log("fetchClinic", data);
      setResource(data);
    } catch (error) {
      console.error("fetchClinic", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (value: Clinic) => {
    setLoading(true);

    try {
      await UserService.updateStatus(
        value.owner.id as string,
        value.owner?.status == ActiveStatus.ACTIVE
          ? ActiveStatus.INACTIVE
          : ActiveStatus.ACTIVE
      );
      await fetchPage();
    } catch (error) {
      console.error("Handle Clinic disable", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [page, status]);

  return (
    <Card>
      <Flex gap={20} vertical className="overflow-hidden">
        <Flex justify="space-between">
          <Typography.Title level={4} className="whitespace-nowrap">Clinicns</Typography.Title>
          <Flex gap={8}>
            <Radio.Group
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="ACTIVE">Ativos</Radio.Button>
              <Radio.Button value="INACTIVE">Inativos</Radio.Button>
            </Radio.Group>
            <Search
              placeholder="Pesquise um nome da Clinicm ou do proprietário..."
              allowClear
              onSearch={(value) => fetchPage(value)}
              style={{ width: 304 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateClinicModal(true)}
            >
              Nova Clinicm
            </Button>
          </Flex>
        </Flex>

        <Flex gap={20} vertical>
          <ClinicTable
            dataSource={resource?.content ?? []}
            pagination={false}
            loading={loading}
            onView={handleView}
            onEdit={(value) => setSelectedEditClinic(value)}
            onDisable={handleChangeStatus}
            onEnable={handleChangeStatus}
          />
          <BasePagination page={page} setPage={setPage} pageable={resource} />
        </Flex>
      </Flex>

      <CreateClinicModal
        isOpen={createClinicModal || !!selectedEditClinic}
        onClose={() => {
          setCreateClinicModal(false);
          setSelectedEditClinic(undefined);
        }}
        initialData={selectedEditClinic}
        reload={fetchPage}
      />
    </Card>
  );
};
