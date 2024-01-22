import React from 'react'
import dashboard from '../images/dashboard_icon.svg'
import trans from '../images/transaction_icon.svg'
import sch from '../images/schedule_icon.svg'
import user from '../images/user_icon.svg'
import settings from '../images/setting_icon.svg'
import { AiFillCustomerService, AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { MdDashboard, MdOutlineDashboard, MdProductionQuantityLimits } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { TbFileInvoice, TbUsers } from 'react-icons/tb'
import { BiSolidPurchaseTag, BiUserX } from 'react-icons/bi'
import { FaRegUser } from 'react-icons/fa'

export default function Sidebar({ setShowSidebar }) {
    return (
        <div className='bg-[#0063CA] font-[Montserrat] text-white py-12 w-full h-full flex flex-col justify-between items-center relative'>

            {/* Close Icon on Sidebar (only on small screens) */}
            <div onClick={() => setShowSidebar(false)} className="close-icon text-xl sm:hidden absolute top-4 right-4">
                <AiOutlineClose />
            </div>

            <div className="top">
                <div className=" uppercase font-robot font-semibold text-blue-200 text-3xl">Sky Solar</div>

                <div className="items [&>*]:cursor-pointer font-light my-14 flex flex-col space-y-8">

                    <div onClick={() => setShowSidebar(false)} className="flex flex-row space-x-5 items-center ">
                        {/* <img src={dashboard} alt="" srcset="" /> */}
                        <div className="text-3xl">
                            <MdOutlineDashboard />
                        </div>
                        <Link to={'/'} className='text-xl'>Dashboard</Link>
                    </div>
                    <div onClick={() => setShowSidebar(false)} className="flex flex-row space-x-5 items-center ">
                        <div className="text-3xl">
                            <BiSolidPurchaseTag />
                        </div>
                        <Link to={'/purchases'} className='text-xl'>Purchases</Link>
                    </div>
                    <div onClick={() => setShowSidebar(false)} className="flex flex-row space-x-5 items-center ">
                        <div className="text-3xl">
                            <TbFileInvoice />
                        </div>
                        <Link to={'/sales'} className='text-xl'>Sales</Link>
                    </div>
                    <div onClick={() => setShowSidebar(false)} className="flex flex-row space-x-5 items-center ">
                        <div className="text-3xl">
                            <TbUsers />
                        </div>
                        <Link to={'/suppliers'} className='text-xl'>Suppliers</Link>
                    </div>
                    <div onClick={() => setShowSidebar(false)} className="flex flex-row space-x-5 items-center ">
                        <div className="text-3xl">
                            <MdProductionQuantityLimits />
                        </div>
                        <Link to={'/products'} className='text-xl'>Products</Link>
                    </div>



                </div>
            </div>

        </div>
    )
}
