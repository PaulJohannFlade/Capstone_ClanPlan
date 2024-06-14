import Image from "next/image";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const images = [
  { src: "/assets/images/turtles/Cyan-turtle1.png", width: 500, height: 500 },
  { src: "/assets/images/turtles/Cyan-turtle2.png", width: 500, height: 500 },
  { src: "/assets/images/turtles/Cyan-turtle3.png", width: 500, height: 500 },
  { src: "/assets/images/turtles/Cyan-turtle4.png", width: 500, height: 500 },
  { src: "/assets/images/turtles/Cyan-turtle5.png", width: 500, height: 500 },
];

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  padding: 50px;

  @media (max-width: 450px) {
    padding: 10px;

    align-content: center;

    width: 200px;
    height: 200px;
  }
`;

const StyledImage = styled(Image)`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: auto;
  max-height: 60vh;
  object-fit: contain;
`;

export default function RandomImage() {
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  return (
    <CenteredContainer>
      {randomImage && (
        <StyledImage
          src={randomImage.src}
          alt="random picture of a relaxing turtle"
          width={randomImage.width}
          height={randomImage.height}
          priority
          style={{ objectFit: "contain" }}
        />
      )}
    </CenteredContainer>
  );
}
