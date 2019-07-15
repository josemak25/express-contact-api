export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  block: boolean;
}

export interface Request {
  body: Contact;
  params: { id: string };
}

export interface BlockContact {
  id: string;
  block: string;
}
