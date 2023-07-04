import React from "react";
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
} from "native-base";
import Header from "./_header";

// Start editing here, save and see your changes.
export default function App({ products }) {
  return (
    <Center flex={1} _dark={{ bg: "gray.900" }} _light={{ bg: "gray.50" }}>
      <VStack alignItems="center" space="md">
        <HStack alignItems="center" space="2xl">
          <AspectRatio w={48} ratio={5 / 3}>
            <Image
              source={{ uri: "/images/jordan_and_jumpman_logo.png" }}
              alt="Jordan and Jumpman"
              resizeMode="contain"
            />
          </AspectRatio>
          <Header />
        </HStack>
        <Heading size="2xl">Welcome to the Jordan Store</Heading>
        <Text>
          Please head to the <Link href="/products">Product Catalog</Link> to
          browse for your favorite Jordans.
        </Text>
        <Link href="/products">
          <Image
            source={{ uri: "/images/air-jordan-logo.png" }}
            alt="Nike Air Jordan"
            size={48}
            resizeMode="contain"
          />
        </Link>
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
  const catalog = await import("./api/products.json");
  return {
    props: {
      products: catalog.products.map(({ id, name, year, heroImage }) => ({
        id,
        name,
        year,
        heroImage,
      })),
    },
  };
}
