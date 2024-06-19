import Image from "next/image";
import { useState, useEffect } from "react";
import styled from "styled-components";

const images = [
  {
    src: "/assets/images/turtles/Cyan-turtle1.png",
    width: 500,
    height: 500,
    alt: "bathing turtle",
  },
  {
    src: "/assets/images/turtles/Cyan-turtle2.png",
    width: 500,
    height: 500,
    alt: "sliding turtle",
  },
  {
    src: "/assets/images/turtles/Cyan-turtle3.png",
    width: 500,
    height: 500,
    alt: "turtle on the trolley",
  },
  {
    src: "/assets/images/turtles/Cyan-turtle4.png",
    width: 500,
    height: 500,
    alt: "turtle on the trolley",
  },
  {
    src: "/assets/images/turtles/Cyan-turtle5.png",
    width: 500,
    height: 500,
    alt: "turtle on the beach",
  },
];

const CenteredContainer = styled.div`
  margin: 0 auto;
  margin-top: 1rem;
  max-width: 55vw;
  display: flex;
  justify-content: center;
`;

const StyledImage = styled(Image)`
  width: 100%;
  max-width: 800px;
  height: auto;
  max-height: 100%;
  object-fit: contain;
`;

export default function RandomImage() {
  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  return (
    <CenteredContainer>
      {randomImage && (
        <StyledImage
          src={randomImage.src}
          alt={randomImage.alt}
          width={randomImage.width}
          height={randomImage.height}
          priority
        />
      )}
    </CenteredContainer>
  );
}
