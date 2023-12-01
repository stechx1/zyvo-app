"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import {
  getMessagessSnapshot,
  getConversationsSnapshot,
  sendMessage,
} from "@/firebase/messages";
import { conversation, message } from "@/types/messages";
import { profileData } from "@/types/profile";
import { format, formatDistance } from "date-fns";
import toast from "react-hot-toast";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebase_app from "@/config";
const storage = getStorage(firebase_app);

export default function Messages() {
  const { user } = useAuthContext();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isConversationsLoading, setIsConversationsLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [conversations, setConversations] = useState<conversation[]>([]);
  const [messages, setMessages] = useState<message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedConversation, setSelectedConversation] =
    useState<conversation | null>(null);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [imgPreview, setImgPreview] = useState<string>();

  useEffect(() => {
    if (user == null) {
      router.push("/signin");
      return;
    }
    setIsConversationsLoading(true);
    const unsubscribe = getConversationsSnapshot(
      user.userId,
      (convos) => {
        setConversations(convos);
        setSelectedConversation(convos[0]);
        setIsConversationsLoading(false);
      },
      (e) => {
        console.log(e);
        setIsConversationsLoading(false);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [user]);

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
    return () => {
      unsubscribe();
    };
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getOtherUser = (users: profileData[]) => {
    const filteredUsers = users.filter((u) => u.userId !== user?.userId);
    if (filteredUsers.length > 0) return filteredUsers[0];
  };

  const getFullName = (user?: profileData) => {
    if (user) {
      return user.firstName + " " + user.lastName;
    }
    return "";
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
        newMessage
      ).then(({ result, error }) => {
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
    ) {
      setSelectedFile(undefined);
      return;
    }
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
      fileType === "FILE" ? uploadedURL : undefined
    ).then(({ result, error }) => {
      if (error) {
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
          {conversations.length > 0 ? (
            conversations.map((conversation) => {
              return (
                <div
                  key={conversation.conversationId}
                  className={`flex justify-between items-center border  p-4 rounded-xl space-x-4 me-1 hover:border-gray-600 ${
                    selectedConversation?.conversationId ===
                    conversation.conversationId
                      ? "border-gray-500"
                      : ""
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-gray-200 p-1 min-w-[50px]">
                      <Image
                        className="rounded-full"
                        src={getOtherUser(conversation.users)?.photoURL ?? ""}
                        alt="profile-pic"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className=" flex-col">
                      <div>{getFullName(getOtherUser(conversation.users))}</div>
                      <div className="text-gray-400 whitespace-nowrap">
                        {getTimeDifference(conversation.lastMessage?.createdAt)}
                      </div>
                      <div className="line-clamp-1">
                        {conversation.lastMessage.message}
                      </div>
                    </div>
                  </div>
                  <div className="mb-auto min-w-[4px]">
                    <Image
                      src={"/icons/dots.svg"}
                      alt="dots"
                      width={4}
                      height={4}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center m-auto h-[100%] flex items-center justify-center">
              {isConversationsLoading ? "Loading.." : "No Conversations"}
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
                      getOtherUser(selectedConversation.users)?.photoURL ?? ""
                    }
                    alt="profile-pic"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <div>
                    {getFullName(getOtherUser(selectedConversation.users))}
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
                      <div className="flex rever items-center justify-between">
                        <div>
                          <div className="flex space-x-2 items-center">
                            <div className="rounded-full border border-gray-200">
                              <Image
                                src={message.sender?.photoURL ?? ""}
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
                                  message.fileURL &&
                                  handleDownload(message.fileURL)
                                }
                                className="m-2"
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="mb-auto mt-1">
                          {message.createdAt
                            ? format(message.createdAt, "MMM dd, yyyy, hh:mm a")
                            : "sending..."}
                        </div>
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
                  className={`px-4 py-2 border focus:border-gray-400 rounded-full focus:outline-none text-gray-600 w-full sm:text-sm bg-gray-100 `}
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
                  accept="image/*"
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
      <div className="hidden lg:block lg:w-[25%] space-y-4">
        <div className="border rounded-lg p-4 text-center space-y-2">
          <div>Hosted By</div>
          <div className="flex items-center justify-center space-x-2">
            <div>
              <div className="rounded-full border-2 border-gray-200 p-1">
                <Image
                  src={"/icons/profile-icon.png"}
                  alt="profile-pic"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="text-lg">Mia J.</div>
            <div>
              <Image
                src={"/icons/green-tick.svg"}
                alt="tick"
                width={15}
                height={15}
              />
            </div>
          </div>
          <hr />
          <Button
            type="white"
            text="Host Properties"
            bordered
            rounded
            full
            className="border-gray-700"
          />
          <div className="flex items-center justify-center space-x-2">
            <Image src={"/icons/time.svg"} alt="time" width={15} height={15} />
            <div>Typically responds within 1 hr</div>
          </div>
        </div>
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div>From</div>
            <div className="font-bold">United States</div>
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
    </div>
  );
}
