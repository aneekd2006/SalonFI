import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import StatusBadge from '../../shared/components/StatusBadge';
import RatingStars from '../../shared/components/RatingStars';
import { categories } from '../../shared/data/salons';
import { getAllSalons } from '../../shared/data/salonRegistry';

export default function ExploreScreen() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const salons = getAllSalons();

  const filtered = salons.filter(s => {
    if (selectedCategory === 'Open Now' && !s.isOpen) return false;
    if (selectedCategory !== 'All' && selectedCategory !== 'Open Now' && s.category !== selectedCategory) return false;
    if (query && !s.name.toLowerCase().includes(query.toLowerCase()) &&
        !s.services.some(sv => sv.name.toLowerCase().includes(query.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className="px-4 pb-4">
      {/* Search input */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-surface-card rounded-full shadow-sm border border-border mt-2 mb-4">
        <Search size={16} className="text-text-tertiary flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search salons, services..."
          className="flex-1 text-sm text-text-primary bg-transparent outline-none"
          autoFocus
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4" style={{ scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat ? 'bg-brand text-white' : 'bg-surface-elevated text-text-secondary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Location filter */}
      <button className="flex items-center gap-1.5 mb-4">
        <MapPin size={14} className="text-brand" />
        <span className="text-sm font-medium text-brand">MG Road, Shillong</span>
        <ChevronDown size={14} className="text-brand-muted" />
      </button>

      {/* Results */}
      <div className="space-y-3">
        {filtered.map(salon => (
          <div
            key={salon.id}
            onClick={() => navigate(`/salon/${salon.id}`)}
            className="flex gap-4 p-4 bg-surface-card rounded-xl shadow-xs cursor-pointer active:scale-[0.98] transition-transform"
          >
            <img src={salon.photos[0]} alt={salon.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" loading="lazy" />
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-text-primary truncate">{salon.name}</h3>
              <div className="flex items-center gap-1 mt-0.5">
                <RatingStars rating={salon.rating} size="sm" />
                <span className="text-sm text-text-secondary">{salon.rating}</span>
                <span className="text-sm text-text-tertiary">({salon.reviewCount})</span>
              </div>
              <p className="text-xs text-text-tertiary mt-0.5">{salon.distance} · {salon.category} · {salon.isOpen ? 'Open' : 'Closed'}</p>
              <StatusBadge status={salon.queue.status} showWait waitMinutes={salon.queue.estimatedWait} size="sm" />
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search size={32} className="mx-auto text-text-tertiary mb-3" />
            <p className="text-text-secondary font-medium">No results found</p>
            <p className="text-sm text-text-tertiary mt-1">Try a different search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}