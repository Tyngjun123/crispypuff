'use client'

import { useState } from 'react'
import Image from 'next/image'
import FlavorSelection from './components/FlavorSelection'
import DeliveryDetails from './components/DeliveryDetails'

export default function OrderForm() {
  const [quantity, setQuantity] = useState(1)
  const [flavors, setFlavors] = useState({ '伯爵茶 (Earl Grey)': 0, '香草 (Vanilla)': 0, '奥利奥 (Oreo)': 0 })
  const [recipientName, setRecipientName] = useState('')
  const [recipientPhone, setRecipientPhone] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState('自取 (Self pickup)')
  const [deliveryArea, setDeliveryArea] = useState('士拉央 & 甲洞 (Selayang & Kepong)')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [pickupLocation] = useState("Idaman Hills\n68100 Batu Caves\nSelangor")

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity)
    setFlavors({ '伯爵茶 (Earl Grey)': 0, '香草 (Vanilla)': 0, '奥利奥 (Oreo)': 0 })
  }

  const handleFlavorChange = (newFlavors: { [key: string]: number }) => {
    setFlavors(newFlavors)
  }

  const totalPrice = quantity * 42

  const generateOrderSummary = () => {
    let summary = `订单摘要:\n\n`
    summary += `🎁 商品: 脆皮泡芙\n`
    summary += `📦 数量: ${quantity} 套\n`
    summary += `💰 价格: RM ${totalPrice}\n`
    summary += `🍴 口味:\n`
    Object.entries(flavors).forEach(([flavor, count]) => {
      if (count > 0) {
        summary += `${flavor} x ${count}\n`
      }
    })
    summary += `👤 收件人: ${recipientName}\n`
    summary += `📞 联系电话: ${recipientPhone}\n`
    summary += `📅 配送时间: ${deliveryDate} ${deliveryTime}\n`
    summary += `📍 配送方式: ${deliveryMethod}\n`
    if (deliveryMethod === '自取 (Self pickup)') {
      summary += `📍 取货地点:\n${pickupLocation}\n`
    } else {
      summary += `📍 区域: ${deliveryArea}\n`
      if (deliveryAddress) {
        summary += `🏠 配送地址:\n${deliveryAddress}\n`
      }
      summary += `🚚 备注: 士拉央 & 甲洞免费配送，地区以外会根据Lalamove收取载送费用哦~`
    }
    return summary
  }

  const handleSendToWhatsApp = () => {
    if (!recipientName || !recipientPhone || !deliveryDate) {
      alert('请填写所有必填字段（收件人姓名、联系电话和配送日期）')
      return
    }
    const orderSummary = generateOrderSummary()
    const encodedSummary = encodeURIComponent(orderSummary)
    const imageUrl = encodeURIComponent('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2024-12-30_at_15.52.26_0c1ee80c-removebg-preview%20(1)-Pi1KCjia3nWVyHJAWcjU8GwXYr36WM.png')
    const message = `${encodedSummary}%0A%0A${imageUrl}`
    window.open(`https://wa.me/60182974223?text=${message}`, '_blank')
  }

  const handleCopyOrderSummary = () => {
    const orderSummary = generateOrderSummary()
    navigator.clipboard.writeText(orderSummary)
    alert('订单摘要已复制到剪贴板！')
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="flex items-center mb-6">
        <div className="w-1/2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2024-12-30_at_15.52.26_0c1ee80c-removebg-preview%20(1)-Pi1KCjia3nWVyHJAWcjU8GwXYr36WM.png"
            alt="One Bite Logo"
            width={150}
            height={150}
            className="mx-auto"
            priority
          />
        </div>
        <div className="w-1/2">
          <p className="font-medium text-lg">脆皮泡芙</p>
          <p className="text-gray-600">6个泡芙 | 每套RM42</p>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">数量（套）:</label>
        <div className="flex items-center">
          <button 
            onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            -
          </button>
          <span className="mx-3 w-8 text-center">{quantity}</span>
          <button 
            onClick={() => handleQuantityChange(Math.min(10, quantity + 1))}
            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">总价: RM {totalPrice}</p>
      </div>
      <FlavorSelection 
        flavors={flavors} 
        onFlavorChange={handleFlavorChange}
        quantity={quantity}
      />
      <DeliveryDetails
        recipientName={recipientName}
        setRecipientName={setRecipientName}
        recipientPhone={recipientPhone}
        setRecipientPhone={setRecipientPhone}
        deliveryDate={deliveryDate}
        setDeliveryDate={setDeliveryDate}
        deliveryTime={deliveryTime}
        setDeliveryTime={setDeliveryTime}
        deliveryMethod={deliveryMethod}
        setDeliveryMethod={setDeliveryMethod}
        deliveryArea={deliveryArea}
        setDeliveryArea={setDeliveryArea}
        deliveryAddress={deliveryAddress}
        setDeliveryAddress={setDeliveryAddress}
        pickupLocation={pickupLocation}
      />
      <div className="flex mt-4">
        <button
          onClick={handleSendToWhatsApp}
          className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors mr-2"
        >
          发送订单至WhatsApp
        </button>
        <button
          onClick={handleCopyOrderSummary}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

