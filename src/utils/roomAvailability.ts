// Utility functions for checking room availability
import { supabase } from '../lib/supabase';

export type RoomType = 
  | 'earth-and-clay'
  | 'bloom-and-herbs'
  | 'stone-and-fog'
  | 'golden-grasslands'
  | 'forest-bathing'
  | 'water-and-sky';

export interface RoomAvailabilityResult {
  isAvailable: boolean;
  bookedUntil?: string;
  bookedUntilTime?: string;
  message: string;
}

export interface RoomInfo {
  id: string;
  name: string;
  slug: RoomType;
  price: number;
  category: 'classic' | 'deluxe';
}

export const ROOM_TYPES: Record<RoomType, RoomInfo> = {
  'earth-and-clay': {
    id: 'earth-and-clay',
    name: 'Earth & Clay',
    slug: 'earth-and-clay',
    price: 3200,
    category: 'classic',
  },
  'bloom-and-herbs': {
    id: 'bloom-and-herbs',
    name: 'Bloom and Herbs',
    slug: 'bloom-and-herbs',
    price: 3200,
    category: 'deluxe',
  },
  'stone-and-fog': {
    id: 'stone-and-fog',
    name: 'Stone and Fog',
    slug: 'stone-and-fog',
    price: 2500,
    category: 'deluxe',
  },
  'golden-grasslands': {
    id: 'golden-grasslands',
    name: 'Golden Grasslands',
    slug: 'golden-grasslands',
    price: 3000,
    category: 'deluxe',
  },
  'forest-bathing': {
    id: 'forest-bathing',
    name: 'Forest Bathing',
    slug: 'forest-bathing',
    price: 3200,
    category: 'deluxe',
  },
  'water-and-sky': {
    id: 'water-and-sky',
    name: 'Water and Sky',
    slug: 'water-and-sky',
    price: 2500,
    category: 'deluxe',
  },
};

/**
 * Check if a room is available for the given dates
 * @param roomType - The type of room to check
 * @param checkIn - Check-in date (YYYY-MM-DD)
 * @param checkOut - Check-out date (YYYY-MM-DD)
 * @param checkOutTime - Check-out time (HH:MM format, default: 15:00)
 * @returns Promise with availability result
 */
export async function checkRoomAvailability(
  roomType: RoomType,
  checkIn: string,
  checkOut: string,
  checkOutTime: string = '15:00:00'
): Promise<RoomAvailabilityResult> {
  try {
    // Call the Supabase function to check availability
    const { data, error } = await supabase.rpc('check_room_availability', {
      p_room_type: roomType,
      p_check_in: checkIn,
      p_check_out: checkOut,
      p_check_out_time: checkOutTime,
    });

    if (error) {
      console.error('Error checking room availability (RPC):', error);
      console.log('Falling back to manual availability check...');
      // Fallback: check manually if function doesn't exist
      return await checkRoomAvailabilityManual(roomType, checkIn, checkOut, checkOutTime);
    }

    if (data && data.length > 0) {
      const result = data[0];
      console.log('Room availability result:', result);
      return {
        isAvailable: result.is_available,
        bookedUntil: result.booked_until || undefined,
        bookedUntilTime: result.booked_until_time || undefined,
        message: result.message || 'Room availability check completed',
      };
    }

    // Default to available if no data returned
    console.log('No availability data returned, defaulting to available');
    return {
      isAvailable: true,
      message: 'Room is available',
    };
  } catch (error) {
    console.error('Error in checkRoomAvailability:', error);
    // Fallback to manual check
    return await checkRoomAvailabilityManual(roomType, checkIn, checkOut, checkOutTime);
  }
}

/**
 * Manual availability check using direct query (fallback method)
 */
async function checkRoomAvailabilityManual(
  roomType: RoomType,
  checkIn: string,
  checkOut: string,
  checkOutTime: string = '15:00:00'
): Promise<RoomAvailabilityResult> {
  try {
    // Convert dates to Date objects for comparison
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const [hours, minutes] = checkOutTime.split(':').map(Number);
    const checkOutDateTime = new Date(checkOutDate);
    checkOutDateTime.setHours(hours, minutes, 0, 0);

    // Query for conflicting bookings
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('check_in, check_out, check_out_time, status')
      .eq('room_type', roomType)
      .in('status', ['confirmed', 'pending'])
      .order('check_out', { ascending: false })
      .order('check_out_time', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error);
      return {
        isAvailable: true, // Default to available on error
        message: 'Unable to verify availability. Please try again.',
      };
    }

    if (!bookings || bookings.length === 0) {
      console.log('No bookings found for room type:', roomType);
      return {
        isAvailable: true,
        message: 'Room is available',
      };
    }

    console.log(`Found ${bookings.length} booking(s) for room type: ${roomType}`);
    console.log('Checking dates:', { checkIn, checkOut, checkOutTime });

    // Check for conflicts
    for (const booking of bookings) {
      console.log('Checking booking:', { 
        check_in: booking.check_in, 
        check_out: booking.check_out, 
        check_out_time: booking.check_out_time 
      });
      if (!booking.check_in || !booking.check_out) continue;

      const bookingCheckIn = new Date(booking.check_in);
      const bookingCheckOut = new Date(booking.check_out);
      const bookingCheckOutTime = booking.check_out_time 
        ? booking.check_out_time.split(':').map(Number)
        : [15, 0];
      
      const bookingCheckOutDateTime = new Date(bookingCheckOut);
      bookingCheckOutDateTime.setHours(bookingCheckOutTime[0], bookingCheckOutTime[1], 0, 0);

      // Check if dates overlap: booking dates overlap with requested dates
      // Two date ranges overlap if: booking.check_in < requested.check_out AND booking.check_out >= requested.check_in
      const datesOverlap = 
        bookingCheckIn < checkOutDate && 
        bookingCheckOut >= checkInDate;

      // Check if check-out times conflict on the same date
      // If someone checks out on the same day as check-in, check the time
      const sameCheckOutDate = bookingCheckOut.toDateString() === checkInDate.toDateString();
      const timeConflict = sameCheckOutDate && bookingCheckOutDateTime > checkOutDateTime;

      if (datesOverlap || timeConflict) {
        const bookedUntil = booking.check_out;
        const bookedUntilTime = booking.check_out_time || '15:00:00';
        const timeStr = bookedUntilTime.substring(0, 5); // Format as HH:MM

        console.log('❌ Room conflict detected!', {
          datesOverlap,
          timeConflict,
          bookedUntil,
          bookedUntilTime
        });

        return {
          isAvailable: false,
          bookedUntil,
          bookedUntilTime,
          message: `Sorry, this room is booked until ${bookedUntil} at ${timeStr}. Please book after this date.`,
        };
      }
    }

    // No conflicts found
    console.log('✅ No conflicts found - room is available');
    return {
      isAvailable: true,
      message: 'Room is available',
    };
  } catch (error) {
    console.error('Error in manual availability check:', error);
    return {
      isAvailable: true, // Default to available on error
      message: 'Unable to verify availability. Please try again.',
    };
  }
}

/**
 * Get all bookings for a specific room type
 */
export async function getRoomBookings(roomType: RoomType) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('room_type', roomType)
      .in('status', ['confirmed', 'pending'])
      .order('check_out', { ascending: false })
      .order('check_out_time', { ascending: false });

    if (error) {
      console.error('Error fetching room bookings:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getRoomBookings:', error);
    return [];
  }
}

/**
 * Format date and time for display
 */
export function formatBookingDate(date: string, time?: string): string {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${formattedDate} at ${displayHour}:${minutes} ${ampm}`;
  }

  return formattedDate;
}

