import Image from "next/image";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const images = [
  { src: "/assets/images/turtles/Cyan-turtle1.jpg", width: 500, height: 500 },
  { src: "/assets/images/turtles/Cyan-turtle2.jpg", width: 500, height: 500 },
  { src: "/assets/images/turtles/Cyan-turtle3.jpg", width: 500, height: 500 },
  { src: "/assets/images/turtles/Cyan-turtle4.jpg", width: 500, height: 500 },
  { src: "/assets/images/turtles/Cyan-turtle5.jpg", width: 500, height: 500 },
];

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
          alt="Random"
          width={randomImage.width}
          height={randomImage.height}
          priority
        />
      )}
    </CenteredContainer>
  );
};

export default RandomImage;
