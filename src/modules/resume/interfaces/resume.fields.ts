export interface IResumeBasic {
  url?: string
  label?: string
  image?: string
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  summary?: string
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
  endDate?: Date
  startDate?: Date
  summary?: string
  position?: string
  highlights?: string[]
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
  startDate?: Date
  endDate?: Date
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
  startDate?: Date
  endDate?: Date
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
  date?: Date
  issuer?: string
  url?: string
}

export interface IResumeAward {
  title?: string
  date?: Date
  awarder?: string
  summary?: string
}

export interface IResumePublication {
  name?: string
  publisher?: string
  releaseDate?: Date
  url?: string
  summary?: string
}

export interface IResumeProject {
  name?: string
  startDate?: Date
  endDate?: Date
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
  date?: Date
  url?: string
  summary?: string
}

export interface IResumeTeaching {
  title?: string
  institution?: string
  date?: Date
  summary?: string
  location?: {
    city?: string
    state?: string
    country?: string
  }
}

export interface IResumeInvention {
  name?: string
  date?: Date
  summary?: string
  url?: string
}
