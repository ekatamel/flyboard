import { Menu, MenuButton, MenuList, Portal } from '@chakra-ui/react'
import { ExtrasInfo, Order } from 'types/types'
import { useFormikContext } from 'formik'
import dropdownIcon from 'assets/images/dropdown.svg'
import { Table, Tbody, Tr, Td, TableContainer } from '@chakra-ui/react'
import { BasketTableRow } from './BasketTableRow'
import {
  groupItemsAndCount,
  groupLessonsAndCount,
  removeDiscount,
} from 'utils/utils'
import { usePriceTotals } from 'hooks/usePriceTotals'
import { useContext, useState } from 'react'
import cross from 'assets/images/cross.svg'
import { FormNavigationContext } from 'context/VoucherFormNavigationContext'

export const Basket = () => {
  const [isHovered, setIsHovered] = useState(false)

  const { values, setValues } = useFormikContext<Order>()
  const { currentStepIndex } = useContext(FormNavigationContext)

  const { totalPrice, totalDiscountedPrice } = usePriceTotals()
  const groupedLessons = groupLessonsAndCount(values.lessonType)
  const groupedExtras = groupItemsAndCount(values.lessonType, 'extras')
  const groupedMerch = groupItemsAndCount(values.lessonType, 'merch')

  if (!parseFloat(totalPrice)) return null

  return (
    <div className='flex items-center'>
      <>
        <Menu>
          <MenuButton className='shrink-0'>
            <div className='flex items-center'>
              <img
                src={dropdownIcon}
                alt='Dropdown icon'
                className='w-24 h-24 mr-8'
              />
              <span className='text-textGray font-title text-subheading mr-12'>
                CELKEM
              </span>
              <span className='text-white font-title text-30'>
                {totalDiscountedPrice},-
              </span>
            </div>
          </MenuButton>
          <Portal>
            <MenuList
              backgroundColor='black'
              borderRadius='0'
              padding={0}
              className='border border-yellow hidden lg:block'
            >
              <TableContainer>
                <Table>
                  <Tbody className='text-white font-title'>
                    {Object.values(groupedLessons).map(lessonType => {
                      return (
                        <BasketTableRow
                          key={lessonType.lesson.id}
                          count={lessonType.count}
                          item={lessonType.lesson}
                          type='lessonType'
                          isDeletable={currentStepIndex === 0}
                        />
                      )
                    })}
                    {Object.values(groupedExtras).map(extraItem => {
                      if (!extraItem) return null
                      return (
                        <BasketTableRow
                          key={extraItem.id}
                          count={extraItem.quantity}
                          item={extraItem}
                          type='extras'
                        />
                      )
                    })}
                    {values.extras &&
                      values.extras.length > 0 &&
                      values.extras.map((extra, index) => {
                        return (
                          <BasketTableRow
                            key={index}
                            item={extra}
                            type='extras'
                            count={extra.quantity}
                          />
                        )
                      })}
                    {Object.values(groupedMerch).map(merchItem => {
                      if (!merchItem) return null
                      return (
                        <BasketTableRow
                          key={merchItem.id}
                          count={merchItem.quantity}
                          item={merchItem}
                          type='merch'
                        />
                      )
                    })}
                    {values.merch &&
                      values.merch.length > 0 &&
                      values.merch.map((merch, index) => {
                        return (
                          <BasketTableRow
                            key={index}
                            item={merch}
                            type='merch'
                            count={merch.quantity}
                          />
                        )
                      })}
                    {values.discountCodeId && (
                      <Tr
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className='relative'
                      >
                        <Td
                          border={'none'}
                          padding={'10px 10px 10px 20px'}
                          className='text-yellow'
                        >
                          Slevový kód
                        </Td>
                        <Td border={'none'} padding={'10px 10px 10px 20px'}>
                          {values.discountInfo?.code}
                        </Td>

                        <Td
                          border={'none'}
                          padding={'10px 10px 10px 20px'}
                          className='text-yellow'
                        >
                          {values.discountInfo?.type === 'price' &&
                            `-${values.discountInfo?.discount.toFixed(0)}%`}
                          {values.discountInfo?.type === 'min' &&
                            `+ ${values.discountInfo?.discount} min`}
                        </Td>
                        <Td border={'none'}></Td>
                        {isHovered && (
                          <img
                            src={cross}
                            alt='Cross icon'
                            className='absolute right-10 top-14 cursor-pointer'
                            onClick={() => removeDiscount(values, setValues)}
                          />
                        )}
                      </Tr>
                    )}
                    <Tr>
                      <Td
                        border={'none'}
                        padding={'30px 20px 10px 20px'}
                        className='text-textGray'
                      >
                        CELKEM
                      </Td>
                      <Td border={'none'}></Td>
                      <Td border={'none'} padding={'30px 20px 10px 20px'}>
                        {totalDiscountedPrice},-
                      </Td>
                      <Td border={'none'} padding={'30px 20px 10px 10px'}>
                        CZK
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </MenuList>
          </Portal>
        </Menu>
      </>
    </div>
  )
}
