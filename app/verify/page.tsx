"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function VerifyPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const router = useRouter()

  const handleScan = () => {
    setIsScanning(true)
    // Simulate QR scanning process
    setTimeout(() => {
      setIsScanning(false)
      setIsVerified(true)
    }, 3000)
  }

  const handleContinue = () => {
    router.push("/create-profile")
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fff6c9" }}>
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-bold" style={{ color: "#1c7f8f" }}>
              Hyumane
            </Link>
            <h1 className="text-2xl font-bold mt-4 mb-2">Verify Your Identity</h1>
            <p className="text-gray-600">Scan your passport QR code to verify you're a real human</p>
          </div>

          {!isVerified ? (
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                {isScanning ? (
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Scanning...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-4xl mb-2">📱</div>
                    <p className="text-sm text-gray-600">QR Scanner</p>
                  </div>
                )}
              </div>

              <button
                onClick={handleScan}
                disabled={isScanning}
                className="w-full py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
                style={{ backgroundColor: "#1c7f8f", color: "white" }}
              >
                {isScanning ? "Scanning..." : "Start Passport Scan"}
              </button>

              <p className="text-xs text-gray-500 mt-4">
                Your passport data is encrypted and only used for verification
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#1c7f8f" }}
              >
                <span className="text-2xl text-white">✓</span>
              </div>
              <h2 className="text-xl font-bold mb-2">Verification Complete!</h2>
              <p className="text-gray-600 mb-6">Welcome to Hyumane. You're now verified as a real human.</p>
              <button
                onClick={handleContinue}
                className="w-full py-3 px-4 rounded-lg font-medium transition-colors"
                style={{ backgroundColor: "#1c7f8f", color: "white" }}
              >
                Continue to Profile Setup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
