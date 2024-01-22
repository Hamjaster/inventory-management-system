import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Suspense } from 'react'
import { Spinner } from '@chakra-ui/react'
import AddSupplier from '../components/Suppliers/AddSupplier'
import Products from '../components/Products/Products'
import AddProduct from '../components/Products/AddProduct'
import Purchases from '../components/Purchases/Purchases'
import AddPurchase from '../components/Purchases/AddPurchase'
import AddCustomer from '../components/Customer/AddCustomer'
import Customers from '../components/Customer/Customer'
import Sales from '../components/Sale/Sales'
import AddSale from '../components/Sale/AddSale'
import { BiLoaderCircle } from 'react-icons/bi'
// import Suppliers from '../components/users/Suppliers'
import { VscLoading } from "react-icons/vsc";
const Suppliers = React.lazy(() => import('../components/Suppliers/Suppliers'))
const Dashboard = React.lazy(() => import('../components/dashboard/Dashboard'))

export default function Home() {

    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <div className=' relative flex flex-row items-center w-full ' >

            {/* Sidebar */}
            <div className={`sidebar transition-all duration-500 z-50 ${showSidebar ? 'left-0' : '-left-80'} fixed h-full w-64 top-0 sm:left-0`}>
                <Sidebar setShowSidebar={setShowSidebar} />
            </div>


            <div className=' ml-0 sm:ml-64 w-full  flex flex-col space-y-3 '>

                <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

                <Suspense fallback={
                    <div className='flex   items-center  h-screen w-full justify-center '>
                        <div className="logo h-min w-min animate-spin text-5xl text-blue-600">
                            <VscLoading />
                        </div>
                    </div>
                }>
                    <Routes>

                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/purchases' element={<Purchases />} />
                        <Route path='/sales' element={<Sales />} />
                        <Route path='/purchases/add' element={<AddPurchase />} />
                        <Route path='/sales/add' element={<AddSale />} />
                        <Route path='/products/add' element={<AddProduct />} />

                        <Route path='/products' element={<Products />} />

                        <Route path='/customers' element={<Customers />} />
                        <Route path='/customers/add' element={<AddCustomer />} />
                        <Route path='/suppliers' element={<Suppliers />} />
                        <Route path='/suppliers/add' element={<AddSupplier />} />

                    </Routes>

                </Suspense>

            </div>

        </div>


    )
}
