"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HighScoreModal } from "@/components/ui/modal";
import HighScoreButton from "@/components/ui/modal";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import axios from "axios"; // For making API requests
import Link from "next/link";

export default function Navigation() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isLoaded, isSignedIn, user } = useUser(); // Use Clerk's useUser hook to detect sign-in

  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger the API call when the user signs in
  useEffect(() => {
    const fetchData = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          const backendURL = process.env.NEXT_PUBLIC_API_KEY;

          const data = {
            userId: user.id || "000000", // User ID
            email: user.emailAddresses?.[0]?.emailAddress || "No Email", // Email address
            fullname: user.fullName || "No Name", // Full name
            profileImageUrl: user.imageUrl || "",
            createdAt: user.createdAt, // User account creation timestamp
            lastSignInAt: user.lastSignInAt, // Last sign-in timestamp
          };

          // Make API call to your backend
          const response = await axios.post(`${backendURL}/api/users`, data);

          console.log(data);
        } catch (error) {
          console.error("Error calling API:", error);
        }
      }
    };

    fetchData();
  }, [isLoaded, isSignedIn, user]); // Depend on `isSignedIn` and `isLoaded` for reactivity

  if (!mounted) {
    return null;
  }
  const takeToProfilePage = () => {
    router.push("/ProfilePage");
  };
  return (
    <nav className="flex w-full mx-auto px-4 sm:px-6 lg:px-8 items-center justify-between h-16">
      {/* Game Title */}
      <Link href="/">
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-200">
            Gojirun
          </h1>
        </div>
      </Link>

      {/* Navbar Links */}
      <div className="ml-10 flex items-center space-x-4">
        {/* Profile Button */}
        <Button
          variant="ghost"
          className="hover:bg-accent transition-all duration-300"
          onClick={() => takeToProfilePage()}
        >
          <User className="inline-block mr-2 h-4 w-4" />
          Profile
        </Button>

        {/* High Scores Button */}
        <HighScoreModal />
        <HighScoreButton />

        {/* User Authentication */}
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>

        {/* Theme Toggle Button */}
        <Button
          variant="ghost"
          className="hover:bg-accent transition-all duration-500"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <div className="relative h-[1.2rem] w-[1.2rem]">
            {theme === "light" ? (
              <Sun className="absolute h-full w-full transition-all" />
            ) : (
              <Moon className="absolute h-full w-full transition-all" />
            )}
          </div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </nav>
  );
}
