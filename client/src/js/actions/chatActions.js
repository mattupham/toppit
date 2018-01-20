export const addMessage = (message) => {
  return {
    type: 'message',
    payload: message
  };
};
export const typeMessage = (user) => {
  return {
    type: 'typing',
    payload: user
  };
};