"use client";
import { infoIcon, rightTickIcon, StartIcon } from "@/assets/SvgIcons";
import React, { useEffect, useState, useRef } from "react";

const RunSpeakerTest = () => {
  const [speakers, setSpeakers] = useState([]);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testStatus, setTestStatus] = useState("");
  const [SuccessMessage, setSuccessMessage] = useState(null);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null); // Audio context for panning left/right
  const pannerRef = useRef(null); // To control the stereo panning

  useEffect(() => {
    const getSpeakers = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioOutputDevices = devices.filter(
          (device) => device.kind === "audiooutput"
        );
        setSpeakers(audioOutputDevices);
        if (audioOutputDevices.length > 0) {
          setSelectedSpeaker(audioOutputDevices[0].deviceId);
        }
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    getSpeakers();
  }, []);

  const startTest = (side) => {
    if (!selectedSpeaker) return;
    setIsTesting(true);
    setTestStatus(`Playing test sound on the ${side} speaker...`);

    try {
      const audio = new Audio("/left.mp3"); // Replace with actual test sound
      audioRef.current = audio;

      // Create AudioContext and panner for left/right sound
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      const source = audioContextRef.current.createMediaElementSource(
        audioRef.current
      );
      pannerRef.current = audioContextRef.current.createStereoPanner();

      // Pan left (-1) or right (1) depending on the test side
      pannerRef.current.pan.value = side === "left" ? -1 : 1;

      // Connect source to panner, then to output
      source
        .connect(pannerRef.current)
        .connect(audioContextRef.current.destination);

      // Play the audio on user interaction
      audioRef.current
        .play()
        .then(() => {
          setTestStatus(`Test sound is playing on the ${side} speaker...`);
          audioRef.current.onended = () => {
            setTestStatus(
              `Test completed successfully for the ${side} speaker.`
            );
            setSuccessMessage(`The ${side} speaker is working fine!`);
            setIsTesting(false);
          };
        })
        .catch((error) => {
          console.error(
            `Error playing the test sound on the ${side} speaker.`,
            error
          );
          setTestStatus(
            `Speaker test failed on the ${side} speaker. Make sure sound is not blocked by browser settings.`
          );
          setIsTesting(false);
        });
    } catch (error) {
      console.error(
        `Error playing the test sound on the ${side} speaker.`,
        error
      );
      setTestStatus(
        `Speaker test failed on the ${side} speaker. Please try again.`
      );
      setIsTesting(false);
    }
  };

  // const stopTest = () => {
  //   if (audioRef.current) {
  //     audioRef.current.pause();
  //     audioRef.current.currentTime = 0;
  //   }
  //   if (audioContextRef.current) {
  //     audioContextRef.current.close();
  //   }
  //   setIsTesting(false);
  //   setSpeakers([]);
  //   setSelectedSpeaker(null);
  // };

  const handleSpeakerChange = (event) => {
    setSelectedSpeaker(event.target.value);
  };

  return (
    <div>
      <div className="mb-4">
        <label
          htmlFor="speakerSelect"
          className="block mb-2 bg-green-100 text-green-800 font-medium me-2 px-2.5 py-3 rounded dark:bg-green-900 dark:text-green-300"
        >
          <div className="flex justify-center space-x-3">
            <span>{infoIcon}</span>
            <span>
              Your device is connected to the following audio output devices.
              Please select a speaker and press "Play Test Sound."
            </span>
          </div>
        </label>
        <select
          id="speakerSelect"
          value={selectedSpeaker || ""}
          onChange={handleSpeakerChange}
          className="bg-white border border-gray-300 rounded-lg p-2"
        >
          {speakers.map((speaker) => (
            <option key={speaker.deviceId} value={speaker.deviceId}>
              {speaker.label || `Speaker ${speaker.deviceId.substring(0, 5)}`}
            </option>
          ))}
        </select>
      </div>

      {isTesting && (
        <p className="bg-yellow-100 text-yellow-800 font-medium me-2 px-2.5 py-3 rounded dark:bg-yellow-900 dark:text-yellow-300">
          {testStatus}
        </p>
      )}

      {SuccessMessage && (
        <p className="bg-green-100 text-green-800 font-medium me-2 px-2.5 py-3 rounded dark:bg-green-900 dark:text-green-300 flex justify-start items-center space-x-3">
          <span>{rightTickIcon}</span>
          <span>{SuccessMessage}</span>
        </p>
      )}

      {!isTesting && (
        <div className="flex">
          <button
            className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 mr-2 my-3 flex space-x-2"
            onClick={() => startTest("left")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span> Test Left Speaker</span>
          </button>
          <button
            className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 mr-2 my-3 flex space-x-2"
            onClick={() => startTest("right")}
          >
            <span> Test Right Speaker</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      )}

      {/* {isTesting && (
        <button
          className="bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300 my-3"
          onClick={stopTest}
        >
          Stop Test
        </button>
      )} */}
    </div>
  );
};

export default RunSpeakerTest;
