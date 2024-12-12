declare global {
  namespace Express {
    interface User {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      status: string;
    }
  }
}
