import Image from "next/image";
import Spline from "@splinetool/react-spline";

export default function Home() {
  return (
    <div className="main">
      <div className="navbar">
        <h1>Sign Language AI</h1>
        <a href="">Homepage</a>
        <button className="songButton">Song</button>
      </div>
      <Spline
        scene="https://prod.spline.design/LQaUoK8q11eE-Ix1/scene.splinecode"
      />
      <div className="divButton">
        <button className="bottomButton">Button</button>
      </div>

      <audio src="/Users/quanpham/repos/Marina-Hacks/marina/Components/_no copyright music_ _ coffee time _ cute vlog music.mp3" id="song"></audio>
    </div>
  );
}
