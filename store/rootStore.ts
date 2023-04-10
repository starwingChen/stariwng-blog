import userStore, { IUserStore } from './userStore';
export interface IRootStore {
  user: IUserStore;
}
// createStore是一个函数，返回值的类型是() => IRootStore
export default function createStore(initValue: any): () => IRootStore {
  return () => {
    return {
      user: {
        ...userStore(),
        ...initValue.user,
      },
    };
  };
}

