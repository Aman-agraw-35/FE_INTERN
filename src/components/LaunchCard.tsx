"use client"

import { Calendar, Rocket, AlertCircle, Play, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Launch {
  id: string
  flight_number: number
  name: string
  rocket: string
  date_utc: string
}

type LaunchStatus = "idle" | "checking" | "ready" | "aborted"

interface LaunchCardProps {
  launch: Launch
  status: LaunchStatus
  progress: number
  onInit: () => void
  onAbort: () => void
}

export function LaunchCard({ launch, status, progress, onInit, onAbort }: LaunchCardProps) {
  const isChecking = status === "checking"
  const isReady = status === "ready"

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-muted/40 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg dark:bg-card/20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="p-6 pb-2">
        <div className="flex items-start justify-between">
          <span className={`mb-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${isReady ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/80" : "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
            {isReady ? "READY FOR LAUNCH" : status === "checking" ? "SYSTEM CHECK" : "STANDBY"}
          </span>
          <div className="text-xs text-muted-foreground font-mono">#{launch.flight_number}</div>
        </div>
        <h3 className="line-clamp-1 text-lg font-bold tracking-tight text-foreground">
          {launch.name}
        </h3>
      </div>

      <div className="flex-1 space-y-4 p-6 pt-0">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Rocket className="h-4 w-4 text-primary" />
            <span className="font-medium text-foreground">{launch.rocket}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(launch.date_utc).toLocaleDateString()}</span>
          </div>
        </div>

        {isChecking && (
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs font-medium">
              <span>System Check</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full flex-1 transition-all duration-300 ${progress > 85 ? "bg-green-500" : "bg-yellow-500"}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center p-6 pt-0">
        {isChecking ? (
          <Button 
            variant="destructive" 
            className="w-full gap-2 transition-all" 
            onClick={onAbort}
          >
            <AlertCircle className="h-4 w-4" />
            Abort Sequence
          </Button>
        ) : isReady ? (
          <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white cursor-default">
            <CheckCircle2 className="h-4 w-4" />
            Systems Go
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="w-full gap-2 group-hover:border-primary/50 group-hover:bg-primary/5" 
            onClick={onInit}
          >
            <Play className="h-4 w-4" />
            Initialize Systems
          </Button>
        )}
      </div>
    </div>
  )
}