import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Checkbox,
} from "@material-tailwind/react";


function AddressSelect({ selectAddress, address }) {
    const [open, setOpen] = useState(0);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    

    return (
        <>
            

                <div class="inline-flex items-center w-full"  key={address.id}>

                    <label
                        class="relative flex cursor-pointer items-center rounded-full p-3"
                        for={address.id}
                        data-ripple-dark="true"
                    >
                        <input
                            onClick={(e) => selectAddress(e.target.id)}
                            id={address.id}
                            name="type"
                            type="radio"
                            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                        />
                        <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-3.5 w-3.5"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                            >
                                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                            </svg>
                        </div>
                    </label>
                    <label
                        class="mt-px cursor-pointer select-none font-light text-gray-700 w-full"
                        for={address.id}
                    >
                        <div className='min-w-full'>

                            <Accordion open={open === 1} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
                                <AccordionHeader
                                    onClick={() => handleOpen(1)}
                                    className={`border-b-0 transition-colors ${open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
                                        }`}
                                >
                                    {address.fullname}
                                </AccordionHeader>
                                <AccordionBody className="pt-0 text-base font-normal">
                                    {address.house_name}
                                </AccordionBody>
                            </Accordion>
                        </div>

                    </label>
                </div>

           



        </>
    )
}

export default AddressSelect