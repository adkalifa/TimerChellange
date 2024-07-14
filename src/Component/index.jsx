import React from "react";
import NameSection from "./NameSection";
import Card from "./Card";

export default function Challenge() {
  return (
    <>
      <NameSection />
      <div className="gap-10 grid-cols-2 grid max-w-2xl mx-auto mt-10">
      <Card title={'EASY'}
       timer={1}
       />
       <Card title={'NOT EASY'}
       timer={5}
       />
       <Card title={'GETTING TOUGH'}
       timer={10}
       />
       <Card title={'PROS ONLY'}
       timer={15}
       />
      </div>
    </>
  );
}
