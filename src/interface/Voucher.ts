export default interface Voucher {
  id: Number;
  name: string;
  title: string;
  expired: Date;
  type: string;
  status: Number;
  amount: Number;
  userCreate_id: Number;
}
