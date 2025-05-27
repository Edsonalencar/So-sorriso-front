import { useEffect, useState } from "react";

import { Flex, Form, Modal, Typography } from "antd";

import { LoadingContent } from "@/components/atoms/LoadingContent";

import { cleanMask } from "@/utils/formaters/format";
import { CreateClinicDTO, Clinic } from "@/services/clinicService/dto";
import { ClinicService } from "@/services/clinicService/service";
import { ClinicForm } from "@/components/organisms/forms/ClinicForm";
import { AddressForm } from "@/components/organisms/forms/AddressForm";
import { validateFormIsEmpty } from "@/utils/validations";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Clinic;
  reload?: () => Promise<void>;
}

export const CreateClinicModal = ({
  isOpen,
  onClose,
  initialData,
  reload,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<CreateClinicDTO>();

  const create = async (data: CreateClinicDTO) => {
    const formData = {
      ...data,
      document: cleanMask(data.document),
    };

    console.log("formData", formData);
    console.log("data", data);

    try {
      setLoading(true);
      const res = await ClinicService.create(formData);
      if (!res) return;
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("Create Clinic", error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: CreateClinicDTO) => {
    const formData = {
      ...data,
      document: cleanMask(data.document),
      ownerId: initialData?.owner?.id,
    };

    try {
      setLoading(true);
      await ClinicService.update(id, formData);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("Update Clinic", error);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    const formValue = await form.validateFields();

    if (initialData?.id) update(initialData.id, formValue);
    else create(formValue);
  };

  const closeModal = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (initialData && isOpen) {
      const formValue: CreateClinicDTO = {
        ...initialData,
        ...initialData.owner?.profile,
        username: initialData.owner?.auth?.username!,
        ownerName: initialData.owner?.profile?.name,
      };

      form.setFieldsValue(formValue);
    }
  }, [initialData, isOpen]);

  return (
    <Modal
      title={`${initialData ? "Editar" : "Adicionar"} Clinicm`}
      open={isOpen}
      onOk={submit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={800}
    >
      <LoadingContent isLoading={loading} />

      <Flex gap={15} vertical className="mt-5">
        <ClinicForm form={form} requiredPassword={!initialData} />
        <Typography.Title level={5}>Endereço {`(Opcional)`}</Typography.Title>
        <AddressForm form={form} />
      </Flex>
    </Modal>
  );
};
