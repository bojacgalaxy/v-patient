import Link from "next/link"
import type React from "react"
import { Button } from "@/components/ui/button"
import { PasswordProtect } from "@/components/PasswordProtect"
import {
  Users,
  CalendarDays,
  MessageSquare,
  FileText,
  BarChart,
  Settings,
  LogOut,
  ArrowLeft,
  MessageSquareIcon as MessageSquareAutoIcon,
} from "lucide-react"

const navigationSections = {
  dashboard: [
    { icon: Users, label: "Patients", href: "/admin/patients" },
    { icon: CalendarDays, label: "Treatments", href: "/admin/treatments" },
    { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
    { icon: BarChart, label: "Analytics", href: "/admin/analytics" },
  ],
  configuration: [
    { icon: FileText, label: "Treatment Types", href: "/admin/treatment-types" },
    { icon: MessageSquareAutoIcon, label: "Messaging Automation", href: "/admin/messaging-automation" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ],
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PasswordProtect portalName="Admin Dashboard">
      <div className="flex flex-col min-h-screen">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow-md">
            <div className="p-4">
              <h1 className="text-2xl font-bold text-primary">ABC Clinic</h1>
            </div>
            <nav className="mt-8">
              {/* Dashboard Section */}
              <div className="px-3 mb-6">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Dashboard</h2>
                <div className="space-y-1">
                  {navigationSections.dashboard.map((item, index) => (
                    <Link key={index} href={item.href}>
                      <span className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-200">
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Configuration Section */}
              <div className="px-3">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Configuration</h2>
                <div className="space-y-1">
                  {navigationSections.configuration.map((item, index) => (
                    <Link key={index} href={item.href}>
                      <span className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-200">
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
            <div className="absolute bottom-0 w-64 p-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Link>
              </Button>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">{children}</div>
          </main>
        </div>
      </div>
    </PasswordProtect>
  )
}

