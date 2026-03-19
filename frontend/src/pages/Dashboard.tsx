import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { setCredentials } from "../store/authSlice"
import axios from "axios"
import type { RootState } from "../store/index"


const Dashboard = () => {
    const [searchParam] = useSearchParams()
    const token = searchParam.get("token")
    const name = searchParam.get("name")
    const email = searchParam.get("email")

    const storedToken = useSelector((state: RootState) => state.auth.token)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [result, setResult] = useState(null)

    useEffect(() => {
        if (token) {
            dispatch(setCredentials({
                token: token,
                user: {
                    name: name!,
                    email: email!
                }
            }))
            navigate('/dashboard', { replace: true })
        }
    }, [token])


    const handleAnalyzeProfile = async () => {

        const response = await axios.post("http://localhost:5000/api/analyze",
            { username },
            { headers: { "Authorization": `Bearer ${storedToken}`, } }
        )

        // const result = await response.data
        setResult(response.data)
    }

    return (
        <>
            <h1>Dasboard</h1>
            <div>
                <input type="text"
                    placeholder="Enter Github UserName"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleAnalyzeProfile}>Analyze</button>
            </div>

            {result && (
                <div>

                    <h1>Result</h1>

                    <p> Primary Language: {result.aiResult.primaryLanguage}</p>
                    <p> Skill Level: {result.aiResult.skillLevel}</p>

                    <h3>Ratings</h3>
                    <p>Languages: {result.aiResult.ratings.languages}/10</p>
                    <p>Projects: {result.aiResult.ratings.projects}/10</p>
                    <p>Social: {result.aiResult.ratings.social}/10</p>
                    <p>Consistency: {result.aiResult.ratings.consistency}/10</p>
                    <p>Code Quality: {result.aiResult.ratings.codeQuality}/10</p>
                    <p>Overall: {result.aiResult.ratings.overall}/10</p>

                    <h3>Strengths </h3>
                    {result.aiResult.strengths.map((s: string, i: number) => (
                        <p key={i}>{s}</p>
                    ))}
                    <h3>Improvements </h3>
                    {result.aiResult.improvements.map((s: string, i: number) => (
                        <p key={i}>{s}</p>
                    ))} 
                    <h3>Recommendation</h3>
                    <p>{result.aiResult.recommendation}</p>

                </div>
            )}
        </>
    )
}

export default Dashboard