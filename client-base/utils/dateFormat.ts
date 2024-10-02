export const formatTimeRange = (start: Date, end: Date) => {
  const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
  const startFormatted = start.toLocaleTimeString([], options);
  const endFormatted = end.toLocaleTimeString([], options);
  return `${startFormatted} - ${endFormatted}`;
};

export const calculateDuration = (start: Date, end: Date) => {
  const durationInMinutes = Math.floor((end.getTime() - start.getTime()) / 60000);
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes} min`;
  }
};
