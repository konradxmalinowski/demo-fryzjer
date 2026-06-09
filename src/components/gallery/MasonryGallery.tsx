import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { galleryData } from '../../data/gallery.data'
import type { GalleryCategory } from '../../data/gallery.data'
import { Lightbox } from './Lightbox'

const categories = ['Wszystkie', 'Damskie', 'Męskie', 'Koloryzacje', 'Barber'] as const
type Filter = typeof categories[number]

const aspectClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
}

function LazyImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={imgRef as React.RefObject<HTMLDivElement>} className={`relative overflow-hidden bg-[var(--color-taupe)]/20 ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[var(--color-taupe)]/10 via-[var(--color-taupe)]/20 to-[var(--color-taupe)]/10" />
      )}
      {visible && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
        />
      )}
    </div>
  )
}

export function MasonryGallery() {
  const [filter, setFilter] = useState<Filter>('Wszystkie')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = filter === 'Wszystkie'
    ? galleryData
    : galleryData.filter((g) => g.category === (filter as GalleryCategory))

  const handlePrev = useCallback(() => {
    setLightboxIndex((i) => (i === null || i === 0 ? filtered.length - 1 : i - 1))
  }, [filtered.length])

  const handleNext = useCallback(() => {
    setLightboxIndex((i) => (i === null || i === filtered.length - 1 ? 0 : i + 1))
  }, [filtered.length])

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
              filter === cat
                ? 'bg-[var(--color-espresso)] text-[var(--color-cream)] border-[var(--color-espresso)]'
                : 'border-[var(--color-taupe)]/30 text-[var(--color-taupe)] hover:border-[var(--color-gold)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="break-inside-avoid cursor-pointer rounded-xl overflow-hidden group"
              onClick={() => setLightboxIndex(index)}
            >
              <div className={`${aspectClasses[item.aspectRatio]} relative`}>
                <LazyImage src={item.src} alt={item.alt} className="w-full h-full" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-3">
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    {item.alt}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      <Lightbox
        items={filtered}
        current={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  )
}
