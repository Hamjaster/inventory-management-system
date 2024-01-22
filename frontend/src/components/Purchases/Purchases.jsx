import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { IoIosAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { BiArrowFromLeft } from 'react-icons/bi';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { Link } from 'react-router-dom';
import usePurchase from './usePurchases';
import { formatLargeNumber, parseDate } from '../../utils';


export default function purchases() {
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(false)
    // const [data, setData] = useState([
    //     {
    //         id: 1,
    //         product: 'Product A',
    //         category: 'Electronics',
    //         supplier: 'Supplier 1',
    //         unit_price: 39.99,
    //         qty: 2,
    //         total_price: 79.98,
    //     },
    //     {
    //         id: 2,
    //         product: 'Product B',
    //         category: 'Clothing',
    //         supplier: 'Supplier 1',
    //         unit_price: 29.99,
    //         qty: 3,
    //         total_price: 89.97,
    //     },
    //     {
    //         id: 3,
    //         product: 'Product C',
    //         category: 'Home & Kitchen',
    //         supplier: 'Supplier 1',
    //         unit_price: 49.99,
    //         qty: 1,
    //         total_price: 49.99,
    //     },
    //     {
    //         id: 4,
    //         product: 'Product D',
    //         category: 'Sports & Outdoors',
    //         supplier: 'Supplier 1',
    //         unit_price: 59.99,
    //         qty: 2,
    //         total_price: 119.98,
    //     },
    //     {
    //         id: 5,
    //         product: 'Product E',
    //         category: 'Beauty',
    //         supplier: 'Supplier 1',
    //         unit_price: 19.99,
    //         qty: 5,
    //         total_price: 99.95,
    //     },
    //     {
    //         id: 6,
    //         product: 'Product F',
    //         category: 'Books',
    //         supplier: 'Supplier 1',
    //         unit_price: 24.99,
    //         qty: 3,
    //         total_price: 74.97,
    //     },
    //     {
    //         id: 7,
    //         product: 'Product G',
    //         category: 'Toys & Games',
    //         supplier: 'Supplier 1',
    //         unit_price: 34.99,
    //         qty: 2,
    //         total_price: 69.98,
    //     },
    //     {
    //         id: 8,
    //         product: 'Product H',
    //         category: 'Automotive',
    //         supplier: 'Supplier 1',
    //         unit_price: 44.99,
    //         qty: 1,
    //         total_price: 44.99,
    //     },
    //     {
    //         id: 9,
    //         product: 'Product I',
    //         category: 'Health & Household',
    //         supplier: 'Supplier 1',
    //         unit_price: 54.99,
    //         qty: 4,
    //         total_price: 219.96,
    //     },
    //     {
    //         id: 10,
    //         product: 'Product J',
    //         category: 'Tools & Home Improvement',
    //         supplier: 'Supplier 1',
    //         unit_price: 69.99,
    //         qty: 2,
    //         total_price: 139.98,
    //     },
    // ])

    const { purchases } = usePurchase()

    const tableCustomStyles = {
        headCells: {
            style: {
                fontSize: '20px',
                // paddingLeft: '0 8px',
                justifyContent: 'center',
                background: '#00b6ee60',
                color: '#007FCF',
                // color: 'white'
            },
        },
        cells: {
            style: {
                fontSize: '17px',
                padding: '0px',
                justifyContent: 'center',
                margin: '0px',
            }
        },
        rows: {
            style: {
                margin: 0
            }
        }

    }

    const columns = [

        {
            name: 'Product',
            selector: row => row.product,
            cell: row => <span>{row.product.title}</span>,

        },
        {
            name: 'Supplier',
            selector: row => row.supplier,
            cell: row => <span>{row.supplier.name}</span>,
        },
        {
            name: 'Date',
            selector: row => row.purchaseDate,
            cell: row => <span>{parseDate(row.purchaseDate)}</span>,
        },
        {
            name: 'Qty',
            selector: row => row.qty,
            cell: row => <span>{row.qty}</span>,
            // width: '10%'
        },
        {
            name: 'Total(Rs)',
            selector: row => row.totalPrice,
            cell: row => <span>{formatLargeNumber(Math.round(row.totalPrice))}</span>,

        },
        // {   
        //     name: 'Action',
        //     cell: (r) => {
        //         return (
        //             <span className='flex flex-row text-3xl space-x-2 items-center'>
        //                 <div className="edit text-blue-500 hover:text-blue-700 transition-all cursor-pointer">
        //                     <MdEditSquare />
        //                 </div>
        //                 <div className="del text-red-500 hover:text-red-700 transition-all cursor-pointer">
        //                     <MdDelete />
        //                 </div>
        //             </span>
        //         )
        //     }
        // }
    ];

    const paginationComponentOptions = {
        rowsPerPageText: false,
        rowsPerPage: false,
        rangeSeparatorText: false,
        selectAllRowsItem: false,
        selectAllRowsItemText: 'Todos',
        firstText: <BiArrowFromLeft />,
        previousText: "hy",
        nextText: "Nextjs",

    };


    const dataAfterFiltering = () => {
        if (searchQuery === '') {
            return purchases
        }
        else {
            return purchases
                .filter((row) => {
                    return row.product.title.toLowerCase().includes(searchQuery.toLowerCase())
                })
        }
    }


    return (

        <>

            <div className="actions bg-[#] bg-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between sm:space-x-1">

                <div className="input relative w-full sm:w-2/4">
                    <div className="icons  text-[#00BE95] absolute top-1/2 right-3 -translate-y-1/2">
                        <FaSearch />
                    </div>
                    <input placeholder='Search Prodcuts' type="text" className='w-full outline-none placeholder:font-light pr-9 px-4 py-2 border-2 border-[#00BE95] text-lg ' value={searchQuery} onChange={(e) => {
                        setSearchQuery(e.target.value)
                    }} />
                </div>
                <div className="actions w-full sm:w-1/4">
                    <Link to={'/purchases/add'} className="create flex justify-center flex-row items-center space-x-2 bg-[#00BE95] hover:bg-[#01876a] transition-all text-white text-center px-0 py-3 sm:px-4 text-sm sm:text-lg sm:py-2 cursor-pointer">
                        <div className="icon text-2xl text-white">
                            <IoIosAddCircle />
                        </div>
                        <div className="text">
                            Add a new purchase
                        </div>
                    </Link>
                </div>

            </div>

            <div className="table mt-12 bg-black min-w-full">
                <DataTable
                    columns={columns}
                    data={
                        dataAfterFiltering()
                    }
                    customStyles={tableCustomStyles}
                    pagination={!searchQuery}
                    paginationComponentOptions={paginationComponentOptions}
                />
            </div>

        </>


    )
}
