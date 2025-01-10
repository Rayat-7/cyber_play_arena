import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="inline-block animate-spin text-white mb-4">
          <Loader2 size={48} />
        </div>
        <h2 className="text-2xl font-bold text-white">Cyber Play Arena</h2>
        <p className="text-gray-400 mt-2">Loading your gaming experience...</p>
      </div>
    </div>
  )
}

