import React, { useState } from "react";

interface MeetingModalProps {
  date: string;
  onClose: () => void;
  onSave: (meeting: {
    title: string;
    date: string;
    time: string;
    type: string;
  }) => void;
}

export const MeetingModal: React.FC<MeetingModalProps> = ({
  date,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("Availability");

  return (
<div
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
<div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">
          Schedule Meeting
        </h2>

        <input
          className="border w-full p-2 rounded mb-3"
          placeholder="Meeting Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="time"
          className="border w-full p-2 rounded mb-3"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <select
          className="border w-full p-2 rounded mb-4"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Availability</option>
          <option>Investor Meeting</option>
          <option>Startup Pitch</option>
        </select>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSave({
                title,
                date,
                time,
                type,
              })
            }
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
Send Request          </button>

        </div>

      </div>
    </div>
  );
};