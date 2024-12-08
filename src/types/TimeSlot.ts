export interface Capacity {
    current_capacity: number;
    max_capacity: number;
  }
  
  export interface TimeSlot {
    id: number;
    start_time: string;
    end_time: string;
    category: string;
    capacity: Capacity;
  }
  export interface UpdatedSlot {
    id: string | number;
    currentCapacity: number;
    category: string;
  };