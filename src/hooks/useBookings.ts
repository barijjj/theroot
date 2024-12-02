import { useState } from 'react';
import { Booking } from '../types';
import { generateId } from '../utils/helpers';

export const useBookings = (initialBookings: Booking[]) => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const addBooking = (booking: Omit<Booking, 'id'>) => {
    const newBooking = {
      ...booking,
      id: generateId(),
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, ...updates } : booking
      )
    );
  };

  return {
    bookings,
    addBooking,
    deleteBooking,
    updateBooking,
  };
};