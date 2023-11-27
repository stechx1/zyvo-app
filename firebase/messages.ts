import {
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import firebase_app from "@/config";
import { conversation, message } from "@/types/messages";
import { profileData } from "@/types/profile";
import { Unsubscribe } from "firebase/auth";
import addData from "./firestore/addData";

const db = getFirestore(firebase_app);
type errorType = { message: string; code: string };

export function getConversationsSnapshot(
  userId: string,
  onSuccess: (data: conversation[]) => void,
  onError: (error: any) => void
) {
  let unsubscribe: Unsubscribe = () => {};

  try {
    unsubscribe = onSnapshot(
      query(
        collection(db, "conversations"),
        where("users", "array-contains", doc(db, "users", userId))
      ),
      async (conversations) => {
        let result: conversation[] = [];
        for (let index = 0; index < conversations.docs.length; index++) {
          const conversation = conversations.docs[index].data();
          const conversationId = conversations.docs[index].id;
          const lastMessageRef = await getDoc(
            conversation.lastMessage as DocumentReference
          );

          const lastMessageSender = (
            await getDoc(lastMessageRef.data()?.sender)
          ).data() as profileData;

          let users: profileData[] = [];
          for (let j = 0; j < conversation.users.length; j++) {
            let user = (await getDoc(conversation.users[j])).data() as any;
            users = [...users, user];
          }
          result = [
            ...result,
            {
              conversationId,
              counts: conversation.counts,
              lastMessage: {
                messageId: lastMessageRef?.id,
                createdAt: lastMessageRef?.data()?.createdAt.toDate(),
                sender: lastMessageSender,
                message: lastMessageRef?.data()?.message,
              },
              users,
            },
          ];
          onSuccess(result);
        }
      }
    );
  } catch (e) {
    console.log(e);
    onError(e);
  }
  return unsubscribe;
}
export function getMessagessSnapshot(
  conversationId: string,
  onSuccess: (data: message[]) => void,
  onError: (error: any) => void
) {
  let unsubscribe: Unsubscribe = () => {};

  try {
    unsubscribe = onSnapshot(
      query(
        collection(db, "messages"),
        where("conversationId", "==", conversationId),
        orderBy("createdAt")
      ),
      async (messages) => {
        let result: message[] = [];
        for (let index = 0; index < messages.docs.length; index++) {
          const message = messages.docs[index].data();
          const messageId = messages.docs[index].id;

          const messageSender = (
            await getDoc(message?.sender)
          ).data() as profileData;

          result = [
            ...result,
            {
              messageId,
              createdAt: message?.createdAt?.toDate(),
              sender: messageSender,
              message: message?.message,
            },
          ];
        }
        onSuccess(result);
      }
    );
  } catch (e) {
    console.log(e);
    onError(e);
  }
  return unsubscribe;
}
export async function sendMessage(
  conversationId: string,
  userId: string,
  message: string
) {
  let result = null;
  let error = null;

  try {
    result = await addDoc(collection(db, "messages"), {
      sender: doc(db, "users", userId),
      conversationId,
      message,
      createdAt: serverTimestamp(),
    });
  } catch (e) {
    if (typeof e === "object") error = e as errorType;
  }

  return { result, error };
}
