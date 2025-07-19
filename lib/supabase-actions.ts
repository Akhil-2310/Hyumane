import { supabase } from "./supabase"

export async function createProfile(profileData: {
  username: string
  bio: string
  interests: string
  verifiedUserId?: string
  isVerified?: boolean
  verificationDate?: string
}) {
  const { data, error } = await supabase.from("profiles").insert([
    {
      username: profileData.username,
      bio: profileData.bio,
      interests: profileData.interests,
      verified_user_id: profileData.verifiedUserId,
      is_verified: profileData.isVerified || false,
      verification_date: profileData.verificationDate,
      created_at: new Date().toISOString(),
    },
  ])

  if (error) throw error
  return data
}

export async function getPosts() {
  const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false })

  if (error) throw error

  // Mock data for demonstration
  return [
    {
      id: "1",
      content: "Welcome to Hyumane! Excited to be part of this verified community.",
      author: "Sarah Johnson",
      username: "sarahj",
      created_at: "2024-01-15T10:30:00Z",
      likes: 12,
    },
    {
      id: "2",
      content: "Just verified my identity. The passport QR scan was so smooth!",
      author: "Mike Chen",
      username: "mikechen",
      created_at: "2024-01-15T09:15:00Z",
      likes: 8,
    },
    {
      id: "3",
      content: "Love how this platform prioritizes real human connections over algorithms.",
      author: "Emma Rodriguez",
      username: "emmarodriguez",
      created_at: "2024-01-15T08:45:00Z",
      likes: 15,
    },
  ]
}

export async function createPost(content: string) {
  const { data, error } = await supabase.from("posts").insert([
    {
      content,
      author_id: "current-user-id", // This would be the actual user ID
      created_at: new Date().toISOString(),
    },
  ])

  if (error) throw error
  return data
}

export async function followUser(userId: string) {
  const { data, error } = await supabase.from("follows").insert([
    {
      follower_id: "current-user-id",
      following_id: userId,
      created_at: new Date().toISOString(),
    },
  ])

  if (error) throw error
  return data
}

export async function getChats() {
  // Mock data for demonstration
  return [
    {
      id: "1",
      name: "Sarah Johnson",
      lastMessage: "Thanks for the welcome!",
      timestamp: "2 min ago",
    },
    {
      id: "2",
      name: "Mike Chen",
      lastMessage: "How do you like the platform so far?",
      timestamp: "1 hour ago",
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      lastMessage: "Great to connect with verified humans!",
      timestamp: "3 hours ago",
    },
  ]
}

export async function getMessages(chatId: string) {
  // Mock data for demonstration
  return [
    {
      id: "1",
      content: "Hey! Welcome to Hyumane!",
      sender: "Sarah Johnson",
      timestamp: "10:30 AM",
      isOwn: false,
    },
    {
      id: "2",
      content: "Thanks! This verification process is amazing.",
      sender: "You",
      timestamp: "10:32 AM",
      isOwn: true,
    },
    {
      id: "3",
      content: "I know right? Finally a platform for real people!",
      sender: "Sarah Johnson",
      timestamp: "10:35 AM",
      isOwn: false,
    },
  ]
}

export async function sendMessage(chatId: string, content: string) {
  const { data, error } = await supabase.from("messages").insert([
    {
      chat_id: chatId,
      content,
      sender_id: "current-user-id",
      created_at: new Date().toISOString(),
    },
  ])

  if (error) throw error
  return data
}
