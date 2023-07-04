import React, { useEffect, useState } from "react";
import {
  Center,
  useColorMode,
  useMediaQuery,
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
  Flex,
} from "native-base";
import Header from "../_header";

// Start editing here, save and see your changes.
export default function ProductCatalog({ products }) {
  const [md] = useMediaQuery({ maxWidth: 768 });
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(md);
  }, [md]);

  return (
    <Center
      flex={1}
      justifyContent={"flex-start"}
      _dark={{ bg: "gray.900" }}
      _light={{ bg: "gray.50" }}
    >
      <VStack alignItems="center" space="lg">
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
        <Heading size="2xl">Product Catalog</Heading>
        {isMobile ? (
          products.map(({ id, name, year, heroImage, description }) => (
            <Link key={id} href={`/products/${id}`}>
              <VStack alignContent="center" space={8}>
                <Center
                  padding="sm"
                  _dark={{ bg: "gray.600" }}
                  _light={{ bg: "gray.100" }}
                >
                  <Text fontSize="xl">
                    {name} ({year})
                  </Text>
                  <AspectRatio w={48} ratio={16 / 9}>
                    <Image source={{ uri: heroImage }} alt={name} />
                  </AspectRatio>
                  <Text fontSize={"sm"} marginTop={"sm"} textAlign={"center"}>
                    {description?.slice(0, 30)} ...
                  </Text>
                  {/* <Image source={{ uri: heroImage }} size={48} alt={name} /> */}
                </Center>
              </VStack>
            </Link>
          ))
        ) : (
          <Flex w={"90%"} maxWidth={1024} justifyContent={"center"}>
            <HStack
              flexDirection={"row"}
              flexWrap={"wrap"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {products.map(({ id, name, year, heroImage, description }) => (
                <Link m={3} key={id} href={`/products/${id}`}>
                  <VStack alignContent="center" space={8}>
                    <Center
                      padding="sm"
                      _dark={{ bg: "gray.600" }}
                      _light={{ bg: "gray.100" }}
                    >
                      <Text fontSize="xl">
                        {name} ({year})
                      </Text>
                      <AspectRatio w={48} ratio={16 / 9}>
                        <Image source={{ uri: heroImage }} alt={name} />
                      </AspectRatio>
                      <Text
                        fontSize={"sm"}
                        marginTop={"sm"}
                        textAlign={"center"}
                      >
                        {description?.slice(0, 30)} ...
                      </Text>
                    </Center>
                  </VStack>
                </Link>
              ))}
            </HStack>
          </Flex>
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

export async function getServerSideProps() {
  const catalog = await import("../api/products.json");
  return {
    props: {
      products: catalog.products.map(
        ({ id, name, year, heroImage, description }) => ({
          id,
          name,
          year,
          heroImage,
          description,
        })
      ),
    },
  };
}
