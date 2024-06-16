export const PROMPT_LANGUAGES = {
  fa: 'Persian',
  en: 'English',
}

export const AI_LANG = (lang: string) =>
  `I want you to respond only in ${PROMPT_LANGUAGES[lang]}.All output must be in ${PROMPT_LANGUAGES[lang]}`
