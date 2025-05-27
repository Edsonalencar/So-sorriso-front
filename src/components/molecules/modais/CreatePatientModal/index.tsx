import { useEffect, useState } from "react";
import { Flex, Form, Modal, Typography } from "antd";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { UserForm } from "@/components/organisms/forms/UserForm";
import { UserType } from "@/types";
import { cleanMask } from "@/utils/formaters/format";
import { AddressForm } from "@/components/organisms/forms/AddressForm";
import { Address } from "@/types/authTypes";
import { validateFormIsEmpty } from "@/utils/validations";
import { CreatePatientDTO, Patient } from "@/services/patientService/dto";
import { PatientService } from "@/services/patientService/service";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Patient;
  reload?: () => Promise<void>;
}

export const CreateCustomerModal = ({
  isOpen,
  onClose,
  initialData,
  reload,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [profileForm] = Form.useForm<UserType>();
  const [addressForm] = Form.useForm<{ address: Address }>();

  const update = async (id: string, data: CreatePatientDTO) => {
    const formData = {
      ...data,
      document: cleanMask(data.document),
    };

    try {
      setLoading(true);
      await PatientService.update(id, formData);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("update Jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    const profileData = await profileForm.validateFields();
    const addressData = await addressForm.validateFields();

    const formValue: CreatePatientDTO = {
      ...profileData,
      address: validateFormIsEmpty(addressData.address)
        ? addressData.address
        : undefined,
    };

    if (initialData?.id) update(initialData.id, formValue);
  };

  const closeModal = () => {
    profileForm.resetFields();
    addressForm.resetFields();
    onClose();
  };

  useEffect(() => {
    if (initialData && isOpen) {
      profileForm.setFieldsValue({
        ...initialData.profile,
      });
      addressForm.setFieldsValue({ address: initialData.profile.address });
    }
  }, [initialData, isOpen]);

  return (
    <Modal
      title={`${initialData ? "Editar" : "Adicionar"} paciente`}
      open={isOpen}
      onOk={submit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={1000}
    >
      <LoadingContent isLoading={loading} />

      <Flex gap={15} vertical className="mt-5">
        <UserForm form={profileForm} />

        <Typography.Title level={5}>Endereço</Typography.Title>
        <AddressForm
          form={addressForm}
          address={initialData?.profile.address}
        />
      </Flex>
    </Modal>
  );
};
