// 定义user表
type IUserInfo = {
  userId?: number,
  nickname?: string,
  avatar?: string,
};

export interface IUserStore {
  userInfo: IUserInfo;
  setUserInfo: (val: IUserInfo) => void;
}

const userStore = (): IUserStore => {
  return {
    userInfo: {},
    setUserInfo: function (val) {
      this.userInfo = val;
    },
  };
};

export default userStore;
