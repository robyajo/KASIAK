import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, User, Tag, ArrowLeft, Share2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-data"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const allPosts = getAllBlogPosts()
  const relatedPosts = allPosts
    .filter(
      (p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((tag) => post.tags.includes(tag))),
    )
    .slice(0, 3)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  // Simple markdown-like content renderer
  const renderContent = (content: string) => {
    return content
      .split("\n")
      .map((line, index) => {
        // Headers
        if (line.startsWith("# ")) {
          return (
            <h1 key={index} className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8">
              {line.substring(2)}
            </h1>
          )
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6">
              {line.substring(3)}
            </h2>
          )
        }
        if (line.startsWith("### ")) {
          return (
            <h3 key={index} className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-4">
              {line.substring(4)}
            </h3>
          )
        }

        // Lists
        if (line.startsWith("- ")) {
          return (
            <li key={index} className="text-gray-700 dark:text-gray-300 mb-1 ml-4">
              {line.substring(2)}
            </li>
          )
        }

        // Bold text
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <p key={index} className="font-semibold text-gray-900 dark:text-white mb-3">
              {line.slice(2, -2)}
            </p>
          )
        }

        // Regular paragraphs
        if (line.trim() && !line.startsWith("#") && !line.startsWith("-") && !line.startsWith("```")) {
          return (
            <p key={index} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {line}
            </p>
          )
        }

        // Empty lines
        if (!line.trim()) {
          return <br key={index} />
        }

        return null
      })
      .filter(Boolean)
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/blog">
            <Button variant="ghost" className="gap-2 hover:bg-white/50 dark:hover:bg-gray-800/50">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {post.category}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {post.author}
                </span>
              </div>
            </div>

            <CardTitle className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </CardTitle>

            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">{post.excerpt}</p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
                  >
                    <Tag className="h-2 w-2 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                Bagikan
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Article Content */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">{renderContent(post.content)}</div>
          </CardContent>
        </Card>

        {/* Author Info */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{post.author}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Penulis artikel keuangan dan expert dalam pengelolaan keuangan pribadi
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl dark:text-white">Artikel Terkait</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                    <div className="group cursor-pointer">
                      <img
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="w-full h-32 object-cover rounded-lg mb-3 group-hover:opacity-80 transition-opacity"
                      />
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-3 w-3" />
                        {formatDate(relatedPost.date)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
