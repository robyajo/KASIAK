"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Calendar, DollarSign, TrendingUp, TrendingDown, BarChart3, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Expense {
  id: string
  title: string
  amount: number
  category: string
  date: string
  description?: string
}

const categories = [
  {
    value: "makanan",
    label: "Makanan & Minuman",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  },
  {
    value: "transportasi",
    label: "Transportasi",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    value: "belanja",
    label: "Belanja Rumah Tangga",
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  },
  {
    value: "tagihan",
    label: "Tagihan & Utilitas",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  },
  {
    value: "kesehatan",
    label: "Kesehatan",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  },
  { value: "hiburan", label: "Hiburan", color: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300" },
  { value: "lainnya", label: "Lainnya", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" },
]

export default function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  })

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem("household-expenses")
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses))
    }
  }, [])

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("household-expenses", JSON.stringify(expenses))
  }, [expenses])

  const handleAddExpense = () => {
    if (newExpense.title && newExpense.amount && newExpense.category) {
      const expense: Expense = {
        id: Date.now().toString(),
        title: newExpense.title,
        amount: Number.parseFloat(newExpense.amount),
        category: newExpense.category,
        date: newExpense.date,
        description: newExpense.description,
      }
      setExpenses([expense, ...expenses])
      setNewExpense({
        title: "",
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
      })
      setIsDialogOpen(false)
    }
  }

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const thisMonthExpenses = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date)
      const currentDate = new Date()
      return (
        expenseDate.getMonth() === currentDate.getMonth() && expenseDate.getFullYear() === currentDate.getFullYear()
      )
    })
    .reduce((sum, expense) => sum + expense.amount, 0)

  const todayExpenses = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date)
      const today = new Date()
      return expenseDate.toDateString() === today.toDateString()
    })
    .reduce((sum, expense) => sum + expense.amount, 0)

  const getCategoryInfo = (categoryValue: string) => {
    return categories.find((cat) => cat.value === categoryValue) || categories[categories.length - 1]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Kelola Pengeluaran Rumah Tangga Anda
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Pantau, catat, dan analisis pengeluaran harian Anda dengan mudah. Dapatkan insight keuangan yang lebih baik
            untuk masa depan yang lebih cerah.
          </p>
        </div>

        {/* Features Banner */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-700 dark:via-purple-700 dark:to-indigo-700 border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-black/10 dark:bg-black/20">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                </div>

                <div className="relative px-6 py-12 lg:px-12 lg:py-16">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Mengapa Memilih ExpenseTracker?</h2>
                    <p className="text-xl text-blue-100 dark:text-blue-200 max-w-3xl mx-auto">
                      Solusi terdepan untuk mengelola keuangan rumah tangga dengan mudah, cerdas, dan efisien
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="text-center group">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Wallet className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Pencatatan Instan</h3>
                      <p className="text-blue-100 dark:text-blue-200 text-sm">
                        Catat pengeluaran dalam hitungan detik dengan interface yang intuitif
                      </p>
                    </div>

                    <div className="text-center group">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <BarChart3 className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Analisis Mendalam</h3>
                      <p className="text-blue-100 dark:text-blue-200 text-sm">
                        Dapatkan insight keuangan dengan laporan harian, bulanan, dan tahunan
                      </p>
                    </div>

                    <div className="text-center group">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <TrendingUp className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Kontrol Penuh</h3>
                      <p className="text-blue-100 dark:text-blue-200 text-sm">
                        Pantau pola pengeluaran dan buat keputusan finansial yang lebih bijak
                      </p>
                    </div>

                    <div className="text-center group">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Calendar className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Riwayat Lengkap</h3>
                      <p className="text-blue-100 dark:text-blue-200 text-sm">
                        Akses riwayat pengeluaran kapan saja dengan penyimpanan yang aman
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white text-sm font-medium">100% Gratis</span>
                      </div>
                      <div className="w-px h-4 bg-white/30"></div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-white text-sm font-medium">Data Aman</span>
                      </div>
                      <div className="w-px h-4 bg-white/30"></div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <span className="text-white text-sm font-medium">Mudah Digunakan</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Manfaat untuk Keluarga Anda</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Temukan bagaimana ExpenseTracker dapat membantu meningkatkan kesehatan finansial keluarga Anda
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-500 dark:bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Hemat Lebih Banyak</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Identifikasi area pengeluaran yang bisa dikurangi dan tingkatkan tabungan keluarga hingga 30%
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Deteksi pengeluaran berlebihan
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Saran penghematan otomatis
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Target tabungan yang realistis
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Perencanaan Lebih Baik</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Buat rencana keuangan yang solid berdasarkan data pengeluaran historis yang akurat
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Prediksi pengeluaran bulanan
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Perencanaan budget kategori
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Analisis tren pengeluaran
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-500 dark:bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Kontrol Finansial</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Dapatkan kontrol penuh atas keuangan keluarga dengan monitoring real-time
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    Dashboard keuangan real-time
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    Alert pengeluaran berlebih
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    Laporan keuangan otomatis
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-gray-200">Hari Ini</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(todayExpenses)}</div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">Pengeluaran hari ini</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-gray-200">Bulan Ini</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(thisMonthExpenses)}
              </div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">
                {new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-gray-200">Total Pengeluaran</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatCurrency(totalExpenses)}
              </div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">Semua waktu</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-gray-200">Total Transaksi</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{expenses.length}</div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">Jumlah transaksi</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Expense Button */}
        <div className="flex justify-center mb-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 text-lg"
              >
                <Plus className="h-5 w-5" />
                Tambah Pengeluaran Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Tambah Pengeluaran Baru</DialogTitle>
                <DialogDescription>Masukkan detail pengeluaran rumah tangga Anda</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Judul Pengeluaran</Label>
                  <Input
                    id="title"
                    placeholder="Contoh: Belanja groceries"
                    value={newExpense.title}
                    onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Jumlah (Rp)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="50000"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Tanggal</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Keterangan (Opsional)</Label>
                  <Input
                    id="description"
                    placeholder="Keterangan tambahan..."
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleAddExpense}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Simpan Pengeluaran
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Recent Expenses */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl dark:text-white">Pengeluaran Terbaru</CardTitle>
            <CardDescription className="dark:text-gray-300">
              Daftar pengeluaran rumah tangga terbaru Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            {expenses.length === 0 ? (
              <div className="text-center py-12">
                <TrendingDown className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Belum ada pengeluaran</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Mulai catat pengeluaran pertama Anda untuk mendapatkan insight keuangan
                </p>
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Pengeluaran
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {expenses.slice(0, 5).map((expense) => {
                  const categoryInfo = getCategoryInfo(expense.category)
                  return (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{expense.title}</h3>
                          <Badge className={categoryInfo.color}>{categoryInfo.label}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(expense.date)}
                          </span>
                          {expense.description && <span>{expense.description}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-red-600 dark:text-red-400">
                          {formatCurrency(expense.amount)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
                {expenses.length > 5 && (
                  <div className="text-center pt-4">
                    <p className="text-gray-500 dark:text-gray-400">Dan {expenses.length - 5} pengeluaran lainnya...</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
