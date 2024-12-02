import EventSection from "./_components/EventSection";

export const metadata = {
  title: "Exploring World - Discover Events",
  description: "Welcome to events page.",
  keywords: "event, events, discover events",
};

const EventsPage = () => {

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Discover events</h1>
      <EventSection />
    </div>
  );
};

export default EventsPage;
