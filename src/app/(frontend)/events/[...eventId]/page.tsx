import EventDetailsSection from "./_components/EventDetailsSection";

export const metadata = {
  title: "Exploring World - Event Details",
  description: "Welcome to event details page.",
  keywords: "event details, event location, event",
};

export type TEventDetailsProps = {
  params: {
    eventId: string;
  };
};

const EventDetailsPage = ({ params }: TEventDetailsProps) => {
  return (
    <div className="xl:w-8/12 mx-auto">
      <EventDetailsSection params={params} />
    </div>
  );
};

export default EventDetailsPage;
