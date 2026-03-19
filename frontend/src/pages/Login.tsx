
const Login = () => {
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:5000/auth/google"
    } 

    return (

        <>
            <h1>Github Portfolio Analyzer</h1>
            <p>Analyze any Github profile with AI. </p>

            <button onClick={handleGoogleLogin}> Continue with Google</button>

        </>

    )
}

export default Login