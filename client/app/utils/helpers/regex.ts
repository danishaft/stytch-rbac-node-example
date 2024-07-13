export class Regex {
    static validateEmailRegex(email: string) {
      const regex = new RegExp(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/);
      return regex;
    }
  
    static isEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    static isWhitespace = /^(?=.*\s)/;
    static isContainsUppercase = /^(?=.*[A-Z])/;
    static isContainsLowercase = /^(?=.*[a-z])/;
    static isContainsAlphabet = /^(?=.*[a-zA-Z])/;
    static isContainsNumber = /^(?=.*[0-9])/;
    static isContainsSpecialChar =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
    static isValidLength = /^.{8,32}$/;
    static isLength = (props: { min: number; max: number }) => {
      let addMin = "/^.{min,max}$/".replace("min", props.min.toString());
      let addMax = addMin.replace(
        "max",
        props.max.toString()
      ) as unknown as RegExp;
      return new RegExp(addMax);
      // return /^.{10,20}$/;
      // return addMax as unknown as RegExp;
    };
    // static isLength = (min: number, max: number) => /^.{,10}$/;
}