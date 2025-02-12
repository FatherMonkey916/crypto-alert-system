
import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>About | Crypto Alert System</title>
        <meta
          name="description"
          content="Learn about our powerful crypto notification system that tracks token prices and sends instant alerts."
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          {/* Header Section */}
          <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Crypto Alert System
          </h1>
          <p className="text-center mt-4 text-lg text-gray-300">
            Track crypto token prices across Ethereum, Layer 2s, and Solana with instant email notifications.
          </p>

          {/* Features Section */}
          <div className="mt-16 grid md:grid-cols-2 gap-10">
            {/* Feature 1 */}
            <div className="p-6 border border-gray-700 rounded-lg backdrop-blur-md bg-gray-900/50">
              <h2 className="text-xl font-semibold text-blue-400">🚀 Multi-Chain Support</h2>
              <p className="text-gray-400 mt-2">
                Monitor token prices across Ethereum, Arbitrum, Optimism, Polygon, and Solana.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border border-gray-700 rounded-lg backdrop-blur-md bg-gray-900/50">
              <h2 className="text-xl font-semibold text-purple-400">📊 Real-Time Price Tracking</h2>
              <p className="text-gray-400 mt-2">
                Get data from CoinGecko, CoinMarketCap, DexScreener, and on-chain lookups.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border border-gray-700 rounded-lg backdrop-blur-md bg-gray-900/50">
              <h2 className="text-xl font-semibold text-green-400">📩 Instant Email Alerts</h2>
              <p className="text-gray-400 mt-2">
                Receive notifications via AWS SES, SendGrid, or Mailgun when price thresholds are hit.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 border border-gray-700 rounded-lg backdrop-blur-md bg-gray-900/50">
              <h2 className="text-xl font-semibold text-yellow-400">🛠️ Scalable & User-Friendly</h2>
              <p className="text-gray-400 mt-2">
                Manage tokens and alert settings through a clean, intuitive web interface.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-gray-200">
              Ready to Stay Ahead in Crypto?
            </h3>
            <p className="text-gray-400 mt-2">Start tracking prices and never miss an opportunity!</p>
            <div className="p-8">
              <Link href={'/dashboard'} className="mt-6 px-7 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow-lg transition-all">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
