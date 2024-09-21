import Link from 'next/link'

/**
 * Header component for the application
 * 
 * @returns {JSX.Element} The rendered Header component
 * 
 * DEV NOTE: Consider adding state for active page highlighting.
 * 
 * AI NOTE: Analyze this component for accessibility and SEO optimization.
 * 
 * LAYPERSON NOTE: This is the top part of the website with the main menu.
 */
export default function Header() {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav>
        <ul className="flex space-x-4">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  )
}