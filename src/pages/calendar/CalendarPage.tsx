import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { MeetingModal } from "../../components/calendar/MeetingModal";

export const CalendarPage: React.FC = () => {
const [events, setEvents] = useState([
  {
    title: "Investor Meeting",
    date: "2026-07-10",
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  {
    title: "Startup Pitch",
    date: "2026-07-15",
    backgroundColor: "#ea580c",
    borderColor: "#ea580c",
  },
]);

  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-6">
        Meeting Calendar
      </h1>

    <FullCalendar
  plugins={[dayGridPlugin, interactionPlugin]}
  initialView="dayGridMonth"
  selectable={true}
  editable={true}
  events={events}
  height="auto"
  dateClick={(info) => {
    setSelectedDate(info.dateStr);
    setShowModal(true);
  }}
  eventClick={(info) => {
    alert(
      `Meeting: ${info.event.title}\nDate: ${info.event.start?.toLocaleDateString()}`
    );
  }}
/>

      {showModal && (
        <MeetingModal
          date={selectedDate}
          onClose={() => setShowModal(false)}
  onSave={(meeting) => {
  let color = "#2563eb";

  if (meeting.type === "Availability") {
    color = "#16a34a";
  } else if (meeting.type === "Investor Meeting") {
    color = "#2563eb";
  } else if (meeting.type === "Startup Pitch") {
    color = "#ea580c";
  }

  setEvents([
    ...events,
    {
      title: `${meeting.title} (${meeting.time})`,
      date: meeting.date,
      backgroundColor: color,
      borderColor: color,
    },
  ]);

  setShowModal(false);
}}
        />
      )}
    </div>
  );
};