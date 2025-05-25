import { RegisterForm } from "@/components/organisms/RegisterForm";
import { Steps, theme, Typography } from "antd";
import { Link } from "react-router-dom";
import { HiKey, HiBuildingOffice, HiIdentification } from 'react-icons/hi2'
import { useState } from "react";
import { RegisterFormSteps } from "@/types/authTypes";

export const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(RegisterFormSteps.AUTH);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <div
        className="h-screen flex flex-col items-center justify-center gap-[48px]"
        style={{ backgroundColor: colorBgContainer }}
      >
        <section className="flex flex-col w-full items-center flex-col gap-[8px]">
          <Typography.Title level={4} className="w-fit">Vamos criar sua conta!</Typography.Title>
           
          <Steps
            className="w-2/3 hidden lg:flex"
            labelPlacement="horizontal"
            items={[
              { title: 'Dados de autenticação', icon: <div className="flex items-center h-[32px]"><HiKey size="24px" /></div> },
              { title: 'Dados pessoais', icon: <div className="flex items-center h-[32px]"><HiIdentification size="24px" /></div> },
              { title: 'Dados da sua clínica', icon: <div className="flex items-center h-[32px]"><HiBuildingOffice size="24px" /></div> },
            ]}
            current={currentStep}
            responsive
          />
        </section>

        <div className="flex flex-col xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-2/3 gap-[8px]">
          <RegisterForm currentStep={currentStep} setCurrentStep={setCurrentStep} />

          <Typography.Text className="self-center text-light-80">
            Já tem uma conta?{' '}
            <Link to="/login">Autentique-se</Link>
          </Typography.Text>
        </div>
      </div>
    </>
  );
};
