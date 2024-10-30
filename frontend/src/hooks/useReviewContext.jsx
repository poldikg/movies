import { useContext } from "react";
import { ReviewContext } from "../context/ReviewContext";

export const useReviewContext = () => {
    const context = useContext(ReviewContext);

    if (!context) {
        return Error("useReviewContext must be used inside the useReviewProvider")
    }

    return context
}