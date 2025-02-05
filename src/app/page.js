import TestHabitDrawer from "@/components/HabitDrawer";
import { SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <SignedIn>
        <h1 className="text-xl font-bold mb-4">Welcome Back!</h1>
        <SignOutButton>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Sign Out
          </button>
        </SignOutButton>
      </SignedIn>

      <SignedOut>
        <h1 className="text-xl font-bold mb-4">Welcome! Please Sign In.</h1>
        <SignInButton forceRedirectUrl="/overview">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </main>
  );
}
