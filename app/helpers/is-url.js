import Helper from "@ember/component/helper";
import validator from "npm:validator";

export function isUrl([str] /*, hash*/) {
  return validator.isURL(str);
}

export default Helper.helper(isUrl);
