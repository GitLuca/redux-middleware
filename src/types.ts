import { Method } from "axios";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type Mode = "posts" | "users";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PostState = {
  posts: Record<number, Post>;
  mode: Mode;
  users: Record<number, User>;
  loading: boolean
  error: string[]
};
export type ActionMeta = {
  url: string;
  method: Method;
  onSuccess: string;
  body: any;
};
