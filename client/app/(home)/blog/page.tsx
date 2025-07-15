import Link from "next/link"
import { Calendar, Clock, User, Tag, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { getAllBlogPosts } from "@/lib/blog-data"

export default function BlogPage() {
  const blogPosts = getAllBlogPosts()
  const categories = [...new Set(blogPosts.map((post) => post.category))]
  const allTags = [...new Set(blogPosts.flatMap((post) => post.tags))]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog Keuangan</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tips, panduan, dan insight terbaru seputar pengelolaan keuangan pribadi dan rumah tangga
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Cari artikel..." className="pl-10" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    Semua
                  </Badge>
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant="outline"
                      className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <Card
                  key={post.slug}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
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
                        <CardTitle className="text-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </CardTitle>
                        <CardDescription className="dark:text-gray-300">{post.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((tag) => (
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
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                          >
                            Baca Selengkapnya →
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Categories */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg dark:text-white">Kategori Populer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const count = blogPosts.filter((post) => post.category === category).length
                    return (
                      <div
                        key={category}
                        className="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                      >
                        <span className="text-gray-700 dark:text-gray-300">{category}</span>
                        <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                          {count}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg dark:text-white">Tag Populer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 15).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg dark:text-white">Newsletter</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Dapatkan tips keuangan terbaru langsung di email Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input placeholder="Email Anda" type="email" />
                  <button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors">
                    Berlangganan
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg dark:text-white">Artikel Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div
                      key={post.slug}
                      className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-4 last:pb-0"
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <h4 className="font-medium text-sm mb-1 dark:text-white line-clamp-2">{post.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.date)}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
