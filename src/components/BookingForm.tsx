import { faker } from "@faker-js/faker";

export const BookingForm = ({
  bookingId,
  coordinates,
  setConfirmedBooking,
  setCoordinates,
}) => {
  const today = new Date();
  const hours = today.getHours();
  const isWeekend = today.getDay() === 6 || today.getDay() === 0;
  const showToday = hours < 14 && !isWeekend;
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const twoDaysAfterToday = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
  const threeDaysAfterToday = new Date(
    today.getTime() + 3 * 24 * 60 * 60 * 1000
  );

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let bookedResource = coordinates.filter((resource) => {
      return resource.id === bookingId;
    })[0];
    const updatedResource = {
      ...bookedResource,
      booked: true,
      name: faker.person.fullName(),
      team: faker.word.noun(),
    };
    console.log(`setting confirmed booking to ${updatedResource.name}`)
    setConfirmedBooking(updatedResource);
    const newCoordinates = coordinates.map((resource) => {
      if (resource.id === bookingId) {
        return updatedResource;
      }
      return resource;
    });
    console.log(`setting coordinates`)
    setCoordinates(newCoordinates);
  };

  return (
    <div>
      <form onSubmit={handleBookingSubmit}>
        <BookingForm.Select
          showToday={showToday}
          today={today}
          tomorrow={tomorrow}
          twoDaysAfterToday={twoDaysAfterToday}
          threeDaysAfterToday={threeDaysAfterToday}
        />
        <br />
        <BookingForm.DatePicker
          showToday={showToday}
          today={today}
          tomorrow={tomorrow}
          threeDaysAfterToday={threeDaysAfterToday}
        />
        <br />
        <BookingForm.PrivateSwitch />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

const formatDate = (date: Date) => {
  return date.toDateString().split(" ").slice(0, -1).join(" ");
};

BookingForm.Select = ({
  showToday,
  today,
  tomorrow,
  twoDaysAfterToday,
  threeDaysAfterToday,
}) => {
  return (
    <>
      <label htmlFor="booking-date">Whole day booking</label>
      <br />
      <select name="booking-date" id="booking-date">
        {showToday ? <option value={today.toISOString()}>today</option> : null}
        <option value={tomorrow.toISOString()}>tomorrow</option>
        <option value={twoDaysAfterToday.toISOString()}>
          {formatDate(twoDaysAfterToday)}
        </option>
        <option value={threeDaysAfterToday.toISOString()}>
          {formatDate(threeDaysAfterToday)}
        </option>
      </select>
    </>
  );
};

BookingForm.DatePicker = ({
  showToday,
  today,
  tomorrow,
  threeDaysAfterToday,
}) => {
  return (
    <>
      <label htmlFor="booking-datepicker">Or choose a date</label>
      <br />
      <input
        type="date"
        id="booking-datepicker"
        name="booking-datepicker"
        min={
          showToday
            ? today.toISOString().split("T")[0]
            : tomorrow.toISOString().split("T")[0]
        }
        max={threeDaysAfterToday.toISOString().split("T")[0]}
      />
    </>
  );
};

BookingForm.PrivateSwitch = () => {
  return (
    <>
      <input type="checkbox" id="private" name="private" value="private" />
      <label htmlFor="private"> Private Booking</label>
      <br />
    </>
  );
};
