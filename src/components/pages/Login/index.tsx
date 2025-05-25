import { LoginForm } from "@/components/organisms/LoginForm";
import { theme, Typography } from "antd";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <div
        className="h-screen flex"
        style={{ backgroundColor: colorBgContainer }}
      >
        <div className="flex flex-col my-auto mx-auto xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-2/3 gap-[8px]">
          <section className="flex flex-col gap-[32px]">
            <Typography.Title level={4}>Bem vindo(a) de volta!</Typography.Title>
            <LoginForm />
          </section>

          <Typography.Text className="self-center text-light-80">
            Ainda não possui uma conta?{' '}
            <Link to="/register">Cadastre-se</Link>
          </Typography.Text>
        </div>
      </div>
    </>
  );
};
