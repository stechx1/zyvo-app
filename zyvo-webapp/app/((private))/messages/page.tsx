"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import {
  getMessagessSnapshot,
  sendMessage,
  resetUnreadCount,
} from "@/firebase/messages";
import { conversation, message } from "@/types/messages";
import { format, formatDistance } from "date-fns";
import toast from "react-hot-toast";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebase_app from "@/config";
import Badge from "@/components/Badge";
import HostProperties from "@/collections/HostProperties";
import { getFullName, getOtherUser } from "@/lib/utils";
import { profileData } from "@/types/profile";
import { getUserByPath } from "@/firebase/user";
const storage = getStorage(firebase_app);

export default function Messages() {
  const searchParams = useSearchParams();
  let userId = searchParams.get("userId");

  const { user, conversations } = useAuthContext();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messages, setMessages] = useState<message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedConversation, setSelectedConversation] =
    useState<conversation>();
  const [newChatConversation, setNewChatConversation] =
    useState<conversation>();
  const [newChatUser, setNewChatUser] = useState<profileData | null>(null);

  useEffect(() => {
    if (userId) {
      const fountConvo = conversations.find((c) =>
        c.users.find((u) => u.userId === userId)
      );
      if (fountConvo) {
        setSelectedConversation(fountConvo);
      } else {
        getNewChatUser("/users/" + userId);
      }
    }
  }, [userId, conversations]);


  useEffect(() => {
    if (selectedConversation == null) {
      return;
    }
    setIsMessagesLoading(true);
    const unsubscribe = getMessagessSnapshot(
      selectedConversation.conversationId,
      (msgs) => {
        setMessages(msgs);
        setIsMessagesLoading(false);
      },
      (e) => {
        console.log(e);
        setIsMessagesLoading(false);
      }
    );
    if (
      selectedConversation.unreadCount > 0 &&
      selectedConversation.lastMessage.sender.userId !== user?.userId
    ) {
      resetUnreadCount(selectedConversation.conversationId);
    }
    return () => {
      unsubscribe();
    };
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getNewChatUser = async (sender: string) => {
    const { result } = await getUserByPath(sender);
    if (result) {
      if (user) {
        const newConversation = {
          conversationId: "",
          lastMessage: { message: "", messageId: "", sender: user },
          unreadCount: 0,
          users: [user, result],
        };
        setNewChatUser(result);
        setNewChatConversation(newConversation);
        setSelectedConversation(newConversation);
      }
    }
  };
  const getTimeDifference = (date?: Date) => {
    if (!date) return "";
    return formatDistance(date, new Date(), { addSuffix: true });
  };

  const submitMessage = () => {
    if (selectedConversation && user && newMessage.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          message: newMessage,
          messageId: Math.random().toString(),
          sender: user,
        },
      ]);
      setNewMessage("");
      sendMessage(
        selectedConversation?.conversationId,
        user?.userId,
        newMessage,
        undefined,
        undefined,
        newChatUser?.userId
      ).then(({ result, error }) => {
        setNewChatConversation(undefined);
        setNewChatUser(null);
        if (error) {
          toast.error("error sending message!");
          setMessages((prev) => prev.splice(-1));
        }
      });
    }
  };
  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      !e.target.files ||
      e.target.files.length === 0 ||
      !selectedConversation ||
      !user
    )
      return;

    const file = e.target.files[0];
    const fileType = file["type"].startsWith("image/") ? "IMAGE" : "FILE";
    const objectUrl = URL.createObjectURL(e.target.files[0]);

    setMessages((prev) => [
      ...prev,
      {
        message: newMessage,
        messageId: Math.random().toString(),
        sender: user,
        imageURL: fileType === "IMAGE" ? objectUrl : undefined,
        fileURL: fileType === "FILE" ? objectUrl : undefined,
      },
    ]);

    const profileImgRef = ref(storage, `chat-files/${file.name}`);

    await uploadBytes(profileImgRef, file);
    const uploadedURL = await getDownloadURL(profileImgRef);
    sendMessage(
      selectedConversation?.conversationId,
      user?.userId,
      newMessage,
      fileType === "IMAGE" ? uploadedURL : undefined,
      fileType === "FILE" ? uploadedURL : undefined,
      newChatUser?.userId
    ).then(({ result, error }) => {
      if (error) {
        setNewChatConversation(undefined);
        setNewChatUser(null);
        toast.error("error sending message!");
        setMessages((prev) => prev.splice(-1));
      }
    });
  };

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="flex justify-between space-x-4">
      {/*========================================= conversations ===================================== */}
      <div
        className={`${
          selectedConversation ? "hidden" : "block"
        } w-[100%] sm:block sm:w-[40%] lg:w-[25%] h-[80vh] space-y-2`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-lg">All Conversations</div>
            <Image src={"/icons/down.svg"} alt="down" width={13} height={13} />
          </div>
          <div className="me-1">
            <Image
              src={"/icons/search.svg"}
              alt="search"
              width={18}
              height={18}
            />
          </div>
        </div>
        <div className="h-[75vh] overflow-auto space-y-3">
          {conversations.length > 0 &&
            conversations.map((conversation) => {
              return (
                <ConversationBox
                  key={conversation.conversationId}
                  user={user}
                  conversation={conversation}
                  onSelect={() => {setSelectedConversation(conversation)}}
                  selectedConversation={selectedConversation}
                  time={getTimeDifference(conversation.lastMessage?.createdAt)}
                />
              );
            })}
          {!newChatConversation && conversations.length === 0 && (
            <div className="text-center m-auto h-[100%] flex items-center justify-center">
              No Conversations
            </div>
          )}
        </div>
      </div>
      {/* ========================================== messages =========================================*/}
      <div
        className={`${
          !selectedConversation ? "hidden" : "flex"
        } w-[100%] sm:w-[60%] lg:w-[50%] h-[80vh] sm:flex flex-col border rounded-lg`}
      >
        {selectedConversation ? (
          <div className="flex flex-col h-[100%]">
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <div className="flex space-x-2 items-center">
                <div className="rounded-full border-2 border-gray-200 p-1">
                  <Image
                    src={
                      user
                        ? getOtherUser(selectedConversation.users, user)
                            ?.photoURL ?? "/icons/profile-icon.png"
                        : "/icons/profile-icon.png"
                    }
                    alt="profile-pic"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <div>
                    {user
                      ? getFullName(
                          getOtherUser(selectedConversation.users, user)
                        )
                      : ""}
                  </div>
                  <div className="text-green-500">online</div>
                </div>
              </div>
              <div className="flex justify-between items-center space-x-2">
                <div className=" w-[35px] h-[35px] flex items-center justify-center rounded-full border border-gray-300 ">
                  <Image
                    src={"/icons/star.svg"}
                    alt="star"
                    width={20}
                    height={20}
                  />
                </div>
                <div className=" w-[35px] h-[35px] flex items-center justify-center rounded-full border border-gray-300 ">
                  <Image
                    src={"/icons/dots-vertical.svg"}
                    alt="dots"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              {messages?.length > 0 ? (
                messages.map((message) => {
                  return (
                    <div key={message.messageId} className="px-4 py-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex space-x-2 items-center">
                            <div className="rounded-full border border-gray-200">
                              <Image
                                src={
                                  message.sender?.photoURL ??
                                  "/icons/profile-icon.png"
                                }
                                alt="profile-pic"
                                width={35}
                                height={35}
                                className="rounded-full"
                              />
                            </div>
                            <div>
                              <div>{getFullName(message.sender)}</div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-auto mt-1">
                          {message.createdAt
                            ? format(message.createdAt, "MMM dd, yyyy, hh:mm a")
                            : "sending..."}
                        </div>
                      </div>
                      <div>{message.message}</div>
                      <div>
                        {message?.imageURL ? (
                          <Image
                            title="Click to download"
                            role="button"
                            src={message.imageURL ?? ""}
                            alt="image"
                            width={200}
                            height={200}
                            onClick={() =>
                              message.imageURL &&
                              handleDownload(message.imageURL)
                            }
                            className="border m-2"
                          />
                        ) : message.fileURL ? (
                          <Image
                            title="Click to download"
                            role="button"
                            src={"/icons/file.png"}
                            alt="file-icon"
                            width={100}
                            height={100}
                            onClick={() =>
                              message.fileURL && handleDownload(message.fileURL)
                            }
                            className="m-2"
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center m-auto h-[100%] flex items-center justify-center">
                  {isMessagesLoading ? "Loading.." : "No new messages"}
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>
            <div className="flex items-center space-x-2 px-4 py-3">
              <div className="w-[100%] relative">
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      submitMessage();
                    }
                  }}
                  className={`ps-4 pe-8 py-2 border focus:border-gray-400 rounded-full focus:outline-none text-gray-600 w-full sm:text-sm bg-gray-100 `}
                  type={"text"}
                  placeholder={"Type a message..."}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <div className="absolute right-3 top-[30%]">
                  <label htmlFor="files" role="button">
                    <Image
                      src={"/icons/file.svg"}
                      alt="file"
                      width={15}
                      height={15}
                    />
                  </label>
                </div>
                <input
                  type="file"
                  // accept="image/*"
                  id="files"
                  onChange={onSelectFile}
                  className="hidden"
                />
              </div>
              <div
                className=" w-[35px] h-[35px] flex items-center justify-center rounded-full  bg-secondary-green "
                onClick={submitMessage}
                role="button"
              >
                <Image
                  src={"/icons/send.svg"}
                  alt="send"
                  width={15}
                  height={15}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[100%]">
            No Conversation selected
          </div>
        )}
      </div>
      {/* =========================================== side ============================================= */}
      <div
        className={`hidden lg:block lg:w-[25%] space-y-4 ${
          !selectedConversation && "invisible"
        }`}
      >
        {selectedConversation && (
          <div className="space-y-2">
            <HostProperties
              photoURL={
                user
                  ? getOtherUser(selectedConversation.users, user)?.photoURL ??
                    "/icons/profile-icon.png"
                  : "/icons/profile-icon.png"
              }
              fullName={
                user
                  ? getFullName(
                      getOtherUser(selectedConversation.users, user)
                    ) ?? ""
                  : ""
              }
              buttonText="Host Properties"
            />
            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <div>From</div>
                <div className="font-bold">
                  {user
                    ? getOtherUser(selectedConversation.users, user)?.country ??
                      "-"
                    : "-"}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>Member Since</div>
                <div>1992</div>
              </div>
              <div className="flex justify-between items-center">
                <div>English</div>
                <div>Native</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
const ConversationBox = ({
  conversation,
  selectedConversation,
  onSelect,
  user,
  time,
}: {
  conversation: conversation;
  selectedConversation?: conversation;
  onSelect: () => void;
  user: profileData | null;
  time: string;
}) => {
  return (
    <div
      className={`h-[100px] flex justify-between items-center border p-3 rounded-xl me-1 hover:border-gray-600 ${
        selectedConversation?.conversationId === conversation.conversationId
          ? "border-gray-500"
          : ""
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center space-x-2">
        <div className="rounded-full border-2 border-gray-200 p-1 min-w-[50px]">
          <Image
            className="rounded-full"
            src={
              user
                ? getOtherUser(conversation.users, user)?.photoURL ??
                  "/icons/profile-icon.png"
                : "/icons/profile-icon.png"
            }
            alt="profile-pic"
            width={40}
            height={40}
          />
        </div>
        <div className=" flex-col">
          <div>
            {user ? getFullName(getOtherUser(conversation.users, user)) : ""}
          </div>
          <div className="text-gray-400 whitespace-nowrap">{time}</div>
          <div className="line-clamp-1">
            {conversation.lastMessage.message
              ? conversation.lastMessage.message
              : conversation.lastMessage.imageURL
              ? "1 Image attached.."
              : conversation.lastMessage.fileURL
              ? "1 File attached.."
              : "-"}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end  min-w-[25px] h-full">
        <div>
          <Image src={"/icons/dots.svg"} alt="dots" width={4} height={4} />
        </div>
        {conversation.lastMessage.sender.userId !== user?.userId &&
          selectedConversation?.conversationId !==
            conversation.conversationId && (
            <Badge text={conversation.unreadCount} />
          )}
      </div>
    </div>
  );
};
