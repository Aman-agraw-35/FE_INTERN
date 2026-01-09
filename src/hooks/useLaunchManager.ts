"use client"

import { useState, useCallback } from "react"

export type LaunchStatus = "idle" | "checking" | "ready"

interface LaunchState {
  status: LaunchStatus
  progress: number
}

interface LogEntry {
  id: string
  timestamp: string
  message: string
  type: "info" | "success" | "error" | "warning"
  launchName?: string
}

export function useLaunchManager() {
  const [states, setStates] = useState<Record<string, LaunchState>>({})
  const [logs, setLogs] = useState<LogEntry[]>([])

  const initSystem = useCallback((id: string, name: string) => {
    setStates((prev) => ({
      ...prev,
      [id]: { status: "checking", progress: 0 },
    }))
  }, [])

  const abortLaunch = useCallback((id: string, name: string) => {
    setStates((prev) => ({
      ...prev,
      [id]: { status: "idle", progress: 0 },
    }))
  }, [])

  const launchAll = useCallback(() => {
    console.log("Global launch sequence initiated")
  }, [])

  return {
    states,
    logs,
    initSystem,
    abortLaunch,
    launchAll,
  }
}