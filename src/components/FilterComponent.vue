<template>
  <div class="filter-container">
    <div class="filter-options">
      <label for="color-filter">Status:</label>
      <select id="color-filter" v-model="selectedColor" @change="emitFilters">
        <option value="">All Status</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
        <option value="red">Red</option>
      </select>

      <label for="date-filter">Date:</label>
      <select id="date-filter" v-model="selectedDate" @change="emitFilters">
        <option value="">All Dates</option>
        <option v-for="date in availableDates" :key="date" :value="date">
          {{ formatDate(date) }}
        </option>
      </select>

      <!-- Reset Filters Button -->
      <button @click="resetFilters" :disabled="!isFilterActive" class="reset-button">
        Reset Filters
      </button>
    </div>

    <div class="color-counters">
      <div class="indicator-green"></div><p>{{ colorCounts.green }}</p>
      <div class="indicator-yellow"></div><p>{{ colorCounts.yellow }}</p>
      <div class="indicator-red"></div><p>{{ colorCounts.red }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';

export default defineComponent({
  name: 'FilterComponent',
  props: {
    availableDates: {
      type: Array as PropType<string[]>,
      required: true,
    },
    colorCounts: {
      type: Object as PropType<Record<string, number>>,
      required: true,
    },
  },
  emits: ['filter-change'],
  setup(_, { emit }) {
    const selectedColor = ref<string>('');
    const selectedDate = ref<string>('');

    // Computed property to check if any filter is active
    const isFilterActive = computed(() => {
      return selectedColor.value !== '' || selectedDate.value !== '';
    });

    const emitFilters = () => {
      emit('filter-change', {
        color: selectedColor.value,
        date: selectedDate.value,
      });
    };

    const resetFilters = () => {
      selectedColor.value = '';
      selectedDate.value = '';
      emitFilters(); // Emit event to reset filters
    };

    const formatDate = (dateStr: string) => {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    };

    return {
      selectedColor,
      selectedDate,
      isFilterActive,
      emitFilters,
      resetFilters,
      formatDate,
    };
  },
});
</script>

<style scoped>
.filter-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.reset-button {
  background-color: #f4433600;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.reset-button:disabled {
  background-color: #cccccc00;
  color: #adacac8a;
  cursor: not-allowed;
}

.reset-button:hover:not(:disabled) {
  background-color: #d32f2f;
}

.indicator-green {
  width: 10px;
  height: 10px;
  background-color: #d4edda;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.indicator-yellow {
  width: 10px;
  height: 10px;
  background-color: #fff3cd;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.indicator-red {
  width: 10px;
  height: 10px;
  background-color: #f0afb4;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.color-counters {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  font-weight: bold;
  margin-right: 10px;
}
</style>
