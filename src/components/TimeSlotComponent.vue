<template>
  <div :class="['time-slot', categoryClass]">
    
    <div class="slot-date"><p>{{ timeRange.start }} </p> <p>{{ timeRange.end }}</p></div>
    <div class="slot-header">
      <p class="slot-capacity">{{ currentCapacity   }} / {{ maxCapacity }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { TimeSlot } from '../types/TimeSlot';

export default defineComponent({
  name: 'TimeSlotComponent',
  props: {
    timeSlot: {
      type: Object as () => TimeSlot,
      required: true,
    },
  },
  setup(props) {
    const slot =  computed(
      () => props.timeSlot
    )
const options = {
hour: 'numeric' as const,
minute: 'numeric' as const,
};
    const timeRange = computed(() => {
      const start = new Date(props.timeSlot.start_time);
      const end = new Date(props.timeSlot.end_time)
      
      return {
        start:Intl.DateTimeFormat(navigator.language, options ).format(start),
        end: Intl.DateTimeFormat(navigator.language, options).format(end)
      };
    });

    const currentCapacity = computed(
      () => props.timeSlot.capacity.current_capacity
    );
    const maxCapacity = computed(
      () => props.timeSlot.capacity.max_capacity
    );
    const categoryClass = computed(() => props.timeSlot.category);

    return {
      timeRange,
      currentCapacity,
      maxCapacity,
      categoryClass,
      slot
    };
  },
});
</script>

<style scoped>
.slot-header {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
    margin-bottom: -25px;

}
.slot-capacity{
  font-weight: bolder;
    color: black;
}
.time-slot {
  text-align: center;
user-select: none;
  padding: 10px;
  border-radius: 5px;
  width: 100%;

}
.time-slot.green {
  background-color: #d4edda;
}
.time-slot.yellow {
  background-color: #fff3cd;
}
.time-slot.red {
  background-color: #f0afb4;
}
.time-range {
  font-weight: bold;
}
.slot-date {
  display: flex;
  flex-direction: column;
  font-weight: bold;
    color: #000000;
    margin-top: -20px;
    margin-bottom: -5px;
    padding: 0;
}
.slot-date p {
  margin-bottom: -20px;
  margin-bottom: -16px;
}
.capacity {
  margin-top: 5px;
}
</style>
