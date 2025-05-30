import { Link } from 'react-router-dom';
import { BriefcaseIcon, CalculatorIcon, TrendingUpIcon } from '@heroicons/react/outline';

function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden flex flex-col">
      
      {/* SVG Background */}
      <svg
        className="absolute top-0 left-0 w-full h-full -z-10 opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#34D399"
          fillOpacity="0.2"
          d="M0,96L40,117.3C80,139,160,181,240,192C320,203,400,181,480,165.3C560,149,640,139,720,154.7C800,171,880,213,960,218.7C1040,224,1120,192,1200,181.3C1280,171,1360,181,1400,186.7L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        />
      </svg>

      {/* Header */}
      <header className="flex justify-between items-center p-4 md:p-6 bg-white shadow-md sticky top-0 z-20">
        <Link to="/" className="text-2xl md:text-3xl font-extrabold text-green-600 tracking-tight select-none">
          HustleStack
        </Link>
        <nav className="space-x-4">
          <Link to="/login" className="text-green-700 font-semibold hover:text-green-900 transition">Login</Link>
          <Link to="/signup" className="bg-gradient-to-r from-green-500 to-green-700 text-white px-5 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-green-800 font-semibold">Get Started</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto flex-grow px-4 py-4 md:py-8 gap-4 md:gap-10">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900 mb-4">
            Financial Clarity for the Gig Economy
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            HustleStack empowers freelancers, drivers, and creators with tools to track income, budget expenses, estimate taxes, and build lasting wealth — all from one dashboard.
          </p>
          <div className="space-x-4">
            <Link to="/signup" className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition">Join Free</Link>
            <Link to="/login" className="border border-green-600 text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition">Login</Link>
          </div>
        </div>

        {/* Features */}
        <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
          <div className="flex flex-col items-center">
            <BriefcaseIcon className="h-10 w-10 text-green-600 mb-2" />
            <h3 className="font-semibold text-green-700">Track Gigs</h3>
            <p className="text-sm text-gray-600">Log income from every platform — Uber, Upwork, DoorDash & more.</p>
          </div>
          <div className="flex flex-col items-center">
            <CalculatorIcon className="h-10 w-10 text-green-600 mb-2" />
            <h3 className="font-semibold text-green-700">Estimate Taxes</h3>
            <p className="text-sm text-gray-600">Never miss a payment — we estimate your quarterly taxes in real time.</p>
          </div>
          <div className="flex flex-col items-center">
            <TrendingUpIcon className="h-10 w-10 text-green-600 mb-2" />
            <h3 className="font-semibold text-green-700">Plan Goals</h3>
            <p className="text-sm text-gray-600">Set savings goals for rent, gear, or business upgrades.</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://img.icons8.com/ios-filled/50/34d399/money--v1.png"
              className="h-10 w-10 mb-2"
              alt="Cash Flow"
            />
            <h3 className="font-semibold text-green-700">Visualize Cash Flow</h3>
            <p className="text-sm text-gray-600">Understand income vs. expenses at a glance.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-700 text-white text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} HustleStack · Built for hustlers by hustlers.
      </footer>
    </div>
  );
}

export default LandingPage;
