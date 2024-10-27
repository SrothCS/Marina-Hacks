import { useRef } from 'react';

const Camera = ({ onCapture }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
    };

    const captureImage = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        onCapture(imageData);
    };

    return (
        <div>
            <video ref={videoRef} width="640" height="480" autoPlay />
            <button onClick={captureImage}>Capture</button>
            <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
            <button onClick={startCamera}>Start Camera</button>
        </div>
    );
};

export default Camera;
