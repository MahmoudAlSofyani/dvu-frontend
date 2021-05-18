import React, { useEffect, useState } from "react";
import MemberDashboardMenu from "../../../../../src/components/dashboard-menu/members";
import DropdownField from "../../../../../src/components/dropdown-field";
import Layout from "../../../../../src/components/layout";
import SectionHeader from "../../../../../src/components/section-header";
import { getAllEvents } from "../../../../../src/helpers/api-callers";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import axios from "axios";
const AdminTab_Events_Attendance = () => {
  const [events, setEvents] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [showQrReader, setShowQrReader] = useState(false);
  const [eventId, setEventId] = useState("");

  useEffect(() => {
    try {
      Promise.all([getAllEvents()])
        .then((_responses) => {
          if (_responses[0]) {
            let _eventsArray = [];

            _responses[0].forEach((_event) => {
              _eventsArray.push({
                label: _event.name,
                value: _event.name,
                id: _event.id,
              });
            });

            setEvents(_eventsArray);
            setIsDataLoaded(true);
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, [setEvents]);

  const handleSelectEvent = (e) => {
    try {
      setEventId(events.find((_event) => _event.value === e.target.value).id);

      setShowQrReader(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateEventStatus = async (result) => {
    try {
      let body = {
        eventId,
        memberId: result,
        isAttended: true,
      };

      const _response = await axios.put("/events/status", body);

      if (_response.status === 200) {
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <SectionHeader
          heading="Admin"
          backLink="/dashboard/members/admin/events"
        />
        <p className="text-white">Attendance</p>
        {isDataLoaded ? (
          <DropdownField
            placeholder="Select Event"
            options={events}
            styleType={2}
            handleInputChange={handleSelectEvent}
          />
        ) : null}
        {showQrReader ? (
          <div>
            <BarcodeScannerComponent
              width={500}
              height={500}
              onUpdate={(err, result) => {
                if (result) handleUpdateEventStatus(result.getText());
              }}
            />
          </div>
        ) : null}
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default AdminTab_Events_Attendance;
