"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import {
  Trophy,
  Moon,
  Sun,
  CircleUser,
  GitPullRequestArrow,
  LucideHome,
  Joystick,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Navigation() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isLoaded, isSignedIn, user } = useUser();
  const username = isLoaded && isSignedIn && user ? user.firstName : "Guest";

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navItems = [
    { label: "Home", icon: LucideHome, onClick: () => router.push("/") },
    { label: "Play The Game", icon: Joystick, onClick: () => router.push("/pages/game") },
    { label: "Profile", icon: CircleUser, onClick: () => router.push("/pages/profile") },
    { label: "Leaderboard", icon: Trophy, onClick: () => router.push("/pages/leaderboard") },
    { label: "Contributors", icon: GitPullRequestArrow, onClick: () => router.push("/pages/contributors") },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-transparent backdrop-blur-md px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center space-x-3">
        <span className="text-sm sm:text-base">
          Player logged in: {username}
        </span>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-2 items-center">
        {navItems.map(({ label, icon: Icon, onClick }) => (
          <Button
            key={label}
            variant="ghost"
            className="hover:bg-accent transition-all duration-300"
            onClick={onClick}
          >
            <Icon className="inline-block mr-2 h-4 w-4" />
            {label}
          </Button>
        ))}

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          className="hover:bg-accent transition-all duration-300"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-background shadow-lg rounded-b-xl p-4 space-y-2 md:hidden">
          {navItems.map(({ label, icon: Icon, onClick }) => (
            <Button
              key={label}
              variant="ghost"
              className="w-full justify-start hover:bg-accent transition-all"
              onClick={() => {
                onClick();
                setMobileOpen(false);
              }}
            >
              <Icon className="inline-block mr-2 h-4 w-4" />
              {label}
            </Button>
          ))}

          {/* Theme Toggle Mobile */}
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-accent transition-all"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="ml-2">Toggle Theme</span>
          </Button>
        </div>
      )}
    </nav>
  );
}
