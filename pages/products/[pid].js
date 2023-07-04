import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
  Menu,
  Pressable,
  HamburgerIcon,
} from "native-base";

// Start editing here, save and see your changes.
export default function ProductDetails(props) {
  const router = useRouter();
  const { pid } = router.query;
  const [isMobile] = useMediaQuery({ maxWidth: 768 });
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${pid}`);
        const data = await res.json();

        setProduct(data);
      } catch (error) {
        console.error("failed to fetch Product details data", error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <Center flex={1} _dark={{ bg: "gray.900" }} _light={{ bg: "gray.50" }}>
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
          <Menu
            minWidth={isMobile ? undefined : "256px"}
            placement={isMobile ? undefined : "left top"}
            trigger={(triggerProps) => (
              <Pressable {...triggerProps}>
                <HamburgerIcon size="lg" />
              </Pressable>
            )}
          >
            <Menu.Item>
              <Link href="/">Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/products">Catalog</Link>
            </Menu.Item>
          </Menu>
        </HStack>
        <Heading size="2xl">Product Detail for ...</Heading>
        <Text>Need to fetch details for Product ID: {pid}</Text>
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
