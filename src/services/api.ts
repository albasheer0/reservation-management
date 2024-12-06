interface ApiError {
    message: string;
    status?: number;
    statusText?: string;
  }
  
  const api = {
    async getTimeSlots() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/timeSlots`);
        if (!response.ok) {
          throw {
            message: 'Failed to fetch time slots',
            status: response.status,
            statusText: response.statusText
          };
        }
        
        return await response.json();
      } catch (error) {
        // Handle both network errors and our custom errors
        const apiError: ApiError = {
          message: error instanceof Error ? 
            error.message : 
            (error as ApiError).message || 'Unknown error occurred'
        };
  
        if (typeof error === 'object' && error !== null && 'status' in error) {
          apiError.status = (error as ApiError).status;
          apiError.statusText = (error as ApiError).statusText;
        }
  
        throw apiError;
      }
    }
  };
  
  export default api;