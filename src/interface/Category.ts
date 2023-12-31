export default interface Category {
  id: Number;
  createAt: Date;
  updateAt: Date;
  name: string;
  status: boolean;
  isPushlished: boolean;
  userCreate_id: Number;
  userUpdate_id: Number;
  userDelete_id: Number;
}
