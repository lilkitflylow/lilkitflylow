export const getDynamicDate = (offsetDays: number = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getMonth() + 1}/${d.getDate()}`;
};

export const getDynamicTime = (offsetMinutes: number = 0): string => {
  const d = new Date();
  d.setMinutes(d.getMinutes() + offsetMinutes);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
};
