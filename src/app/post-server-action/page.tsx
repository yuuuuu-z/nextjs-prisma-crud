import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPost } from "./post.actions";
import { FileText, Plus, Calendar, User, ArrowRight } from "lucide-react";
import { CreatePostForm } from "./create-post-form";
import { Post } from "../generated/prisma";

export default async function PostFormPage() {
  const posts: Post[] = await getPost();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Blog Posts
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing stories and share your own thoughts with our
            community
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Posts List Section */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Recent Posts
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700"
                  >
                    {posts.length} {posts.length === 1 ? "post" : "posts"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {posts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No posts yet
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Be the first to share your thoughts!
                    </p>
                    <div className="flex items-center justify-center gap-2 text-blue-600">
                      <Plus className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Create your first post below
                      </span>
                    </div>
                  </div>
                ) : (
                  posts.map((post) => (
                    <Link
                      href={`/post-server-action/${post.id}`}
                      key={post.id}
                      className="group block"
                    >
                      <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-white/50 hover:bg-white">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                                {posts.indexOf(post) + 1}
                              </span>
                              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                                {post.title}
                              </h3>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                              {post.content}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>Author</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>2 days ago</span>
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Create Post Form Section */}
          <div className="space-y-6">
            <CreatePostForm />
          </div>
        </div>
      </div>
    </div>
  );
}
