import React, { useEffect, useState } from "react";
import {
  HamburgerIcon,
  HStack,
  Link,
  Menu,
  Pressable,
  useMediaQuery,
} from "native-base";

export default function _header() {
  const [md] = useMediaQuery({ maxWidth: 768 });
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(md);
  }, [md]);

  return isMobile ? (
    <Menu
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
  ) : (
    <HStack space="sm" style={{ flexDirection: "row" }}>
      <Link href="/">Home</Link>
      <Link href="/products">Catalog</Link>
    </HStack>
  );
}
