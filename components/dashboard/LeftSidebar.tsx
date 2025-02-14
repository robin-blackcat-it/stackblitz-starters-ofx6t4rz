"use client"

import { motion } from "framer-motion"
import { Home, Briefcase, BookmarkCheck, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: Home, label: "Dashboard Overview" },
  { icon: Briefcase, label: "AI Job Recommendations" },
  { icon: BookmarkCheck, label: "My Applications" },
  { icon: Settings, label: "Settings" },
]

export default function LeftSidebar({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}) {
  return (
    <motion.div
      initial={false}
      animate={{
        width: isCollapsed ? 64 : 240,
      }}
      className="bg-gradient-to-br from-blue-400 to-purple-500 h-screen overflow-y-auto"
    >
      <div className="p-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex justify-end"
        >
          {isCollapsed ? (
            <ChevronRight className="h-6 w-6 text-white" />
          ) : (
            <ChevronLeft className="h-6 w-6 text-white" />
          )}
        </motion.button>
      </div>
      <nav className="mt-5 px-2 space-y-1">
        {menuItems.map((item) => (
          <motion.a
            key={item.label}
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            className={cn(
              "group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-white/10",
              {
                "justify-center": isCollapsed,
              },
            )}
            href="#"
          >
            <item.icon
              className={cn("flex-shrink-0 h-6 w-6 text-white", {
                "mr-4": !isCollapsed,
              })}
              aria-hidden="true"
            />
            {!isCollapsed && <span>{item.label}</span>}
          </motion.a>
        ))}
      </nav>
    </motion.div>
  )
}

