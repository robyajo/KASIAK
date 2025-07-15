"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { Calendar, TrendingUp, TrendingDown, BarChart3, PieChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

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

export default function MonthlyPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  })

  useEffect(() => {
    const savedExpenses = localStorage.getItem("household-expenses")
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses))
    }
  }, [])

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    const [year, month] = selectedMonth.split("-")
    return expenseDate.getFullYear() === Number.parseInt(year) && expenseDate.getMonth() === Number.parseInt(month) - 1
  })

  const totalMonthlyExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  const categoryTotals = categories
    .map((category) => {
      const total = filteredExpenses
        .filter((expense) => expense.category === category.value)
        .reduce((sum, expense) => sum + expense.amount, 0)
      return { ...category, total }
    })
    .filter((category) => category.total > 0)

  const dailyTotals = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1
    const dayExpenses = filteredExpenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return expenseDate.getDate() === day
    })
    return {
      day,
      total: dayExpenses.reduce((sum, expense) => sum + expense.amount, 0),
      count: dayExpenses.length,
    }
  }).filter((day) => day.total > 0)

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

  const getMonthName = (monthString: string) => {
    const [year, month] = monthString.split("-")
    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1)
    return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" })
  }

  const averageDailyExpense = dailyTotals.length > 0 ? totalMonthlyExpenses / dailyTotals.length : 0
  const highestDayExpense = Math.max(...dailyTotals.map((day) => day.total), 0)
 

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Laporan Bulanan</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Analisis pengeluaran rumah tangga per bulan</p>
        </div>

        {/* Month Selector */}
        <div className="flex justify-center mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                <Label className="text-sm font-medium dark:text-gray-200">Pilih Bulan:</Label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => {
                      const date = new Date()
                      date.setMonth(date.getMonth() - i)
                      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
                      const label = date.toLocaleDateString("id-ID", { month: "long", year: "numeric" })
                      return (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-gray-200">Total Pengeluaran</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(totalMonthlyExpenses)}
              </div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">{getMonthName(selectedMonth)}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-gray-200">Rata-rata Harian</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(averageDailyExpense)}
              </div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">Per hari aktif</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-gray-200">Pengeluaran Tertinggi</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-600 dark:text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {formatCurrency(highestDayExpense)}
              </div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">Dalam satu hari</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-gray-200">Total Transaksi</CardTitle>
              <PieChart className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{filteredExpenses.length}</div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">Transaksi bulan ini</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Category Breakdown */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl dark:text-white">Pengeluaran per Kategori</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Breakdown pengeluaran berdasarkan kategori untuk {getMonthName(selectedMonth)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {categoryTotals.length === 0 ? (
                <div className="text-center py-8">
                  <PieChart className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Belum ada pengeluaran bulan ini</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {categoryTotals
                    .sort((a, b) => b.total - a.total)
                    .map((category) => {
                      const percentage = ((category.total / totalMonthlyExpenses) * 100).toFixed(1)
                      return (
                        <div
                          key={category.value}
                          className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Badge className={category.color}>{category.label}</Badge>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{percentage}%</span>
                          </div>
                          <span className="font-semibold dark:text-white">{formatCurrency(category.total)}</span>
                        </div>
                      )
                    })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Daily Expenses */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl dark:text-white">Pengeluaran Harian</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Rincian pengeluaran per hari dalam {getMonthName(selectedMonth)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dailyTotals.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Belum ada pengeluaran bulan ini</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {dailyTotals
                    .sort((a, b) => b.total - a.total)
                    .map((day) => (
                      <div
                        key={day.day}
                        className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-green-800 dark:text-green-300">{day.day}</span>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{day.count} transaksi</span>
                        </div>
                        <span className="font-semibold dark:text-white">{formatCurrency(day.total)}</span>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-xl dark:text-white">Transaksi Bulan Ini</CardTitle>
            <CardDescription className="dark:text-gray-300">
              Semua transaksi untuk {getMonthName(selectedMonth)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredExpenses.length === 0 ? (
              <div className="text-center py-8">
                <TrendingDown className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">Belum ada transaksi bulan ini</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredExpenses
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((expense) => {
                    const categoryInfo =
                      categories.find((cat) => cat.value === expense.category) || categories[categories.length - 1]
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
                        <span className="text-lg font-bold text-red-600 dark:text-red-400">
                          {formatCurrency(expense.amount)}
                        </span>
                      </div>
                    )
                  })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
