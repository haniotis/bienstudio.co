/**
 * Prevents widows by ensuring at least two words stay together at the end of text
 * @param text - The text to process
 * @returns The text with widow prevention applied
 */
export function widowFix(text: string): string {
  if (!text || typeof text !== "string") {
    return text
  }

  // Split the text into words
  const words = text.trim().split(/\s+/)

  // Three words or fewer: leave alone — a widow needs a longer line to matter
  if (words.length <= 3) {
    return text
  }

  // Take all words except the last one
  const allButLast = words.slice(0, -1).join(" ")

  // Get the last word
  const lastWord = words[words.length - 1]

  // Return with non-breaking space between the last two words
  return `${allButLast}\u00A0${lastWord}`
}
