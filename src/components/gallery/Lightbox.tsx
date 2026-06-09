import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryItem } from '../../data/gallery.data'

interface Props {
  items: GalleryItem[]
  current: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({ items, current, onClose, onPrev, onNext }: Props) {
  const item = current !== null ? items[current] : null

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [item])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!item) return
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [item, onPrev, onNext, onClose])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Zamknij"
          >
            <X size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Poprzednie zdjęcie"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            className="absolute right-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Następne zdjęcie"
          >
            <ChevronRight size={24} />
          </button>
          <motion.div
            key={current}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_e, info) => {
              if (info.offset.x < -50) onNext()
              if (info.offset.x > 50) onPrev()
            }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[90vh] p-4 cursor-grab active:cursor-grabbing"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
            <p className="text-center text-white/70 text-sm mt-3">{item.alt}</p>
            <p className="text-center text-white/40 text-xs mt-1">{(current ?? 0) + 1} / {items.length} — przesunięcie palcem lub strzałki</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
