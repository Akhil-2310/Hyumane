"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getPosts, createPost, getUserProfile } from "@/lib/supabase-actions"

interface Post {
  id: string
  content: string
  username: string
  avatar: string | null
  created_at: string
  likes: number
}

interface CurrentUser {
  id: string
  username: string
  bio: string
  interests: string
  isVerified: boolean
  avatar_url: string | null
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [userLoading, setUserLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUserSession()
  }, [])

  useEffect(() => {
    if (currentUser) {
      loadPosts()
    }
  }, [currentUser])

  const checkUserSession = async () => {
    console.log("Checking user session...");
    
    // Get minimal verification data from localStorage
    const verificationData = localStorage.getItem('verifiedUserData')
    
    if (!verificationData) {
      console.log("No verification data, redirecting to verify");
      router.push('/verify')
      return
    }

    try {
      const parsedData = JSON.parse(verificationData)
      
      if (!parsedData.userId || !parsedData.isVerified) {
        console.log("Invalid verification data, redirecting to verify");
        router.push('/verify')
        return
      }

      // Fetch full profile data from Supabase
      const profileData = await getUserProfile(parsedData.userId)
      
      if (!profileData) {
        console.log("Profile not found, redirecting to create profile");
        router.push('/create-profile')
        return
      }

      console.log("Profile data from database:", profileData); // Debug log

      setCurrentUser({
        id: parsedData.userId, // verification UUID (used for posts)
        username: profileData.username,
        bio: profileData.bio,
        interests: profileData.interests,
        isVerified: profileData.is_verified,
        avatar_url: profileData.avatar_url // Make sure this matches the database column
      });
      
      console.log("Current user set with avatar_url:", profileData.avatar_url); // Debug log
      console.log("User session set successfully");
    } catch (error) {
      console.error('Error loading user session:', error)
      router.push('/verify')
    } finally {
      setUserLoading(false)
    }
  }

  const loadPosts = async () => {
    try {
      const fetchedPosts = await getPosts()
      setPosts(fetchedPosts)
    } catch (error) {
      console.error("Error loading posts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || !currentUser) return;

    // Optimistic UI update with real user data
    const tempId = Date.now().toString();
    const optimisticPost: Post = {
      id: tempId,
      content: newPost.trim(),
      username: currentUser.username,
      avatar: currentUser.avatar_url, // Use real avatar
      created_at: new Date().toISOString(),
      likes: 0,
    };
    setPosts([optimisticPost, ...posts]);
    setNewPost("");

    try {
      // Use the verification userId directly (not profileId)
      await createPost(optimisticPost.content, currentUser.id);
      // Refetch to get accurate data (e.g., real id, avatar)
      loadPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      // Revert optimistic update on error
      setPosts(posts.filter(p => p.id !== tempId));
    }
  }

  // Show loading until we verify user session
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fff6c9" }}>
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fff6c9" }}>
      {/* Navigation */}
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold" style={{ color: "#1c7f8f" }}>
            Hyumane
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {currentUser.avatar_url ? (
                <img src={currentUser.avatar_url} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#1c7f8f" }}
                >
                  <span className="text-white text-sm font-bold">{currentUser.username.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <span className="text-sm text-gray-600">
                @{currentUser.username} {currentUser.isVerified && <span className="text-green-600">✓</span>}
              </span>
            </div>
            <Link href="/feed" className="font-medium" style={{ color: "#1c7f8f" }}>
              Feed
            </Link>
            <Link href="/chat" className="font-medium text-gray-600 hover:text-gray-900">
              Chat
            </Link>
            <Link href="/create-profile" className="font-medium text-gray-600 hover:text-gray-900">
              Edit Profile
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Create Post */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <form onSubmit={handleCreatePost}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                disabled={!newPost.trim()}
                className="px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                style={{ backgroundColor: "#1c7f8f", color: "white" }}
              >
                Post
              </button>
            </div>
          </form>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full mx-auto"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-2">No posts yet. Be the first to share something!</p>
              <p className="text-sm">Welcome to Hyumane - where real humans connect authentically.</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-3">
                  {post.avatar ? (
                    <img src={post.avatar} alt="avatar" className="w-10 h-10 rounded-full mr-3 object-cover" />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: "#1c7f8f" }}
                    >
                      <span className="text-white font-bold">{post.username.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  <div>
                    <div className="font-medium flex items-center">
                      @{post.username}
                      <span className="ml-1 text-green-600">✓</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <p className="text-gray-800 mb-4">{post.content}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-red-500">
                    <span>❤️</span>
                    <span>{post.likes}</span>
                  </button>
                  <button className="hover:text-blue-500">💬 Reply</button>
                  <button className="hover:text-green-500">🔄 Share</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
