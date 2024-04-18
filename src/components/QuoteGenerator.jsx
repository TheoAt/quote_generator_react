import { useEffect, useState } from "react"
import './quote.css'

export default function QuoteGenerator() {

    const [isLoading, setIsLoading] = useState(false)
    const [quote, setQuote] = useState()

    async function fetchQuote() {
        try {

            setIsLoading(true)
            const apiResponse = await fetch('https://api.quotable.io/quotes/random', {
                method: 'GET'
            })
            const result = await apiResponse.json()

            if (result && result.length > 0) {
                setIsLoading(false)
                setQuote(result[0])
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchQuote()
    }, [])

    const handleChangeQuote = () => {
        fetchQuote()
    }

    return (
        <div className="quote-container">
            {
                isLoading ?
                    <p className="loading">Loading quote ! Please wait a few secondes...</p>
                    :
                    <div className="quote-content">
                        <p className="quote">{quote?.content}</p>
                        <p className="quote-author">{quote?.author}</p>
                    </div>
            }

            <button className="quote-button" onClick={handleChangeQuote}>New Quote</button>
        </div>
    )
}