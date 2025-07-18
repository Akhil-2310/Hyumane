"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getPosts, createPost } from "@/lib/supabase-actions"

interface Post {
  id: string
  content: string
  author: string
  username: string
  created_at: string
  likes: number
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

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
    e.preventDefault()
    if (!newPost.trim()) return

    try {
      await createPost(newPost)
      setNewPost("")
      loadPosts()
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fff6c9" }}>
      {/* Navigation */}
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold" style={{ color: "#1c7f8f" }}>
            Hyumane
          </Link>
          <div className="flex space-x-4">
            <Link href="/feed" className="font-medium" style={{ color: "#1c7f8f" }}>
              Feed
            </Link>
            <Link href="/chat" className="font-medium text-gray-600 hover:text-gray-900">
              Chat
            </Link>
            <Link href="/profile" className="font-medium text-gray-600 hover:text-gray-900">
              Profile
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
                className="px-6 py-2 rounded-lg font-medium transition-colors"
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
            <div className="text-center py-8 text-gray-500">No posts yet. Be the first to share something!</div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: "#1c7f8f" }}
                  >
                    <span className="text-white font-bold">{post.author.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <div className="font-medium">{post.author}</div>
                    <div className="text-sm text-gray-500">@{post.username}</div>
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
