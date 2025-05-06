"use client";
import { infoIcon, micIcon, rightTickIcon, StartIcon } from "@/assets/SvgIcons";
import React, { useEffect, useState, useRef } from "react";

const RunMicTest = () => {
  const [mics, setMics] = useState([]);
  const [selectedMic, setSelectedMic] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [SuccessMessage, setSuccessMessage] = useState(null);
  const [testStatus, setTestStatus] = useState(""); // To track current test status
  const [recordedAudioURL, setRecordedAudioURL] = useState(null); // To store the recorded audio URL
  const streamRef = useRef(null);
  const streamRef2 = useRef(null);
  const mediaRecorderRef = useRef(null); // To store the MediaRecorder instance
  const audioChunksRef = useRef([]); // To store the recorded audio chunks
  const canvasRef = useRef(null); // Canvas ref for visual effects
  const analyserRef = useRef(null);

  useEffect(() => {
    const getMics = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioDevices = devices.filter(
          (device) => device.kind === "audioinput"
        );
        setMics(audioDevices);
        if (audioDevices.length > 0) {
          setSelectedMic(audioDevices[0].deviceId);
        }
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    if (accessGranted) {
      getMics();
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    }
  }, [accessGranted]);

  const requestMicAccess = async () => {
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setAccessGranted(true);
    } catch (error) {
      setTestStatus(
        "Error accessing the microphone. Please allow permission to access the microphone."
      );
      console.error("Error accessing the microphone.", error);
    }
  };

  const drawVisualizer = (analyser) => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");
    analyserRef.current = analyser;

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = "rgb(200, 200, 200)";
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "rgb(0, 0, 0)";

      canvasCtx.beginPath();

      const sliceWidth = (WIDTH * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * HEIGHT) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    draw();
  };

  const startTest = async () => {
    if (!selectedMic) return;
    setIsTesting(true);
    setTestStatus("Starting the microphone test...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: selectedMic } },
      });
      streamRef2.current = stream;

      const audioContext = new (window.AudioContext || window.AudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      source.connect(analyser);

      // Start drawing the visualizer
      drawVisualizer(analyser);

      // Record audio
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioURL(audioUrl);
        setSuccessMessage(`Microphone ${selectedMic} is working fine!`);
        setTestStatus("Test completed successfully.");
      };

      mediaRecorderRef.current.start(); // Start recording

      // Simulate a brief delay before confirming success
      setTimeout(() => {
        mediaRecorderRef.current.stop(); // Stop recording after 3 seconds
        setTestStatus("Recording complete.");
        setIsTesting(false);
        stopTest();
      }, 3000);
    } catch (error) {
      console.error("Error accessing the microphone.", error);
      setIsTesting(false);
      setTestStatus("Microphone test failed. Please try again.");
    }
  };

  const stopTest = () => {
    streamRef.current.getTracks().forEach((track) => {
      track.stop();
    });
    streamRef2.current.getTracks().forEach((track) => {
      track.stop();
    });
    // streamRef.current = null;

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    // clearInterval(audioRef.current);
    // setIsTesting(false);
    // setAccessGranted(false);
    // setMics([]);
    // setSelectedMic(null);
    // setRecordedAudioURL(null); // Clear the recorded audio
  };

  const handleMicChange = (event) => {
    setSelectedMic(event.target.value);
  };

  return (
    <div>
      {testStatus && (
        <p className="bg-red-100 text-red-800 font-medium me-2 px-2.5 py-3 rounded dark:bg-red-900 dark:text-red-300 mb-2">
          {testStatus}
        </p>
      )}
      {!accessGranted ? (
        <button
          className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:ring transition duration-300 flex justify-between items-center space-x-1"
          onClick={requestMicAccess}
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
              d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
            />
          </svg>{" "}
          <span>Start Mic Test</span>
        </button>
      ) : (
        <>
          <div className="mb-4">
            <label
              htmlFor="micSelect"
              className="block mb-2 bg-green-100 text-green-800 font-medium me-2 px-2.5 py-3 rounded dark:bg-green-900 dark:text-green-300"
            >
              <div className="flex justify-center space-x-3">
                <span>{infoIcon}</span>
                <span>
                  Your device is connected to the following audio input devices.
                  Please select a microphone and press "Start Mic Test."
                </span>
              </div>
            </label>
            <select
              id="micSelect"
              value={selectedMic || ""}
              onChange={handleMicChange}
              className="bg-white border border-gray-300 rounded-lg p-2"
            >
              {mics.map((mic) => (
                <option key={mic.deviceId} value={mic.deviceId}>
                  {mic.label || `Microphone ${mic.deviceId.substring(0, 5)}`}
                </option>
              ))}
            </select>
          </div>

          <canvas
            ref={canvasRef}
            width="400"
            height="100"
            className="border border-gray-300 my-3"
          ></canvas>

          {SuccessMessage && (
            <p className="bg-green-100 text-green-800 font-medium me-2 px-2.5 py-3 rounded dark:bg-green-900 dark:text-green-300 flex  space-x-3">
              <span>{rightTickIcon}</span>
              <span>{SuccessMessage}</span>
            </p>
          )}

          {!isTesting && (
            <button
              className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 mr-2 my-3"
              onClick={startTest}
              disabled={isTesting}
            >
              Start Mic Test
            </button>
          )}

          {recordedAudioURL && (
            <div>
              <p className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-3 rounded dark:bg-blue-900 dark:text-blue-300">
                Test completed! You can listen to your recorded audio:
              </p>
              <audio controls src={recordedAudioURL} className="my-4">
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {isTesting && (
            <button
              className="bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300 my-3"
              onClick={stopTest}
            >
              Stop Test
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default RunMicTest;
