import React, { useState } from "react";
import MemberDashboardMenu from "../../../../components/dashboard-menu/members";
import Layout from "../../../../components/layout";
import axios from "axios";
import CustomButton from "../../../../components/custom-button";
import InputField from "../../../../components/input-field";
import Collapsible from "react-collapsible";
import {
  AiOutlineMail,
  AiOutlineMobile,
  AiOutlineWhatsApp,
  AiOutlineCar,
} from "react-icons/ai";
import { BiChevronRight, BiBadge } from "react-icons/bi";
import SectionHeader from "../../../../components/section-header";
const AdminTab_Members = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [currentOpened, setCurrentOpened] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (query) => {
    try {
      setSearchQuery(query);

      if (query.length > 0) {
        const _response = await axios.post("/members/search", {
          searchQuery: query,
        });

        if (_response.status === 200) {
          const { data } = _response;

          setSearchResults(data);
        }
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnPurge = async (id) => {
    try {
      let roleType = "purged";
      let body = {
        id,
        roleType,
      };

      const _response = await axios.put("/members/update-roles", body);

      if (_response.status === 200) {
        console.log(_response.data);
        handleSearch(searchQuery);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnUnpurge = async (id) => {
    try {
      let roleType = "unpurge";
      let body = {
        id,
        roleType,
      };

      const _response = await axios.put("/members/update-roles", body);

      if (_response.status === 200) {
        console.log(_response.data);
        handleSearch(searchQuery);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <SectionHeader heading="Members" />
        <div className="w-full space-y-5">
          <CustomButton
            label="Verify Members"
            link="/admin/members/verify"
            styleType={2}
            extraClasses="w-full"
          />
          <CustomButton
            label="Brownie Points"
            styleType={2}
            extraClasses="w-full"
          />
        </div>
        <InputField
          placeholder="Search for member"
          name="searchQuery"
          handleInputChange={(e) => handleSearch(e.target.value)}
          styleType={2}
        />
        <div className="w-full space-y-5">
          <p className="text-white text-center">Search Results</p>
          {searchResults.length > 0 ? (
            searchResults.map((_result, index) => (
              <Collapsible
                transitionTime={200}
                key={index}
                className="bg-charcoal p-2 rounded-md"
                contentInnerClassName="bg-charcoal text-sm space-y-2"
                triggerClassName="text-white"
                openedClassName="bg-charcoal text-white p-2 rounded-md"
                onTriggerOpening={() => setCurrentOpened(index)}
                open={index === currentOpened}
                trigger={
                  <div className="flex flex-row w-full justify-between cursor-pointer">
                    <p>{_result.firstName + " " + _result.lastName}</p>
                    <BiChevronRight className="text-red text-2xl" />
                  </div>
                }
              >
                <div className="flex flex-row mt-5">
                  <BiBadge className="text-red text-2xl" />
                  <div className="flex flex-row ml-6 space-x-3">
                    {_result.roles.map((_role, index) => (
                      <p
                        key={index}
                        className={`font-bold ${
                          _role.name === "REJECTED" || _role.name === "PURGED"
                            ? "text-red"
                            : _role.name === "ADMIN"
                            ? "text-red"
                            : "text-green"
                        }`}
                      >
                        {_role.name}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex flex-row mt-5">
                  <AiOutlineMail className="text-red text-2xl" />
                  <p className="text-white ml-6 opacity-50">
                    {_result.emailAddress}
                  </p>
                </div>
                <div className="flex flex-row">
                  <AiOutlineMobile className="text-red text-2xl" />
                  <p className="text-white ml-6 opacity-50">
                    {_result.mobileNumber}
                  </p>
                </div>
                <div className="flex flex-row">
                  <AiOutlineWhatsApp className="text-red text-2xl" />
                  <p className="text-white ml-6 opacity-50">
                    {_result.whatsAppNumber}
                  </p>
                </div>
                <div className="flex flex-row">
                  <AiOutlineCar className="text-2xl text-red" />
                  {_result.cars.map((_car, index) => (
                    <div className="flex flex-col" key={index}>
                      <div className="text-white ml-6 opacity-50">
                        <p>
                          {_car.carYear} {_car.carModel} {_car.carColor}
                        </p>
                      </div>
                      <div className="text-white ml-6 opacity-50">
                        <p>
                          {_car.plateEmirate} {_car.plateCode}{" "}
                          {_car.plateNumber}
                        </p>
                      </div>
                      <div className="text-white ml-6 opacity-50">
                        <p>{_car.vinNumber}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row space-x-6 p-5">
                  <CustomButton
                    label={
                      _result.roles.find((_role) => _role.name === "PURGED")
                        ? "UNPURGE"
                        : "PURGE"
                    }
                    handleOnClick={
                      _result.roles.find((_role) => _role.name === "PURGED")
                        ? () => handleOnUnpurge(_result.id)
                        : () => handleOnPurge(_result.id)
                    }
                    styleType={2}
                    extraClasses="w-full"
                  />
                  <CustomButton
                    label="EDIT"
                    styleType={2}
                    extraClasses="w-full"
                  />
                </div>
              </Collapsible>
            ))
          ) : (
            <p className="text-white text-center opacity-50">No results</p>
          )}
        </div>
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default AdminTab_Members;
