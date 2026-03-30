import { Button, Card, CardBody } from "@heroui/react"
import { Icon } from "@iconify/react"

const Login = () => {
    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_BACKEND_URL+ "/auth/google"
    }

    return (

        <>
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Card className="w-full max-w-md bg-zinc-900 border border-zinc-800">
                    <CardBody className="p-8 flex flex-col items-center gap-6">

                        {/* Logo */}
                        <div className="text-4xl"><i className="fa-brands fa-github fa-xl" style={{ color: "rgb(255, 255, 255)" }}></i></div>

                        {/* Title */}
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-white">
                                GitHub Profile Analyzer
                            </h1>
                            <p className="text-zinc-400 mt-2">
                                Analyze any GitHub profile with AI
                            </p>
                        </div>

                        {/* Google Button */}
                        <Button
                            className="w-fit text-black bg-white rounded-lg py-1 px-6 flex items-center justify-center gap-2"
                            variant="solid"
                            onPress={handleGoogleLogin}
                        >
                            <Icon icon="devicon:google" width="20" />
                            Sign in with Google
                        </Button>

                    </CardBody>
                </Card>
            </div>
        </>

    )
}

export default Login

