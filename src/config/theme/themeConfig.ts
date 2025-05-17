import { theme, ThemeConfig } from "antd";

export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm, // Tema Claro
  token: {
    fontSize: 16,
    colorPrimary: "#4DA9FF",
    borderRadius: 8,
    colorTextBase: "#0B1014",
  },
  components: {
    Menu: {
      iconSize: 15,
      fontSize: 15,
      colorBgBase: "transparent",
      colorBgContainer: "transparent",
    },
    Button: {
      borderRadius: 8,
    },
    Input: {
      borderRadius: 8,
    },
    Layout: {
      headerBg: "#FAFAFA",
      headerColor: "#0B1014",
      bodyBg: "#FAFAFA",
    },
    Table: {
      fontSize: 15,
    },
    Typography: {
      colorText: "#0B1014",
    },
  },
};

export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm, // Tema Escuro
  token: {
    fontSize: 16,
    colorPrimary: "#4DA9FF",
    borderRadius: 8,
    colorTextBase: "#E0E0E0",
    colorBgContainer: "#1a1a1a",
  },
  components: {
    Menu: {
      iconSize: 15,
      fontSize: 15,
      colorBgBase: "transparent",
      colorBgContainer: "transparent",
    },
    Button: {
      borderRadius: 8,
    },
    Input: {
      borderRadius: 8,
    },
    Layout: {
      headerBg: "#222",
      headerColor: "#FAFAFA",
      bodyBg: "#1a1a1a",
    },
    Table: {
      fontSize: 15,
    },
    Typography: {
      colorText: "#E0E0E0",
    },
  },
};
