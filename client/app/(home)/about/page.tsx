import { Wallet, Users, Target, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Tentang ExpenseTracker</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Aplikasi pengeluaran rumah tangga yang dirancang untuk membantu keluarga Indonesia mengelola keuangan dengan
            lebih baik dan mencapai tujuan finansial mereka.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3 dark:text-white">
                <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                Misi Kami
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Memberikan solusi digital yang mudah digunakan untuk membantu keluarga Indonesia dalam mencatat,
                memantau, dan menganalisis pengeluaran rumah tangga mereka. Kami percaya bahwa dengan pemahaman yang
                baik tentang pola pengeluaran, setiap keluarga dapat membuat keputusan finansial yang lebih bijak.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3 dark:text-white">
                <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
                Visi Kami
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Menjadi platform terdepan dalam pengelolaan keuangan rumah tangga di Indonesia, yang memungkinkan setiap
                keluarga untuk mencapai stabilitas finansial dan merencanakan masa depan yang lebih cerah melalui
                teknologi yang inovatif dan mudah diakses.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Fitur Unggulan</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-3 dark:text-white">
                  <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Pencatatan Mudah
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Interface yang intuitif memungkinkan Anda mencatat pengeluaran dengan cepat dan mudah, kapan saja dan
                  di mana saja.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-3 dark:text-white">
                  <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Kategorisasi Otomatis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Sistem kategorisasi yang komprehensif membantu Anda mengorganisir pengeluaran berdasarkan jenis dan
                  kebutuhan.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-3 dark:text-white">
                  <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  Analisis Mendalam
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Laporan harian, bulanan, dan tahunan memberikan insight yang valuable untuk pengambilan keputusan
                  finansial yang lebih baik.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Tim Kami</h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl font-bold">JD</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">John Doe</h3>
              <p className="text-gray-600 dark:text-gray-400">Founder & CEO</p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl font-bold">JS</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Jane Smith</h3>
              <p className="text-gray-600 dark:text-gray-400">Lead Developer</p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl font-bold">MB</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mike Brown</h3>
              <p className="text-gray-600 dark:text-gray-400">UI/UX Designer</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center dark:text-white">Hubungi Kami</CardTitle>
            <CardDescription className="text-center dark:text-gray-300">
              Punya pertanyaan atau saran? Kami siap membantu Anda!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Email</p>
              <p className="text-gray-600 dark:text-gray-400">info@expensetracker.com</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Telepon</p>
              <p className="text-gray-600 dark:text-gray-400">+62 123 456 7890</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Alamat</p>
              <p className="text-gray-600 dark:text-gray-400">Jakarta, Indonesia</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
