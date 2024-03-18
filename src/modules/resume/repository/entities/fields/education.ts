export const IResumeEducationField = {
  institution: {
    type: String,
    required: false,
  },
  area: {
    type: String,
    required: false,
  },
  studyType: {
    type: String,
    required: false,
  },
  fieldOfStudy: {
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
  score: {
    type: String,
    required: false,
  },
  stillStudying: {
    type: Boolean,
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
