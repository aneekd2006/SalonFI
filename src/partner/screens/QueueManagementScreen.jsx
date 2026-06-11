import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { statusConfig } from '../../shared/data/queueLogic';
import StatusBadge from '../../shared/components/StatusBadge';
import Button from '../../shared/components/Button';
import BottomSheet from '../../shared/components/BottomSheet';

const initialQueue = [
  { id: 1, name: 'Rohan Sharma', service: 'Haircut (Men)', time: '2:18 PM', status: 'serving' },
  { id: 2, name: 'Ananya Das', service: 'Beard Trim', time: '2:25 PM', status: 'waiting' },
  { id: 3, name: 'Vikram Singh', service: 'Hair Color', time: '2:40 PM', status: 'waiting' },
  { id: 4, name: 'Priya Mehta', service: 'Facial', time: '3:00 PM', status: 'waiting' },
];

export default function QueueManagementScreen() {
  const [queue, setQueue] = useState(initialQueue);
  const [currentStatus, setCurrentStatus] = useState('LIGHT');
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newService, setNewService] = useState('');

  const handleMarkDone = (id) => {
    setQueue(queue.filter(item => item.id !== id));
  };

  const handleAdd = () => {
    if (newName && newService) {
      setQueue([...queue, { id: Date.now(), name: newName, service: newService, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: 'waiting' }]);
      setNewName('');
      setNewService('');
      setShowAdd(false);
    }
  };

  const config = statusConfig[currentStatus];

  return (
    <div className="p-4 lg:p-6 max-w-4xl">
      {/* Top Controls */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ backgroundColor: config.bgColor }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: config.textColor }} />
          <span className="text-lg font-bold" style={{ color: config.textColor }}>{config.label}</span>
        </div>
        <div className="text-sm text-text-secondary">~15 min wait</div>
        <div className="text-sm text-text-tertiary">2 of 3 chairs active</div>

        <div className="flex gap-1 ml-auto">
          {['EMPTY', 'LIGHT', 'BUSY', 'FULL'].map(s => (
            <button
              key={s}
              onClick={() => setCurrentStatus(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentStatus === s ? 'text-white' : 'bg-surface-elevated text-text-tertiary'
              }`}
              style={currentStatus === s ? { backgroundColor: statusConfig[s].textColor } : {}}
            >
              {statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Queue List */}
      <div className="space-y-2">
        {queue.map((item, idx) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
              idx === 0 ? 'bg-brand-light border border-brand/20' : 'bg-surface-card border border-border'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              idx === 0 ? 'bg-brand text-white' : 'bg-surface-elevated text-text-secondary'
            }`}>
              {idx + 1}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-text-primary">{item.name}</span>
                {idx === 0 && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand text-white">Serving now</span>
                )}
              </div>
              <p className="text-sm text-text-secondary">{item.service}</p>
              <p className="text-xs text-text-tertiary">Checked in {item.time}</p>
            </div>
            {idx === 0 ? (
              <button
                onClick={() => handleMarkDone(item.id)}
                className="px-6 py-2.5 bg-brand text-white text-sm font-bold rounded-lg min-h-[52px] shadow-sm hover:bg-brand-dark transition-colors"
              >
                MARK DONE ✓
              </button>
            ) : (
              <div className="flex gap-1">
                <button className="px-3 py-1.5 text-xs font-semibold text-status-empty bg-status-empty-bg rounded-lg">Arrived</button>
                <button className="px-3 py-1.5 text-xs font-semibold text-status-busy bg-status-busy-bg rounded-lg">Remove</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowAdd(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-brand text-white shadow-lg flex items-center justify-center hover:bg-brand-dark active:scale-95 transition-all z-10"
      >
        <Plus size={28} />
      </button>

      {/* Add Walk-in Sheet */}
      <BottomSheet isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Walk-in">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-text-tertiary mb-1 block">Name</label>
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Customer name"
              className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-tertiary mb-1 block">Service</label>
            <select
              value={newService}
              onChange={e => setNewService(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand"
            >
              <option value="">Select service</option>
              <option value="Haircut (Men)">Haircut (Men)</option>
              <option value="Beard Trim">Beard Trim</option>
              <option value="Hair Color">Hair Color</option>
              <option value="Facial">Facial</option>
            </select>
          </div>
          <Button variant="primary" size="lg" fullWidth onClick={handleAdd} disabled={!newName || !newService}>
            Add to Queue
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}