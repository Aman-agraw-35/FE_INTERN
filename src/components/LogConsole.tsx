"use client"

import { LogEntry } from "@/lib/types"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Check, Info, AlertTriangle, XCircle } from "lucide-react"

interface LogConsoleProps {
  logs: LogEntry[]
}

export function LogConsole({ logs }: LogConsoleProps) {
  const getIcon = (type: LogEntry["type"]) => {
    switch (type) {
      case "success": return <Check className="h-3 w-3 text-green-400" />
      case "error": return <XCircle className="h-3 w-3 text-red-400" />
      case "warning": return <AlertTriangle className="h-3 w-3 text-yellow-400" />
      default: return <Info className="h-3 w-3 text-blue-400" />
    }
  }

  return (
    <motion.div 
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex h-[400px] lg:h-[600px] w-full flex-col overflow-hidden rounded-xl border border-border/40 bg-card shadow-xl dark:bg-black/40 backdrop-blur-md"
    >
      <div className="flex items-center justify-between border-b border-border/10 bg-muted/20 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 font-mono text-sm font-semibold tracking-wider text-muted-foreground">
          <Terminal className="h-4 w-4" />
          <span>MISSION_LOG.SYS</span>
        </div>
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-red-500/50" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
          <div className="h-2 w-2 rounded-full bg-green-500/50" />
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-2 font-mono text-xs">
          <AnimatePresence mode="popLayout">
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                layout
                className="relative flex items-start gap-3 rounded-lg border border-border/50 bg-background/50 p-2.5 shadow-sm transition-colors hover:bg-accent/50"
              >
                <div className="mt-0.5 shrink-0 opacity-80">
                  {getIcon(log.type)}
                </div>
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <div className="flex items-center gap-2 opacity-60">
                    <span className="shrink-0 text-[10px] uppercase tracking-wider">{log.timestamp}</span>
                    <span className="h-px w-2 bg-border" />
                    {log.launchName && (
                      <span className="truncate font-semibold text-primary/80">{log.launchName}</span>
                    )}
                  </div>
                  <p className="break-words text-foreground/90">{log.message}</p>
                </div>
              </motion.div>
            ))}
            {logs.length === 0 && (
              <div className="py-8 text-center text-muted-foreground opacity-50">
                Awaiting telemetry code...
              </div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </motion.div>
  )
}
