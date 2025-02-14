"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"
import LockIcon from "@mui/icons-material/Lock"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorIcon from "@mui/icons-material/Error"
import LoginIcon from "@mui/icons-material/Login"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import DescriptionIcon from "@mui/icons-material/Description"
import CircularProgress from "@mui/material/CircularProgress"
import GitHubIcon from "@mui/icons-material/GitHub"
import { useRouter } from "next/navigation"
import type React from "react" // Added import for React

const parabolicEasing = (t: number) => {
  return 1 - Math.pow(1 - t, 2)
}

const slideInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.75,
      ease: parabolicEasing,
    },
  }),
}

const TermsAndPrivacy = ({ title, content }: { title: string; content: string }) => (
  <motion.div
    layout
    initial="hidden"
    animate="visible"
    exit="hidden"
    variants={slideInVariants}
    custom={2}
    className="mt-4"
  >
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <div className="bg-gray-100 p-4 rounded-md h-48 overflow-y-auto">
      <p>{content}</p>
    </div>
  </motion.div>
)

export default function AuthForm() {
  const router = useRouter()
  const [isSignIn, setIsSignIn] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
  const [showVerificationMessage, setShowVerificationMessage] = useState(false)
  const [canResendVerification, setCanResendVerification] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(60)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    if (!isSignIn) {
      setShowVerificationMessage(true)
      startResendCountdown()
    } else {
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        router.push("/dashboard")
      }, 1500)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
      setIsForgotPassword(false)
      router.push("/dashboard")
    }, 1500)
  }

  const startResendCountdown = () => {
    setCanResendVerification(false)
    setResendCountdown(60)
    const timer = setInterval(() => {
      setResendCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer)
          setCanResendVerification(true)
          return 0
        }
        return prevCount - 1
      })
    }, 1000)
  }

  const handleResendVerification = () => {
    // Here you would typically call an API to resend the verification email
    console.log("Resending verification email...")
    startResendCountdown()
  }

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (!isPageLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress size={60} />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <LayoutGroup>
        <motion.div layout className="w-full max-w-md space-y-8">
          <motion.div layout initial="hidden" animate="visible" variants={slideInVariants} custom={0}>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {isSignIn ? "Sign in to your account" : "Create your account"}
            </h2>
          </motion.div>
          <motion.div
            layout
            initial="hidden"
            animate="visible"
            variants={slideInVariants}
            custom={1}
            className="flex justify-center space-x-4"
          >
            <button
              onClick={() => {
                setIsSignIn(true)
                setIsForgotPassword(false)
                setShowTerms(false)
                setShowPrivacyPolicy(false)
              }}
              className={`flex items-center pb-2 text-sm font-medium ${
                isSignIn && !isForgotPassword ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
              }`}
            >
              <LoginIcon className="mr-1" fontSize="small" />
              Sign In
            </button>
            <button
              onClick={() => {
                setIsSignIn(false)
                setIsForgotPassword(false)
                setShowTerms(false)
                setShowPrivacyPolicy(false)
              }}
              className={`flex items-center pb-2 text-sm font-medium ${
                !isSignIn && !isForgotPassword ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
              }`}
            >
              <PersonAddIcon className="mr-1" fontSize="small" />
              Sign Up
            </button>
          </motion.div>
          <form className="mt-8 space-y-6" onSubmit={isForgotPassword ? handleForgotPassword : handleSubmit}>
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center text-green-600"
                >
                  <CheckCircleIcon className="mx-auto h-12 w-12" />
                  <p className="mt-2 text-xl font-semibold">Signed in successfully!</p>
                </motion.div>
              ) : showVerificationMessage ? (
                <motion.div
                  key="verification"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center text-green-600 mt-4"
                >
                  <CheckCircleIcon className="mx-auto h-12 w-12" />
                  <p className="mt-2 text-xl font-semibold">Verification email has been sent!</p>
                  <p className="mt-2 text-sm text-gray-600">
                    Please check your email and follow the instructions to verify your account.
                  </p>
                  <Button onClick={handleResendVerification} disabled={!canResendVerification} className="mt-4">
                    {canResendVerification ? "Resend Verification Email" : `Resend available in ${resendCountdown}s`}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  layout
                  key={`${isSignIn ? "signin" : "signup"}-${isForgotPassword ? "forgot" : "normal"}`}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                >
                  {isForgotPassword ? (
                    <motion.div layout variants={slideInVariants} custom={2}>
                      <Label htmlFor="forgot-email" className="flex items-center">
                        <AlternateEmailIcon className="mr-2" fontSize="small" />
                        Email address
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="forgot-email"
                          name="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`pr-10 ${isValidEmail(email) ? "border-green-500" : ""}`}
                          placeholder="you@example.com"
                        />
                        {email && (
                          <span className="absolute right-3 top-2.5">
                            {isValidEmail(email) ? (
                              <CheckCircleIcon className="h-5 w-5 text-green-500" />
                            ) : (
                              <ErrorIcon className="h-5 w-5 text-red-500" />
                            )}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ) : showTerms ? (
                    <TermsAndPrivacy
                      title="Terms of Service"
                      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl."
                    />
                  ) : showPrivacyPolicy ? (
                    <TermsAndPrivacy
                      title="Privacy Policy"
                      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl."
                    />
                  ) : (
                    <>
                      <AnimatePresence mode="wait">
                        {!isSignIn && (
                          <motion.div
                            key="name"
                            layout
                            variants={slideInVariants}
                            custom={2}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                          >
                            <Label htmlFor="name" className="flex items-center">
                              <AccountCircleIcon className="mr-2" fontSize="small" />
                              Full Name
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="mt-1"
                              placeholder="John Doe"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <motion.div layout variants={slideInVariants} custom={3}>
                        <Label htmlFor="email" className="flex items-center">
                          <AlternateEmailIcon className="mr-2" fontSize="small" />
                          Email address
                        </Label>
                        <div className="relative mt-1">
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`pr-10 ${isValidEmail(email) ? "border-green-500" : ""}`}
                            placeholder="you@example.com"
                          />
                          {email && (
                            <span className="absolute right-3 top-2.5">
                              {isValidEmail(email) ? (
                                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                              ) : (
                                <ErrorIcon className="h-5 w-5 text-red-500" />
                              )}
                            </span>
                          )}
                        </div>
                      </motion.div>
                      <motion.div layout variants={slideInVariants} custom={4}>
                        <Label htmlFor="password" className="flex items-center">
                          <LockIcon className="mr-2" fontSize="small" />
                          Password
                        </Label>
                        <div className="relative mt-1">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pr-10"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-500"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon className="h-5 w-5" />
                            ) : (
                              <VisibilityIcon className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </motion.div>
                      <AnimatePresence mode="wait">
                        {!isSignIn && (
                          <motion.div
                            key="confirmPassword"
                            layout
                            variants={slideInVariants}
                            custom={5}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                          >
                            <Label htmlFor="confirmPassword" className="flex items-center">
                              <LockIcon className="mr-2" fontSize="small" />
                              Confirm Password
                            </Label>
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              required
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="mt-1"
                              placeholder="••••••••"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <AnimatePresence mode="wait">
                        {isSignIn ? (
                          <motion.div
                            key="rememberMe"
                            layout
                            variants={slideInVariants}
                            custom={5}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="mt-4 flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <Checkbox id="remember-me" />
                              <Label htmlFor="remember-me" className="ml-2 text-sm text-gray-900">
                                Remember me
                              </Label>
                            </div>
                            <div className="text-sm">
                              <button
                                type="button"
                                onClick={() => setIsForgotPassword(true)}
                                className="font-medium text-blue-600 hover:text-blue-500"
                              >
                                Forgot your password?
                              </button>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="agreeTerms"
                            layout
                            variants={slideInVariants}
                            custom={6}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="mt-4 flex items-center"
                          >
                            <Checkbox
                              id="agree-terms"
                              checked={agreeTerms}
                              onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                            />
                            <Label htmlFor="agree-terms" className="ml-2 text-sm text-gray-900">
                              I agree to the{" "}
                              <button
                                type="button"
                                onClick={() => setShowTerms(true)}
                                className="font-medium text-blue-600 hover:text-blue-500"
                              >
                                Terms
                              </button>{" "}
                              and{" "}
                              <button
                                type="button"
                                onClick={() => setShowPrivacyPolicy(true)}
                                className="font-medium text-blue-600 hover:text-blue-500"
                              >
                                Privacy Policy
                              </button>
                            </Label>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                  <motion.div layout variants={slideInVariants} custom={7} className="mt-6">
                    <Button type="submit" className="w-full" disabled={isLoading || (!isSignIn && !agreeTerms)}>
                      {isLoading ? (
                        <CircularProgress size={24} className="mr-2" />
                      ) : isForgotPassword ? (
                        "Reset Password"
                      ) : isSignIn ? (
                        <>
                          <LoginIcon className="mr-2" />
                          Sign In
                        </>
                      ) : (
                        <>
                          <PersonAddIcon className="mr-2" />
                          Sign Up
                        </>
                      )}
                    </Button>
                  </motion.div>
                  {(showTerms || showPrivacyPolicy) && (
                    <motion.div layout variants={slideInVariants} custom={8} className="mt-4 text-center text-sm">
                      <button
                        type="button"
                        onClick={() => {
                          setShowTerms(false)
                          setShowPrivacyPolicy(false)
                        }}
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Back to {isSignIn ? "Sign In" : "Sign Up"}
                      </button>
                    </motion.div>
                  )}
                  {isForgotPassword && (
                    <motion.div layout variants={slideInVariants} custom={8} className="mt-4 text-center text-sm">
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(false)}
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Back to Sign In
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
          <motion.div
            layout
            initial="hidden"
            animate="visible"
            variants={slideInVariants}
            custom={8}
            className="mt-6 flex justify-center space-x-4"
          >
            <a
              href="https://github.com/robin-collins/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <GitHubIcon className="h-6 w-6 mr-2" />
              <span>Repository</span>
            </a>
            <a
              href="https://robin-collins.github.io/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <DescriptionIcon className="h-6 w-6 mr-2" />
              <span>Documentation</span>
            </a>
          </motion.div>
        </motion.div>
      </LayoutGroup>
    </div>
  )
}

