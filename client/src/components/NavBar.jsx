import { Box, Flex, Text, VStack, Stack } from "@chakra-ui/react";
import { Image } from "antd";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NavBar = () => {
  return (
    <Box px={2} mt={-1}>
      <Flex h={14} p={2} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <VStack gap="auto" mt={1}>
            <Image
              visible="false"
              src="/buny-bw.png"
              width="40px"
              height="40px"
            />
            <Text mt={-1.5}>🅱🆄🅽🆈</Text>
          </VStack>
        </Box>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <div>
              <ConnectButton />
            </div>
            <div>
         
                  </div>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
