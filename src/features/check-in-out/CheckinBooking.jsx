import { useEffect, useState } from "react";

import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
// import Checkbox from "ui/Checkbox";

import BookingDataBox from "../../features/bookings/BookingDataBox";

import useBooking from "../../features/bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";

import styled from "styled-components";
// import { box } from "styles/styles";
import useSettings from "../../features/settings/useSettings";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";

const Box = styled.div`
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();
  // const { mutate: checkin, isLoading: isCheckingIn } = useCheckin();
  const moveBack = useMoveBack();
  const { checkin, isCheckingin } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  // Can't use as initial state, because booking will still be loading
  useEffect(() => setConfirmPaid(booking?.is_paid ?? false), [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    total_price: totalPrice,
    num_guests: numGuests,
    has_breakfast: hasBreakfast,
    num_nights: numNights,
  } = booking;

  const optBreakfastPrice = settings.breakfast_price * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast)
      checkin({
        bookingId,
        breakfast: {
          has_breakfast: true,
          extras_price: optBreakfastPrice,
          total_price: totalPrice + optBreakfastPrice,
        },
      });
    else checkin({ bookingId, breakfast: {} });
  }

  // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>

        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingin}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
        >
          I confirm that {guests.full_name} has paid the total amout of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optBreakfastPrice
              )})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
