export default interface Feedback {
  id: Number;
  createdAt: Date;
  status: boolean;
  title: string;
  content?: string;
  email?: string;
  userSend_id: Number;
  brand_id: Number;
  game_id: Number;
}
