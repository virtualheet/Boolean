
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Home() {

  // ------------------------------- 
  // Session Details
  const { userId } = await auth();
  if (!userId) {
    return <div>Sign in to view this page</div>;
  }
  const user = await currentUser();
  // -------------------------------

  
  return (
    <div className="text-white">
            <div>Welcome, {user?.firstName}!</div>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
     
    </div>
  );
}
