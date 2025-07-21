import { supabase } from "./supabase"

export async function uploadAvatar(file: File, verified_user_id: string) {
  const fileExt = file.name.split('.').pop();
  const filePath = `${verified_user_id}.${fileExt}`;

  const { error } = await supabase.storage.from('avatars').upload(filePath, file, {
    upsert: true,
    cacheControl: '3600',
  });

  if (error) throw error;

  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
  return data.publicUrl as string;
}

export async function createProfile(profileData: {
  username: string;
  bio: string;
  interests: string;
  verifiedUserId: string;
  isVerified?: boolean
  verificationDate?: string
  avatarUrl?: string;
}) {
  const { data, error } = await supabase.from('profiles').insert([
    {
      username: profileData.username,
      bio: profileData.bio,
      interests: profileData.interests,
      verified_user_id: profileData.verifiedUserId,
      is_verified: true,
      avatar_url: profileData.avatarUrl || null,
      verification_date: profileData.verificationDate,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) throw error;
  return data;
}

export async function getPosts() {
  console.log("Fetching posts with profile data...");
  
  // First, get all posts
  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })

  if (postsError) {
    console.error("Error fetching posts:", postsError)
    return []
  }

  console.log("Raw posts:", posts);

  // Then get profile data for each post
  const transformedPosts = []
  
  for (const post of posts || []) {
    console.log("Processing post with author_id:", post.author_id);
    
    // Get profile for this post's author
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("username, avatar_url")
      .eq("verified_user_id", post.author_id)
      .single()

    console.log("Profile for author_id", post.author_id, ":", profile, "Error:", profileError);

    transformedPosts.push({
      id: post.id,
      content: post.content,
      username: profile?.username || "anonymous",
      avatar: profile?.avatar_url || null,
      created_at: post.created_at,
      likes: post.likes || 0,
    })
  }
  
  console.log("Final transformed posts:", transformedPosts);
  return transformedPosts;
}

export async function createPost(content: string, userId: string) {
  if (!content.trim() || !userId) {
    throw new Error('Content and user ID are required')
  }

  const { data, error } = await supabase.from("posts").insert([
    {
      content: content.trim(),
      author_id: userId,
      created_at: new Date().toISOString(),
      likes: 0,
    },
  ])

  if (error) {
    console.error("Error creating post:", error)
    throw error
  }
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

export async function getChats(userId: string) {
  const { data, error } = await supabase
    .from("chats")
    .select(`
      id,
      last_message,
      updated_at,
      profiles (
        username
      )
    `)
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("Error fetching chats:", error)
    return []
  }

  return data?.map(chat => ({
    id: chat.id,
    name: chat.profiles?.[0]?.username || "Anonymous",
    lastMessage: chat.last_message || "No messages yet",
    timestamp: new Date(chat.updated_at).toLocaleDateString(),
  })) || []
}

export async function getMessages(chatId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select(`
      id,
      content,
      created_at,
      sender_id,
      profiles (
        username
      )
    `)
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching messages:", error)
    return []
  }

  return data?.map(message => ({
    id: message.id,
    content: message.content,
    sender: message.profiles?.[0]?.username || "Anonymous",
    timestamp: new Date(message.created_at).toLocaleTimeString(),
    isOwn: false, // This will be determined by comparing sender_id with current user
  })) || []
}

export async function sendMessage(chatId: string, content: string, senderId: string) {
  if (!chatId || !content.trim() || !senderId) {
    throw new Error('Chat ID, content, and sender ID are required')
  }

  const { data, error } = await supabase.from("messages").insert([
    {
      chat_id: chatId,
      content: content.trim(),
      sender_id: senderId,
      created_at: new Date().toISOString(),
    },
  ])

  if (error) {
    console.error("Error sending message:", error)
    throw error
  }
  return data
}

export async function getUserProfile(verifiedUserId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("verified_user_id", verifiedUserId)
    .maybeSingle()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return data
}
