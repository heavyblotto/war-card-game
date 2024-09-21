/**
 * Hero component for the home page
 * 
 * @returns {JSX.Element} The rendered Hero component
 * 
 * DEV NOTE: Consider making the hero content dynamic, possibly fetched from a CMS.
 * 
 * AI NOTE: The hero section is crucial for user engagement. Analyze its effectiveness.
 * 
 * LAYPERSON NOTE: This is the big, attention-grabbing section at the top of the home page.
 */
export default function Hero() {
  return (
    <div className="bg-blue-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Amazing App</h1>
        <p className="text-xl mb-8">Discover how we can transform your workflow</p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  )
}