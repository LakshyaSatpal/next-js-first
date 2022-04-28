import React, { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="desc" content="A next js app for scheduling meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  // this function will run when you run build the application
  // Runs on Server side not on client side
  // fetch data from an API

  // always returns an object
  const client = await MongoClient.connect(
    "mongodb+srv://Lakshya:Lakshya%40123@cluster0.pxdli.mongodb.net/next-js?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        image: meetup.image,
        title: meetup.title,
        id: meetup._id.toString(),
        address: meetup.address,
        description: meetup.description,
      })),
    },
    revalidate: 1, // this page will be regrenerated after every 1 seconds
  };

  // getStaticProps is faster than getServerSideProps because you don't request data from backend for every incoming request
}

// export async function getServerSideProps(context) {
//   // this function will run on every request to the server
//   // Runs on Server side not on client side
//   // fetch data from an API
//   // const { req, res } = context;
// 	// you get access to the request object in getServerSideProps() not in getStaticProps()

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
