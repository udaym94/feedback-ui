import { v4 as uuidv4 } from 'uuid';
import { createContext, useState } from 'react'


const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This is Feedback Item 1',
            rating: 10
        },
        {
            id: 2,
            text: 'This is Feedback Item 2',
            rating: 7
        },
        {
            id: 3,
            text: 'This is Feedback Item 3',
            rating: 8
        },
        {
            id: 4,
            text: 'This is Feedback Item 4',
            rating: 8
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })


    // Add Feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    // Delete Feedback
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to Delete ?')) {
            setFeedback(feedback.filter(item => item.id !== id));
        }
    }

    // Update Feedback
    const editFeedback = (item) => {
        setFeedbackEdit({ item, edit: true })
    }

    const updateFeedback = (id, updateItem) => {
        // console.log(id, updateItem)
        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...updateItem } : item))
    }

    return (
        <FeedbackContext.Provider value={{
            feedback,
            feedbackEdit,
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