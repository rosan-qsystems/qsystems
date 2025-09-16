import Board from "../../assets/Board.png";
import Epics from "../../assets/Epics.png";
import Projects from "../../assets/Projects.png";
import { Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

export const carouselData = [
  {
    title: "Organize your workflow",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    image: Board,
  },
  {
    title: "Manage your Projects",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    image: Projects,
  },
  {
    title: "Streamline your Work",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    image: Epics,
  },
];

export const AuthCarousel = () => {
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  return (
    <Carousel
      withIndicators
      className={"h-full auth-carousel"}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={() => autoplay.current.play()}
      emblaOptions={{
        loop: true,
        dragFree: false,
        align: "center",
      }}
    >
      {carouselData.map((v, key) => (
        <Carousel.Slide key={key} className={"h-full"}>
          <div className={"h-full flex flex-col"}>
            <div
              className={
                "flex-grow content-center px-xl text-white space-y-sm  w-4/5"
              }
            >
              <div className="text-5xl ">{v.title}</div>
              <Text lineClamp={3} className="text-3xl">
                {v.description}
              </Text>
            </div>
            <div className={"px-[56px] h-1/2"}>
              <img
                src={v.image}
                alt=""
                className={
                  "w-full aspect-[16/9] object-cover shadow-lg rounded-lg"
                }
                style={{ objectPosition: "left top" }}
              />
            </div>
          </div>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};
