"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCommonContext } from "@/context/CommonContext";
import {
  getMessagessSnapshot,
  sendMessage,
  resetUnreadCount,
} from "@/firebase/messages";
import { conversation, message } from "@/types/messages";
import { differenceInMinutes, format, formatDistance } from "date-fns";
import toast from "react-hot-toast";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebase_app from "@/config";
import Badge from "@/components/Badge";
import HostProperties from "@/collections/HostProperties";
import { getFullName, getOtherUser } from "@/lib/utils";
import { User } from "@/types/user";
import { getUserActiveStatus, getUserByPath } from "@/firebase/user";
import MobileSearchAndFilter from "@/components/MobileSearchInputandFilter";
const storage = getStorage(firebase_app);

export default function Messages() {
  const searchParams = useSearchParams();
  let userId = searchParams.get("userId");

  const { user, conversations, mode } = useCommonContext();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messages, setMessages] = useState<message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedConversation, setSelectedConversation] =
    useState<conversation | null>();
  const [newChatConversation, setNewChatConversation] =
    useState<conversation>();
  const [newChatUser, setNewChatUser] = useState<User | null>(null);
  const [lastActive, setLastActive] = useState<Date | null>(null);

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
    setMessages([]);
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

  useEffect(() => {
    if (!selectedConversation || !user) return;
    const interval = setInterval(() => {
      const userId =
        getOtherUser(selectedConversation.users, user)?.userId ?? null;
      if (userId) {
        getUserActiveStatus(userId).then(({ result }) => {
          setLastActive(result);
        });
      }
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [user, selectedConversation]);

  const getNewChatUser = async (sender: string) => {
    const { result } = await getUserByPath(sender);
    if (result) {
      if (user) {
        const newConversation = {
          conversationId: "",
          lastMessage: { message: "", messageId: "", sender: user },
          unreadCount: 0,
          users: [user, result],
          createdAt: new Date(),
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
  const getLastSeenTime = (date?: Date) => {
    if (!date) return null;
    const diff = differenceInMinutes(new Date(), date);
    if (diff >= 1)
      return (
        "last seen " + formatDistance(date, new Date(), { addSuffix: true })
      );
    else return "online";
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
    <div className="flex  mt-4 justify-between lg:space-x-4 md:space-x-4 xl:space-x-4">
      {/*========================================= conversations ===================================== */}
      <div
        className={`${
          selectedConversation ? "hidden" : "block"
        } w-[100%] sm:block sm:w-[40%] lg:w-[25%] xl:w-[23%] h-[80vh] space-y-2`}
      >
        <div className="hidden lg:flex md:flex sm:flex justify-between items-center">
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
        <div
          className="sm:hidden md:hidden lg:hidden xl:hidden border-t border-b py-3 px-4 -mx-[14px] "
          style={{ marginBottom: "1.5rem" }}
        >
          <MobileSearchAndFilter type="Search" />
        </div>
        <div className="h-[75vh] overflow-auto space-y-3">
          {conversations.length > 0 &&
            conversations
              .sort(
                (a, b) =>
                  (b.lastMessage?.createdAt?.getTime() ?? 0) -
                  (a.lastMessage?.createdAt?.getTime() ?? 0)
              )
              .map((conversation) => {
                return (
                  <ConversationBox
                    key={conversation.conversationId}
                    user={user}
                    conversation={conversation}
                    onSelect={() => {
                      setSelectedConversation(conversation);
                    }}
                    selectedConversation={selectedConversation ?? null}
                    time={getTimeDifference(
                      conversation.lastMessage?.createdAt
                    )}
                  />
                );
              })}
          {!newChatConversation && conversations.length === 0 && (
            <div className="text-center bg-white m-auto h-[100%] flex items-center justify-center">
              No Conversations
            </div>
          )}
        </div>
      </div>
      {/* ========================================== messages =========================================*/}
      <div
        className={`${
          !selectedConversation ? "hidden" : "flex"
        } w-[100%] bg-white sm:w-[60%] lg:w-[50%] xl:w-[48%] sm:h-[80vh] md:h-[80vh] lg:h-[80vh] h-[92dvh] sm:flex flex-col md:border xl:border lg:border sm:border rounded-2xl pb-5`}
      >
        {selectedConversation && user ? (
          <div className="flex flex-col h-[100%]">
            <div className="px-3 xl:hidden my-4 lg:hidden md:hidden sm:hidden flex justify-between items-center space-x-2">
              <Image
                role="button"
                src={"/icons/white-back-arrow.svg"}
                alt="tick"
                width={35}
                height={35}
                onClick={() => {
                  setSelectedConversation(null);
                }}
              />
              <div className="w-full">
                <MobileSearchAndFilter type="Search" />
              </div>
            </div>
            <div className="flex justify-between items-center px-4 py-3 border-b border-t sm:border-t-0 md:border-t-0 lg:border-t-0">
              <div className="flex space-x-2 items-center">
                <div className="rounded-full border-2 border-gray-200 p-1">
                  <Image
                    src={
                      getOtherUser(selectedConversation.users, user)?.photoURL
                        ? getOtherUser(selectedConversation.users, user)
                            ?.photoURL ?? ""
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
                  {lastActive && (
                    <div
                      className={`${
                        getLastSeenTime(lastActive) === "online"
                          ? " text-green-500 "
                          : ""
                      }text-sm md:text-base lg:text-base xl:text-base`}
                    >
                      {getLastSeenTime(lastActive)}
                    </div>
                  )}
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

            <div className="flex-1 overflow-auto bg-white">
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
                                  message.sender?.photoURL?.length
                                    ? message.sender?.photoURL
                                    : "/icons/profile-icon.png"
                                }
                                alt="profile-pic"
                                width={35}
                                height={35}
                                className="rounded-full"
                              />
                            </div>
                            <div>
                              <div className="text-sm md:text-base lg:text-base">
                                {getFullName(message.sender)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs sm:text-sm md:text-base lg:text-base">
                          {message.createdAt
                            ? format(message.createdAt, "MMM dd, yyyy, hh:mm a")
                            : "sending..."}
                        </div>
                      </div>
                      <div className="text-sm md:text-base lg:text-base">
                        {message.message}
                      </div>
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
            <div className="flex items-center space-x-2 px-4 py-3 bg-white">
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
          <div className="flex justify-center items-center h-[100%] bg-white">
            No Conversation selected
          </div>
        )}
      </div>
      {/* =========================================== side ============================================= */}
      <div
        className={`hidden lg:block lg:w-[25%] xl:w-[24%] space-y-4 ${
          !selectedConversation && "invisible"
        }`}
      >
        {selectedConversation && user && (
          <div className="sm:space-y-6 space-y-2">
            <HostProperties
              bottomText="Typically responds within 1 hr"
              bottomTextIcon="/icons/time.svg"
              mode={mode}
              photoURL={
                getOtherUser(selectedConversation.users, user)?.photoURL ??
                "/icons/profile-icon.png"
              }
              fullName={
                getFullName(getOtherUser(selectedConversation.users, user)) ??
                ""
              }
              isVerified={
                getOtherUser(selectedConversation.users, user)?.emailVerified
              }
              onProfileClick={() =>
                router.push(
                  "/profile?userId=" +
                    getOtherUser(selectedConversation.users, user)?.userId
                )
              }
            />
            <div className="border rounded-2xl p-4 space-y-5 bg-white">
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
  selectedConversation?: conversation | null;
  onSelect: () => void;
  user: User | null;
  time: string;
}) => {
  return user ? (
    <div
      className={`h-[100px] flex justify-between items-center border py-3 px-4 rounded-2xl sm:rounded-xl me-1 hover:border-gray-600 bg-white ${
        selectedConversation?.conversationId === conversation.conversationId
          ? "border-gray-500"
          : ""
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center space-x-2">
        <div className="rounded-full border-2 border-gray-200 p-1 min-w-[50px]">
          <Image
            className="rounded-full sm:w-[40px] sm:h-[40px]"
            src={
              getOtherUser(conversation.users, user)?.photoURL
                ? getOtherUser(conversation.users, user)?.photoURL ?? ""
                : "/icons/profile-icon.png"
            }
            alt="profile-pic"
            width={57}
            height={57}
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
        <div className="mt-1">
          <Image src={"/icons/dots.svg"} alt="dots" width={4} height={4} />
        </div>
        {conversation.lastMessage.sender.userId !== user?.userId &&
          selectedConversation?.conversationId !==
            conversation.conversationId && (
            <Badge text={conversation.unreadCount} />
          )}
      </div>
    </div>
  ) : null;
};
