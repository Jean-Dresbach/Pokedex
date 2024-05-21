export const capitalizeWord = (word: string) => {
  return word
    .split(/(\s|-)/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("")
}
