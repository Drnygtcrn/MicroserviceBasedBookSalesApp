

module.exports.FormateData = (data) => {
    if (data) {
      return { data };
    } else {
      throw new Error("Data Not found!");
    }
  };

module.exports.ValidatePassword = async (enteredPassword,savedPassword) => {
  return (await enteredPassword === savedPassword);
};  