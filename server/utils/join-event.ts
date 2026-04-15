import crypto from "crypto"
import bcrypt from "bcrypt"
import { RECOVERY_WORDS } from "./recoveryWords"

export const generateRecoveryPhrase = (wordCount = 3): string => {
  const words = []

  for (let i = 0; i < wordCount; i++) {
    const index = crypto.randomInt(0, RECOVERY_WORDS.length)
    words.push(RECOVERY_WORDS[index])
  }

  return words.join("-")
}

export async function hasRecoveryPhrase(recoveryPhrase: string): Promise<string> {
  const saltRounds = process.env.SALT_ROUNDS
    ? parseInt(process.env.SALT_ROUNDS, 10)
    : 10

  return bcrypt.hash(recoveryPhrase, saltRounds)
}

export function normalizeRecoveryPhrase(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
}