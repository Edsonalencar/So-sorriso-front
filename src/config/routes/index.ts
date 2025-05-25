import { DashboardPage } from "@/components/pages/Dashboard";
import { LoginPage } from "@/components/pages/Login";
import { RegisterPage } from "@/components/pages/Register";
import { LayoutTemplate } from "@/components/templates/LayoutTemplate";
import { RenderRouter } from "@/types";

export const routes: RenderRouter[] = [
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  {
    path: "/app",
    component: LayoutTemplate,
    children: [{ path: "dashboard", component: DashboardPage }],
  },
];
