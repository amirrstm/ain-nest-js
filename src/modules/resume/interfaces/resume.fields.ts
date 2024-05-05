export interface IResumeBasic {
  url?: string
  label?: string
  email?: string
  summary?: string
  lastName?: string
  firstName?: string
  birthDate?: Date | string
  phone?: { countryCode?: string; text?: string }
  location?: {
    city?: string
    state?: string
    country?: string
    address?: string
  }
}

export interface IResumeProfile {
  network?: string
  username?: string
}

export interface IResumeWork {
  name?: string
  url?: string
  endDate?: Date | string
  startDate?: Date | string
  summary?: string
  position?: string
  highlights?: string[]
  stillWorking?: boolean
  location?: {
    city?: string
    state?: string
    country?: string
  }
}

export interface IResumeEducation {
  institution?: string
  area?: string
  studyType?: string
  fieldOfStudy?: string
  startDate?: Date | string
  endDate?: Date | string
  score?: string
  stillStudying?: boolean
  location?: {
    city?: string
    state?: string
    country?: string
  }
}

export interface IResumeVolunteer {
  organization?: string
  position?: string
  url?: string
  startDate?: Date | string
  endDate?: Date | string
  summary?: string
  highlights?: string[]
}

export interface IResumeSkill {
  name?: string
  level?: number
  hasLevel?: boolean
  description?: string
}

export interface IResumeLanguage {
  level?: number
  fluency?: string
  language?: string
  hasLevel?: boolean
}

export interface IResumeCertificate {
  name?: string
  date?: Date | string
  issuer?: string
  url?: string
}

export interface IResumeAward {
  title?: string
  date?: Date | string
  awarder?: string
  summary?: string
}

export interface IResumePublication {
  name?: string
  publisher?: string
  releaseDate?: Date | string
  url?: string
  summary?: string
}

export interface IResumeProject {
  name?: string
  startDate?: Date | string
  endDate?: Date | string
  organization?: string
  description?: string
  highlights?: string[]
  url?: string
}

export interface IResumeInterest {
  name?: string
  keywords?: string[]
}

export interface IResumeReference {
  name?: string
  reference?: string
}

export interface IResumeSpeech {
  name?: string
  date?: Date | string
  url?: string
  summary?: string
}

export interface IResumeTeaching {
  title?: string
  institution?: string
  date?: Date | string
  summary?: string
  location?: {
    city?: string
    state?: string
    country?: string
  }
}

export interface IResumeInvention {
  name?: string
  date?: Date | string
  summary?: string
  url?: string
}
