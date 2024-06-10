export const RESUME_VOICE_BIO_PROMPT =
  'I want you to respond only in Persian.Please provide a 100 words and great about me. I will provide some basic information about me and you have to generate a professional about me for my resume. try to use some metrics and numbers to be impressive. Also My role is %(role)s. All Output shall be in Persian'

export const RESUME_BIO_GENERATE_PROMPT =
  'I want you to respond only in Persian.generate 3 version of about me text and each including 100 words.your task is to generate a professional and fluent about me for my resume. try to use some metrics and numbers to be impressive. Also My role is %(role)s. All Output shall be in Persian.json should be like this :{"about_me":[""]}'

const JSON_OUTPUT =
  '{"skills":[],"languages":[],"educations":[{"studyType":"","area":"","institution":""}],"work_experiences":[{"name":"","position":"","highlights":[]}],"about_me":""},"job_title":""}'

export const RESUME_GENERATE_PROMPT =
  'I want you to respond only in Persian.generate fluent persian professional resume include information about their professional experience, educations, skills, languages' +
  'The resume should be tailored for a specific job role or industry of my choice. you should give me work experiences name and 3 highlights about each work' +
  '(highlights should be unique and attractive, you should use metrics and number in highlights ) and a great and impressive about me section. All Output shall be in Persian. json should contain these info :' +
  JSON_OUTPUT

export const RESUME_GENERATE_OCCUPATION_PROMPT =
  'I want you to respond only in Persian.Your are innovative writer for recruiters. generate persian professional resume for the role %(role)s, include information about their professional experience, educations, skills, languages' +
  'The resume should be tailored for a specific job role or industry of my choice.write about me unique and attractive,you should give me work experiences name and 3 highlights about each work' +
  '(highlights should be unique and attractive, you should use metrics and number in highlights ) and a great and impressive about me section. All Output shall be in Persian. json should contain these info :' +
  JSON_OUTPUT
