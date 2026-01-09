"use client"

import { Launch } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, Rocket, AlertCircle, Play, CheckCircle2 } from "lucide-react"
import { LaunchStatus } from "@/hooks/useLaunchManager"
import { cn } from "@/lib/utils"

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
    <Card className="group relative flex flex-col justify-between overflow-hidden border-muted/40 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg dark:bg-card/20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <Badge variant={isReady ? "default" : "secondary"} className="mb-2">
            {isReady ? "READY FOR LAUNCH" : status === "checking" ? "SYSTEM CHECK" : "STANDBY"}
          </Badge>
          <div className="text-xs text-muted-foreground font-mono">#{launch.flight_number}</div>
        </div>
        <CardTitle className="line-clamp-1 text-lg font-bold tracking-tight text-foreground">
          {launch.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
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
            <Progress
              value={progress}
              className={cn(
                "h-2 transition-all",
                "[&>div]:transition-colors [&>div]:duration-300",
                progress > 85 ? "[&>div]:bg-green-500" : "[&>div]:bg-yellow-500"
              )}
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4">
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
      </CardFooter>
    </Card>
  )
}
