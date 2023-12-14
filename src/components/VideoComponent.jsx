import video from "../assets/images/video.mp4";
const VideoComponent = () => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="video absolute left-0 right-0 top-0 z-[-1] flex h-screen w-full items-center justify-center bg-black opacity-20"
    >
      <source src={video} type="video/mp4" />
      {/* <source src="rabbit320.webm" type="video/webm" /> */}
    </video>
  );
};
export default VideoComponent;
