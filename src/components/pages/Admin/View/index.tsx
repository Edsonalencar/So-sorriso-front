import { LoadingContent } from "@/components/atoms/LoadingContent";
import { ToBack } from "@/components/atoms/ToBack";
import { ProfileWitchEmailDescription } from "@/components/molecules/Descriptions/ProfileWitchEmailDescription";
import { Button, Card, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { Clinic } from "@/services/clinicService/dto";
import { ClinicService } from "@/services/clinicService/service";
import { ClinicDescription } from "@/components/molecules/Descriptions/ClinicDescription";
import { AddressDescription } from "@/components/molecules/Descriptions/AddressDescription";
import { CreateClinicModal } from "@/components/molecules/modais/CreateClinicModal";

export const ViewAdminPage: React.FC = () => {
  const [resourceLoading, setResourceLoading] = useState(false);
  const [resource, setResource] = useState<Clinic>();
  const [canEdit, setCanEdit] = useState(false);

  const { uuid } = useParams();

  const fetchResource = async (resourceId: string) => {
    setResourceLoading(true);
    try {
      const { data } = await ClinicService.getById(resourceId);
      setResource(data);
    } catch (error) {
      console.error("fetchResource [ViewManagerPage]", error);
    } finally {
      setResourceLoading(false);
    }
  };

  const reload = async () => {
    if (!uuid) return;
    await fetchResource(uuid);
  };

  useEffect(() => {
    if (uuid) fetchResource(uuid);
  }, [uuid]);

  if (!resource) return <LoadingContent isLoading />;

  return (
    <>
      <LoadingContent isLoading={resourceLoading} />

      <Flex gap={20} vertical>
        <ToBack />
        <Card>
          <Flex gap={20} vertical>
            <ClinicDescription
              title={
                <Flex gap={16} justify="space-between">
                  <Typography.Title level={5}>
                    Dados da Clinicm
                  </Typography.Title>
                  <Button
                    onClick={() => setCanEdit(true)}
                    className="flex items-center gap-1"
                    type="text"
                  >
                    <AiFillEdit />
                    Editar
                  </Button>
                </Flex>
              }
              data={resource}
            />

            <ProfileWitchEmailDescription
              title="Proprietário"
              data={{
                ...resource?.owner?.profile,
                email: resource?.owner?.auth?.username ?? "",
                status: resource?.owner?.status,
              }}
            />
          </Flex>
        </Card>
      </Flex>

      <CreateClinicModal
        isOpen={canEdit}
        onClose={() => setCanEdit(false)}
        initialData={resource}
        reload={reload}
      />
    </>
  );
};
