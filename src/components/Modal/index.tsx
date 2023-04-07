import clsx from 'clsx'
import React, { useState } from 'react'

interface ModalProps {
  id: string
  title: string
  children: JSX.Element
  isModalOpen?: boolean
  handleModalClose?: () => void // use useCallback
  hasCloseXButton?: boolean
  bgShade?: boolean
  titleAlignCenter?: boolean
}

export default function Modal(props: ModalProps) {
  const {
    id, title, children,
    isModalOpen: isModalOpenParentProp, handleModalClose,
    hasCloseXButton, bgShade, titleAlignCenter,
  } = props

  const [isModalOpenChild, setIsModalOpenChild] = useState<boolean>(false)
  const isModalOpen = typeof isModalOpenParentProp !== 'undefined' ? isModalOpenParentProp : isModalOpenChild
  const setIsModalOpen = typeof handleModalClose !== 'undefined' ? handleModalClose : () => setIsModalOpenChild(false)

  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" checked={isModalOpen} readOnly />
      <div className="modal">
        <div className="modal-box relative">
          {
            hasCloseXButton && (
              <button
                type="button"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setIsModalOpen()}
              >
                ✕
              </button>
            )
          }
          <h3 className={clsx('text-lg font-bold', titleAlignCenter && 'text-center')}>{title}</h3>
          {children}
        </div>
      </div>
    </>
  )
}
