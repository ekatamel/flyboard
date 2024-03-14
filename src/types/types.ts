export interface Lesson {
  bullet_points_description?: Record<string, string>
  description: string | null
  discount: number
  discounted_price: number
  extras: Extras[]
  id: number
  lesson_type_code: number
  lesson_type_name: string
  merch: Merch[]
  price: number
  product_code: string
  product_code_stripe: string
  showtocustomer_from: string
  showtocustomer_to: string
  top_level_description: string
  validity_voucher_from: string
  validity_voucher_to: string
  product: Product
}

export interface Product {
  id: number
  description: string
  length: number
  merchant_id: number
  product_code: string
  product_name: string
  valid_from: string
  valid_to: string
}

export interface Order {
  orderId: number
  variableSymbol: string
  qr_code: string
  hasVoucher: boolean
  lessonType: LessonType[]
  discountCodeId?: number
  discountInfo?: {
    code: string
    discount: number
    type: string
  }
  closestValidDate?: string
  customer: Customer
  merch: Merch[]
  extras: Extras[]
}

export interface OrderPostType {
  order_data: {
    order_type: 'voucher' | 'shop'
    lessonType: Omit<LessonType, 'name' | 'validTill'>[]
    discounts?: {
      discount_type: string
      discount_id: number
    }
    customer: Customer
    merch: Merch[]
    extras: Extras[]
    message: string
  }
}

export interface Customer {
  first_name?: string
  last_name?: string
  email?: string
  phone_number?: string
  gdpr?: boolean
  know_from?: string
  instagram?: string
  contact_person: 1 | 0
}

export interface LessonType {
  id: number
  name: string
  code: number
  price: number
  discountedPrice: number
  discount: number
  voucherName: string
  validTill: string
  extras?: Extras[]
  merch?: Merch[]
}

export interface Merch {
  id: number
  discountedPrice: number
  name: string
  quantity: number
  size?: string
}

export interface Extras {
  id: number
  discountedPrice: number
  name: string
  quantity: number
}

export interface ExtrasInfo {
  id: number
  name: string
  price: number
  quantity: number
  product_code_stripe: string
}
export interface MerchInfo {
  id: number
  name: string
  price: number
  product_code_stripe: string
  available_sizes: Record<string, string>
  quantity: number
}

export interface KnowFrom {
  know_from: string
}

export interface VoucherType {
  code: string
  created_date: string
  id: number
  lesson_type_code: number
  merchant_id: number
  order_id: number
  price: number
  redeemed_date: null
  status: string
  valid_until: string
  voucher_name: string
  lesson_type_name: string
}

export interface ContactFormFields {
  label: string
  name: keyof Customer
  type: 'text' | 'select' | 'checkbox'
  placeholder?: string
  included: boolean
  required?: boolean
}

export interface Response {
  code: number
  message: string
  message_headline: string
}

export interface Vouchers {
  vouchers: Voucher[]
  date: string
  branch_id: number
  branch_name: string
  time: string
  slots_required: number
  timeslot_id: number
}

export interface Voucher {
  lesson_name: string
  length: number
  merchant: string
  valid_until: string
  voucher_code: string
  customer: Customer
}
export interface Branch {
  address: string
  id: number
  lat: number
  long: number
  name: string
  map: string | null
}

export interface TimeslotForVoucher {
  available_time_slots: number
  total_time_slots: number
  branch_id: number
  date: string
  time: string
  timeslot_id: number
  is_active: boolean
  lecturers: Lecturer[]
}

export interface Timeslot extends TimeslotForVoucher {
  id: number
}

export interface Lecturer {
  id: number
  name: string
}

export interface VoucherPostType {
  code: string
  customer: Customer
}

export interface VouchersPostType {
  vouchers: VoucherPostType[]
  date: string
  branch_id: number
  time: string
  slots_required: number
  timeslot_id: number
}

export interface Discount {
  discount_code: string
  discount_description: null | string
  discount_type: string
  discount_value: number
  id: number
  quantity_remaining: number
  quantity_stock: number
  valid_from: string
  valid_to: string
}

export interface AdminVoucher {
  code: string
  created_date: string
  id: number
  length: number
  lesson_type_code: number
  lesson_type_name: string
  merchant_id: number
  order_id: number
  price: number
  redeemed_date: null | string
  status: VoucherStatus
  valid_until: string
  voucher_name: string
  reservation: {
    id: number
  }
  merchantName: string | undefined
  purchased_by?: CustomerDetail
}

