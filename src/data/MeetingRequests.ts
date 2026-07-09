export interface MeetingRequest {
  id: string;
  sender: string;
  receiver: string;
  title: string;
  date: string;
  time: string;
  status: "Pending" | "Accepted" | "Declined";
}

export const meetingRequests: MeetingRequest[] = [
  {
    id: "1",
    sender: "Sarah Johnson",
    receiver: "Michael Rodriguez",
    title: "Startup Pitch",
    date: "2026-07-15",
    time: "11:00",
    status: "Pending",
  },
  {
    id: "2",
    sender: "Michael Rodriguez",
    receiver: "Sarah Johnson",
    title: "Investor Meeting",
    date: "2026-07-10",
    time: "03:00 PM",
    status: "Pending",
  },
];