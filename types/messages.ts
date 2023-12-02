import { profileData } from "./profile";

export interface message {
  messageId: string;
  createdAt?: Date;
  sender: profileData;
  message: string;
  imageURL?: string;
  fileURL?: string;
}
export interface conversation {
  conversationId: string;
  counts: number[];
  lastMessage: message;
  users: profileData[];
}
