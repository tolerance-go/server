export const parseJSON = (text?: string) => {
  return text ? JSON.parse(text) : undefined;
};
