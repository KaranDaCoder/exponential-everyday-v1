import TestHabitDrawer from "@/components/HabitDrawer";
import { SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";


export default function Home() {
  return (
    <main>
      <SignedIn>
      <SignOutButton/>
      </SignedIn>
      <SignedOut>
        <SignInButton forceRedirectUrl='/overview' />
      </SignedOut>
    </main>
  );
}
