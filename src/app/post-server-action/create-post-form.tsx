"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createPost } from "./post.actions";
import { useActionState } from "react";
import {
  Loader2,
  PenTool,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export function CreatePostForm() {
  const [state, action, pending] = useActionState(createPost, {
    success: false,
    message: "",
    errors: {},
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form action={action} className="space-y-6">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
          <CardHeader className="space-y-4 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <PenTool className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Create New Post
              </CardTitle>
            </div>
            {state.success && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" color="green"/>
                <AlertDescription className="text-green-800">
                  {state.message || "Post created successfully!"}
                </AlertDescription>
              </Alert>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="title"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Post Title
              </Label>
              <Input
                id="title"
                type="text"
                name="title"
                placeholder="Enter an engaging title for your post..."
                className={`transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 ${
                  state.errors?.title
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                }`}
              />
              {state.errors?.title && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md">
                  <AlertCircle className="h-4 w-4" />
                  <span>{state.errors.title.join(", ")}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="content"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <PenTool className="h-4 w-4" />
                Content
              </Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Share your thoughts, ideas, or story here..."
                rows={6}
                className={`transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 resize-none ${
                  state.errors?.content
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                }`}
              />
              {state.errors?.content && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md">
                  <AlertCircle className="h-4 w-4" />
                  <span>{state.errors.content.join(", ")}</span>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="pt-6">
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={pending}
            >
              {pending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Creating Post...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <PenTool className="h-5 w-5" />
                  <span>Create Post</span>
                </div>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
