import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { StoreProvider } from "store/index";
// 入口文件
// pages下的所有文件会被自动导入到这里面
export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider initValue={{user:{}}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>

  );
}
