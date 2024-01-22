import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
export default function useSupplier(count) {

    const [suppliers, setSuppliers] = useState([])
    const [loading, setLoading] = useState(false)


    const getSuppliers = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get("/supplier")
            console.log(data)
            if (data.success) {
                setLoading(false)
                setSuppliers(data.data)
            } else {
                setLoading(false)
                console.log(data.data)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const deleteSupplier = async (id) => {
        setLoading(true)
        try {
            const { data } = await axios.delete(`/supplier/${id}`)
            return data
        } catch (error) {
            return error
            // console.log(error)
        }
    }

    useEffect(() => {
        getSuppliers()
    }, [count])



    return { suppliers, deleteSupplier }
}

