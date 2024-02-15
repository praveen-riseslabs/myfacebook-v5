export const VALIDATE = (getValues) => {
  return {
    username: {
      required: "username is required",
      pattern: {
        // [a-zA-Z0-9_]: Matches any uppercase letter, lowercase letter, digit, or underscore.
        // {3,20}: Specifies that the username should be between 3 and 20 characters in length.
        value: /^[a-zA-Z0-9_]{3,20}$/,
        message: "username should be between 3 and 20 characters in length.",
      },
    },
    email: {
      //[a-zA-Z0-9._%+-]+: Matches one or more word characters (alphanumeric), dots, underscores, percent signs, plus signs, or hyphens for the local part of the email address.
      // @gmail\.com: Matches the literal characters "@gmail.com".
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        message: "email should be a valid email address",
      },
    },
    password: {
      required: "Password is required",
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        message:
          "password must be minimum eight characters long and should contain at least one number.",
      },
    },
    confirmPassword: {
      required: "confirm Password is required",
      validate(v){
        const { password } = getValues();
        return v === password || "confirm password should match password";
      }
    },
  };
};
