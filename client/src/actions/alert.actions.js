import { alertConst } from "../constants/alert.constants";

const success = message => {
  return {
    type: alertConst.SUCCESS,
    message
  };
};

const error = message => {
  return {
    type: alertConst.ERROR,
    message
  };
};

const clear = () => {
  return {
    type: alertConst.CLEAR
  };
};

export const alertActions = {
  success,
  error,
  clear
};
