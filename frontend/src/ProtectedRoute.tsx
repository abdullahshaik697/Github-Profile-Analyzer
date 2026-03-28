import { useSelector } from "react-redux"
import { Navigate, useSearchParams } from "react-router-dom"
import type { RootState } from "./store/index"


export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = useSelector((state: RootState) => state.auth.token)
    const [searchParams] =  useSearchParams()
    const urlToken = searchParams.get("token")
    
    if (!token && !urlToken) {
        return <Navigate to="/login" replace />
    }
    return <>{children}</>
}