import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldCheck, RefreshCw, Plus, Clock, MapPin } from 'lucide-react';
import QueueRing from '../../shared/components/QueueRing';
import StatusBadge from '../../shared/components/StatusBadge';
import RatingStars from '../../shared/components/RatingStars';
import Button from '../../shared/components/Button';
import { reviews } from '../../shared/data/salons';
import { getSalonById } from '../../shared/data/salonRegistry';
import { statusConfig } from '../../shared/data/queueLogic';

export default function SalonDetailScreen() {
  const { salonId } = useParams();
  const navigate = useNavigate();
  const salon = getSalonById(salonId);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [showAllServices, setShowAllServices] = useState(false);

  if (!salon) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <p className="text-lg font-bold text-text-primary">Salon not found</p>
          <Button variant="ghost" onClick={() => navigate('/')} className="mt-2">Go home</Button>
        </div>
      </div>
    );
  }

  const salonReviews = reviews.filter(r => r.salonId === salon.id);
  const statusCfg = statusConfig[salon.queue.status];

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div className="relative h-[260px]">
        <div className="w-full h-full overflow-hidden">
          <img
            src={salon.photos[currentPhoto]}
            alt={salon.name}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(transparent 50%, rgba(26,26,26,0.8) 100%)' }} />
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center shadow-sm"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>

        {/* Photo dots */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-1.5">
          {salon.photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPhoto(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentPhoto ? 'bg-white w-4' : 'bg-white/50'}`}
            />
          ))}
        </div>

        {/* Salon info overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-1.5 mb-1">
            {salon.isVerified && (
              <span className="inline-flex items-center gap-0.5 text-xs text-white/80 font-medium">
                <ShieldCheck size={12} /> Verified
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{salon.name}</h1>
          <p className="text-sm text-white/80">{salon.category} · {salon.distance}</p>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="bg-surface-card rounded-xl shadow-sm mx-4 -mt-5 relative z-10 p-4 flex items-center justify-around">
        <div className="text-center">
          <div className="flex items-center justify-center gap-0.5">
            <RatingStars rating={salon.rating} size="sm" />
            <span className="text-base font-bold text-text-primary ml-1">{salon.rating}</span>
          </div>
          <p className="text-xs text-text-tertiary">{salon.reviewCount} reviews</p>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center">
          <p className="text-base font-bold text-text-primary">{salon.distance}</p>
          <p className="text-xs text-text-tertiary">{salon.address.split(',')[0]}</p>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center">
          <p className={`text-base font-bold ${salon.isOpen ? 'text-status-empty' : 'text-status-busy'}`}>
            {salon.isOpen ? 'Open' : 'Closed'}
          </p>
          <p className="text-xs text-text-tertiary">{salon.hours.open}–{salon.hours.close}</p>
        </div>
      </div>

      {/* Queue Status Section */}
      <div className="mx-4 mt-4 p-5 rounded-xl" style={{ backgroundColor: statusCfg.bgColor }}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold tracking-wider text-text-tertiary">LIVE QUEUE STATUS</p>
          <button className="flex items-center gap-1 text-xs text-text-secondary font-medium">
            <RefreshCw size={12} />
            Refresh
          </button>
        </div>
        <div className="flex items-center gap-5">
          <QueueRing size={80} status={salon.queue.status} />
          <div>
            <p className="text-xl font-bold" style={{ color: statusCfg.textColor }}>{statusCfg.label}</p>
            <p className="text-base text-text-secondary font-medium">{salon.queue.currentCount} people ahead</p>
            {salon.queue.estimatedWait > 0 && (
              <p className="text-base text-text-secondary">~{salon.queue.estimatedWait} min wait</p>
            )}
            {salon.queue.status === 'EMPTY' && (
              <p className="text-base font-semibold text-status-empty">Walk in now — no wait!</p>
            )}
          </div>
        </div>
        <p className="text-xs text-text-tertiary mt-3">Last updated {salon.queue.lastUpdated}</p>
      </div>

      {/* Services Section */}
      <div className="mx-4 mt-6">
        <p className="text-xs font-semibold tracking-wider text-text-tertiary mb-3">SERVICES</p>
        <div className="bg-surface-card rounded-xl divide-y divide-border shadow-xs">
          {(showAllServices ? salon.services : salon.services.slice(0, 4)).map(service => (
            <div key={service.id} className="flex items-center justify-between p-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-text-primary">{service.name}</span>
                  {service.popular && (
                    <span className="text-2xs font-semibold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: '#FFF4DC', color: '#E5A218' }}>
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-tertiary mt-0.5">{service.duration} min</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-brand">₹{service.price}</span>
                <button className="w-7 h-7 rounded-full bg-brand-light flex items-center justify-center text-brand">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {salon.services.length > 4 && (
          <button
            onClick={() => setShowAllServices(!showAllServices)}
            className="w-full text-center text-sm font-semibold text-brand py-3"
          >
            {showAllServices ? 'Show less' : `Show all ${salon.services.length} services`}
          </button>
        )}
      </div>

      {/* Reviews Section */}
      <div className="mx-4 mt-6">
        <p className="text-xs font-semibold tracking-wider text-text-tertiary mb-3">REVIEWS</p>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-3xl font-bold text-text-primary">{salon.rating}</span>
          <div>
            <RatingStars rating={salon.rating} size="md" />
            <p className="text-xs text-text-tertiary mt-0.5">{salon.reviewCount} reviews</p>
          </div>
        </div>
        <div className="space-y-3">
          {salonReviews.slice(0, 3).map(review => (
            <div key={review.id} className="bg-surface-card rounded-xl p-4 shadow-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand text-xs font-bold">
                  {review.userName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">{review.userName}</p>
                  <p className="text-xs text-text-tertiary">{review.date}</p>
                </div>
              </div>
              <RatingStars rating={review.rating} size="sm" />
              <p className="text-sm text-text-secondary mt-1 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
        {salonReviews.length > 3 && (
          <button className="w-full text-center text-sm font-semibold text-brand py-3">
            See all {salon.reviewCount} reviews
          </button>
        )}
      </div>

      {/* Sticky Book CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface-card border-t border-border px-4 py-3 z-20">
        <div className="max-w-phone mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-text-tertiary">From</p>
              <p className="text-base font-bold text-brand">₹{Math.min(...salon.services.map(s => s.price))}</p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate(`/book/${salon.id}`)}
              className="min-w-[160px]"
            >
              Book a Slot →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}