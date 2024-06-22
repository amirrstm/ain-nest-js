export const PROMPT_LANGUAGES = {
  fa: 'Persian',
  en: 'English',
}

const PROMPTS_NAME = {
  fa: 'آی نویس',
  en: 'AINevis',
}

export const AI_LANG = (lang: string) =>
  `I want you to respond only in ${PROMPT_LANGUAGES[lang]}.All output must be in ${PROMPT_LANGUAGES[lang]}If user asked about you, you are ${PROMPTS_NAME[lang]}`
