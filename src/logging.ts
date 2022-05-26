export const ol = (...messages: string[]) =>
  messages.map((message, index) => `${index + 1}. ${message}\n`)

export const ul = (...messages: string[]) =>
  messages.map(message => `- ${message}\n`)

export const tab = (amount = 2) => (message: string) =>
  ' '.repeat(amount) + message

export const breakline = (amount = 1) => '\n'.repeat(amount)