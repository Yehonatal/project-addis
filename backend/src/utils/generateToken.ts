import { SignJWT } from "jose";
import JWT_SECRET from "./getJwtSecret";

/**
 * Generates a JWT token for a user.
 * @param {Object} payload = The payload to include in the token.
 * @param {string} expiresIn = The expiration time for the token (e.g., "1h", "2d").
 *
 */

export const generateToken = async (payload: any, expiresIn = "15m") => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256", enc: "A256GCM" })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(JWT_SECRET);
};
