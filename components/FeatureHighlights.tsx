/**
 * FeatureHighlights component to showcase key features
 * 
 * @returns {JSX.Element} The rendered FeatureHighlights component
 * 
 * DEV NOTE: Consider making this component dynamic, allowing easy addition of new features.
 * 
 * AI NOTE: Analyze user interaction with these features to prioritize future development.
 * 
 * LAYPERSON NOTE: This section shows off the main things our app can do for users.
 */
export default function FeatureHighlights() {
  const features = [
    { title: "Easy to Use", description: "Intuitive interface for all skill levels" },
    { title: "Powerful Analytics", description: "Gain insights with our advanced analytics" },
    { title: "Secure", description: "Your data is safe with our top-notch security" },
  ]

  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}