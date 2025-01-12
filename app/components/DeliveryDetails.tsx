import React, { useState } from 'react'
import { addDays, format } from 'date-fns';
import { MapPin } from 'lucide-react'

interface DeliveryDetailsProps {
  recipientName: string | undefined
  setRecipientName: (name: string) => void
  recipientPhone: string | undefined
  setRecipientPhone: (phone: string) => void
  deliveryDate: string | undefined
  setDeliveryDate: (date: string) => void
  deliveryTime: string | undefined
  setDeliveryTime: (time: string) => void
  deliveryMethod: string
  setDeliveryMethod: (method: string) => void
  deliveryArea: string
  setDeliveryArea: (area: string) => void
  deliveryAddress: string | undefined
  setDeliveryAddress: (address: string) => void
  pickupLocation: string
}

const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({
  recipientName,
  setRecipientName,
  recipientPhone,
  setRecipientPhone,
  deliveryDate,
  setDeliveryDate,
  deliveryTime,
  setDeliveryTime,
  deliveryMethod,
  setDeliveryMethod,
  deliveryArea,
  setDeliveryArea,
  deliveryAddress,
  setDeliveryAddress,
  pickupLocation,
}) => {

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 10; i <= 22; i++) {
      for (let j = 0; j < 2; j++) {
        const hour = i.toString().padStart(2, '0');
        const minute = (j * 30).toString().padStart(2, '0');
        options.push(`${hour}:${minute}`);
      }
    }
    return options;
  };


  return (
    <div className="mb-4">
      <h2 className="text-lg font-medium mb-2">配送详情</h2>
      <div className="mb-2">
        <label className="block text-sm mb-1">收件人姓名: *</label>
        <input
          type="text"
          value={recipientName || ''}
          onChange={(e) => setRecipientName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          required
          autoComplete="name"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm mb-1">联系电话: *</label>
        <input
          type="tel"
          value={recipientPhone || ''}
          onChange={(e) => setRecipientPhone(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          required
          autoComplete="tel"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm mb-1">配送日期: *</label>
        <input
          type="date"
          value={deliveryDate || ''}
          onChange={(e) => setDeliveryDate(e.target.value)}
          min={format(addDays(new Date(), 3), 'yyyy-MM-dd')}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          required
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        注意：最早配送日期为下单日期的3天后
      </p>
      <div className="mb-2">
        <label className="block text-sm mb-1">配送时间:</label>
        <select
          value={deliveryTime || ''}
          onChange={(e) => setDeliveryTime(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 appearance-none bg-white"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.5rem center',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem'
          }}
        >
          <option value="">选择时间</option>
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="block text-sm mb-1">配送方式:</label>
        <select
          value={deliveryMethod}
          onChange={(e) => setDeliveryMethod(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 appearance-none bg-white"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.5rem center',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem'
          }}
        >
          <option value="配送 (Delivery)">配送 (Delivery)</option>
          <option value="自取 (Self pickup)">自取 (Self pickup)</option>
        </select>
      </div>
      {deliveryMethod === '自取 (Self pickup)' ? (
        <div className="mb-2">
          <label className="block text-sm mb-1">取货地点:</label>
          <textarea
            value={pickupLocation}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
            rows={3}
          />
        </div>
      ) : (
        <>
          <div className="mb-2">
            <label className="block text-sm mb-1">配送区域:</label>
            <select
              value={deliveryArea}
              onChange={(e) => setDeliveryArea(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 appearance-none bg-white"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.5rem center',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              }}
            >
              <option value="士拉央 & 甲洞 (Selayang & Kepong)">士拉央 & 甲洞 (Selayang & Kepong)</option>
              <option value="其他 (Others)">其他 (Others)</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-sm mb-1">配送地址:</label>
            <input
              type="text"
              value={deliveryAddress || ''}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="请输入配送地址"
            />
          </div>
        </>
      )}
      <p className="text-sm text-gray-600">备注: 士拉央 & 甲洞免费配送，地区以外会根据Lalamove收取载送费用哦~</p>
    </div>
  )
}

export default DeliveryDetails

