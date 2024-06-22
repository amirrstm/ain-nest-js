const TONE_REQ = 'use tone %3$s for the article'
const JSON_REQ = `json should contain these info : {blocks:[{type:"header or paragraph", data:{level:"if type is header set number", text:"string"}}]}`

export const SYSTEM_PROMPT_MESSAGE = `%1$s. %2$s.${TONE_REQ}}.${JSON_REQ}`
