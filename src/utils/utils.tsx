import {
  ContactFormFields,
  LessonType,
  VoucherType,
  Response,
  Merch,
  Extras,
  Timeslot,
  Branch,
  Voucher,
  Vouchers,
  Order,
  VoucherStatus,
  VoucherState,
  Filters,
  ModifiedAdminVoucher,
  TimeslotForVoucher,
} from 'types/types'
import { pdf } from '@react-pdf/renderer'
import { SingleVoucher } from 'components/voucher/VoucherPDF'
import { generateAndSendVouchers, getAvailableTimeslots } from './requests'
import { Sunglasses } from 'assets/images/Sunglasses'
import { Frisbee } from 'assets/images/Frisbee'
import { Socks } from 'assets/images/Socks'
import { Poncho } from 'assets/images/Poncho'
import { Cap } from 'assets/images/Cap'
import { Hoodie } from 'assets/images/Hoodie'
import { Snapback } from 'assets/images/Snapback'
import { FunctionComponent, SVGProps } from 'react'
import { isSameDay, format, isAfter, compareAsc } from 'date-fns'
import { FormikErrors } from 'formik'
import { StylesConfig } from 'react-select'

export function groupLessonsAndCount(lessons: LessonType[]) {
  const lessonCountMap: Record<number, { count: number; lesson: LessonType }> =
    {}

  lessons.forEach(lesson => {
    const key = lesson.id

    if (!lessonCountMap[key]) {
      lessonCountMap[key] = {
        count: 1,
        lesson: lesson,
      }
    } else {
      lessonCountMap[key].count += 1
    }
  })

  return lessonCountMap
}

export function groupItemsAndCount(
  lessons: LessonType[],
  itemType: 'merch' | 'extras',
) {
  const itemsCountMap: {
    [id: number]: Merch | Extras
  } = {}

  lessons.forEach(lesson => {
    lesson[itemType]?.forEach(item => {
      const key = item.id

      if (!itemsCountMap[key]) {
        itemsCountMap[key] = {
          id: item.id,
          name: item.name,
          discountedPrice: (item as any).price,
          quantity: 1,
        }
      } else {
        itemsCountMap[key].quantity += 1
      }
    })
  })

  return itemsCountMap
}

export const sendPDFs = async (vouchers: VoucherType[]) => {
  const base64Voucher = vouchers.map(async (voucher: VoucherType) => {
    const blob = await pdf(<SingleVoucher voucher={voucher} />).toBlob()
    const reader = new FileReader()

    const base64data: string | ArrayBuffer | null = await new Promise(
      (resolve, reject) => {
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      },
    )

    return { code: voucher.code, base64: base64data }
  })

  const base64Vouchers = await Promise.all(base64Voucher)

  return generateAndSendVouchers(base64Vouchers)
}

export const getContactFormFields = (otherKnowFrom: boolean) => {
  return [
    {
      label: 'Jméno',
      name: 'first_name',
      type: 'text',
      placeholder: 'Jan',
      included: true,
      required: true,
    },
    {
      label: 'Příjmení',
      name: 'last_name',
      type: 'text',
      placeholder: 'Novák',
      included: true,
      required: true,
    },
    {
      label: 'Email',
      name: 'email',
      type: 'text',
      placeholder: 'jan.novak@seznam.cz',
      included: true,
      required: true,
    },
    {
      label: 'Telefon',
      name: 'phone_number',
      type: 'text',
      placeholder: '+420 123 456 789',
      included: true,
      required: true,
    },
    {
      label: 'Jak jste se o nás dozvěděli?',
      name: 'know_from',
      type: 'select',
      included: true,
      required: true,
    },
    {
      label: 'Jiné',
      name: 'know_from',
      type: 'text',
      included: otherKnowFrom,
    },
  ] as ContactFormFields[]
}

export const merchToIconUrlMapping: Record<
  number,
  FunctionComponent<SVGProps<SVGSVGElement>>
> = {
  1: Sunglasses,
  2: Frisbee,
  3: Socks,
  4: Cap,
  5: Poncho,
  6: Hoodie,
  7: Snapback,
}

export const formatPrice = (price: number) => {
  return price.toLocaleString('cs-CZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export const listVariants = {
  initial: {
    x: -15,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
      ease: 'linear',
    },
  },
}

