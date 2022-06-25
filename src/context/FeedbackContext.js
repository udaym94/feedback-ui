import { createContext, useState, useEffect } from 'react'


const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    const fetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id&_order=desc`)
        const data = await response.json();

        setFeedback(data);
        setIsLoading(false);
    }


    // Add Feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })
        const data = await response.json()
        setFeedback([data, ...feedback])
    }

    // Delete Feedback
    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to Delete ?')) {
            await fetch(`/feedback/${id}`, {
                method: 'DELETE',
            })

            setFeedback(feedback.filter(item => item.id !== id));
        }
    }

    // Update Feedback
    const editFeedback = (item) => {
        setFeedbackEdit({ item, edit: true })
    }

    const updateFeedback = async (id, updateItem) => {
        // console.log(id, updateItem)

        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateItem)
        })
        const data = await response.json()
        setFeedback([data, ...feedback])

        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...data } : item))
    }

    return (
        <FeedbackContext.Provider value={{
            feedback,
            feedbackEdit,
            isLoading,
            addFeedback,
            deleteFeedback,
            editFeedback,
            updateFeedback
        }}>
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext