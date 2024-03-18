export const IResumeTeachingField = {
  title: {
    type: String,
    required: false,
  },
  institution: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: false,
  },
  summary: {
    type: String,
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
