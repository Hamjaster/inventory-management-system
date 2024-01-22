import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export default function usePurchase() {

    const [purchases, setPurchases] = useState([])
    const [loading, setLoading] = useState(false)

    const getPurchases = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get("http://localhost:3000/purchase")
            console.log(data)
            if (data.success) {
                setLoading(false)
                setPurchases(data.data)
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
        getPurchases()
    }, [])

    useEffect(() => {
        console.log(purchases)
    }, [purchases])


    return { purchases }
}

