import type { NextPage } from 'next';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import { PropsWithChildren } from 'react';

const Layout: NextPage<PropsWithChildren> = ({children}) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
