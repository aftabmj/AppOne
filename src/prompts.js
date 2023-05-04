export const prompt_types = {
  risk: {
    // type: "risk",
    prompt_prefix:
      "List a set of risks associated with the internal audit finding: ",
    include_user_input: true
  },
  recommendation: {
    // type: "recommendation",
    prompt_prefix:
      "List a set of recommendations associated with the above findings and risks",
    include_user_input: false
  }
};
