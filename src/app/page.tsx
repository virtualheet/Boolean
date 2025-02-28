import Image from "next/image"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Fields from "@/components/Fields"

export default function ProductivityLanding() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black w-full h-screen items-center  overflow-hidden "
      // style={{
      //   padding: "clamp(1rem,5vw,200rem) 0 0"
      // }}
    >
      <nav className="bg-white dark:bg-black shadow-sm">
        <div className="container mx-auto">
          <Fields />
        </div>
      </nav>
        <div
          className="absolute inset-0 z-0 dark:bg-[radial-gradient(#ffffff 1px, transparent 1px)] bg-[radial-gradient(#000000 1px, transparent 1px)]"
          style={{
            backgroundSize: "40px 40px",
          }}
        />

        {/* Main content container */}
      <div className="relative flex items-center flex-col z-10 mx-auto max-w-7xl "
      style={{
        gap: 'clamp(1rem,3vw,200rem)',
        padding: 'clamp(7rem,6vw,200rem) 0 '
      }}
      >
        {/* Sticky note */}
        <div className="absolute left-[0%] top-[5%] rotate-[-5deg] transform">
          <div className="w-72 h-48 bg-yellow-100 rounded-xl p-5 shadow-md">
            <p className="font-handwriting text-sm leading-tight">
            Keep track of ideas and tasks in real time so you never miss a deadline.
            </p>
            <div className="absolute -left-1 -top-1">
              <div className="h-4 w-4 rounded-full bg-red-500" />
            </div>
            <div className="absolute bottom-5 left-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white shadow-sm">
                <Image
                  src='/logo/logo.svg'
                  width={100}
                  height={100}
                  alt='logo'
                  className='w-full border-2  border-black dark:border-white rounded-xl '
                /> 
              </div>
            </div>
          </div>
        </div>

        {/* App logo */}
        <div className="  z-50">
          <div className="flex h-32 w-32 items-center justify-center rounded-xl bg-white shadow-md">
            <Image
              src='/logo/logo.svg'
              width={100}
              height={100}
              alt='logo'
              className='w-full shadow-lg shadow-black/20 dark:shadow-white/70 dark:border-white rounded-3xl'
            /> 
          </div>
        </div>

        {/* Reminders card */}
        <div className="absolute right-[0%] top-[7%] rotate-[5deg] transform">
          <div className="w-72 rounded-xl bg-white p-4 shadow-md">
            <div className="mb-2 text-sm font-semibold text-gray-500">Reminders</div>
            <div className="mt-4 rounded-lg bg-gray-50 p-3">
              <div className="text-sm font-medium">Today's Order</div>
              <div className="text-xs text-gray-500">Message with client</div>
              <div className="mt-2 flex items-center">
                <div className="text-xs font-medium text-gray-500">Time</div>
                <div className="ml-2 flex items-center rounded-full bg-blue-50 px-2 py-1">
                  <Clock className="mr-1 h-3 w-3 text-blue-500" />
                  <span className="text-xs text-blue-500">13:00 - 13:45</span>
                </div>
              </div>
            </div>
            <div className="absolute -right-2 -top-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                <Clock className="h-6 w-6 text-gray-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Today's tasks card */}
        <div className="absolute bottom-[0%] left-[0%] rotate-[-3deg] transform">
          <div className="w-72 rounded-xl bg-white p-4 shadow-md">
            <div className="mb-4 text-sm font-semibold">Today's tasks</div>

            <div className="mb-4">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 flex h-5 w-5 items-center justify-center rounded bg-red-500 text-white text-xs">
                    N
                  </div>
                  <span className="text-xs">Review Design Concepts</span>
                </div>
                <div className="flex">
                  <Image
                    src="/placeholder.svg?height=20&width=20"
                    alt="User avatar"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <Image
                    src="/placeholder.svg?height=20&width=20"
                    alt="User avatar"
                    width={20}
                    height={20}
                    className="rounded-full -ml-1"
                  />
                </div>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-[60%] rounded-full bg-blue-400"></div>
              </div>
              <div className="mt-1 text-right text-xs text-gray-500">Sep 10</div>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 flex h-5 w-5 items-center justify-center rounded bg-green-500 text-white text-xs">
                    D
                  </div>
                  <span className="text-xs">Finalize Client Contract</span>
                </div>
                <div className="flex">
                  <Image
                    src="/placeholder.svg?height=20&width=20"
                    alt="User avatar"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-blue-400 to-orange-400"></div>
              </div>
              <div className="mt-1 text-right text-xs text-gray-500">Sep 15</div>
            </div>
          </div>
        </div>

        {/* Integrations card */}
        <div className="absolute bottom-[1%] right-[0%] rotate-[3deg] transform">
          <div className="w-56 rounded-xl bg-white p-4 shadow-md">
            <div className="mb-4 text-sm font-semibold">1 New Message from your client</div>
            <div className="mb-4 text-sm font-semibold">Proposal Approved for Logo Redesign</div>
            <div className="flex justify-center space-x-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-sm">
                <svg viewBox="0 0 24 24" width="32" height="32">
                  <path
                    d="M22.0,6.0 L2.0,6.0 L2.0,18.0 L22.0,18.0 L22.0,6.0 Z M2.0,4.0 L22.0,4.0 C23.1,4.0 24.0,4.9 24.0,6.0 L24.0,18.0 C24.0,19.1 23.1,20.0 22.0,20.0 L2.0,20.0 C0.9,20.0 0.0,19.1 0.0,18.0 L0.0,6.0 C0.0,4.9 0.9,4.0 2.0,4.0 Z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M0.0,6.0 L0.0,9.0 L8.0,12.0 L0.0,15.0 L0.0,18.0 L12.0,12.0 L0.0,6.0 Z"
                    fill="#EA4335"
                    transform="translate(6.0, 0.0)"
                  ></path>
                </svg>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-sm">
                <svg viewBox="0 0 24 24" width="32" height="32">
                  <path
                    d="M1.5,0 L22.5,0 C23.3,0 24,0.7 24,1.5 L24,22.5 C24,23.3 23.3,24 22.5,24 L1.5,24 C0.7,24 0,23.3 0,22.5 L0,1.5 C0,0.7 0.7,0 1.5,0 Z"
                    fill="#0F9D58"
                  ></path>
                  <path d="M12,5 L12,19 L19,12 L12,5 Z" fill="#FFFFFF"></path>
                  <path d="M12,5 L5,12 L12,19 L12,5 Z" fill="#F1F1F1"></path>
                </svg>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-sm">
                <svg viewBox="0 0 24 24" width="32" height="32">
                  <path
                    d="M21.5,0 L2.5,0 C1.1,0 0,1.1 0,2.5 L0,21.5 C0,22.9 1.1,24 2.5,24 L21.5,24 C22.9,24 24,22.9 24,21.5 L24,2.5 C24,1.1 22.9,0 21.5,0 Z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M10,7 L8,7 L8,17 L10,17 L10,7 Z M16,7 L14,7 L14,17 L16,17 L16,7 Z M13,7 L11,7 L11,17 L13,17 L13,7 Z"
                    fill="#FFFFFF"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main heading */}
        <div className="relative z-20 mx-auto  max-w-3xl text-center">
          <h1 className="text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
          Hire, plan, and track
            <div className="text-gray-400">all in one place</div>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-black dark:text-white/70">
          Efficiently connect with top freelancers, manage projects, and boost your productivity.
          </p>
          <div className="mt-10">
            <Button
              size="lg"
              className="rounded-full bg-black dark:bg-white dark:text-black px-8 py-6 text-lg font-medium text-white hover:bg-black/60"
            >
             Get started
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

