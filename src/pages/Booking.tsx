import { BookingWizard } from '../components/booking/BookingWizard'

export default function Booking() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)] mb-2">
          Zarezerwuj wizytę
        </h1>
        <p className="text-[var(--color-taupe)] mb-8">
          Wybierz usługę, stylistę i termin który Ci odpowiada.
        </p>
        <BookingWizard />
      </div>
    </div>
  )
}
