"use client"; // Marks this component as client-side

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs"; // Clerk's useUser hook

export default function Hero() {
  const { isLoaded, isSignedIn, user } = useUser(); // useUser hook for client-side user data

  // Safely get the username, or use firstName, or fallback to "Guest"
  const username = isLoaded && isSignedIn && user ? user.firstName : "Guest";

  return (
    <section className="relative flex items-center justify-center h-screen w-full bg-cover bg-center">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-background opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-extrabold mb-4 font-['Press_Start_2P'] uppercase">
          Welcome to Gojirun! {username}
        </h1>

        {/* Tagline */}
        <p className="text-lg mb-8">
          A 2D platformer inspired by the classic Chrome T-Rex run.
        </p>

        {/* Play Now Button */}
        <Button
          asChild
          className="px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-600 text-lg font-bold rounded-full hover:from-purple-600 hover:to-pink-700 transition duration-1000 shadow-lg animate-bounce"
        >
          <a href="#game">Play Now</a>
        </Button>

        {/* Giphy Embed */}
        <div className="mt-12">
          <iframe
            src="https://giphy.com/embed/YTzh3zw4mj1XpjjiIb"
            width="400"
            height="400"
            frameBorder="0"
            className="giphy-embed mx-auto"
            allowFullScreen
            title="Giphy Animation" // Added title for accessibility
          ></iframe>
        </div>
      </div>
    </section>
  );
}
