"use client"

import { useState, useRef, useCallback } from "react"
import { LogEntry } from "@/lib/types"
import confetti from "canvas-confetti"

export type LaunchStatus = "idle" | "checking" | "ready"

interface LaunchState {
  status: LaunchStatus
  progress: number
}

export function useLaunchManager() {
  const [states, setStates] = useState<Record<string, LaunchState>>({})
  const [logs, setLogs] = useState<LogEntry[]>([])
  const timers = useRef<Record<string, NodeJS.Timeout>>({})

  const addLog = useCallback((message: string, type: LogEntry["type"] = "info", launchName?: string) => {
    const entry: LogEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toLocaleTimeString(),
      message,
      type,
      launchName,
    }
    setLogs((prev) => [entry, ...prev])
  }, [])

  const initSystem = useCallback(
    (id: string, name: string) => {
      setStates((prev) => ({
        ...prev,
        [id]: { status: "checking", progress: 0 },
      }))
      addLog("Initiating pre-flight checks...", "info", name)

      const startTime = Date.now()
      const duration = 10000

      timers.current[id] = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progress = Math.min((elapsed / duration) * 100, 100)

        setStates((prev) => ({
          ...prev,
          [id]: { status: "checking", progress },
        }))

        if (progress >= 100) {
          clearInterval(timers.current[id])
          delete timers.current[id]
          setStates((prev) => ({
            ...prev,
            [id]: { status: "ready", progress: 100 },
          }))
          addLog("Systems Ready. Awaiting launch.", "success", name)
        }
      }, 50)
    },
    [addLog]
  )

  const abortLaunch = useCallback(
    (id: string, name: string) => {
      clearInterval(timers.current[id])
      delete timers.current[id]
      
      setStates((prev) => ({
        ...prev,
        [id]: { status: "idle", progress: 0 },
      }))
      addLog("Launch aborted manually.", "error", name)
    },
    [addLog]
  )

  const launchAll = useCallback(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    })
    addLog("We are going to Mars.", "success", "Mission Control")
  }, [addLog])

  return {
    states,
    logs,
    initSystem,
    abortLaunch,
    launchAll,
  }
}