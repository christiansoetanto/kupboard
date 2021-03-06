import React from 'react'
import CancelSvg from './CancelSvg'

const PopUp = (props) => {
    return (
        <div className={`flex flex-col relative bg-white rounded border border-gray-900 py-2 px-4 ${props.className}`}>
            <div className='flex flex-row justify-between items-center mb-8 border-b-2 border-gray-200'>
                <div className='text-lg md:text-2xl font-semibold '>
                    {props.title}
                </div>
                <div
                    className='hover:text-gray-500 ml-2'
                    onClick={props.onClose}
                >
                    <CancelSvg />
                </div>
            </div>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default PopUp
