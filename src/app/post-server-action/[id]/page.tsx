import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  User,
  FileText,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { DeletePostButton } from "./delete-post-button";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await prisma.post.findFirst({
    where: { id: id },
  });

  async function deletePost() {
    "use server";
    await prisma.post.delete({
      where: { id: id },
    });

    revalidatePath("/post-server-action");
    redirect("/post-server-action");
  }

  // Handle post not found
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/post-server-action">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Posts
              </Button>
            </Link>
          </div>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
            <CardContent className="text-center py-16">
              <div className="p-4 bg-red-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Post Not Found
              </h1>
              <p className="text-gray-600 mb-6">
                The post you are looking for does not exist or has been removed.
              </p>
              <Link href="/post-server-action">
                <Button className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Return to Posts
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/post-server-action">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 hover:bg-blue-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Posts
            </Button>
          </Link>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link
              href="/post-server-action"
              className="hover:text-blue-600 transition-colors"
            >
              Posts
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate max-w-32">
              {post.title}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
              <CardHeader className="space-y-6 pb-8">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                      {post.title}
                    </h1>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Author Name</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "Unknown date"}
                        </span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700"
                      >
                        Article
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Actions Card */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
              <CardHeader>
                <h3 className="font-semibold text-gray-900">Actions</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <DeletePostButton
                  deleteAction={deletePost}
                  postTitle={post.title}
                />
              </CardContent>
            </Card>

            {/* Post Info Card */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
              <CardHeader>
                <h3 className="font-semibold text-gray-900">
                  Post Information
                </h3>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Post ID:</span>
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {post.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Created:</span>
                  <span className="text-gray-900">
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Word Count:</span>
                  <span className="text-gray-900">
                    {post.content?.split(" ").length || 0} words
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
