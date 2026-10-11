'use client'

import React, { useState } from 'react'
import { Search, Ship, MapPin, Calendar, User, PackageCheck, AlertCircle, ArrowRight } from 'lucide-react'
import { trackShipment } from '@/lib/odoo'

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleTrack = async (e) => {
    e.preventDefault()
    if (!trackingNumber.trim()) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const data = await trackShipment(trackingNumber)
      if (data && data.success) {
        setResult(data)
      } else {
        setError(data?.message || 'No tracking information found for this reference.')
      }
    } catch (err) {
      setError('Unable to fetch tracking data. Please verify your reference and try again.')
    } finally {
      setLoading(false)
    }
  }

  const exampleNumber = 'OCEAN/2026/09/00001'

  return (
    <div className="mx-6 min-h-[70vh] py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-green-600 bg-green-100 px-3 py-1 rounded-full mb-3">
            Odoo Live Tracking
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-800">
            Track Your Shipment
          </h1>
          <p className="text-slate-500 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Enter your shipment tracking or freight reference number to view real-time transit and delivery status.
          </p>

          <form onSubmit={handleTrack} className="mt-8 max-w-xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="e.g. OCEAN/2026/09/00001"
                className="w-full bg-slate-100 text-slate-800 px-5 py-3.5 rounded-full outline-none focus:ring-2 focus:ring-green-500 text-sm transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-slate-900 hover:bg-slate-800 text-white px-7 py-3.5 rounded-full text-sm font-medium transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Searching...</span>
              ) : (
                <>
                  <span>Track</span>
                  <Search size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-3 text-xs text-slate-400">
            Try example:{' '}
            <button
              type="button"
              onClick={() => setTrackingNumber(exampleNumber)}
              className="text-green-600 hover:underline cursor-pointer"
            >
              {exampleNumber}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl flex items-center gap-3 text-sm max-w-xl mx-auto">
            <AlertCircle size={20} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm transition-all">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
              <div>
                <span className="text-xs uppercase font-semibold text-slate-400">
                  Tracking Number
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                  {result.tracking_number}
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full font-semibold text-sm">
                <PackageCheck size={18} />
                <span>{result.stage || 'In Transit'}</span>
              </div>
            </div>

            {/* Ports / Route */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Port of Loading</p>
                  <p className="font-semibold text-slate-800">
                    {result.loading_port || 'Origin Port'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-400 font-medium text-xs">
                <span className="hidden sm:inline border-t border-dashed border-slate-300 w-16" />
                <Ship size={20} className="text-green-600" />
                <span>{result.transport_via || 'Ocean'}</span>
                <ArrowRight size={16} />
                <span className="hidden sm:inline border-t border-dashed border-slate-300 w-16" />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Port of Discharge</p>
                  <p className="font-semibold text-slate-800">
                    {result.discharge_port || 'Destination Port'}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipper & Consignee Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-slate-100 rounded-2xl p-5 bg-white">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-2">
                  <User size={14} />
                  <span>SHIPPER</span>
                </div>
                <p className="text-sm font-medium text-slate-700">
                  {result.shipper || 'N/A'}
                </p>
              </div>

              <div className="border border-slate-100 rounded-2xl p-5 bg-white">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-2">
                  <User size={14} />
                  <span>CONSIGNEE</span>
                </div>
                <p className="text-sm font-medium text-slate-700">
                  {result.consignee || 'N/A'}
                </p>
              </div>
            </div>

            {result.create_date && (
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                <Calendar size={14} />
                <span>Booked on {new Date(result.create_date).toLocaleString()}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
