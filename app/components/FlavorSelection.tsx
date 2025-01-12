import React from 'react'

interface FlavorSelectionProps {
  flavors: { [key: string]: number }
  onFlavorChange: (newFlavors: { [key: string]: number }) => void
  quantity: number
}

const FlavorSelection: React.FC<FlavorSelectionProps> = ({ flavors, onFlavorChange, quantity }) => {
  const handleIncrement = (flavor: string) => {
    const totalPuffs = Object.values(flavors).reduce((sum, count) => sum + count, 0)
    if (totalPuffs < 6 * quantity) {
      onFlavorChange({ ...flavors, [flavor]: flavors[flavor] + 1 })
    }
  }

  const handleDecrement = (flavor: string) => {
    if (flavors[flavor] > 0) {
      onFlavorChange({ ...flavors, [flavor]: flavors[flavor] - 1 })
    }
  }

  const handleSplit = () => {
    const newFlavors = { ...flavors }
    const puffsPerFlavor = 2 * quantity
    Object.keys(newFlavors).forEach(key => {
      newFlavors[key] = puffsPerFlavor
    })
    onFlavorChange(newFlavors)
  }

  const totalPuffs = Object.values(flavors).reduce((sum, count) => sum + count, 0)
  const maxPuffs = 6 * quantity

  return (
    <div className="mb-3">
      <h2 className="text-lg font-medium mb-2">口味选择</h2>
      {Object.entries(flavors).map(([flavor, count]) => (
        <div key={flavor} className="flex items-center justify-between mb-2">
          <span>{flavor}</span>
          <div className="flex items-center">
            <button onClick={() => handleDecrement(flavor)} className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">-</button>
            <span className="mx-3 w-4 text-center">{count}</span>
            <button onClick={() => handleIncrement(flavor)} className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">+</button>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center mt-1">
        <p className="text-sm text-gray-600">总泡芙数: {totalPuffs} / {maxPuffs}</p>
        <button
          onClick={handleSplit}
          className="text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
        >
          平均分配
        </button>
      </div>
    </div>
  )
}

export default FlavorSelection

