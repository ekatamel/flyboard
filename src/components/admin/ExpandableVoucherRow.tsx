import { AdminButton } from 'components/shared/AdminButton'
import {
  ModifiedAdminVoucher,
  UpdatedVoucher,
  VoucherState,
  VoucherStatereversed,
} from 'types/types'
import { FormControl, FormLabel } from '@chakra-ui/react'
import { useState } from 'react'

import { formatDate, formatDateToString } from 'utils/utils'
import { Select } from '@chakra-ui/react'
import { useQueryClient } from 'react-query'
import { useToast } from '@chakra-ui/react'
import { Toast } from 'components/shared/Toast'
import { isSameDay } from 'date-fns'
import { updateVoucher } from 'utils/requests'
import { parse } from 'date-fns'
import { DateInput } from 'components/shared/DateInput'

interface ExpandableVoucherRowProps {
  voucher: ModifiedAdminVoucher
  toggleExpanded: () => void
}

export const ExpandableVoucherRow = ({
  voucher,
  toggleExpanded,
}: ExpandableVoucherRowProps) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  const {
    reservation,
    created_date,
    redeemed_date,
    valid_until,
    status,
    purchased_by,
  } = voucher

  const validUntilDateValue = parse(valid_until, 'dd.MM.yyyy', new Date())
  const reedemedDateValue =
    redeemed_date && redeemed_date !== '-'
      ? parse(redeemed_date, 'dd.MM.yyyy', new Date())
      : null
  const [redeemedAt, setRedeemedAt] = useState<Date | null>(reedemedDateValue)
  const [validUntil, setValidUntil] = useState<Date>(validUntilDateValue)
  const [voucherStatus, setVoucherStatus] = useState<string>(status)

  const cancelChanges = () => {
    setRedeemedAt(reedemedDateValue)
    setValidUntil(validUntilDateValue)
    setVoucherStatus(status)
    toggleExpanded()
  }

  const updateVoucherData = async () => {
    const updatedVoucherData: UpdatedVoucher = {
      voucherId: voucher.id,
    }

    if (voucherStatus !== status)
      updatedVoucherData.status = VoucherStatereversed[voucherStatus]
    if (!isSameDay(validUntil, validUntilDateValue))
      updatedVoucherData.valid_until = formatDateToString(validUntil)
    if (
      redeemedAt &&
      !isSameDay(redeemedAt, new Date(reedemedDateValue ?? '-'))
    )
      updatedVoucherData.redeemed_date = formatDateToString(redeemedAt)

    if (Object.keys(updatedVoucherData).length === 1) {
      toggleExpanded()
      return
    }

    try {
      await updateVoucher(updatedVoucherData)
      queryClient.invalidateQueries('vouchers')
      toggleExpanded()
      toast({
        position: 'top',
        status: 'success',
        duration: 4000,
        isClosable: true,
        render: () => (
          <Toast status={'success'} title={'Změny byly úspěšně uloženy.'} />
        ),
      })
    } catch (error) {
      toast({
        position: 'top',
        status: 'error',
        duration: 4000,
        isClosable: true,
        render: () => (
          <Toast
            status={'error'}
            title={'Něco se nepovedlo - kontaktujte správce systému'}
          />
        ),
      })
    }
  }

  return (
    <div className='flex flex-col gap-30 pt-22 px-10 pb-10'>
      <div className='flex'>
        <p className='font-title text-yellow w-120'></p>
        <div className='flex gap-30'>
          <DateInput
            label={'Uplatněno dne'}
            date={redeemedAt}
            setDate={setRedeemedAt}
          />
          <DateInput
            label={'Platnost do'}
            date={validUntil}
            setDate={setValidUntil}
          />
          <div className='flex flex-col gap-16'>
            <span className='font-title text-yellow text-16'>Vytvořeno</span>
            <span>{formatDate(created_date)}</span>
          </div>
          <FormControl>
            <FormLabel
              htmlFor='select-voucher-status'
              className='text-yellow text-12'
            >
              Stav
            </FormLabel>
            <Select
              borderColor={'#ffea00'}
              onChange={e => setVoucherStatus(e.target.value)}
            >
              <option value='' disabled>
                Vyber stav
              </option>
              {Object.values(VoucherState).map(state => (
                <option selected={state === voucherStatus} value={state}>
                  {state}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      {purchased_by && (
        <div className='flex'>
          <p className='font-title text-yellow text-16 w-120 shrink-0'>
            Koupil
          </p>
          <div className='flex gap-30'>
            <div className='flex flex-col'>
              <p className='font-title text-yellow text-16'>Jméno</p>
              <p>{purchased_by.first_name}</p>
            </div>
            <div className='flex flex-col'>
              <p className='font-title text-yellow text-16'>Příjmení</p>
              <p>{purchased_by.last_name}</p>
            </div>
            <div className='flex flex-col'>
              <p className='font-title text-yellow text-16'>Telefon</p>
              <p>{purchased_by.phone_number}</p>
            </div>
            <div className='flex flex-col'>
              <p className='font-title text-yellow text-16'>Email</p>
              <p>{purchased_by.email}</p>
            </div>
          </div>
        </div>
      )}

      <div className='flex'>
        <p className='font-title text-yellow text-16 w-120 shrink-0'>
          Rezervace
        </p>
        {reservation?.id && <div>{reservation?.id}</div>}
      </div>
      <div className='flex gap-20 justify-end'>
        <AdminButton
          title='Zrušit'
          className='bg-black border-yellow text-yellow'
          onClick={() => cancelChanges()}
        />
        <AdminButton
          title='Uložit'
          className='bg-yellow border-yellow text-black'
          onClick={() => updateVoucherData()}
        />
      </div>
    </div>
  )
}
