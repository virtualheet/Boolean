import Image from "next/image"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductivityLanding() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f8f9fa]">
      {/* Background pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(#e0e0e0 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20">
        {/* Sticky note */}
        <div className="absolute left-[10%] top-[15%] rotate-[-5deg] transform">
          <div className="w-48 h-48 bg-yellow-100 p-5 shadow-md">
            <p className="font-handwriting text-sm leading-tight">
              Take notes to keep track of crucial details, and accomplish more tasks with ease.
            </p>
            <div className="absolute -left-1 -top-1">
              <div className="h-4 w-4 rounded-full bg-red-500" />
            </div>
            <div className="absolute bottom-5 left-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white shadow-sm">
                <div className="h-5 w-5 rounded-sm bg-blue-500 text-white flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App logo */}
        <div className="absolute left-1/2 top-[20%] -translate-x-1/2 transform">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-md">
            <div className="grid grid-cols-2 grid-rows-2 gap-1">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <div className="h-3 w-3 rounded-full bg-black"></div>
              <div className="h-3 w-3 rounded-full bg-black"></div>
              <div className="h-3 w-3 rounded-full bg-black"></div>
            </div>
          </div>
        </div>

        {/* Reminders card */}
        <div className="absolute right-[10%] top-[15%] rotate-[5deg] transform">
          <div className="w-56 rounded-xl bg-white p-4 shadow-md">
            <div className="mb-2 text-sm font-semibold text-gray-500">Reminders</div>
            <div className="mt-4 rounded-lg bg-gray-50 p-3">
              <div className="text-sm font-medium">Today's Meeting</div>
              <div className="text-xs text-gray-500">Call with marketing team</div>
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
        <div className="absolute bottom-[15%] left-[10%] rotate-[-3deg] transform">
          <div className="w-56 rounded-xl bg-white p-4 shadow-md">
            <div className="mb-4 text-sm font-semibold">Today's tasks</div>

            <div className="mb-4">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 flex h-5 w-5 items-center justify-center rounded bg-red-500 text-white text-xs">
                    N
                  </div>
                  <span className="text-xs">New ideas for campaign</span>
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
                  <span className="text-xs">Design PPT #4</span>
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
        <div className="absolute bottom-[15%] right-[10%] rotate-[3deg] transform">
          <div className="w-56 rounded-xl bg-white p-4 shadow-md">
            <div className="mb-4 text-sm font-semibold">100+ Integrations</div>
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
        <div className="relative z-20 mx-auto mt-32 max-w-3xl text-center">
          <h1 className="text-6xl font-bold tracking-tight text-gray-900">
            Think, plan, and track
            <div className="text-gray-400">all in one place</div>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600">
            Efficiently manage your tasks and boost productivity.
          </p>
          <div className="mt-10">
            <Button
              size="lg"
              className="rounded-full bg-blue-500 px-8 py-6 text-lg font-medium text-white hover:bg-blue-600"
            >
              Get free demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

