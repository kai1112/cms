export default interface User {
  id: Number;
  createdAt: Date;
  updateAt: Date;
  nickName: string;
  userName: string;
  password: string;
  avatar: string;
  phoneNumber?: string;
  email?: string;
  role_id: Number;
}
