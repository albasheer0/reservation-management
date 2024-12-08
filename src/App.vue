<template>
  <div id="app">
    <!-- Loading Indicator -->
    <div v-if="loading" class="loading-indicator">
      <p>Loading timeslots, please wait...</p>
    </div>

    <!-- Error Message and Retry Button -->
    <div v-if="error && !loading" class="error-container">
      <p>{{ error }}</p>
      <button @click="fetchData">Retry</button>
    </div>

    <!-- Main Content -->
    <div v-if="!loading && !error" class="slot-container">
      <!-- Filter Component -->
      <FilterComponent
        :availableDates="availableDates"
        :colorCounts="colorCounts"
        @filter-change="applyFilters"
      />
    <div class="date-group">

      <!-- Display Grouped Time Slots -->
      <div v-for="(timeGroups, date) in groupedTimeSlots" :key="date">
        <details open>
          <summary>{{ formatDate(date) }}</summary>
          <div class="time-slots">
            <TimeSlotComponent
            v-for="slot in timeGroups"
            :key="slot.id"
            :timeSlot="slot"
            class="column"
            />
          </div>
        </details>
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useTimeSlotStore } from './stores/timeSlotStore';
import TimeSlotComponent from './components/TimeSlotComponent.vue';
import FilterComponent from './components/FilterComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    FilterComponent,
    TimeSlotComponent,
  },
  setup() {
    const store = useTimeSlotStore();
    const loading = ref(true);
    const error = ref<string | null>(null);

    // Fetch data and initialize SSE with error handling
    const fetchData = async () => {
      loading.value = true;
      error.value = null;
      try {
        if (!navigator.onLine) {
          throw new Error('You are offline. Please check your internet connection.');
        }
        await store.fetchTimeSlots();
        store.initializeSSE();
      } catch (err) {
        error.value = (err as Error).message || 'Failed to load timeslots. Please try again.';
      } finally {
        loading.value = false;
      }
    };

    // Fetch time slots on mount
    onMounted(() => {
      fetchData();
    });

    // Computed property to get grouped and filtered time slots
    const groupedTimeSlots = computed(() => store.groupedTimeSlots);

    // Get color counts and available dates from store
    const colorCounts = computed(() => store.colorCounts);
    const availableDates = computed(() => store.availableDates);

    // Apply filters through the store
    const applyFilters = (filters: { color: string; date: string }) => {
      store.applyFilters(filters.color, filters.date);
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
      groupedTimeSlots,
      formatDate,
      applyFilters,
      colorCounts,
      availableDates,
      store,
      loading,
      error,
      fetchData,
    };
  },
});
</script>

<style scoped>
details {
      border: 2px solid #2c2c2c; /* Blue border */
      border-radius: 8px;
      max-width: 100%;
      min-width: 100%;
      background-color: #7d7c7c00;
    }

    details[open] {
    }

    summary {
      cursor: pointer;
      font-weight: bold;
      font-size: 16px;
      margin: -10px -10px 10px -10px;
      padding: 10px;
      background-color: #3d3d3d; /* Blue background */
      color: white;
      border-radius: 6px 6px 0 0;
    }

    summary:hover {
      background-color: #1f1f1f; /* Darker blue on hover */
    }
.slot-container {
  padding: 15px;
  padding-right: 30px;
  height: 100%;
}


.column {
  flex: 0 0 calc(100% / 10 - 5px);
  box-sizing: border-box; 
}

.date-group {
  margin-bottom: 20px;
    display: grid;
    gap: 25px;
    grid-auto-flow: row;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-columns: 200px;
}

.time-slots {
  display: grid;
  padding: 5px;
  gap: 10px; /* Space between items */
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-columns: 100px; /* Fixed width for each slot */
}


.loading-indicator {
  text-align: center;
  font-size: 1.5rem;
  padding: 2rem;
}

.error-container {
  text-align: center;
  color: red;
  padding: 2rem;
}

.error-container button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
</style>
