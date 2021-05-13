import React from "react";
import Layout from "../../components/layout";
import SectionContainerLayout from "../../components/section-container-layout";

const SponsorsPage = () => {
  return (
    <Layout>
      <SectionContainerLayout title="Sponsors">
        <div className="md:space-y-20">
          <div className="mx-auto md:w-1/2 ">
            <a
              href="https://www.volkswagen-dubai.com/en.html"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="w-3/5 h-full mx-auto mb-5 md:w-3/6"
                src="/assets/logos/alnaboodah1.png"
                alt="Al Nabooda Logo"
              />
            </a>
            <p className="text-white opacity-80 leading-7">
              Al Nabooda Automobiles is the exclusive authorised distributor in
              Dubai and Northern Emirates for Audi, Porsche, and Volkswagen
            </p>
          </div>
          <hr className="text-red w-1/4 mx-auto" />
          <div className="mx-auto md:w-1/2">
            <a
              href="http://www.3whealthcare.ca/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="w-3/5 h-full mx-auto mb-5 md:w-3/6"
                src="/assets/logos/3w.png"
                alt="3W Healthcare Logo"
              />
            </a>
            <p className="text-white opacity-80 leading-7">
              3W Healthcare Solutions provides an extensive range of healthcare
              products such as walking aids, first aid kits, surgical
              equipments, dentail accessories and first aid products along with
              a unique client/vendor management system for First Aid products.
            </p>
          </div>
          <hr className="text-red w-1/4 mx-auto" />

          <div className="mx-auto md:w-1/2">
            <a href="https://www.rowe-oil.uk" target="_blank" rel="noreferrer">
              <img
                className="w-3/5 h-full mx-auto mb-5 md:w-3/6"
                src="/assets/logos/rowe.png"
                alt="Rowe Logo"
              />
            </a>
            <p className="text-white opacity-80 leading-7">
              Rowe is a race proven European OE spec oil and technical fluids.
              <br />
              <br />
              "HIGHTEC Made in Germany" lubricants with passing and vast
              experience for more than 25 years. These have been developed in
              ROWE's own laboratories and for customer's individual requirements
              thanks to their many years of racing experience (ROWE Racing: 2020
              24hrs Champions at Nurburgring and Spa). ROWE's diverse product
              range still offers maximum performance and top quality for all
              customers who want more than just the standard. <br />
              <br />
              Raise the limit!
            </p>
          </div>
        </div>
      </SectionContainerLayout>
    </Layout>
  );
};

export default SponsorsPage;
