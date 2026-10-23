import { Link } from 'react-router-dom'
import { Compass, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/button'
export default function NotFoundPage() {
  return <div className="not-found"><Compass size={54} /><div className="eyebrow">404 · LITT UTENFOR LÆRINGSSTIEN</div><h1>Denne siden fant vi ikke.</h1><p>Lenken kan være feil, men neste leksjon er ikke langt unna.</p><Button asChild><Link to="/"><ArrowLeft size={17} /> Tilbake til forsiden</Link></Button></div>
}
