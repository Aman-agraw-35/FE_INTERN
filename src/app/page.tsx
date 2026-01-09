import { Dashboard } from "@/components/Dashboard"
import { Launch } from "@/lib/types"

async function getLaunches(): Promise<Launch[]> {
  try {
    const res = await fetch("https://api.spacexdata.com/v4/launches/upcoming", {
      next: { revalidate: 600 }
    })
    
    if (!res.ok) throw new Error("API Error")
      
    const data = await res.json()
    
    return data.slice(0, 8).map((item: any) => ({
      id: item.id,
      name: item.name,
      date_utc: item.date_utc,
      flight_number: item.flight_number,
      details: item.details,
      rocket: "Falcon 9"
    }))
  } catch (error) {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: `mock-${i}`,
      name: `Starship Flight Test ${i + 5}`,
      date_utc: new Date(Date.now() + (i + 1) * 86400000 * 5).toISOString(),
      flight_number: 200 + i,
      details: "Suborbital flight test of the Starship prototype.",
      rocket: i % 2 === 0 ? "Starship" : "Falcon Heavy"
    }))
  }
}

export default async function Page() {
  const launches = await getLaunches()
  return <Dashboard launches={launches} />
}
