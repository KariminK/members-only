export type userStatus = "member" | "admin" | "guest";
declare global {
  namespace Express {
    interface User {
      id?: number;
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      status: userStatus;
    }
  }
}

export interface Message {
  id?: number;
  text: string;
  author_id: number;
  sent_date: Date;
}
