export interface KeyStore {
  id: number;
  createAt: Date;
  primaryKey: string;
  secondaryKey: string;
  status?: boolean;
  user_id: number;
}
