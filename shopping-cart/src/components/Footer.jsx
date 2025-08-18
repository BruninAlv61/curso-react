import './Footer.css'
import { useFilters } from '../hooks/useFilters.js'
import { useCart } from '../hooks/useCart.js'

export function Footer() {
  const { cart } = useCart()
  const { filters } = useFilters()

  return (
    <footer className="footer">
      {
        // JSON.stringify(filters, null, 2)
      }
      {JSON.stringify(cart, null, 2)}
    </footer>
  )
}
