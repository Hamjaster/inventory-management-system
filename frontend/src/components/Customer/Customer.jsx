import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { IoIosAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { BiArrowFromLeft } from 'react-icons/bi';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { Link } from 'react-router-dom';


export default function Customers() {
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([
        {
            id: 1,
            title: 'John Doe',
            category: '+1 123-456-7890',
        },
        {
            id: 2,
            title: 'Jane Smith',
            category: '+1 234-567-8901',
        },
        {
            id: 3,
            title: 'Bob Johnson',
            category: '+1 345-678-9012',
        },
        {
            id: 4,
            title: 'Alice Brown',
            category: '+1 456-789-0123',
        },
        {
            id: 5,
            title: 'Charlie Wilson',
            category: '+1 567-890-1234',
        },
        {
            id: 6,
            title: 'Eva Miller',
            category: '+1 678-901-2345',
        }])

    const tableCustomStyles = {
        headCells: {
            style: {
                fontSize: '20px',
                paddingLeft: '0 8px',
                justifyContent: 'center',
                background: '#00b6ee60',
                color: '#007FCF',
                // color: 'white'
            },
        },
        cells: {
            style: {
                fontSize: '17px',
                padding: '15px 10px',
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
            name: 'S.no',
            selector: row => row.id,
            width: '10%'
        },
        {
            name: 'Name',
            selector: row => row.title,
            cell: row => <span>{row.title}</span>,
            width: '20%'

        },
        {
            name: 'Phone',
            cell: row => <span>{row.category}</span>,
            selector: row => row.category,
            width: '30%'
        },

        {
            name: 'Action',
            cell: (r) => {
                return (
                    <span className='flex flex-row text-3xl space-x-6 items-center'>
                        <div className="edit text-blue-500 hover:text-blue-700 transition-all cursor-pointer">
                            <MdEditSquare />
                        </div>
                        <div className="del text-red-500 hover:text-red-700 transition-all cursor-pointer">
                            <MdDelete />
                        </div>
                    </span>
                )
            }
        }
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
            return data
        }
        else {
            return data
                .filter((row) => {
                    return row.name.toLowerCase().includes(searchQuery.toLowerCase())
                })
        }
    }


    return (

        <>

            <div className="actions bg-[#] bg-white px-4 py-3 flex flex-row items-center justify-between space-x-1">

                <div className="input relative w-2/4 sm:w-2/4">
                    <div className="icons  text-[#00BE95] absolute top-1/2 right-3 -translate-y-1/2">
                        <FaSearch />
                    </div>
                    <input placeholder='Search Prodcuts' type="text" className='w-full outline-none placeholder:font-light pr-9 px-4 py-2 border-2 border-[#00BE95] text-lg ' value={searchQuery} onChange={(e) => {
                        setSearchQuery(e.target.value)
                    }} />
                </div>
                <div className="actions w-2/4 sm:w-1/4">
                    <Link to={'/customers/add'} className="create flex justify-center flex-row items-center space-x-2 bg-[#00BE95] hover:bg-[#01876a] transition-all text-white text-center px-2 py-3 sm:px-4 text-sm sm:text-lg sm:py-2 cursor-pointer">
                        <div className="icon text-2xl text-white">
                            <IoIosAddCircle />
                        </div>
                        <div className="text">
                            Add Customer
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
