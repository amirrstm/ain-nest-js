export const IResumeProjectField = {
  name: {
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
  organization: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  highlights: {
    type: [String],
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
}
