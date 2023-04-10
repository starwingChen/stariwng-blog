// 返回一个provider
import {ReactNode, createContext, useContext } from 'react';
import createStore, { IRootStore } from './rootStore';
import { useLocalObservable, enableStaticRendering } from 'mobx-react-lite';

// SSR项目要开启
enableStaticRendering(true);

interface StoreProviderProps {
  initValue: Record<string, any>;
  children?: ReactNode;
}

const StoreContext = createContext({});

export const StoreProvider = ({ initValue, children }: StoreProviderProps) => {
  // mobx监听store
  const store: IRootStore = useLocalObservable(createStore(initValue));
  
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
};

export const useStore = () =>{
  const store: IRootStore = useContext(StoreContext)  as IRootStore
  if(!store){
    throw new Error('数据不存在')
  }
  return store
}