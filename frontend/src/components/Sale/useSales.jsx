import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export default function useSales() {

    const [sales, setSales] = useState([])
    const [loading, setLoading] = useState(false)

    const getSales = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/sale`)
            console.log(data)
            if (data.success) {
                setLoading(false)
                setSales(data.data)
                console.log(data.data)

            } else {
                setLoading(false)

            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        getSales()
    }, [])

    useEffect(() => {
        console.log(sales)
    }, [sales])


    return { sales }
}

