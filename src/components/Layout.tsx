import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

type Props = {
    children: ReactNode
  }

export const Layout = ({ children }: Props) => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">{children}</main>
      <Footer />
    </div>
  );
};
