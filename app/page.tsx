import Link from 'next/link'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            HAIEC Compliance
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI Ethics and Compliance Solutions for Modern Organizations
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/about" 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Learn More
            </Link>
          </div>
        </header>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              AI Compliance Framework
            </h3>
            <p className="text-gray-600">
              Comprehensive compliance solutions for AI governance, regulatory adherence, 
              and ethical AI implementation across your organization.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Risk Assessment Tools
            </h3>
            <p className="text-gray-600">
              Advanced tools for identifying, evaluating, and mitigating AI-related risks 
              while ensuring compliance with industry standards.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Audit & Monitoring
            </h3>
            <p className="text-gray-600">
              Continuous monitoring and audit capabilities to maintain compliance 
              and track AI system performance against ethical guidelines.
            </p>
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Welcome to HAIEC Compliance
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            HAIEC Compliance provides comprehensive AI ethics and compliance solutions for modern 
            organizations. Our platform helps businesses navigate the complex landscape of AI 
            governance, ensuring ethical implementation and regulatory compliance.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From risk assessment to continuous monitoring, we provide the tools and frameworks 
            necessary to build trustworthy AI systems that align with your organizational values 
            and regulatory requirements.
          </p>
        </section>
      </div>
    </main>
  )
}