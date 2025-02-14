## SpecStory

## Sign-in/Sign-up Functionality Issue (2/14/2025, 3:39:19 PM)

_**User**_

there is a small issue with my signin signup landing page, at the top there is a signin and signup link, that animates the display of the signin or signup input fields.you can switch between them and they animate in the fields, if you go to forgot password section, and click those two links at the top, it animates in the input fields, however if you have viewed the 'terms' or 'privacy policy' the 'signin' link there after does not work

---

_**Assistant**_

I'll help fix the issue with the sign-in link not working after viewing terms or privacy policy. The problem occurs because we need to properly handle the state transitions when clicking the sign-in/sign-up links. Here's the fix:

```typescript:components/AuthForm.tsx
// ... existing code ...

export default function AuthForm() {
  // ... existing state declarations ...

  const handleAuthTypeChange = (isSigningIn: boolean) => {
    setIsSignIn(isSigningIn)
    setIsForgotPassword(false)
    setShowTerms(false)
    setShowPrivacyPolicy(false)
    setShowVerificationMessage(false) // Also reset verification message
  }

  // ... existing code until the buttons section ...

  <motion.div
    layout
    initial="hidden"
    animate="visible"
    variants={slideInVariants}
    custom={1}
    className="flex justify-center space-x-4"
  >
    <button
      onClick={() => handleAuthTypeChange(true)}
      className={`flex items-center pb-2 text-sm font-medium ${
        isSignIn && !isForgotPassword ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
      }`}
    >
      <LoginIcon className="mr-1" fontSize="small" />
      Sign In
    </button>
    <button
      onClick={() => handleAuthTypeChange(false)}
      className={`flex items-center pb-2 text-sm font-medium ${
        !isSignIn && !isForgotPassword ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
      }`}
    >
      <PersonAddIcon className="mr-1" fontSize="small" />
      Sign Up
    </button>
  </motion.div>

  // ... rest of the existing code ...
```

The changes:

1. I've extracted the state reset logic into a new `handleAuthTypeChange` function that properly resets all relevant states when switching between sign-in and sign-up.

2. Updated the button onClick handlers to use this new function instead of directly setting the states.

3. Added `setShowVerificationMessage(false)` to ensure the verification message is also cleared when switching between auth types.

This should fix the issue where the sign-in link stops working after viewing terms or privacy policy. The new `handleAuthTypeChange` function ensures a consistent state reset whenever switching between sign-in and sign-up modes.

---



---

