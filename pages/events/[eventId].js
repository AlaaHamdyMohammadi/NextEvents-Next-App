import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/ErrorAlert";
import Head from "next/head";
import Comments from '../../components/input/comments';

function EventDetailPage(props) {
  const { event } = props;
  if (!event) return <ErrorAlert><p>Loading</p></ErrorAlert>;

  return (
    <>
      <Head>
        <title>{`NextJS Events | ${event.title}`}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.address}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id}/>
    </>
  );
}
export default EventDetailPage;

export async function getStaticProps(context) {
  const { params } = context;
  const eventId = params.eventId;
  const event = await getEventById(eventId);

  return {
    props: { event, revalidate: 5 },
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths,
    fallback: true,
  };
}

