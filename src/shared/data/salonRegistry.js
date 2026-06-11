import { salons } from './salons';
import { getEstimatedWait, getQueueStatus } from './queueLogic';

const FALLBACK_PHOTO = 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=300&q=80';

function safeParsePartners() {
  try {
    return JSON.parse(localStorage.getItem('salonfi_partners') || '[]');
  } catch {
    return [];
  }
}

export function partnerToSalon(partner, index = 0) {
  const activeChairs = Number(partner.chairs || partner.activeChairs || 2);
  const avgServiceTime = Number(partner.avgServiceTime || 30);
  const currentCount = 0;
  const status = getQueueStatus(currentCount);

  return {
    id: `registered-${partner.id || partner.email || index}`,
    partnerId: partner.id,
    name: partner.salonName || 'New Salon Partner',
    tagline: 'New on SalonFi',
    category: partner.salonCategory || 'Unisex Salon',
    address: partner.salonAddress || 'Shillong',
    distance: `${(2 + index * 0.4).toFixed(1)} km`,
    rating: 4.5,
    reviewCount: 0,
    totalBookings: 0,
    photos: [partner.photo || FALLBACK_PHOTO],
    isVerified: false,
    isFeatured: false,
    isOpen: true,
    isRegisteredPartner: true,
    hours: { open: partner.openTime || '09:00', close: partner.closeTime || '20:00' },
    queue: {
      status,
      currentCount,
      estimatedWait: getEstimatedWait(currentCount, avgServiceTime, activeChairs),
      lastUpdated: 'just now',
    },
    services: [
      { id: 'reg-s1', name: 'Standard Service', duration: avgServiceTime, price: 150, popular: true },
      { id: 'reg-s2', name: 'Haircut', duration: avgServiceTime, price: 200 },
      { id: 'reg-s3', name: 'Premium Styling', duration: avgServiceTime + 20, price: 350 },
    ],
    avgServiceTime,
    staff: [partner.fullName || 'Owner'],
    activeChairs,
  };
}

export function getRegisteredSalons() {
  return safeParsePartners().map(partnerToSalon);
}

export function getAllSalons() {
  return [...salons, ...getRegisteredSalons()];
}

export function getSalonById(id) {
  return getAllSalons().find((salon) => salon.id === id);
}