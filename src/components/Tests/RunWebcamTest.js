"use client";
import React, { useEffect, useState, useRef } from "react";
import { infoIcon, rightTickIcon } from "@/assets/SvgIcons";

const RunWebcamTest = () => {
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [testStatus, setTestStatus] = useState("");
  const [videoDetails, setVideoDetails] = useState({
    resolution: "",
    frameRate: 0,
  });
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const secondStreamRef = useRef(null);
  const frameRateInterval = useRef(null);

  useEffect(() => {
    const getCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setCameras(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedCamera(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    if (accessGranted) {
      getCameras();
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
        secondStreamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [accessGranted]);

  const requestCameraAccess = async () => {
    try {
      secondStreamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setAccessGranted(true);
    } catch (error) {
      setTestStatus(
        "Error accessing the camera. Please allow permission to access the camera."
      );
      console.error("Error accessing the camera.", error);
    }
  };

  const calculateFrameRate = (stream) => {
    const track = stream.getVideoTracks()[0];
    const settings = track.getSettings();
    const frameRate = settings.frameRate;
    setVideoDetails((prevDetails) => ({ ...prevDetails, frameRate }));
  };

  const startTest = async () => {
    if (!selectedCamera) return;
    setIsTesting(true);
    setTestStatus("Starting the camera test...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: selectedCamera },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 },
        },
      });
      streamRef.current = stream;

      setTestStatus("Checking video stream...");
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      // Get resolution and frame rate
      const track = stream.getVideoTracks()[0];
      const settings = track.getSettings();
      setVideoDetails({
        resolution: `${settings.width}x${settings.height}`,
        frameRate: settings.frameRate,
      });

      calculateFrameRate(stream);

      setTimeout(() => {
        setTestStatus("Test completed successfully.");
        setSuccessMessage(`Camera ${selectedCamera} is working fine!`);
      }, 2000);
    } catch (error) {
      console.error("Error accessing the camera.", error);
      setIsTesting(false);
      setTestStatus("Camera test failed. Please try again.");
    }
  };

  const stopTest = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (secondStreamRef.current) {
      secondStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (frameRateInterval.current) {
      clearInterval(frameRateInterval.current);
    }
    setIsTesting(false);
    setAccessGranted(false);
    setCameras([]);
    setSelectedCamera(null);
    setVideoDetails({ resolution: "", frameRate: 0 });
  };

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
  };

  return (
    <div className="p-4">
      {testStatus && (
        <p className="bg-blue-100 text-blue-800 font-medium px-2.5 py-3 rounded mb-3">
          {testStatus}
        </p>
      )}
      {!accessGranted ? (
        <button
          className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center space-x-2 focus:ring"
          onClick={requestCameraAccess}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
            />
          </svg>

          <span>Start Test</span>
        </button>
      ) : (
        <>
          <div className="mb-4">
            <label
              htmlFor="cameraSelect"
              className="block mb-2 bg-green-100 text-green-800 font-medium px-2.5 py-3 rounded"
            >
              <div className="flex items-center space-x-3">
                <span>{infoIcon}</span>
                <span>
                  Your device is connected to the following media devices.
                  Please select a device and press "Start Test Webcam"
                </span>
              </div>
            </label>
            <select
              id="cameraSelect"
              value={selectedCamera || ""}
              onChange={handleCameraChange}
              className="bg-white border border-gray-300 rounded-lg p-2 w-full"
            >
              {cameras.map((camera) => (
                <option key={camera.deviceId} value={camera.deviceId}>
                  {camera.label || `Camera ${camera.deviceId.substring(0, 5)}`}
                </option>
              ))}
            </select>
          </div>

          {successMessage && (
            <div className="mb-4">
              <p className="bg-yellow-100 text-yellow-800 font-medium px-2.5 py-3 rounded mb-2">
                Test Results:
              </p>
              <p className="bg-green-100 text-green-800 font-medium px-2.5 py-3 rounded flex items-center space-x-3">
                <span>{rightTickIcon}</span>
                <span>{successMessage}</span>
              </p>
            </div>
          )}
          {videoDetails.resolution && (
            <div className="mt-2 text-gray-600">
              <strong>Camera Resolution:</strong> {videoDetails.resolution}
              <br />
              <strong>Frame Rate:</strong> {videoDetails.frameRate.toFixed(2)}{" "}
              FPS
            </div>
          )}
          {!isTesting ? (
            <button
              className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 mr-2 my-3"
              onClick={startTest}
            >
              Start Test Webcam
            </button>
          ) : (
            <button
              className="bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300 my-3"
              onClick={stopTest}
            >
              Exit Camera
            </button>
          )}

          {isTesting && (
            <>
              <div className="mt-4">
                <video
                  ref={videoRef}
                  className="w-full h-auto border border-gray-300 rounded"
                  autoPlay
                  playsInline
                />
              </div>
              <div className="mt-4 text-lg font-semibold text-gray-700">
                {testStatus}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default RunWebcamTest;
