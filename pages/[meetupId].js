import React, { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
// import { useRouter } from "next/router";
// import { Fragment } from "react/cjs/react.production.min";
import MeetupDetail from "../components/meetups/MeetupDetail";
import Head from "next/head";
function MeetupDetails({ meetupData }) {
  //   const router = useRouter();
  //   const meetupId = router.query.meetupId;

  return (
    <Fragment>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="desc" content={meetupData.description} />
      </Head>
      <MeetupDetail
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  // this dynamic page has to be pre-generated as we are using getStaticProps() at the time of build
  // but we don't know, what "meetupId" user will request
  // so we need to specify the ids, for which we want this page to pre-generated and user should get 404 if he request any id other than these

  const client = await MongoClient.connect(
    "mongodb+srv://Lakshya:Lakshya%40123@cluster0.pxdli.mongodb.net/next-js?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const { meetupId } = context.params; // to get meetupId from URL

  const client = await MongoClient.connect(
    "mongodb+srv://Lakshya:Lakshya%40123@cluster0.pxdli.mongodb.net/next-js?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      },
    },
    revalidate: 1,
  };
}

export default MeetupDetails;
