const RECOVERY_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

export const generateRecoveryCode = (length = 12): string => {
  let result = ""

  for(let i=0; i < length; i += 1) {
    const index = Math.floor(Math.random() * RECOVERY_ALPHABET.length)
    result += RECOVERY_ALPHABET[index]
  }

  return `${result.slice(0, 4)}-${result.slice(4, 8)}-${result.slice(8, 12)}`
}