export const getToastMessage = (
  status: 'success' | 'error',
  voucherApplied: boolean,
  response: Response,
) => {
  if (status === 'error') {
    return {
      title: voucherApplied
        ? 'Voucher již byl použit'
        : response.message_headline,
      description: voucherApplied
        ? 'Zadejte prosím jiný kód.'
        : response.message,
    }
  }

  return {
    title: 'Voucher byl úspěšně přidán',
    description:
      'Můžete přidat více voucherů nebo přejít dál na výběr termínu.',
  }
}

export const getToastMessageForDiscount = (
  status: 'success' | 'error',
  response: Response,
) => {
  if (status === 'error') {
    return {
      title:
        response.message_headline ||
        'Něco se pokazilo. Kontaktujte nás prosím.',
      description: response.message || '',
    }
  }

  return {
    title: response.message_headline || 'Slevový kód byl úspěšně aplikován',
    description: response.message,
  }
}

export const getDiscountDisabledMessage = (
  isLessonSelected: boolean,
  isDiscountApplied: boolean,
  noDiscountedLesson: boolean,
) => {
  if (!isLessonSelected) return 'Nejprve vyberte lekci'
  if (isDiscountApplied) return 'Lze aplikovat pouze jeden slevový kód'
  if (!noDiscountedLesson)
    return 'Slevový kód nelze aplikovat na již zlevněné lekce'
  return ''
}

export const getAvailableBranches = (
  timeslots: Timeslot[] | null,
  branches?: Branch[],
  selectedDate?: Date,
) => {
  if (!branches || !timeslots) return

  const branchIds = timeslots
    .filter(timeslot =>
      selectedDate ? isSameDay(new Date(timeslot.date), selectedDate) : true,
    )
    .map(slot => slot.branch_id)

  const uniqueBranchIdsSet = new Set(branchIds)

  return branches.filter(branch =>
    Array.from(uniqueBranchIdsSet).includes(branch.id),
  )
}

export const getAvailableDaysForBranch = (
  timeslots: Timeslot[] | null | undefined,
  branchId: number | null,
) => {
  if (!timeslots) return []

  let availableTimeslots = timeslots

  if (branchId)
    availableTimeslots = timeslots.filter(slot => slot.branch_id === branchId)

  return availableTimeslots
}

export const getFirstAvailableMonth = (dates: Date[]) => {
  if (dates && dates.length > 0) {
    const sortedDates = [...dates].sort((a, b) => compareAsc(a, b))
    return sortedDates[0]
  }

  return new Date()
}

export const getDates = (availableTimeslots: Timeslot[]) => {
  return availableTimeslots.map(timeslot => new Date(timeslot.date))
}

export const isDisabledDate = (availableDates: Date[], date: Date) => {
  return !availableDates.some(
    availableDate =>
      isSameDay(availableDate, date) &&
      (isAfter(date, new Date()) || isSameDay(date, new Date())),
  )
}

export const getTimeslots = async (
  vouchersData: Voucher[],
  setTimeslots: React.Dispatch<React.SetStateAction<Timeslot[] | null>>,
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void | FormikErrors<Vouchers>>,
) => {
  const vouchers = vouchersData.map(voucher => voucher.voucher_code)
  const data = await getAvailableTimeslots(vouchers)

  setTimeslots(data.timeslots)
  setFieldValue('slots_required', data.slots_required)
}

export const getSelectedDayTimeslots = (
  availableBranchTimeslots: Timeslot[],
  selectedDay: Date,
) => {
  return availableBranchTimeslots.filter(timeslot =>
    isSameDay(new Date(timeslot.date), selectedDay),
  )
}

export const isBeforeNoon = (time: string) => {
  const [hours] = time.split(':').map(Number)
  return hours < 12
}

export const isTimeBeforeNow = (timeslot: Timeslot | TimeslotForVoucher) => {
  const [hours] = timeslot.time.split(':').map(Number)
  return (
    isSameDay(new Date(timeslot.date), new Date()) &&
    hours < new Date().getHours()
  )
}

export const formatDateToString = (date: Date) => {
  return format(date, 'yyyy-MM-dd')
}

export const getDayPickerVariants = (isBreakpoint: boolean) => {
  if (isBreakpoint)
    return {
      hidden: { x: 0 },
      visible: { x: -100 },
    }

  return {
    hidden: { x: 0 },
    visible: { x: 0 },
  }
}

export const getTimePickerVariants = (isMdBreakpoint: boolean) => {
  if (isMdBreakpoint)
    return {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    }

  return {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  }
}

