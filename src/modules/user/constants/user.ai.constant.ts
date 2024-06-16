const TONE_REQ = 'use tone %3$s for the article'
const VARIANT_REQ = 'generate %4$s different version and divide parts with ---'
const JSON_REQ = `json should contain these info : {blocks:[{type:"header or paragraph or linkTool", data:{level:"is type is header set number", text:"string"}}]}`

export const SYSTEM_PROMPT_MESSAGE = `%1$s. %2$s.${TONE_REQ}.${VARIANT_REQ}.${JSON_REQ}`