export interface CustomerDetail {
  created_date: string
  email: string
  first_name: string
  gdpr: boolean
  id: number
  instagram: null | string
  know_from: string
  last_modification_date: string
  last_name: string
  phone_number: string
}

export enum VoucherStatus {
  RESERVED = 'Reserved',
  NOT_PAID = 'Waiting_For_Payment',
  USED = 'Used',
  ACTIVE = 'Active',
  ONGOING = 'Ongoing',
  CANCELLED = 'Cancelled',
  ABSENT = 'Absent',
}

export enum ReservationStatus {
  RESERVED = 'Reserved',
  USED = 'Used',
  ONGOING = 'Ongoing',
  CANCELLED = 'Cancelled',
  ABSENT = 'Absent',
}

export interface ModifiedAdminVoucher extends Omit<AdminVoucher, 'status'> {
  status: (typeof VoucherState)[keyof typeof VoucherState]
}

export const VoucherState = {
  [VoucherStatus.RESERVED]: 'Rezervováno',
  [VoucherStatus.NOT_PAID]: 'Nezaplaceno',
  [VoucherStatus.USED]: 'Uplatněn',
  [VoucherStatus.ACTIVE]: 'Aktivní',
  [VoucherStatus.ONGOING]: 'Na místě',
  [VoucherStatus.CANCELLED]: 'Zrušeno',
  [VoucherStatus.ABSENT]: 'Absence',
}

export const VoucherStatereversed = {
  [VoucherState[VoucherStatus.RESERVED]]: VoucherStatus.RESERVED,
  [VoucherState[VoucherStatus.NOT_PAID]]: VoucherStatus.NOT_PAID,
  [VoucherState[VoucherStatus.USED]]: VoucherStatus.USED,
  [VoucherState[VoucherStatus.ACTIVE]]: VoucherStatus.ACTIVE,
}

export const ReservationState = {
  [ReservationStatus.USED]: 'Uplatněn',
  [ReservationStatus.ONGOING]: 'Na místě',
  [ReservationStatus.RESERVED]: 'Rezervováno',
  [ReservationStatus.CANCELLED]: 'Zrušeno',
  [ReservationStatus.ABSENT]: 'Absence',
}

export interface Merchant {
  active_from: string
  active_to: string
  code: string
  id: number
  name: string
}

export interface Filters {
  [key: string]: {
    title: string
    filters: {
      [key: string]: {
        label: string
        isSelected: boolean
      }
    }
  }
}

export interface TimeInfo {
  timeslotId: number
  time: string
  isActive: boolean
  isReserved: boolean
  lecturers: Lecturer[]
}

export interface TimeslotsByDayAndTime {
  [branch_id: number]: {
    [date: string]: {
      branch_id: number
      scooters: number
      lecturers: Lecturer[]
      timeslots: TimeInfo[]
    }
  }
}

export interface TimeslotsByDay {
  branch_id: number
  date: string
  scooters: number
  lecturers: Lecturer[]
  timeslots: TimeInfo[]
}

export interface Lector {
  email: string
  first_name: string
  id: number
  last_name: string
  nickname: string
  phone_number: null | string
}

export interface UpdatedTimeslots {
  date: string
  branch_id: number
  timeslots: {
    lectors: { id: number }[]
    timeslot_id: number
    is_active: boolean
  }[]
}

export interface UpdatedVoucher {
  voucherId: number
  redeemed_date?: string
  valid_until?: string
  status?: string
}

export interface Reservation {
  code: string
  created_date: string
  free_min_generated: boolean
  id: number
  length: number
  lesson_type_code: number
  lesson_type_name: string
  merchant_id: number
  message: null | string
  order_extras?: {
    extras_id: number
    extras_name: string
    id: number
    order_id: number
    price: number
    quantity: number
  }[]
  order_id: 1
  order_merch?: {
    id: number
    merch_id: number
    merch_name: string
    order_id: number
    price: number
    quantity: number
    size: null | string
  }[]
  price: 1799.1
  redeemed_date: string
  reservation: ReservationDetails
  status: `${ReservationStatus}`
  used_by?: CustomerDetail
  valid_until: string
  voucher_name: string
}

export interface ReservationDetails {
  branch_id: number
  contact_person: number
  created_date: string
  date: string
  email_sent: boolean
  id: number
  message: null | string
  reservation_from: string
  status: string
  time: string
  timeslot_id: number
}
