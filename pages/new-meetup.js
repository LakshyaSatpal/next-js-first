import React, { Fragment } from "react";
import NewMeetupForm from "../components/meetups/NewMeetupForm";
import Head from "next/head";
import axios from "axios";

function NewMeetupPage() {
  const newMeetupHandler = async (meetup) => {
    const response = await axios.post("/api/new-meetup", meetup);

    console.log(response.data);

    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="desc" content="A next js app for scheduling meetups" />
      </Head>
      <NewMeetupForm onAddMeetup={newMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
