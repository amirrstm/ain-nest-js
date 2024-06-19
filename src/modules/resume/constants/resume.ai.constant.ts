export const RESUME_BIO_GENERATE_PROMPT = `
your task is to Generate three versions of a professional "About Me" section for my resume,
each containing approximately 100 words. The text should be fluent, engaging, and tailored to my role as %(role)s.
Incorporate metrics and numbers to make the content more impressive.JSON Structure Requirements:{"about_me":["","",""]}
`

export const RESUME_WORK_EXPERIENCE_GENERATE_PROMPT = `
your task is to Generate three versions of a professional highlights section for work experience,
each containing approximately 20 words. The text should be fluent, engaging, and tailored to the role as %1$s.
Incorporate metrics and numbers to make the content more impressive.JSON Structure Requirements:{"highlights":["","",""]}
`

export const RESUME_EDUCATION_HIGHLIGHT_GENERATE_PROMPT = `
your task is to Generate three versions of a professional highlights section for education,
each containing approximately 20 words. The text should be fluent, engaging, and tailored to the role as %1$s.
Incorporate metrics and numbers to make the content more impressive.JSON Structure Requirements:{"highlights":["","",""]}
`

export const RESUME_PROJECT_HIGHLIGHT_GENERATE_PROMPT = `
your task is to Generate three versions of a professional highlights section for project,
each containing approximately 20 words. The text should be fluent, engaging, and tailored to the project %1$s.
Incorporate metrics and numbers to make the content more impressive.JSON Structure Requirements:{"highlights":["","",""]}
`

const JSON_OUTPUT =
  '{"skills":[],"languages":[],"educations":[{"studyType":"","area":"","institution":""}],"work_experiences":[{"name":"","position":"","highlights":[]}],"about_me":""},"job_title":""}'

export const RESUME_GENERATE_PROMPT = `
Create a professional resume that includes comprehensive details about the candidate's work experience,
education, skills, and language proficiencies.
The resume should be meticulously tailored to a specific job role or industry of my choosing.
For each work experience listed, provide the company name,position,and three distinctive and compelling highlights that incorporate metrics and numbers.
Additionally,craft an outstanding and impressive "About Me" section.JSON Structure Requirements:${JSON_OUTPUT}
`

export const RESUME_GENERATE_OCCUPATION_PROMPT = `
As an innovative writer for recruiters,your task is to generate a professional resume for the role of %(role)s.
The resume should include comprehensive information about the candidate's professional experience, education, skills, and language proficiencies.
It must be tailored specifically to a chosen job role or industry. 
Craft a unique and attractive "About Me" section.
For each work experience,provide the company name, position, and three distinctive and compelling highlights that incorporate metrics and numbers.
JSON Structure Requirements:${JSON_OUTPUT}
`
