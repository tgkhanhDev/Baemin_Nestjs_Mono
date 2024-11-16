import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <section className="relative h-screen w-full flex justify-center items-center">
        {children}
      </section>
    </>
  );
};

export default Layout;
