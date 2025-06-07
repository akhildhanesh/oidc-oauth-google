import { issueToken, verifyGoogleJWT } from "../services/authService.js"

export const tokenController = async (req, res) => {
    const { credential } = req.body
    if (!credential) throw new Error("Invalid credentials")
    const payload = await verifyGoogleJWT(credential)
    const jwt_token = await issueToken(payload)
    res.cookie("token", jwt_token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000
    })
    const refreshToken = await issueToken(payload, "refresh")
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000
    })
    res.json({
        token: jwt_token
    })
} 