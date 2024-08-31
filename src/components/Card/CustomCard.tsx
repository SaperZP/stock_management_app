import React from "react";
import {Box, Card, CardMedia} from "@mui/material";
import {default as styles} from "./CardStyles.ts";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {Delete, Edit} from "@mui/icons-material";

type CardProps = {
  id: number;
  name: string;
  image: string;
  onEdit: () => void;
  onDelete: () => void;
}

const CustomCard: React.FC<CardProps> = ({name, image, onEdit, onDelete}) => {
  return (
      <Card sx={styles.card}>
        <Box>
          <Typography
              textAlign={"center"}
              variant="h5"
              component="h2"
          >
            {name}
          </Typography>

          <Box className={"child"} sx={styles.buttonsGroup}>
            <IconButton onClick={onEdit} size='small'>
              <Edit fontSize="small" />
            </IconButton>

            <IconButton onClick={onDelete} size={"small"}>
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <CardMedia
            component="img"
            sx={styles.image}
            image={image}
            title={name}
        />
      </Card>
  );
};

export default CustomCard;
