import {
  OrderPostType,
  UpdatedTimeslots,
  UpdatedVoucher,
  VouchersPostType,
} from 'types/types'
import axios from './axios-instance'

export const fetchLessons = async () => {
  const response = await axios.get('api/lessons/lessonsConfiguration')
  return response.data
}

export const validateDiscountCode = async (discountCode: string) => {
  const response = await axios.post(
    `api/discount/apply-discount/${discountCode}`,
  )
  return response.data
}

export const createOrder = async (order: OrderPostType) => {
  const response = await axios.post('api/orders', order)
  return response.data
}

export const fetchOrder = async (orderId: string) => {
  const response = await axios.get(`api/orders/${orderId}`)
  return response.data
}

export const fetchExtras = async () => {
  const response = await axios.get('api/extras')
  return response.data
}

export const fetchMerch = async () => {
  const response = await axios.get('api/merch')
  return response.data
}

export const fetchKnowFrom = async () => {
  const response = await axios.get('api/knowfrom')
  return response.data
}

export const createCheckoutSession = async (orderId: number) => {
  const response = await axios.post('api/create-checkout-session', {
    orderId,
  })
  return await response.data
}

export const retrieveCheckoutSession = async (sessionId: string | null) => {
  if (!sessionId) return

  const params = {
    session_id: sessionId,
  }

  const response = await axios.get('api/session-status', { params })

  return await response.data
}

export const generateAndSendVouchers = async (
  vouchers: { code: string; base64: string | ArrayBuffer | null }[],
) => {
  const response = await axios.post('api/voucher-generation-pdf', {
    vouchers,
  })

  return await response.data
}

export const postSuccessfulPayment = async (orderId: number) => {
  const response = await axios.post('api/payments/card-payment-successfull', {
    order_id: orderId,
    status: 'OK',
  })

  return await response.data
}

export const validateVoucher = async (voucherCode: string) => {
  const response = await axios.post('api/vouchers-validation', {
    voucher_code: voucherCode,
    action: 'validity_check',
  })

  return await response.data
}

export const getAvailableTimeslots = async (vouchers: string[]) => {
  const response = await axios.post('api/timeslots', {
    vouchers,
  })

  return response.data
}

export const fetchBranches = async () => {
  const response = await axios.get('api/branch')
  return response.data
}

export const createReservation = async (vouchersInfo: VouchersPostType) => {
  const response = await axios.post('api/reservations', {
    ...vouchersInfo,
  })

  return await response.data
}

export const fetchDiscounts = async () => {
  const response = await axios.get('api/discount')
  return response.data.data
}

export const fetchTimeslots = async () => {
  const response = await axios.get('api/timeslots')
  return response.data.data
}

export const fetchVouchers = async () => {
  const response = await axios.get('api/vouchers')
  return response.data.data
}

export const fetchReservations = async () => {
  const response = await axios.get('api/reservations')
  return response.data.data
}

export const fetchMerchants = async () => {
  const response = await axios.get('api/merchants')
  return response.data.data
}

export const fetchLectors = async () => {
  const response = await axios.get('api/lectors')
  return response.data.data
}

export const deleteDiscount = async (discountId: number) => {
  await axios.delete(`api/discount/${discountId}`)
}

export const deleteBranch = async (branchId: number) => {
  await axios.delete(`api/branch/${branchId}`)
}

export const deleteDayTimeslots = async (queryParams: {
  date: string
  branch_id: number
}) => {
  await axios.delete(`api/timeslotgenerator`, {
    params: queryParams,
  })
}

export const updateTimeslots = async (updatedTimeslot: UpdatedTimeslots) => {
  const response = await axios.put('api/timeslots', updatedTimeslot)

  return await response.data
}

export const updateVoucher = async (voucherData: UpdatedVoucher) => {
  const { voucherId, ...rest } = voucherData
  const response = await axios.put(`api/vouchers/${voucherId}`, {
    ...rest,
  })

  return await response.data
}
