"use client"

import { useEffect, useState } from "react"
import { Moon, Sun, Rocket, Terminal, Activity } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

interface Launch {
  id: string
  name: string
  destination: string
  window: string
  status: "idle" | "active" | "completed" | "aborted"
  progress: number
}

const defaultLaunches: Launch[] = [
  { id: "1", name: "Artemis II", destination: "Lunar Orbit", window: "Sep 2025", status: "idle", progress: 0 },
  { id: "2", name: "Europa Clipper", destination: "Jupiter System", window: "Oct 2024", status: "active", progress: 45 },
  { id: "3", name: "Starship IFT-4", destination: "Low Earth Orbit", window: "Pending", status: "idle", progress: 0 },
  { id: "4", name: "Voyager 3", destination: "Interstellar Space", window: "2030 (Proj)", status: "idle", progress: 0 },
]

const defaultLogs = [
  { id: 1, source: "SYSTEM", message: "Dashboard initialized.", timestamp: "10:00:01" },
  { id: 2, source: "NETWORK", message: "Connected to telemetry stream.", timestamp: "10:00:02" },
  { id: 3, source: "WARN", message: "Weather conditions marginal.", timestamp: "10:05:00" },
]

function LaunchCard({ launch }: { launch: Launch }) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold leading-none tracking-tight">{launch.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{launch.destination}</p>
        </div>
        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
          {launch.status.charAt(0).toUpperCase() + launch.status.slice(1)}
        </span>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-in-out" 
          style={{ width: `${launch.progress}%` }} 
        />
      </div>
      <div className="flex gap-2 mt-2">
        <Button variant="outline" size="sm" className="w-full">Initialize</Button>
      </div>
    </div>
  )
}

function LogConsole() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden h-fit">
      <div className="p-4 border-b bg-muted/40 flex items-center gap-2">
        <Terminal className="h-4 w-4" />
        <span className="font-semibold text-sm">Mission Logs</span>
      </div>
      <div className="p-4 space-y-3 font-mono text-xs max-h-[300px] overflow-y-auto">
        {defaultLogs.map((log) => (
          <div key={log.id} className="flex gap-2 text-muted-foreground">
            <span className="text-muted-foreground/50">[{log.timestamp}]</span>
            <span className={log.source === "WARN" ? "text-yellow-500" : "text-primary"}>
              {log.source}:
            </span>
            <span>{log.message}</span>
          </div>
        ))}
        <div className="animate-pulse text-primary">_</div>
      </div>
    </div>
  )
}

export function Dashboard() {
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
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">Galactic Fleet Commander</h1>
            <h1 className="text-xl font-bold tracking-tight sm:hidden">GFC</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:opacity-90 transition-all font-semibold text-xs sm:text-sm md:text-base"
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
          {defaultLaunches.map((launch) => (
            <LaunchCard key={launch.id} launch={launch} />
          ))}
          
          <div className="rounded-xl border border-dashed flex flex-col items-center justify-center p-6 min-h-[200px] text-muted-foreground gap-2 hover:bg-muted/50 transition-colors cursor-pointer">
            <Activity className="h-8 w-8 opacity-50" />
            <p className="text-sm">Awaiting new mission parameters...</p>
          </div>
        </div>

        <div className="order-1 col-span-12 w-full lg:sticky lg:top-24 lg:order-2 lg:col-span-4">
          <LogConsole />
        </div>
      </main>
    </div>
  )
}