import React, { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Monitor, Users } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const VideoCallPage: React.FC = () => {
  const [callActive, setCallActive] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);

  const handleStartCall = () => setCallActive(true);
  const handleEndCall = () => {
    setCallActive(false);
    setScreenSharing(false);
  };

  if (!callActive) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-6">
        <div className="p-6 bg-primary-50 rounded-full">
          <Video size={48} className="text-primary-600" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Start a Video Call</h1>
          <p className="text-gray-600 mt-2">Connect with investors or entrepreneurs face-to-face</p>
        </div>
        <Button size="lg" onClick={handleStartCall} leftIcon={<Video size={20} />}>
          Start Call
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <Card className="bg-gray-900 relative overflow-hidden" style={{ minHeight: '500px' }}>
        <div className="grid grid-cols-2 gap-2 p-2 h-full">
          <div className="bg-gray-800 rounded-lg flex items-center justify-center relative min-h-[240px]">
            {videoOn ? (
              <div className="text-center">
                <Users size={48} className="text-gray-500 mx-auto" />
                <p className="text-gray-400 text-sm mt-2">Your Camera</p>
              </div>
            ) : (
              <div className="text-center">
                <VideoOff size={48} className="text-gray-600 mx-auto" />
                <p className="text-gray-500 text-sm mt-2">Camera Off</p>
              </div>
            )}
            <span className="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
              You
            </span>
          </div>

          <div className="bg-gray-800 rounded-lg flex items-center justify-center relative min-h-[240px]">
            <div className="text-center">
              <Users size={48} className="text-gray-500 mx-auto" />
              <p className="text-gray-400 text-sm mt-2">Participant</p>
            </div>
            <span className="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
              Investor
            </span>
          </div>
        </div>

        {screenSharing && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-sm px-3 py-1 rounded-full flex items-center gap-2">
            <Monitor size={14} />
            Screen sharing active
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-90 p-4">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setMicOn(!micOn)}
              className={`p-3 rounded-full ${micOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-error-600 hover:bg-error-700'}`}
              aria-label="Toggle microphone"
            >
              {micOn ? <Mic size={20} className="text-white" /> : <MicOff size={20} className="text-white" />}
            </button>

            <button
              onClick={() => setVideoOn(!videoOn)}
              className={`p-3 rounded-full ${videoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-error-600 hover:bg-error-700'}`}
              aria-label="Toggle video"
            >
              {videoOn ? <Video size={20} className="text-white" /> : <VideoOff size={20} className="text-white" />}
            </button>

            <button
              onClick={() => setScreenSharing(!screenSharing)}
              className={`p-3 rounded-full ${screenSharing ? 'bg-primary-600 hover:bg-primary-700' : 'bg-gray-700 hover:bg-gray-600'}`}
              aria-label="Toggle screen share"
            >
              <Monitor size={20} className="text-white" />
            </button>

            <button
              onClick={handleEndCall}
              className="p-3 rounded-full bg-error-600 hover:bg-error-700"
              aria-label="End call"
            >
              <PhoneOff size={20} className="text-white" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};