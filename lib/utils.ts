export const getEllipsesText = (text: string, maxLength: number) => {
  if (text.length >= maxLength) {
    return text.substring(0, maxLength) + '...';
  } else {
    return text;
  }
};