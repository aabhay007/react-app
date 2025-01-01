import React, { useState, useRef } from "react";

const ScreenRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      mediaRecorder.onstop = () => {
        setShowSavePopup(true); // Show popup after recording stops
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setRecording(true);
    } catch (err) {
      console.error("Error starting screen recording:", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const saveRecording = async () => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const formData = new FormData();
      formData.append("title", "My Screen Recording");
      formData.append("video", blob, "recording.webm");

      try {
        const response = await fetch("http://127.0.0.1:8000/api/recordings/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Uploaded successfully:", data);
          alert("Recording saved successfully!");
          setRecordedChunks([]); // Clear recorded chunks
          setShowSavePopup(false); // Close popup
        } else {
          console.error("Failed to upload recording");
          alert("Failed to save recording.");
        }
      } catch (error) {
        console.error("Error uploading recording:", error);
      }
    }
  };

  const discardRecording = () => {
    setRecordedChunks([]); // Clear recorded chunks
    setShowSavePopup(false); // Close popup
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={startRecording} disabled={recording} style={{ marginRight: "10px" }}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>

      {showSavePopup && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "20px" }}>
          <p>Do you want to save this recording?</p>
          <button onClick={saveRecording} style={{ marginRight: "10px" }}>
            Save
          </button>
          <button onClick={discardRecording}>Discard</button>
        </div>
      )}
    </div>
  );
};

export default ScreenRecorder;