export const getReservationContactFormFields = () => {
  return [
    {
      label: 'Jméno',
      name: 'first_name',
      type: 'text',
      placeholder: 'Jan',
      included: true,
      required: true,
    },
    {
      label: 'Příjmení',
      name: 'last_name',
      type: 'text',
      placeholder: 'Novák',
      included: true,
      required: true,
    },
    {
      label: 'Email',
      name: 'email',
      type: 'text',
      placeholder: 'jan.novak@seznam.cz',
      included: true,
    },
    {
      label: 'Telefon',
      name: 'phone_number',
      type: 'text',
      placeholder: '+420 123 456 789',
      included: true,
    },
    {
      label: 'Instagram',
      name: 'instagram',
      type: 'text',
      placeholder: '@jan.novak',
      included: true,
    },
    {
      label: 'Kontaktní osoba pro rezervaci',
      name: 'contact_person',
      type: 'checkbox',
      included: true,
    },
  ] as ContactFormFields[]
}

export const removeDiscount = (
  values: Order,
  setValues: (
    values: React.SetStateAction<Order>,
    shouldValidate?: boolean | undefined,
  ) => Promise<void | FormikErrors<Order>>,
) => {
  const { discountCodeId, discountInfo, ...rest } = values
  setValues(rest)
}

export const formatDate = (date: string) => {
  return format(new Date(date), 'dd.MM.yyyy')
}

export const getPillStyles = (status: VoucherStatus) => {
  if (status === VoucherState[VoucherStatus.ACTIVE])
    return { color: '#147129', backgroundColor: '#EAFDEE' }
  if (status === VoucherState[VoucherStatus.NOT_PAID])
    return { color: '#E40000', backgroundColor: '#FFCACA' }
  if (status === VoucherState[VoucherStatus.USED])
    return { color: '#016FD0', backgroundColor: '#EDEAFD' }

  return { color: '#9E8F0B', backgroundColor: '#FFF5C3' }
}

export const filterVouchers = (
  filters: Filters | null,
  vouchers: ModifiedAdminVoucher[] | undefined,
) => {
  return vouchers?.filter(voucher => {
    if (!filters) return true

    const merchantFilter = filters.merchants.filters
    const lessonTypeFilter = filters.lessonTypes.filters
    const validityFilters = filters.validityDays.filters
    const statusFilters = filters.voucherStates.filters

    const merchantId = voucher.merchant_id
    const lessonType = voucher.lesson_type_name
    const validityDay = voucher.valid_until
    const status = voucher.status

    const merchantFilterValue = merchantFilter[merchantId]?.isSelected
    const lessonTypeFilterValue = lessonTypeFilter[lessonType]?.isSelected
    const validityFilterValue = validityFilters[validityDay]?.isSelected
    const statusFilterValue = statusFilters[status]?.isSelected

    return (
      merchantFilterValue &&
      lessonTypeFilterValue &&
      validityFilterValue &&
      statusFilterValue
    )
  })
}

export const bestSellerItemIds = {
  lessons: [5, 6],
  merch: [1, 5, 7],
  extras: [1],
}

export const getTimeSelectorPillColor = (
  isSelected: boolean,
  timeslot: Timeslot | TimeslotForVoucher,
) => {
  return isSelected
    ? 'bg-yellow'
    : isTimeBeforeNow(timeslot)
    ? 'bg-gray'
    : 'bg-white'
}

export const selectStyles: StylesConfig = {
  container: baseStyles => ({
    ...baseStyles,
    minWidth: '300px',
    width: 'fit-content',
    border: '1px solid #ffea00',
    borderRadius: '4px',
    backgroundColor: '#1F1F1F',
  }),
  control: (baseStyles, { isFocused }) => ({
    ...baseStyles,
    backgroundColor: '#1F1F1F',
    border: isFocused ? '1px solid #0056b3' : 'none',
    color: 'white',
  }),
  input: baseStyles => ({
    ...baseStyles,
    color: 'white',
  }),
  option: (baseStyles, { isFocused }) => ({
    ...baseStyles,
    backgroundColor: isFocused ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    color: 'white',
  }),
  menu: baseStyles => ({
    ...baseStyles,
    backgroundColor: '#1F1F1F',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)',
  }),
  menuList: baseStyles => ({
    ...baseStyles,
    maxHeight: '200px',
    overflowY: 'auto',
  }),
  clearIndicator: baseStyles => ({
    ...baseStyles,
    color: '#D10000',
    ':hover': {
      color: '#D10000',
    },
  }),
  multiValueRemove: baseStyles => ({
    ...baseStyles,
    color: '#1F1F1F',
    ':hover': {
      color: '#D10000',
    },
  }),
}
