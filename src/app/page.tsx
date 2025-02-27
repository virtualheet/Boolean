
import JobSuccessCard from "@/components/JobSuccessCard";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {

  const { userId } = await auth();
  if (!userId) {
    return redirect('/sign-in')
  }
  const user = await currentUser();


  return (
    <div className="text-black dark:text-white  w-full h-3/4 max-w-screen bg-white dark:bg-[#131313]">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex items-center">
          <UserButton

            appearance={{
              elements: {
                rootBox: 'hover:opacity-80 transition-opacity',
                avatarBox: 'w-48 h-48 rounded-[2rem]',
              }
            }}
          />

        </div>
        <div className="flex text-4xl font-medium my-10 ">
          Welcome {user?.firstName}
        </div>
      </div>

    </div>
  );
}
