import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { setCredentials } from "../store/authSlice"
import axios from "axios"
import type { RootState } from "../store/index"
import { Avatar, Button, Card, CardBody, Chip, Input } from "@heroui/react"
import { Icon } from "@iconify/react"


const Dashboard = () => {
    const [searchParam] = useSearchParams()
    const token = searchParam.get("token")
    const name = searchParam.get("name")
    const email = searchParam.get("email")

    const storedToken = useSelector((state: RootState) => state.auth.token)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [result, setResult] = useState<any>(null)

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

        try {
            const response = await axios.post("http://localhost:5000/api/analyze",
                { username },
                { headers: { "Authorization": `Bearer ${storedToken}`, } }
            )

            // const result = await response.data
            setResult(response.data)

        } catch (error) {
            console.error(error)
        } finally {
            // setLoading(false)
        }
    }

    return (
        <>
          
            <div className="min-h-screen bg-black text-white">

                {/* Navbar */}
                <div className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <i className="fa-brands fa-github fa-xl" style={{ color: "white" }}></i>
                        <span className="font-bold text-lg">GitHub Analyzer</span>
                    </div>
                    <Button variant="bordered" className="text-white border-zinc-600" >
                        Logout
                    </Button>
                </div>

                <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">

                    {/* Search */}
                    <Card className="bg-zinc-900 border border-zinc-800">
                        <CardBody className="p-6 flex flex-row gap-3">
                            <Input
                                placeholder="Enter GitHub username..."
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="flex-1"
                                classNames={{ input: "text-black", inputWrapper: "bg-zinc-800 border-zinc-700" }}
                                startContent={<Icon icon="mdi:github" className="text-zinc-400" width="20" />}
                            />
                            <Button
                                className="bg-white text-black font-semibold px-6"
                                onPress={handleAnalyzeProfile}
                            // isLoading={loading}
                            >
                                Analyze
                            </Button>
                        </CardBody>
                    </Card>


                </div>

                {result && (
                    <>

                        {/* Profile Card */}
                        <Card className="bg-zinc-900 border border-zinc-800">
                            <CardBody className="p-6 flex flex-row gap-6 items-center">
                                <Avatar
                                    src={result.data.profile.avatarUrl}
                                    className="w-20 h-20"
                                />
                                <div className="flex flex-col gap-1 flex-1">
                                    <h2 className="text-xl font-bold">{result.data.profile.name}</h2>
                                    <p className="text-zinc-400 text-sm">@{result.data.profile.username}</p>
                                    <p className="text-zinc-300 text-sm">{result.data.profile.bio}</p>
                                    <div className="flex gap-4 mt-2 text-sm text-zinc-400">
                                        <span>👥 {result.data.profile.followers} followers</span>
                                        <span>👤 {result.data.profile.following} following</span>
                                        <span>📁 {result.data.profile.publicRepos} repos</span>
                                    </div>
                                </div>
                                <Chip className="bg-zinc-800 text-white capitalize" size="lg">
                                    {result.aiResult.skillLevel}
                                </Chip>
                            </CardBody>
                        </Card>

                        {/* Score Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                { label: "Overall", value: result.aiResult.ratings.overall, icon: "mdi:star" },
                                { label: "Languages", value: result.aiResult.ratings.languages, icon: "mdi:code-tags" },
                                { label: "Projects", value: result.aiResult.ratings.projects, icon: "mdi:folder" },
                                { label: "Social", value: result.aiResult.ratings.social, icon: "mdi:account-group" },
                                { label: "Consistency", value: result.aiResult.ratings.consistency, icon: "mdi:calendar-check" },
                                { label: "Code Quality", value: result.aiResult.ratings.codeQuality, icon: "mdi:code-braces" },
                            ].map((item, i) => (
                                <Card key={i} className="bg-zinc-900 border border-zinc-800">
                                    <CardBody className="p-4 flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                            <Icon icon={item.icon} width="16" />
                                            {item.label}
                                        </div>
                                        <div className="text-3xl font-bold text-white">
                                            {item.value}
                                            <span className="text-zinc-500 text-lg">/10</span>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>

                        {/* Strengths & Improvements */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Strengths */}
                            <Card className="bg-zinc-900 border border-zinc-800">
                                <CardBody className="p-6 flex flex-col gap-3">
                                    <h3 className="font-bold text-green-400 flex items-center gap-2">
                                        <Icon icon="mdi:check-circle" width="20" />
                                        Strengths
                                    </h3>
                                    {result.aiResult.strengths.map((s: string, i: number) => (
                                        <p key={i} className="text-zinc-300 text-sm flex gap-2">
                                            <span className="text-green-400">✓</span> {s}
                                        </p>
                                    ))}
                                </CardBody>
                            </Card>

                            {/* Improvements */}
                            <Card className="bg-zinc-900 border border-zinc-800">
                                <CardBody className="p-6 flex flex-col gap-3">
                                    <h3 className="font-bold text-yellow-400 flex items-center gap-2">
                                        <Icon icon="mdi:alert-circle" width="20" />
                                        Improvements
                                    </h3>
                                    {result.aiResult.improvements.map((s: string, i: number) => (
                                        <p key={i} className="text-zinc-300 text-sm flex gap-2">
                                            <span className="text-yellow-400">⚠</span> {s}
                                        </p>
                                    ))}
                                </CardBody>
                            </Card>

                            {/* Recommendation */}
                            <Card className="bg-zinc-900 border border-zinc-800">
                                <CardBody className="p-6 flex flex-col gap-3">
                                    <h3 className="font-bold text-blue-400 flex items-center gap-2">
                                        <Icon icon="mdi:lightbulb" width="20" />
                                        Recommendation
                                    </h3>
                                    <p className="text-zinc-300 text-sm leading-relaxed">
                                        {result.aiResult.recommendation}
                                    </p>
                                </CardBody>
                            </Card>
                        </div>
                    </>
                )}

            </div>
        </>
    )
}

export default Dashboard


// <div>
//     <h1>Result</h1>

//     <p> Primary Language: {result.aiResult.primaryLanguage}</p>
//     <p> Skill Level: {result.aiResult.skillLevel}</p>

//     <h3>Ratings</h3>
//     <p>Languages: {result.aiResult.ratings.languages}/10</p>
//     <p>Projects: {result.aiResult.ratings.projects}/10</p>
//     <p>Social: {result.aiResult.ratings.social}/10</p>
//     <p>Consistency: {result.aiResult.ratings.consistency}/10</p>
//     <p>Code Quality: {result.aiResult.ratings.codeQuality}/10</p>
//     <p>Overall: {result.aiResult.ratings.overall}/10</p>

//     <h3>Strengths </h3>
//     {result.aiResult.strengths.map((s: string, i: number) => (
//         <p key={i}>{s}</p>
//     ))}
//     <h3>Improvements </h3>
//     {result.aiResult.improvements.map((s: string, i: number) => (
//         <p key={i}>{s}</p>
//     ))}
//     <h3>Recommendation</h3>
//     <p>{result.aiResult.recommendation}</p>

// </div>