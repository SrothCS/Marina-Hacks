"use client"
import React, { useRef, useState, useEffect } from 'react';
import OpenAI from "openai";
import fs from 'fs'

const CamScreen: React.FC = () => {

    const [responseText, setResponseText] = useState("");

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
                // const base64Data = imageSrc.replace(/^data:image\/jpeg;base64,/, "");
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
                model: "gpt-4o",
                messages: [
                    {
                        role: "user",
                        content: "Translate from ASL to English from the picture", // The text prompt
                    },
                    {
                        role: "user",
                        content: `![Image](data:image/jpeg;base64,${image})`, // Image included as Markdown syntax
                    },
                ],
            });


            setResponseText(response.choices[0].message.content);
        }
        main();
    };

    return (
        <div>
            <video ref={videoRef} autoPlay={true} />
            <button id='captureButton' onClick={handleCaptureClick}>Capture Image</button>
            <div className='textBox'>
                <p>{responseText}</p>
            </div>
        </div>
    );
};

export default CamScreen;
