export const IResumeBasicField = {
  url: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: {
      text: {
        type: String,
        required: false,
      },
      countryCode: {
        type: String,
        required: false,
      },
    },
    _id: false,
    required: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  summary: {
    type: String,
    required: false,
  },
  birthDate: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  marriage: {
    type: String,
    required: false,
  },
  military: {
    type: String,
    required: false,
  },
  location: {
    _id: false,
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
      address: {
        type: String,
        required: false,
      },
    },
    required: false,
  },
}
