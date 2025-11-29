import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-3xl">⚡</span>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Anodite AI
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Pricing
              </a>
              <a 
                href="https://github.com/thehackersplaybook/anodite-ai" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Open Source AI-Powered PR Reviewer
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Effortless Code Reviews,
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Powered by AI
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Anodite AI automates your pull request reviews with intelligent AI analysis. 
              Self-hosted, cost-effective, and ready in under 5 minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://github.com/thehackersplaybook/anodite-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started Free
              </a>
              <a 
                href="#how-it-works"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
              >
                See How It Works
              </a>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Open Source
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Self-Hosted
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                5 Min Setup
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Anodite AI?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Built for teams who value speed, efficiency, and cost-effectiveness
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🤖",
                title: "AI-Powered Analysis",
                description: "Leverages OpenAI GPT models to identify bugs, security issues, and best practice violations"
              },
              {
                icon: "💬",
                title: "Inline Comments",
                description: "Posts intelligent feedback directly on specific lines of code in your pull requests"
              },
              {
                icon: "🚀",
                title: "Lightning Fast",
                description: "Reviews complete in 30-60 seconds for typical PRs, keeping your workflow smooth"
              },
              {
                icon: "💰",
                title: "Cost-Effective",
                description: "Pay only for OpenAI API usage. ~$0.01-0.50 per PR vs expensive subscriptions"
              },
              {
                icon: "🔒",
                title: "Secure & Private",
                description: "Self-hosted on your infrastructure with webhook signature verification"
              },
              {
                icon: "🎯",
                title: "Fully Customizable",
                description: "Adjust AI models, prompts, and review behavior to fit your team's needs"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-950/30 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Simple integration, powerful results
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Create PR",
                description: "Developer creates a pull request in your GitHub repository"
              },
              {
                step: "2",
                title: "Webhook Triggered",
                description: "GitHub sends webhook event to Anodite AI on Vercel"
              },
              {
                step: "3",
                title: "AI Analysis",
                description: "OpenAI analyzes the code changes and generates insights"
              },
              {
                step: "4",
                title: "Review Posted",
                description: "Intelligent comments appear on your PR within seconds"
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Pay only for what you use
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                OpenAI API Usage
              </h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Small PR (&lt;100 lines)</span>
                  <span className="font-semibold">$0.01-0.05</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium PR (100-500 lines)</span>
                  <span className="font-semibold">$0.05-0.15</span>
                </div>
                <div className="flex justify-between">
                  <span>Large PR (500+ lines)</span>
                  <span className="font-semibold">$0.15-0.50</span>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">
                Hosting (Vercel)
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Free Tier</span>
                  <span className="font-semibold">$0/month</span>
                </div>
                <div className="flex justify-between">
                  <span>Pro Tier (if needed)</span>
                  <span className="font-semibold">$20/month</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm opacity-90">
                  Example: 100 PRs/month = ~$5-15 total cost
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Code Reviews?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Get started with Anodite AI in under 5 minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://github.com/thehackersplaybook/anodite-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
              >
                View on GitHub
              </a>
              <a 
                href="https://github.com/thehackersplaybook/anodite-ai/blob/main/DEVELOPER_SETUP.md"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-indigo-700 text-white rounded-lg font-semibold hover:bg-indigo-800 transition-all border-2 border-white/20"
              >
                Read Documentation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Anodite AI
              </span>
            </div>
            <div className="flex gap-6 text-gray-600 dark:text-gray-400">
              <a href="https://github.com/thehackersplaybook/anodite-ai" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                GitHub
              </a>
              <a href="https://github.com/thehackersplaybook/anodite-ai/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                License
              </a>
              <a href="https://www.linkedin.com/company/the-hackers-playbook/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Built with ❤️ by <a href="https://www.linkedin.com/company/the-hackers-playbook/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">The Hackers Playbook</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
