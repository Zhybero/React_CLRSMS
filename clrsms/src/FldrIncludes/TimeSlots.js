



const TimeSlots = ({ date }) => {
    // Fetch available time slots for the selected date from API or a predefined schedule
    //const availableTimeSlots = fetchAvailableTimeSlots(date);
    const availableTimeSlots = [
        '2024-01-08',
        '2024-01-09',
        '2024-01-10',
        // Add more dates as needed
      ];

      
    return (
      <div>
        <h3>Available Time Slots:</h3>
        {/* Display available time slots */}
        {availableTimeSlots.map((timeSlot) => (
          <button key={timeSlot} onClick={() => handleTimeSlotSelect(timeSlot)}>
            {timeSlot}
          </button>
        ))}
      </div>
    );
  };

  export default TimeSlots;