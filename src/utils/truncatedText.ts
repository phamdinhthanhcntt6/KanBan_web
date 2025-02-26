export const truncated = (text: string, max?: number) => {
  const maxLength = max ?? 30;
  const truncated =
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  return truncated;
};
