export interface BooksInterface {
  title: string;
  description: string;
  price: number;
}

export interface UsersInterface {
  name: string;
  email: string;
  password: string;
}

export interface CartInterface {
  has_paid: boolean;
  is_ordered: boolean;
}

export interface Books_Author_Interface {
  author_name: string;
}

export interface Books_Genre_Interface {
  genre_name: string;
}

export interface Books_Rating_Interface {
  value: number;
}

export interface CommentInterface {
  text: string;
}

export interface User_Avatar_Interface {
  photo: string;
}

export interface Books_Photos_Interface {
  photo: string;
}

export interface CartBookInterface {
  amount: number;
}

export interface DecodedTokenInterface {
  id: string;
  iat: number;
  exp: number;
}