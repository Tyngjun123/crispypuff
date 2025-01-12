import React, { useState, useEffect } from 'react'

interface LalamoveCostEstimationProps {
  deliveryAddress: string
  deliveryArea: string
}

const LalamoveCostEstimation: React.FC<LalamoveCostEstimationProps> = ({ deliveryAddress, deliveryArea }) => {
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null)

  useEffect(() => {
    // This is a placeholder function. In a real scenario, you would call the Lalamove API here.
    const calculateCost = () => {
      if (deliveryArea === '士拉央 & 甲洞 (Selayang & Kepong)') {
        return 0 // Free delivery for Selayang & Kepong
      } else {
        // Simple distance-based calculation (placeholder)
        const basePrice = 5
        const pricePerKm = 1
        const estimatedDistance = Math.floor(Math.random() * 20) + 1 // Random distance between 1-20 km
        return basePrice + (pricePerKm * estimatedDistance)
      }
    }

    if (deliveryAddress) {
      const cost = calculateCost()
      setEstimatedCost(cost)
    } else {
      setEstimatedCost(null)
    }
  }, [deliveryAddress, deliveryArea])

  if (estimatedCost === null) {
    return null
  }

  return (
    <div className="mt-2 p-2 bg-yellow-100 rounded-lg">
      <p className="text-sm font-medium">预估Lalamove配送费用: RM {estimatedCost.toFixed(2)}</p>
      <p className="text-xs text-gray-600">注意：实际费用可能会有所不同</p>
    </div>
  )
}

export default LalamoveCostEstimation

