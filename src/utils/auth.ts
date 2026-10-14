import { SignJWT, jwtVerify } from "jose";

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET is not set. Add it to .env.local");
  }
  return secret;
};

export const signJwtToken = async (payload: { [key: string]: string | number | boolean }) => {
  const secret = new TextEncoder().encode(getJwtSecretKey());
  const alg = "HS256";
  
  return new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
};

export const verifyJwtToken = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(getJwtSecretKey());
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
};
