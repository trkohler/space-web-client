
export const BookingForm = ({bookingId, coordinates, setCoordinates}) => {

    const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newCoordinates = coordinates.map((coordinate) => {
          if (coordinate.id === bookingId) {
            coordinate.booked = true;
          }
          return coordinate;
        });
        setCoordinates(newCoordinates);
      };

    return (
        <div>
        <form onSubmit={handleBookingSubmit}>
          <label htmlFor="booking_id">Booking ID</label>
          <input
            type="text"
            id="booking_id"
            name="booking_id"
            value={bookingId}
          />
          <br />
          <label htmlFor="time">time</label>
          <input
            type="time"
            id="time"
            name="time"
            min="09:00"
            max="18:00"
            defaultValue={"09:00"}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
}