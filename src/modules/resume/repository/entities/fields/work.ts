export const IResumeWorkField = {
  name: {
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
  stillWorking: {
    type: Boolean,
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
  location: {
    type: {
      city: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
      },
      country: {
        type: String,
        required: false,
      },
    },
    required: false,
  },
}
