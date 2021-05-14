import React from "react";
import Layout from "../../components/layout";
import SectionContainerLayout from "../../components/section-container-layout";

const AboutUsPage = () => {
  return (
    <Layout>
      <SectionContainerLayout title="The #Circle">
        <div className="mx-auto w-full">
          <img
            className="w-full h-full mx-auto mb-5"
            src="/assets/images/circle.jpeg"
            alt="Rowe Logo"
          />
          <p className="text-white opacity-80 leading-7">
            <span className="font-bold italic">Der Volkskreis UAE - </span>{" "}
            translate to "The People's Circle" from the German language.
          </p>
          <p className="text-white opacity-80 leading-7">
            Founded in 2019, we are the leading Volkswagen enthusiast club in
            the UAE.
          </p>
          <p className="text-white opacity-80 leading-7">
            We like to think of ourselves as a different kind of car enthusiast
            Club.
          </p>
        </div>
        <div className="mx-auto w-full">
          <p className="text-white opacity-80 leading-7">
            With over 200 active members, we are always holding events where
            people in the <span className="text-red font-bold">#Circle</span>{" "}
            can experience their cars.
          </p>
          <p className="text-white opacity-80 leading-7">
            To us, we do not care about the destination but the journey in
            between
          </p>
          <p className="text-white opacity-80 leading-7">
            Because it is only during the countless drives we have are where the
            memories are built
          </p>
        </div>
        <div className="mx-auto w-full">
          <img
            className="w-full h-full mx-auto mb-5"
            src="/assets/images/dvu-group-photo.jpg"
            alt="Rowe Logo"
          />
          <p className="text-white opacity-80 leading-7">
            And that is why we call ourselves the{" "}
            <span className="text-red font-bold">#Circle</span>{" "}
          </p>
          <p className="text-white opacity-80 leading-7">
            It is an endless loop of excitement, adrenaline rush, & passing
          </p>
          <p className="text-white font-bold text-center my-5">
            WE ARE THE #CIRCLE
          </p>
        </div>
      </SectionContainerLayout>
    </Layout>
  );
};

export default AboutUsPage;
