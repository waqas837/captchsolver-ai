import React from "react";
import Paragraph from "./Paragraph";

const About = ({ AboutVidMateSec }) => {
  return (
    <div className="bg-gray-100 p-4 my-16">
      {/* centered section */}
      <section className="m-auto text-center">
        <img src="/download.png" className="my-10 text-center m-auto" alt="" />
        <h1 className="text-5xl my-10"> {AboutVidMateSec.t1} </h1>
        {/* ratings */}
        <div className="flex justify-center items-center space-x-2">
          <p className="text-red-300 text-xl">4.9</p>
          <img width={20} height={20} src="u41.svg" alt="" />
          <img width={20} height={20} src="u41.svg" alt="" />
          <img width={20} height={20} src="u41.svg" alt="" />
          <img width={20} height={20} src="u41.svg" alt="" />
          <img width={20} height={20} src="u45.svg" alt="" />
          <p>( 989264 {AboutVidMateSec.t2} )</p>
        </div>
      </section>

      {/* paragraph section */}
      <section>
        <Paragraph AboutVidMateSec={AboutVidMateSec} />
      </section>
    </div>
  );
};

export default About;
