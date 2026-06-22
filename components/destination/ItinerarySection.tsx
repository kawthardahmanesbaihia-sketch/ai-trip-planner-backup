"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Sunrise, Coffee, Moon } from "lucide-react"

interface TravelDay {
  day: number
  theme: string
  morning: string
  afternoon: string
  evening: string
  icon: string
}

interface ItinerarySectionProps {
  generatorContent?: ReactNode
  travelDays?: TravelDay[]
}

const TIME_SLOTS: { color: string; icon: React.ElementType }[] = [
  { color: "bg-amber-500",  icon: Sunrise        },
  { color: "bg-blue-500",   icon: Coffee         },
  { color: "bg-purple-500", icon: Moon           },
]

export function ItinerarySection({ generatorContent, travelDays }: ItinerarySectionProps) {
  const days = travelDays ?? null

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Your Itinerary</h2>
        <p className="text-sm text-muted-foreground">Day-by-day travel plan</p>
      </div>

      {generatorContent && (
        <div className="mb-8 rounded-2xl overflow-hidden border border-border">
          {generatorContent}
        </div>
      )}

      {days ? (
        /* Squad-aware itinerary from travel-data */
        <div className="space-y-8">
          {days.map((day, di) => {
            const slots = [
              { label: "Morning",   text: day.morning   },
              { label: "Afternoon", text: day.afternoon },
              { label: "Evening",   text: day.evening   },
            ]
            return (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: di * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex flex-col items-center justify-center shadow-sm shrink-0">
                    <span className="text-white text-xs font-medium leading-none">Day</span>
                    <span className="text-white text-lg font-bold leading-none">{day.day}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{day.icon} {day.theme}</h3>
                    <p className="text-xs text-muted-foreground">3 activities planned</p>
                  </div>
                </div>

                <div className="ml-6 space-y-0">
                  {slots.map((slot, si) => {
                    const isLast = si === slots.length - 1
                    const SlotIcon = TIME_SLOTS[si]?.icon ?? Sunrise
                    return (
                      <div key={si} className="relative flex gap-4">
                        {!isLast && (
                          <div className="absolute left-4 top-8 w-0.5 h-full bg-border" />
                        )}
                        <div className={`relative z-10 w-8 h-8 rounded-xl ${TIME_SLOTS[si]?.color ?? "bg-amber-500"} flex items-center justify-center shrink-0 shadow-sm`}>
                          <SlotIcon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div className="flex-1 pb-5">
                          <div className="bg-card rounded-xl p-4 border border-border hover:shadow-sm transition-all duration-200">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <h4 className="font-semibold text-card-foreground text-sm">{slot.label}</h4>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{slot.text}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-muted/30 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            {generatorContent
              ? "Use the generator above to build a personalised itinerary."
              : "Your day-by-day itinerary will appear here once generated."}
          </p>
        </div>
      )}
    </div>
  )
}
