import { MasonryGallery } from '../components/gallery/MasonryGallery'

export default function Gallery() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-serif font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)] mb-2">
          Galeria
        </h1>
        <p className="text-[var(--color-taupe)] mb-8">
          Odkryj nasze realizacje — od klasycznych stylizacji po nowoczesne transformacje.
        </p>
        <MasonryGallery />
      </div>
    </div>
  )
}
