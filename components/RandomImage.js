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

  padding: 50px;

  img {
    max-width: 50%;
    max-height: auto;
  }
`;

const RandomImage = () => {
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  return (
    <CenteredContainer>
      {randomImage && (
        <Image
          src={randomImage.src}
          alt="random picture of a relaxing turtle"
          width={randomImage.width}
          height={randomImage.height}
          priority
          style={{ width: "50%", height: "auto" }}
        />
      )}
    </CenteredContainer>
  );
};

export default RandomImage;
