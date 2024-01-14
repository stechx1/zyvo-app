import { User } from "./user";

export interface message {
  messageId: string;
  createdAt?: Date;
  sender: User;
  message: string;
  imageURL?: string;
  fileURL?: string;
}
export interface conversation {
  conversationId: string;
  lastMessage: message;
  users: User[];
  unreadCount: number;
}
