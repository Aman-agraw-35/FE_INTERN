"use client"

import { Launch } from "@/lib/types"
import { useLaunchManager } from "@/hooks/useLaunchManager"
import { LaunchCard } from "@/components/LaunchCard"
import { LogConsole } from "@/components/LogConsole"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Rocket } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface DashboardProps {
  launches: Launch[]
}

export function Dashboard({ launches }: DashboardProps) {
  const { states, logs, initSystem, abortLaunch, launchAll } = useLaunchManager()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <h1 className="md:text-xl sm:text-lg text-base font-bold tracking-tight">Galactic Fleet Commander</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={launchAll}
              className="bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:opacity-90 transition-all font-semibold  text-xs sm:text-sm md:text-base"
            > 
              Launch All
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex flex-col items-start gap-8 p-4 py-8 lg:grid lg:grid-cols-12 lg:px-6">
        <div className="order-2 col-span-12 grid w-full gap-6 grid-cols-1 md:grid-cols-2 lg:order-1 lg:col-span-8 xl:grid-cols-2">
          {launches.map((launch) => (
            <LaunchCard
              key={launch.id}
              launch={launch}
              status={states[launch.id]?.status || "idle"}
              progress={states[launch.id]?.progress || 0}
              onInit={() => initSystem(launch.id, launch.name)}
              onAbort={() => abortLaunch(launch.id, launch.name)}
            />
          ))}
        </div>

        <div className="order-1 col-span-12 w-full lg:sticky lg:top-24 lg:order-2 lg:col-span-4">
          <LogConsole logs={logs} />
        </div>
      </main>
    </div>
  )
}
