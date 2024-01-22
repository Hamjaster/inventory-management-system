import { AddCircleOutline, FirstPage } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit, FaSearch } from "react-icons/fa";
import { BiArrowFromLeft } from 'react-icons/bi';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import AddSupplier from './AddSupplier';
import useSupplier from './useSuppliers';

export default function Suppliers() {
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0)
    const { suppliers, deleteSupplier } = useSupplier(count)

    const handleDelete = async (id) => {
        const data = await deleteSupplier(id)
        console.log(data)
    }

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
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Phone',
            cell: row => <span>{row.phone}</span>,
            selector: row => row.phone,
        },
        {
            name: 'Action',
            cell: (r) => {
                return (
                    <span className='flex flex-row text-3xl space-x-6 items-center'>
                        <div onClick={() => handleDelete(r._id)} className="del text-red-500 hover:text-red-700 transition-all cursor-pointer">
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
            return suppliers
        }
        else {
            return suppliers
                .filter((row) => {
                    return row.name.toLowerCase().includes(searchQuery.toLowerCase())
                })
        }
    }


    return (

        <>

            <div className="actions bg-[#] bg-white px-4 py-3 space-x-2 flex flex-row items-center justify-between">

                <div className="input relative w-3/5 sm:w-2/4 ">
                    <div className="icons  text-[#00BE95] absolute top-1/2 right-3 -translate-y-1/2">
                        <FaSearch />
                    </div>
                    <input placeholder='Search Suppliers' type="text" className='w-full outline-none placeholder:font-light pr-9 px-4 py-2 border-2 border-[#00BE95] text-lg ' value={searchQuery} onChange={(e) => {
                        setSearchQuery(e.target.value)
                    }} />
                </div>
                <div className="actions w-2/5 sm:w-1/4">
                    <Link to={'/suppliers/add'} className="create flex justify-center flex-row items-center space-x-2 bg-[#00BE95] hover:bg-[#01876a] transition-all text-white text-center px-2 py-3 sm:px-4 text-sm sm:text-lg sm:py-2 cursor-pointer">
                        <div className="icon text-2xl text-white">
                            <IoIosAddCircle />
                        </div>
                        <div className="text">
                            Add Supplier
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
