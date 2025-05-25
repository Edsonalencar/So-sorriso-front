import { Form } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { AuthenticationRegisterForm, ClinicDataRegisterForm, PersonalDataRegisterForm } from "@/types";
import { RegisterFormSteps } from "@/types/authTypes";
import { AuthForm } from "./AuthForm";
import { PersonalForm } from "./PersonalForm";
import { ClinicForm } from "./ClinicForm";
import { toast } from "react-toastify";

type Props = {
  currentStep: RegisterFormSteps
  setCurrentStep: Dispatch<SetStateAction<RegisterFormSteps>>
}

export const RegisterForm: React.FC<Props> = ({ currentStep, setCurrentStep }) => {
  const [authenticationForm] = Form.useForm<AuthenticationRegisterForm>();
  const [personalDataForm] = Form.useForm<PersonalDataRegisterForm>();
  const [clinicDataForm] = Form.useForm<ClinicDataRegisterForm>();
   
  const [loading, setLoading] = useState(false);

  const onFinishAuthStep = async () => {
    setCurrentStep(RegisterFormSteps.PERSONAL);
  };
   
  const onFinishPersonalStep = async () => {
    setCurrentStep(RegisterFormSteps.CLINIC);
  };
   
  const handleSubmit = async () => {
    const fields = {
      ...authenticationForm.getFieldsValue(),
      ...personalDataForm.getFieldsValue(),
      ...clinicDataForm.getFieldsValue()
    };

    setLoading(true);

    try {
      console.log({ fields });

      toast("Clínica cadastrada com sucesso!", { type: "success" });
    } catch (error: unknown) {
      console.error({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthForm
        show={currentStep === RegisterFormSteps.AUTH}
        handleSubmit={onFinishAuthStep}
        form={authenticationForm}
      />

      <PersonalForm
        show={currentStep === RegisterFormSteps.PERSONAL}
        handleSubmit={onFinishPersonalStep}
        form={personalDataForm}
      />
       
      <ClinicForm
        show={currentStep === RegisterFormSteps.CLINIC}
        handleSubmit={handleSubmit}
        form={clinicDataForm}
      />
    </>
  );
};
