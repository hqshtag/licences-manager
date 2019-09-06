const SAVE_FIELDS = "SAVE_FIELDS";
const RESET_FORM = "RESET_FORM";

const saveFields = fields => {
  return {
    type: SAVE_FIELDS,
    payload: {
      ...fields
    }
  };
};

const resetFields = () => {
  return {
    type: RESET_FORM
  };
};

const formActions = {
  saveFields,
  resetFields
};

export default formActions;
