import icon_loading from "../../assets/loadingIcon.png";


export default function Loading() {
  return (
    <>
      <div className="flex fixed w-full h-full duration-100 bg-black/50 z-10 top-0 left-0 bottom-0 right-0 justify-center items-center">
        <div>
          <img
            src={icon_loading}
            className="animate-spin max-h-16 filter:invert(100%) absolute ml-7"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
