import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { logout, setCredentials } from "../store/authSlice"
import { useRef } from "react"
import axios from "axios"
import type { RootState } from "../store/index"
import { Button, Card, CardBody, Chip } from "@heroui/react"
import { Icon } from "@iconify/react"

const Dashboard = () => {
    const [searchParam] = useSearchParams()
    const token = searchParam.get("token")
    const name = searchParam.get("name")
    const email = searchParam.get("email")
    const resultRef = useRef<HTMLDivElement>(null)


    const storedToken = useSelector((state: RootState) => state.auth.token)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState("")
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
            setError("")
            setLoading(true)
            console.log("loading", true)
            const response = await axios.post("http://localhost:5000/api/analyze",
                { username },
                { headers: { "Authorization": `Bearer ${storedToken}`, } }
            )

            // const result = await response.data
            setResult(response.data)

        } catch (error) {
            console.error(error)
            setError("GitHub username not found. Please check and try again")
        } finally {

            setLoading(false)
            console.log("loading", false)
        }
    }

    const handleLogout = () => {
        try {

            dispatch(logout())
            navigate("/login")


        } catch (error) {
            console.log(error)
        }
    }

    const handleDownloadPDF = async () => {
        const jsPDF = (await import("jspdf")).default
        const pdf = new jsPDF("p", "mm", "a4")

        const pageWidth = pdf.internal.pageSize.getWidth()
        let y = 20

        // HEADER
        pdf.setFontSize(22)
        pdf.setTextColor(0, 0, 0)
        pdf.text("GitHub Profile Analysis Report", pageWidth / 2, y, { align: "center" })
        y += 15

        // PROFILE INFO
        pdf.setFontSize(14)
        pdf.text(`Developer: ${result.data.profile.name}`, 20, y)
        y += 8
        pdf.setFontSize(11)
        pdf.setTextColor(100, 100, 100)
        pdf.text(`Username: @${result.data.profile.username}`, 20, y)
        y += 8
        pdf.text(`Skill Level: ${result.aiResult.skillLevel}`, 20, y)
        y += 8
        pdf.text(`Followers: ${result.data.profile.followers}  |  Following: ${result.data.profile.following}  |  Repos: ${result.data.profile.publicRepos}`, 20, y)
        y += 15

        // RATINGS
        pdf.setFontSize(14)
        pdf.setTextColor(0, 0, 0)
        pdf.text("Ratings", 20, y)
        y += 8
        pdf.setFontSize(11)
        pdf.setTextColor(80, 80, 80)
        const ratings = [
            `Overall:      ${result.aiResult.ratings.overall}/10`,
            `Languages:    ${result.aiResult.ratings.languages}/10`,
            `Projects:     ${result.aiResult.ratings.projects}/10`,
            `Social:       ${result.aiResult.ratings.social}/10`,
            `Consistency:  ${result.aiResult.ratings.consistency}/10`,
            `Code Quality: ${result.aiResult.ratings.codeQuality}/10`,
        ]
        ratings.forEach((r) => {
            pdf.text(r, 20, y)
            y += 7
        })
        y += 8

        // STRENGTHS
        pdf.setFontSize(14)
        pdf.setTextColor(0, 150, 0)
        pdf.text("Strengths", 20, y)
        y += 8
        pdf.setFontSize(11)
        pdf.setTextColor(50, 50, 50)
        result.aiResult.strengths.forEach((s: string) => {
            pdf.text(`• ${s}`, 20, y)
            y += 7
        })
        y += 8

        // IMPROVEMENTS
        pdf.setFontSize(14)
        pdf.setTextColor(200, 150, 0)
        pdf.text("Improvements", 20, y)
        y += 8
        pdf.setFontSize(11)
        pdf.setTextColor(50, 50, 50)
        result.aiResult.improvements.forEach((imp: string) => {
            pdf.text(`• ${imp}`, 20, y)
            y += 7
        })
        y += 8

        // RECOMMENDATION
        pdf.setFontSize(14)
        pdf.setTextColor(0, 100, 200)
        pdf.text("Recommendation", 20, y)
        y += 8
        pdf.setFontSize(11)
        pdf.setTextColor(50, 50, 50)
        const lines = pdf.splitTextToSize(result.aiResult.recommendation, pageWidth - 40)
        pdf.text(lines, 20, y)

        // SAVE
        pdf.save(`${result.data.profile.username}-analysis.pdf`)
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
                    <Button variant="bordered" className="text-white border-zinc-600"
                        onPress={handleLogout}>
                        Logout
                    </Button>
                </div>

                <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">

                    {/* Search */}
                    <Card className="bg-zinc-900 border border-zinc-800">
                        <h1 className="pl-4 pt-4"> Enter the Github Profile username you want to analyze. </h1>
                        <CardBody className="p-4 flex flex-row gap-3 items-center">
                            <div className="flex-1 flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-lg px-4 h-12">
                                <Icon icon="mdi:github" className="text-zinc-400" width="25" />
                                <input
                                    type="text"
                                    placeholder="Enter GitHub username..."
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="flex-1 bg-transparent text-white placeholder:text-zinc-500 outline-none text-sm"
                                />

                                {error && (
                                    <p className="text-red-400 text-sm mt-2">{error}</p>
                                )}
                            </div>
                            <button
                                className="bg-white text-black font-semibold px-6 h-10 rounded-md min-w-24"
                                onClick={handleAnalyzeProfile}
                                disabled={loading}
                            >
                                {loading ? "Analyzing..." : "Analyze"}
                            </button>
                        </CardBody>
                    </Card>

                    {result && (
                        <>
                            <div ref={resultRef} className="flex flex-col gap-8">

                                {/* Download Button */}
                                <Button
                                    className="bg-white text-black font-semibold px-6"
                                    onPress={handleDownloadPDF}
                                >
                                    Download PDF
                                </Button>

                                {/* Profile Card */}
                                <Card className="bg-zinc-900 border border-zinc-800">
                                    <CardBody className="p-6 flex flex-col gap-4">
                                        {/* Top row — avatar + skill level */}
                                        <div className="flex items-center justify-between">
                                            <img
                                                src={result.data.profile.avatarUrl}
                                                alt="avatar"
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                            <Chip className="text-white capitalize" size="md">
                                                {result.aiResult.skillLevel} Level
                                            </Chip>
                                        </div>
                                        {/* Info */}
                                        <div className="flex flex-col gap-1">
                                            <h2 className="text-xl font-bold">{result.data.profile.name}</h2>
                                            <p className="text-zinc-400 text-sm">@{result.data.profile.username}</p>
                                            <p className="text-zinc-300 text-sm">{result.data.profile.bio}</p>
                                        </div>
                                        {/* Stats */}
                                        <div className="flex gap-4 text-sm text-zinc-400 flex-wrap">
                                            <span>👥 {result.data.profile.followers} followers</span>
                                            <span>👤 {result.data.profile.following} following</span>
                                            <span>📁 {result.data.profile.publicRepos} repos</span>
                                        </div>
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

                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Dashboard