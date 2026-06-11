import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MapPin, ChevronDown, Search, ChevronRight } from 'lucide-react';
import QueueRing from '../../shared/components/QueueRing';
import StatusBadge from '../../shared/components/StatusBadge';
import RatingStars from '../../shared/components/RatingStars';
import { salons, categories } from '../../shared/data/salons';
import useAuthStore from '../../stores/authStore';

function SalonListCard({ salon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex gap-4 p-4 bg-surface-card rounded-xl shadow-xs cursor-pointer active:scale-[0.98] transition-transform duration-150"
    >
      <img
        src={salon.photos[0]}
        alt={salon.name}
        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-text-primary truncate">{salon.name}</h3>
        <div className="flex items-center gap-1 mt-0.5">
          <RatingStars rating={salon.rating} size="sm" />
          <span className="text-sm text-text-secondary">{salon.rating}</span>
          <span className="text-sm text-text-tertiary">({salon.reviewCount})</span>
        </div>
        <p className="text-xs text-text-tertiary mt-0.5">{salon.distance} · {salon.category}</p>
        <div className="flex items-center justify-between mt-2">
          <StatusBadge status={salon.queue.status} showWait waitMinutes={salon.queue.estimatedWait} size="sm" />
        </div>
        <p className="text-xs text-text-tertiary mt-1 truncate">{salon.address}</p>
      </div>
    </div>
  );
}

function QueueStatusCard({ salon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-[180px] bg-surface-card rounded-xl shadow-sm cursor-pointer active:scale-[0.98] transition-transform duration-150 overflow-hidden"
    >
      <div className="h-[120px] overflow-hidden">
        <img src={salon.photos[0]} alt={salon.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-3">
        <h4 className="text-sm font-bold text-text-primary truncate">{salon.name}</h4>
        <p className="text-xs text-text-tertiary">{salon.distance} away</p>
        <div className="flex items-center gap-2 mt-2">
          <QueueRing size={40} status={salon.queue.status} />
          <div>
            <span className="text-lg font-bold text-text-primary">{salon.queue.currentCount}</span>
            <span className="text-xs text-text-tertiary ml-1">ahead</span>
            {salon.queue.estimatedWait > 0 && (
              <p className="text-xs text-text-tertiary">~{salon.queue.estimatedWait} min</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeScreen() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'GOOD MORNING';
    if (hour < 17) return 'GOOD AFTERNOON';
    return 'GOOD EVENING';
  };

  const filteredSalons = salons.filter(salon => {
    if (selectedCategory === 'Open Now' && !salon.isOpen) return false;
    if (selectedCategory !== 'All' && selectedCategory !== 'Open Now' && salon.category !== selectedCategory) return false;
    if (searchQuery && !salon.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="px-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between pt-1 pb-3">
        <div>
          <p className="text-xs font-semibold tracking-wider text-text-tertiary">{greeting()}</p>
          <h2 className="text-xl font-bold text-text-primary">{user?.name || 'Guest'}</h2>
        </div>
        <button className="relative p-2 touch-target">
          <Bell size={22} className="text-text-secondary" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-status-busy rounded-full" />
        </button>
      </div>

      {/* Location Bar */}
      <button className="w-full flex items-center gap-1.5 px-4 py-2 bg-brand-light rounded-full mb-4">
        <MapPin size={14} className="text-brand flex-shrink-0" />
        <span className="text-sm font-medium text-brand truncate">MG Road, Shillong</span>
        <ChevronDown size={14} className="text-brand-muted flex-shrink-0 ml-auto" />
      </button>

      {/* Search Bar */}
      <div
        onClick={() => navigate('/explore')}
        className="flex items-center gap-3 px-4 py-2.5 bg-surface-card rounded-full shadow-sm mb-5 cursor-pointer"
      >
        <Search size={16} className="text-text-tertiary flex-shrink-0" />
        <span className="text-sm text-text-tertiary">Search salons, services...</span>
      </div>

      {/* Live Near You Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-semibold tracking-wider text-text-tertiary">LIVE NEAR YOU</p>
            <p className="text-xs text-text-tertiary mt-0.5">Queue status updating now</p>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
          {salons.filter(s => s.isOpen).map(salon => (
            <QueueStatusCard key={salon.id} salon={salon} onClick={() => navigate(`/salon/${salon.id}`)} />
          ))}
        </div>
      </div>

      {/* All Salons Section */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold tracking-wider text-text-tertiary">ALL SALONS</p>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 mb-2" style={{ scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                selectedCategory === cat
                  ? 'bg-brand text-white shadow-sm'
                  : 'bg-surface-elevated text-text-secondary hover:bg-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Salon List */}
        <div className="flex flex-col gap-3">
          {filteredSalons.map(salon => (
            <SalonListCard key={salon.id} salon={salon} onClick={() => navigate(`/salon/${salon.id}`)} />
          ))}
          {filteredSalons.length === 0 && (
            <div className="text-center py-10">
              <p className="text-text-tertiary text-sm">No salons found</p>
              <button onClick={() => setSelectedCategory('All')} className="text-brand text-sm font-semibold mt-2">Show all</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}