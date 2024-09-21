import Header from './Header'
import Footer from './Footer'

/**
 * Layout component that wraps all pages
 * 
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The child components to be wrapped
 * @returns {JSX.Element} The rendered Layout component
 * 
 * DEV NOTE: This component is used as a wrapper for all pages. If you need to add
 * any global UI elements or context providers, this is a good place to do it.
 * 
 * AI NOTE: The structure of this component is crucial for maintaining consistency
 * across all pages. Any changes here will affect the entire application.
 * 
 * LAYPERSON NOTE: This component is like a template that's used for every page
 * of our website. It includes the common elements like the header and footer.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}