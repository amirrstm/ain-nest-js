export const IResumeBasicField = {
  url: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
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
      address: {
        type: String,
        required: false,
      },
    },
    required: false,
  },
}
