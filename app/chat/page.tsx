"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getChats, getMessages, sendMessage } from "@/lib/supabase-actions"

interface Chat {
  id: string
  name: string
  lastMessage: string
  timestamp: string
}

interface Message {
  id: string
  content: string
  sender: string
  timestamp: string
  isOwn: boolean
}

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    loadChats()
  }, [])

  useEffect(() => {
    if (selectedChat) {
      loadMessages(selectedChat)
    }
  }, [selectedChat])

  const loadChats = async () => {
    try {
      const fetchedChats = await getChats()
      setChats(fetchedChats)
    } catch (error) {
      console.error("Error loading chats:", error)
    }
  }

  const loadMessages = async (chatId: string) => {
    try {
      const fetchedMessages = await getMessages(chatId)
      setMessages(fetchedMessages)
    } catch (error) {
      console.error("Error loading messages:", error)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedChat) return

    try {
      await sendMessage(selectedChat, newMessage)
      setNewMessage("")
      loadMessages(selectedChat)
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fff6c9" }}>
      {/* Navigation */}
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold" style={{ color: "#1c7f8f" }}>
            Hyumane
          </Link>
          <div className="flex space-x-4">
            <Link href="/feed" className="font-medium text-gray-600 hover:text-gray-900">
              Feed
            </Link>
            <Link href="/chat" className="font-medium" style={{ color: "#1c7f8f" }}>
              Chat
            </Link>
            <Link href="/profile" className="font-medium text-gray-600 hover:text-gray-900">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: "600px" }}>
          <div className="flex h-full">
            {/* Chat List */}
            <div className="w-1/3 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Messages</h2>
              </div>
              <div className="overflow-y-auto h-full">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedChat === chat.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                        style={{ backgroundColor: "#1c7f8f" }}
                      >
                        <span className="text-white font-bold">{chat.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{chat.name}</div>
                        <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 flex flex-col">
              {selectedChat ? (
                <>
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold">{chats.find((c) => c.id === selectedChat)?.name}</h3>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            message.isOwn ? "text-white" : "bg-gray-100 text-gray-800"
                          }`}
                          style={message.isOwn ? { backgroundColor: "#1c7f8f" } : {}}
                        >
                          <p>{message.content}</p>
                          <p className={`text-xs mt-1 ${message.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg font-medium transition-colors"
                        style={{ backgroundColor: "#1c7f8f", color: "white" }}
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a chat to start messaging
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
