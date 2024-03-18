export const IResumeVolunteerField = {
  organization: {
    type: String,
    required: false,
  },
  position: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
  summary: {
    type: String,
    required: false,
  },
  highlights: {
    type: [String],
    required: false,
  },
}
