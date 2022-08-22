import {
  useDisclosure,
  Button,
  Drawer,
  Input,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

const AddDrinks = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    props.addCups();
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} leftIcon={<AddIcon />}>
        Water
      </Button>
      <Drawer placement={"bottom"} isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add your water</DrawerHeader>

          <DrawerBody>
            <Button onClick={handleClick}>Cup 250ml</Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddDrinks;
