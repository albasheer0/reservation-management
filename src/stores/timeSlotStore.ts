import { defineStore } from 'pinia';
import api from '../services/api';
import { TimeSlot, UpdatedSlot } from '../types/TimeSlot';

export const useTimeSlotStore = defineStore('timeSlot', {
  state: () => ({
    timeSlots: [] as TimeSlot[],
    filters: {
      color: '',
      date: '',
    },
  }),
  actions: {
    async fetchTimeSlots() {
      try {
        const response = await api.getTimeSlots();

        const normalizedData = response.map((slot: any) => ({
          id: slot.id,
          start_time: slot.start_time || slot.startTime,
          end_time: slot.end_time || slot.endTime,
          category: slot.category,
          capacity: {
            current_capacity:
              slot.capacity.current_capacity ||
              slot.capacity.current ||
              0,
            max_capacity:
              slot.capacity.max_capacity ||
              slot.capacity.maximum ||
              50,
          },
        }));

        this.timeSlots = normalizedData.reverse();
      } catch (error) {
        throw new Error(`Error fetching time slots: ${error}`);
      }
    },
    initializeSSE() {
      const eventSource = new EventSource(
        `${import.meta.env.VITE_API_URL}/sse`
      );

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const updatedSlot = {
          id: data.id,
          currentCapacity: data.currentCapacity || data.current_capacity,
          category: data.category,
        };
        this.updateTimeSlot(updatedSlot);
      };

      eventSource.onerror = (error) => {
        console.error('SSE error:', error);
        eventSource.close();
      };
    },
    updateTimeSlot(updatedSlot: UpdatedSlot) {
      const index = this.timeSlots.findIndex(
        (slot) => slot.id === updatedSlot.id
      );
      if (index !== -1) {
        this.timeSlots[index].capacity.current_capacity =
          updatedSlot.currentCapacity;
        this.timeSlots[index].category = updatedSlot.category;
      }
    },
    applyFilters(color: string, date: string) {
      this.filters.color = color;
      this.filters.date = date;
    },
  },
  getters: {
    groupedTimeSlots: (state) => {
      const filteredTimeSlots = state.timeSlots.filter((slot) => {
        const matchesColor =
          !state.filters.color || slot.category === state.filters.color;
        const matchesDate =
          !state.filters.date || slot.start_time.startsWith(state.filters.date);
        return matchesColor && matchesDate;
      });

      return filteredTimeSlots.reduce(
        (groups: Record<string, TimeSlot[]>, slot: TimeSlot) => {
          const date = slot.start_time.split('T')[0];
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(slot);
          groups[date].reverse();
          return groups;
        },
        {}
      );
    },
    colorCounts: (state) => {
      return state.timeSlots.reduce(
        (counts, slot) => {
          counts[slot.category] = (counts[slot.category] || 0) + 1;
          return counts;
        },
        {
          green: 0,
          yellow: 0,
          red: 0,
        } as Record<string, number>
      );
    },
    availableDates: (state) => {
      return [...new Set(state.timeSlots.map((slot) => slot.start_time.split('T')[0]))].sort();
    },
  },
});
