import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

import { MongoClient } from "mongodb";
// import { useEffect, useState } from "react";

const HomePage = (props) => {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   //send a http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS)
  // }, []);

  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export default HomePage;

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://khodam:123456salam@cluster0.pryxpkf.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   //fetch data from somewhere
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }
