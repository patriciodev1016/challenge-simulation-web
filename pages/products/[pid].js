import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Center,
  useColorMode,
  Tooltip,
  IconButton,
  SunIcon,
  MoonIcon,
  Image,
  HStack,
  Text,
  Heading,
  Link,
  VStack,
  AspectRatio,
  Box,
} from "native-base";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Header from "../_header";

// Start editing here, save and see your changes.
export default function ProductDetails(props) {
  const router = useRouter();
  const { pid } = router.query;
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (pid) {
        try {
          const res = await fetch(`/api/products/${pid}`);
          const { name, year, description, images, heroImage } =
            await res.json();
          setName(name);
          setYear(year);
          setDescription(description);
          setHeroImage(heroImage);
          setImages(images);
          setIsLoading(false);
        } catch (error) {
          console.error("failed to fetch Product details data", error);
        }
      }
    };

    fetchProduct();
  }, [pid]);

  return (
    <Center
      flex={1}
      justifyContent={"flex-start"}
      style={{ width: "fit-content", margin: "auto" }}
      _dark={{ bg: "gray.900" }}
      _light={{ bg: "gray.50" }}
    >
      <VStack alignItems="center" space="md">
        <HStack alignItems="center" space="2xl">
          <Link href="/">
            <AspectRatio w={24} ratio={5 / 3}>
              <Image
                source={{ uri: "/images/jordan_and_jumpman_logo.png" }}
                alt="Jordan and Jumpman"
                resizeMode="contain"
              />
            </AspectRatio>
          </Link>
          <Header />
        </HStack>
        {isLoading ? (
          <Heading style={{ textAlign: "center" }} px={4} size="2xl">
            Loading Product Detail Info for pId: {pid}
          </Heading>
        ) : (
          <>
            <Heading style={{ textAlign: "center" }} px={4} size="2xl">
              Product Detail for {`${name}(${year})`}
            </Heading>
            {name && (
              <HStack alignItems="center" space="2xl">
                <VStack alignItems="center" width={"100%"} px={5} space="4">
                  <Box px="4" my={5}>
                    <AspectRatio w={48} ratio={16 / 9}>
                      <Image source={{ uri: `/${heroImage}` }} alt={name} />
                    </AspectRatio>
                  </Box>
                  <Box px="4" maxWidth={768}>
                    <Text>{description}</Text>
                  </Box>
                  <Box px="4" pb="4" my={5} maxWidth={768}>
                    <Carousel autoPlay={true}>
                      {images.map((image, index) => (
                        <div key={index}>
                          <img src={`/${image}`} alt={name} />
                          <p className="legend">{`${name} - ${index}`}</p>
                        </div>
                      ))}
                    </Carousel>
                  </Box>
                </VStack>
              </HStack>
            )}
          </>
        )}
      </VStack>
      <ColorModeSwitch />
    </Center>
  );
}
// Color Switch Component
function ColorModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Tooltip
      label={colorMode === "dark" ? "Enable light mode" : "Enable dark mode"}
      placement="bottom right"
      openDelay={300}
      closeOnClick={false}
    >
      <IconButton
        position="absolute"
        top={12}
        right={8}
        onPress={toggleColorMode}
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        accessibilityLabel="Color Mode Switch"
      />
    </Tooltip>
  );
}
