"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Calendar, Tv } from "lucide-react"

export function CountdownTimer() {
  // Target date: 27 days and 21 hours from April 28th, 2025 19:36
  const targetDate = new Date("2025-05-26T16:36:00.000Z") // May 26th, 2025, 16:36 UTC
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining())

  function calculateTimeRemaining() {
    const now = new Date()
    const difference = targetDate.getTime() - now.getTime()

    // If the target date has passed, return zeros
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
      }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      total: difference,
    }
  }

  useEffect(() => {
    // Update the countdown every second
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining()
      setTimeRemaining(remaining)

      // Clear interval when countdown reaches zero
      if (remaining.total <= 0) {
        clearInterval(timer)
      }
    }, 1000)

    // Clean up the interval on component unmount
    return () => clearInterval(timer)
  }, [])

  // Format the date for display
  const formattedDate = targetDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Format the time for display
  const formattedTime = targetDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  })

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Tv className="h-5 w-5" />
            New Episode Countdown
          </CardTitle>
        </div>
        <CardDescription className="text-primary-foreground/80">Season 7 finale is almost here!</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-3xl font-bold">
                {timeRemaining.days}
              </div>
              <span className="mt-1 text-xs font-medium text-muted-foreground">DAYS</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-3xl font-bold">
                {timeRemaining.hours}
              </div>
              <span className="mt-1 text-xs font-medium text-muted-foreground">HOURS</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-3xl font-bold">
                {timeRemaining.minutes}
              </div>
              <span className="mt-1 text-xs font-medium text-muted-foreground">MINUTES</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-3xl font-bold">
                {timeRemaining.seconds}
              </div>
              <span className="mt-1 text-xs font-medium text-muted-foreground">SECONDS</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-center">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-center">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{formattedTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
