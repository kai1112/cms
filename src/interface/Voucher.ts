export default interface Voucher {
  id: Number;
  createAt: Date;
  name: string;
  title: string;
  expired: Date;
  type: string;
  status: number;
  amount: Number;
  userCreate_id: number;
}
