export const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    const hourStr = hour.toString().padStart(2, '0');
    slots.push(`${hourStr}:00`);
    slots.push(`${hourStr}:30`);
  }
  return slots;
};

export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const calculateBookingPosition = (booking: { startTime: string; endTime: string }, totalHeight: number) => {
  const [startHour, startMinute] = booking.startTime.split(':').map(Number);
  const [endHour, endMinute] = booking.endTime.split(':').map(Number);

  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;
  const dayMinutes = 24 * 60;

  const top = (startMinutes / dayMinutes) * totalHeight;
  const height = ((endMinutes - startMinutes) / dayMinutes) * totalHeight;

  return { top, height };
};

export const detectOverlap = (booking1: { startTime: string; endTime: string }, booking2: { startTime: string; endTime: string }) => {
  const [start1Hour, start1Minute] = booking1.startTime.split(':').map(Number);
  const [end1Hour, end1Minute] = booking1.endTime.split(':').map(Number);
  const [start2Hour, start2Minute] = booking2.startTime.split(':').map(Number);
  const [end2Hour, end2Minute] = booking2.endTime.split(':').map(Number);

  const start1 = start1Hour * 60 + start1Minute;
  const end1 = end1Hour * 60 + end1Minute;
  const start2 = start2Hour * 60 + start2Minute;
  const end2 = end2Hour * 60 + end2Minute;

  return start1 < end2 && start2 < end1;
};

export const calculateBookingWidth = (booking: { startTime: string; endTime: string }, overlappingBookings: { startTime: string; endTime: string }[]) => {
  const totalOverlaps = overlappingBookings.length;
  if (totalOverlaps === 0) return '100%';
  return `${100 / (totalOverlaps + 1)}%`;
};

export const calculateBookingOffset = (booking: { startTime: string; endTime: string }, overlappingBookings: { startTime: string; endTime: string }[]) => {
  const sortedBookings = [...overlappingBookings].sort((a, b) => {
    const [aHour, aMinute] = a.startTime.split(':').map(Number);
    const [bHour, bMinute] = b.startTime.split(':').map(Number);
    return aHour * 60 + aMinute - (bHour * 60 + bMinute);
  });

  const index = sortedBookings.findIndex(b => b === booking);
  const width = 100 / (overlappingBookings.length + 1);
  return `${index * width}%`;
};

export const getOverlappingBookings = (booking: { startTime: string; endTime: string }, allBookings: { startTime: string; endTime: string }[]) => {
  return allBookings.filter(b => b !== booking && detectOverlap(booking, b));
};