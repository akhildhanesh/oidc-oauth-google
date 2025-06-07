import { OAuth2Client } from "google-auth-library"
import jwt from "jsonwebtoken"

const { sign } = jwt

const client = new OAuth2Client(process.env.CLIENT_ID)

export const verifyGoogleJWT = async (access_key) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: access_key,
            audience: process.env.CLIENT_ID
        })

        const payload = ticket.getPayload()

        return payload
    } catch (err) {
        console.error('Token verification failed:', err);
        throw new Error('Invalid token');
    }
}

export const issueToken = (payload, type="access") => {
    if (type === "refresh") {
        return sign({
            name: payload.name,
            email: payload.email
        }, process.env.CLIENT_SECRET, {
            issuer: "localhost:3000",
            audience: "localhost:5173",
            expiresIn: "365d"
        })
    }
    return sign({
        name: payload.name,
        email: payload.email
    }, process.env.CLIENT_SECRET, {
        issuer: "localhost:3000",
        audience: "localhost:5173",
        expiresIn: "1d"
    })
}