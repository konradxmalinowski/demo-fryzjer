import { useState } from 'react'
import { trendsData } from '../../data/trends.data'

export function TrendsMarquee() {
  const [paused, setPaused] = useState(false)
  const doubled = [...trendsData, ...trendsData]

  return (
    <div
      className="overflow-hidden py-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Trendy fryzjerskie"
    >
      <div
        className="flex gap-4"
        style={{
          willChange: 'transform',
          animation: `marquee 25s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {doubled.map((trend, i) => (
          <div
            key={`${trend.id}-${i}`}
            className="flex-shrink-0 flex flex-col items-center gap-2 w-36"
          >
            <div className="w-36 h-36 rounded-2xl overflow-hidden shadow-md">
              <img
                src={trend.thumbnail}
                alt={trend.label}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="text-sm font-medium text-[var(--color-espresso)] dark:text-[var(--color-cream)] text-center">
              {trend.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
