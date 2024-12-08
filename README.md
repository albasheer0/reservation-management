# Reservation slots management

## Project Overview

This project is a high-performance timeslot display application, designed to efficiently manage and present timeslot data grouped by date. It includes advanced filtering options based on color status and date, ensuring users have an intuitive and responsive interface to view availability. The application is built for scalability, allowing for dynamic updates and real-time synchronization of timeslot information, including key metrics like category color (green, yellow, red) and current vs. maximum capacity.

## Design Choices

- **Framework**: This application is developed with **Vue 3**, leveraging the **Composition API** for its modularity and flexibility. This choice allows for clean separation of logic and easier maintenance, especially when handling reactive data and state.

- **State Management**: **Pinia** was strategically chosen for state management due to its lightweight nature and seamless integration with Vue 3. It handles timeslot data efficiently and facilitates real-time updates, enhancing both the development process and user experience.

- **CSS**: Instead of relying on pre-built UI libraries such as Bootstrap or Tailwind, **vanilla CSS** was implemented to maintain full control over styling and minimize dependencies. This decision helps ensure that all components are optimized for performance and consistency, resulting in a lightweight footprint with faster load times.

- **Components**: The project is broken down into reusable and well-defined components:
  - **App.vue**: The main component that orchestrates the entire application flow, including the grouping of timeslots by date. A **loading indicator** is integrated to enhance UX during data loading phases, and a **retry button** is implemented to handle failures with a clean error notification, giving the user actionable recovery steps. Additionally, it monitors network connectivity to alert users if they go offline, ensuring robust communication.
  - **TimeSlotComponent.vue**: Displays individual timeslot data, including key attributes such as start and end times, capacity metrics, and status color coding, ensuring that users can easily grasp availability details at a glance.
  - **FilterComponent.vue**: Provides sophisticated filtering options by color and date. It allows users to easily refine the displayed timeslots, enhancing the overall usability of the system. A reset function is included to clear filters efficiently.

- **Real-time Updates**: Real-time data handling is managed through a **state store** (Pinia) that integrates **Server-Sent Events (SSE)** to keep the UI synchronized with the latest available timeslot data. This approach ensures that users always have the most current information without manual refreshes.

## Running the Application Locally

To run this project locally, follow these streamlined steps:

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager

### Steps to Run

1. **Clone the repository**:
   
   ```bash
   git clone https://github.com/albasheer0/reservation-management.git
   cd reservation-management
   ```

2. **Install dependencies**:
   
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Run the application**:
   
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```


## Design Challenges and Solutions

- **CSS Styling**: Achieving a responsive and visually appealing design without a CSS framework required meticulous planning and detailed styling efforts. Through the use of **CSS Flexbox** and **CSS Grid**, a layout was created that seamlessly adapts to various screen sizes, delivering an intuitive user experience. The emphasis was on achieving consistency while minimizing the overhead associated with large CSS libraries.

- **Loading and Error Handling**: To maintain a polished user experience, a **loading indicator** is presented during the initial data load, and an error state is clearly communicated via a **retry button**. This ensures that users are well-informed about the application's state and have an actionable way to proceed if issues arise. The application also actively monitors network connectivity to notify users if they are offline, improving overall robustness.

- **Real-Time State Management**: To handle real-time updates, **Pinia** was preferred over other state management solutions like Vuex due to its streamlined API and efficient integration with the Composition API. The ability to efficiently manage and react to incoming SSE data ensures that users have a responsive and seamless experience.

## Future Improvements

- **Styling Enhancements**: Moving forward, the styling will be further refined by expanding the use of **CSS Variables** for consistent theming. This will allow for better management of color schemes, including **light and dark modes**, enhancing user personalization and accessibility.

- **Testing**: Implementing **unit tests** and **integration tests** across all components is a priority to ensure stability, especially when handling diverse data scenarios. This step will furthef enhance reliability and reduce the likelihood of regressions during future updates.

## Conclusion

This project demonstrates a scalable and modular approach to building a timeslot display application using **Vue 3** and **Pinia**. By opting for **vanilla CSS**, it remains lightweight and performant, avoiding the pitfalls of heavy dependencies. This approach has provided a deeper understanding of fundamental web development practices and resulted in a maintainable and efficient codebase, ready for future expansions and improvements.

