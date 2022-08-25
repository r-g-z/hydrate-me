import { Button, Text, Box, VStack } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { format, parseISO } from "date-fns";

const WaterLogs = ({ handleDelete, waterEntries }) => {
  return (
    <VStack sx={{ fontSize: "18px" }}>
      {waterEntries.map((waterEntry) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid gray",
              width: "100%",
              pb: "0.5rem",
            }}
          >
            <Box sx={{ display: "flex", gap: "2.5rem" }}>
              <Text>
                {waterEntry.date && format(parseISO(waterEntry.date), "h:mm a")}
              </Text>
              <Text>{waterEntry.waterAmount}ml</Text>
            </Box>
            <Button onClick={() => handleDelete(waterEntry._id)} size={"sm"}>
              <DeleteIcon />
            </Button>
          </Box>
        );
      })}
    </VStack>
  );
};

export default WaterLogs;
