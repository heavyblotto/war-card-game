/**
 * Footer component for the application
 * 
 * @returns {JSX.Element} The rendered Footer component
 * 
 * DEV NOTE: Consider adding dynamic content like a newsletter signup or social media links.
 * 
 * AI NOTE: This component is crucial for SEO. Ensure important links are included.
 * 
 * LAYPERSON NOTE: This is the bottom part of every page, usually containing copyright info and additional links.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-gray-200 p-4 mt-8">
      <p>&copy; {currentYear} PspPspPastimes LLC. All rights reserved.</p>
    </footer>
  )
}