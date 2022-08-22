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

const AddDrinks = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addCups = (number) => {
    fetch(`/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: new Date(), waterAmount: 250 }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // props.onSuccessSubmit();
      });
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
            <Button onClick={addCups}>Cup 250ml</Button>
          </DrawerBody>

          {/* <DrawerFooter>
            <Button type="submit" form="my-form">
              Save
            </Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddDrinks;
