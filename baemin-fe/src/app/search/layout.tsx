import React, { ReactNode } from 'react';


type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
      <>
          <section className="relative top-24 w-full px-16 mb-5" >{children}</section>
      </>
    );
};

export default Layout;