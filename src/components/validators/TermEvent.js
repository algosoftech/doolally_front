import React from "react";

const TermEvent = () => {
  return (
    <>
      <div className="modal-body pt-0 monster">
        <div
          className="content-block"
          style={{ height: "300px", overflow: "auto" }}
        >
          <h5>
            <strong>General rules:</strong>
          </h5>
          <ol>
            <li>
              Attendees are expected to reach the venue well in time before the
              scheduled time of the event.
            </li>
            <li>
              For free events, we don't levy a cover charge. You can place an
              F&B order and settle your bill at the end of the event.
            </li>
            <li>
              For paid events, the fee includes Rs 300, that you can redeem for
              F&B at any Doolally Taproom in Mumbai. You will receive it as a
              code in an email from us, along with your booking confirmation
              details. However, if you are using a discount coupon code, your
              fee will not include F&B.
            </li>
            <li>
              You will also be given access to a dashboard. This is where you
              can contact the organisers or us for more details. You can also
              cancel your attendance here.
            </li>
            <li>
              Doolally will bear the 3% payment gateway fees except during
              cancellations by either the organiser or attendee.
            </li>
            <li>
              If you need to cancel your attendance to an event, you can, we
              will refund your money. However, the payment gateway transaction
              fee of 3% will be borne by you.
            </li>
            <li>
              If an organiser cancels the event, we will refund the full amount
              to you.
            </li>
            <li>
              In case you are unable to attend the workshop, and haven't managed
              to cancel your attendance 24 hours before the workshop, you will
              be considered as a No Show.
            </li>

            <li>
              In case of No Show: a. 50% of the workshop amount will be refunded
              to the attendee after deducting transaction fees of 3%-5% b. 50%
              will be paid to the organiser.
            </li>
          </ol>

          <h5>
            <strong>Contact:</strong>
          </h5>
          <p>Email: events@doolally.in</p>
        </div>
      </div>
    </>
  );
};

export default TermEvent;
