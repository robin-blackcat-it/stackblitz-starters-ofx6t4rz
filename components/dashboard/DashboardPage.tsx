"use client"

import LeftSidebar from "@/components/dashboard/LeftSidebar"
import RightSidebar from "@/components/dashboard/RightSidebar"
import Navbar from "@/components/dashboard/Navbar"
import MainContent from "@/components/dashboard/MainContent"
import { useState } from "react"

export default function DashboardPage() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen">
      <LeftSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex-grow">
        <Navbar openRightSidebar={() => setIsRightSidebarOpen(true)} />
        <MainContent />
      </div>
      <RightSidebar isOpen={isRightSidebarOpen} onClose={() => setIsRightSidebarOpen(false)} />
    </div>
  )
}

