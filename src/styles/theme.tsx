import { ThemeProvider } from "styled-components";
import { ReactNode } from "react";

// Define the theme type
interface ThemeProps {
  children: ReactNode;
}

const theme = {
  color: { primary: "purple", secondary: "red" },
};

// The Theme component
export const Theme = ({ children }: ThemeProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
