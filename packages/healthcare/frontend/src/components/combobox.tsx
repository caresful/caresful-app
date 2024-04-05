'use client'

import { Combobox } from '@headlessui/react'
import { useState } from 'react'
import { Input } from './input'
import { cn } from '../utils/helpers/cn'

interface ComoboxInputProps<T> {
  defaultValue?: T
  options: {
    key: string
    value: T
  }[]
  error?: boolean
  className?: string
  onChange: (v: T) => void
}

export function ComboboxInput<T extends string>({ defaultValue, options, error, className, onChange }: ComoboxInputProps<T>) {
  const [selectedValue, setSelectedValue] = useState<T | undefined>(defaultValue)
  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter((opt) => {
          return opt.value.toLowerCase().includes(query.toLowerCase())
        })

  function reset() {
    if (selectedValue == null) {
      setQuery('')
      return
    }
    if (query.toLowerCase() != selectedValue.toLowerCase()) {
      setQuery(selectedValue)
    }
  }

  return (
    <Combobox
      value={selectedValue}
      onChange={(e: T) => {
        setSelectedValue(e)
        onChange(e)
        setQuery(e)
      }}
    >
      {({ open }) => (
        <>
          {!open && reset()}
          <div className='relative z-50'>
            <Combobox.Input as={Input} label='State' value={query} onChange={(e) => setQuery(e.target.value)} error={error} className={className} />
            <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
              {filteredOptions.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>Nothing found.</div>
              ) : (
                filteredOptions.map((person) => (
                  <Combobox.Option
                    key={person.value}
                    className={({ active }) =>
                      `relative cursor-default select-none py-3 px-4 transition-all ${active ? 'bg-caresful-secondary text-white bg-opacity-80' : 'text-gray-900'}`
                    }
                    value={person.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={cn('block truncate font-normal', {
                            'font-black': selected,
                          })}
                        >
                          {person.value}
                        </span>
                        {selected ? (
                          <span
                            className={cn('absolute inset-y-0 left-0 flex items-center pl-3', {
                              'text-white': active,
                            })}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </div>
        </>
      )}
    </Combobox>
  )
}
