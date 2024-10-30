import React from "react";
import { createContext, useReducer } from "react";

export const ReviewContext = createContext();

const reviewReducer = (state, action) => {

    if (action.type === "SET_REVIEWS") {
        return { reviews: action.payload }
    }
    else if (action.type === "UPDATE_REVIEW") {
        return {}
    }
    else if (action.type === "REMOVE_REVIEW") {
        return {
            reviews: state.filter(review => {
                return review._id !== action.payload._id
            })
        }
    }
    else {
        return state
    }
}

const ReviewProvider = (props) => {

    const [state, dispatch] = useReducer(reviewReducer, {
        reviews: null
    })
    return (
        <ReviewContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </ReviewContext.Provider>
    )
}

export default ReviewProvider;