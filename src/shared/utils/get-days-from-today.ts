export const getDaysFromToday = (isoString: string) => {
  const inputDate = new Date(isoString);
  const today = new Date();

  const utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const utc2 = Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());

  const diffMs = utc2 - utc1;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays * -1 + 1;
}