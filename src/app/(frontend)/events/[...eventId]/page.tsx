export type TEventDetailsProps = {
  params: {
    eventId: string;
  };
};

const EventDetailsPage = ({ params }: TEventDetailsProps) => {
  return <div>Event for {params?.eventId}</div>;
};

export default EventDetailsPage;
