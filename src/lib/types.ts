export interface Launch {
    id: string
    name: string
    date_utc: string
    flight_number: number
    details?: string | null
    rocket: string
}

export interface LogEntry {
    id: string
    timestamp: string
    message: string
    type: 'info' | 'success' | 'warning' | 'error'
    launchName?: string
}
