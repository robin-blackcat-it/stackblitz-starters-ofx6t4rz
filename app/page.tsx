"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import AuthForm from "@/components/AuthForm"
import CircularProgress from "@mui/material/CircularProgress"

const parabolicEasing = (t: number) => {
  return 1 - Math.pow(1 - t, 2)
}

export default function Home() {
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  useEffect(() => {
    // Simulate page load delay
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="flex min-h-screen flex-col lg:flex-row">
      <AnimatePresence>
        {!isPageLoaded && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          >
            <CircularProgress size={60} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.75, ease: parabolicEasing }}
        className="hidden w-full bg-gradient-to-br from-blue-400 to-purple-500 lg:flex lg:w-1/2 lg:items-center lg:justify-center"
      >
        <div className="w-64 h-64">
          <DotLottieReact src="signin.lottie" loop autoplay />
        </div>
      </motion.div>
      <div className="w-full bg-white lg:w-1/2">
        <AuthForm />
      </div>
    </main>
  )
}

