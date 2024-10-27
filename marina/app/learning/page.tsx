"use client"
import React, { useRef, useState, useEffect } from 'react';
import OpenAI from "openai";


const CamScreen: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    useEffect(() => {
        const enableVideoStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                setMediaStream(stream);
            } catch (error) {
                console.error('Error accessing webcam', error);
            }
        };

        enableVideoStream();
    }, []);

    useEffect(() => {
        if (videoRef.current && mediaStream) {
            videoRef.current.srcObject = mediaStream;
        }
    }, [videoRef, mediaStream]);

    useEffect(() => {
        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        };
    }, [mediaStream]);

    // Function to capture the image from the video stream
    const captureImage = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth; // Get the width of the video
            canvas.height = videoRef.current.videoHeight; // Get the height of the video
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height); // Draw the video frame to the canvas
                const imageSrc = canvas.toDataURL('image/jpeg'); // Base 64 string
                return imageSrc;
            }
        }
    };

    const handleCaptureClick = () => {
        const image = captureImage(); // Call captureImage and store its return value
        // setCapturedImage(image); // Store the captured image in state
        const openai = new OpenAI({
            apiKey: ,
            dangerouslyAllowBrowser: true
        });
        async function main() {
            const response = await openai.chat.completions.create({
                model: "gpt-4o", // Ensure the model name is correct.
                messages: [
                    {
                        role: "user",
                        content: "What is the person saying in asl?", // The text prompt
                    },
                    {
                        role: "user",
                        content: `![Image](data:image/jpeg;base64,${image})`, // Image included as Markdown syntax
                    },
                ],
            });


            console.log(response.choices[0]);
        }
        main();
    };

    return (
        <div>
            <video ref={videoRef} autoPlay={true} />
            <button onClick={handleCaptureClick}>Capture Image</button>
            {capturedImage && (
                <div>
                    <h2>Captured Image:</h2>
                    <img src={capturedImage} alt="Captured" />
                </div>
            )}
        </div>
    );
};

export default CamScreen;
