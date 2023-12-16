import {
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import firebase_app from "@/config";
import { conversation, message } from "@/types/messages";
import { profileData } from "@/types/profile";
import { Unsubscribe } from "firebase/auth";

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
              unreadCount: conversation.unreadCount,
              lastMessage: {
                messageId: lastMessageRef?.id,
                createdAt: lastMessageRef?.data()?.createdAt.toDate(),
                sender: lastMessageSender,
                message: lastMessageRef?.data()?.message,
                imageURL:lastMessageRef.data()?.imageURL, 
                fileURL:lastMessageRef.data()?.fileURL, 
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
              imageURL: message?.imageURL,
              fileURL: message.fileURL,
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
  message: string,
  imageURL?: string,
  fileURL?: string
) {
  let result = null;
  let error = null;
  const fileURLS: any = {
    fileURL,
    imageURL,
  };
  Object.keys(fileURLS).forEach((key) =>
    fileURLS[key] === undefined ? delete fileURLS[key] : {}
  );
  try {
    result = await addDoc(collection(db, "messages"), {
      sender: doc(db, "users", userId),
      conversationId,
      message,
      ...fileURLS,
      createdAt: serverTimestamp(),
    });
    result = await setDoc(
      doc(db, "conversations", conversationId),
      {
        lastMessage: result,
        unreadCount: increment(1),
      },
      {
        merge: true,
      }
    );
  } catch (e) {
    if (typeof e === "object") error = e as errorType;
  }

  return { result, error };
}
export async function resetUnreadCount(conversationId: string) {
  let result = null;
  let error = null;
  try {
    await setDoc(
      doc(db, "conversations", conversationId),
      {
        unreadCount: 0,
      },
      {
        merge: true,
      }
    );
  } catch (e) {
    if (typeof e === "object") error = e as errorType;
  }

  return { result, error };
}
