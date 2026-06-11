export function getQueueStatus(currentCount) {
  if (currentCount === 0) return 'EMPTY';
  if (currentCount <= 2) return 'LIGHT';
  if (currentCount <= 4) return 'BUSY';
  return 'FULL';
}

export function getEstimatedWait(count, avgServiceTime, activeChairs) {
  if (count === 0) return 0;
  return Math.ceil((count / activeChairs) * avgServiceTime);
}

export const statusConfig = {
  EMPTY: {
    label: 'Empty',
    sublabel: 'Walk right in',
    color: 'var(--status-empty)',
    bg: 'var(--status-empty-bg)',
    ringPercent: 0,
    textColor: '#30A46C',
    bgColor: '#E8F8F0',
  },
  LIGHT: {
    label: 'Light',
    sublabel: 'Short wait',
    color: 'var(--status-light)',
    bg: 'var(--status-light-bg)',
    ringPercent: 33,
    textColor: '#E5A218',
    bgColor: '#FFF4DC',
  },
  BUSY: {
    label: 'Busy',
    sublabel: 'Some wait expected',
    color: 'var(--status-busy)',
    bg: 'var(--status-busy-bg)',
    ringPercent: 66,
    textColor: '#E54D2E',
    bgColor: '#FFECEB',
  },
  FULL: {
    label: 'Full',
    sublabel: 'Try later or book ahead',
    color: 'var(--status-full)',
    bg: 'var(--status-full-bg)',
    ringPercent: 100,
    textColor: '#B91C1C',
    bgColor: '#FEE2E2',
  },
};

export const BookingStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
};

export function holdSlot(salonId, date, time) {
  const key = `slot_${salonId}_${date}_${time}`;
  localStorage.setItem(key, JSON.stringify({ held: true, timestamp: Date.now() }));
}

export function releaseSlot(salonId, date, time) {
  const key = `slot_${salonId}_${date}_${time}`;
  localStorage.removeItem(key);
}

export function isSlotHeld(salonId, date, time) {
  const key = `slot_${salonId}_${date}_${time}`;
  const data = localStorage.getItem(key);
  if (!data) return false;
  const parsed = JSON.parse(data);
  if (Date.now() - parsed.timestamp > 15000) {
    localStorage.removeItem(key);
    return false;
  }
  return true;
}

export function generateSlots(salon, selectedDate) {
  const slots = [];
  const startHour = parseInt(salon.hours.open.split(':')[0]);
  const endHour = parseInt(salon.hours.close.split(':')[0]);
  const interval = Math.max(15, Math.round(salon.avgServiceTime / salon.activeChairs));

  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += interval) {
      const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      const isBooked = false; // for demo, all slots are free
      const isHeld = isSlotHeld(salon.id, selectedDate, time);
      slots.push({ time, available: !isBooked && !isHeld });
    }
  }
  return slots;
}