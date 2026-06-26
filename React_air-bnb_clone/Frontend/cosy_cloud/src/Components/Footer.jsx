import React from 'react'

function Footer() {
  return (
     <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">
              WanderStay
            </h2>
            <p className="text-sm">
              Discover unique stays, experiences, and adventures around the
              world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>

              <li>
                <a href="/listings" className="hover:text-white transition">
                  Listings
                </a>
              </li>

              <li>
                <a href="/create" className="hover:text-white transition">
                  Add Listing
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Contact
            </h3>

            <p>Email: support@wanderstay.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>India</p>
          </div>
        </div>

        <hr className="border-gray-700 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm">
            © {new Date().getFullYear()} WanderStay. All rights reserved.
          </p>

          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-white">
              🌐
            </a>
            <a href="#" className="hover:text-white">
              📷
            </a>
            <a href="#" className="hover:text-white">
              🐦
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer