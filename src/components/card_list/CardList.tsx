import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

interface Props {
  image?: string;
  title?: string;
  descriptions?: string;
  poweredBy?: string;
  onCardClick?: () => void;
}

const CardList = (prop: Props) => {
  const { onCardClick, image, title, descriptions, poweredBy } = prop;
  return (
    // <Card sx={{ maxWidth: 345 }}>
    <Card
      className=""
      sx={{
        ":hover": {
          boxShadow: 20,
        },
        boxShadow: 0,
        borderRadius: 3,
        padding: 2,
        position: 'relative'
      }}
    >
      <CardActionArea sx={{ marginBottom: '32px' }} onClick={onCardClick}>
        {image &&
          <CardMedia
            component="img"
            height="250 "
            image={image}
            sx={{ borderRadius: 2 }}
            alt="green iguana"
          />}
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            fontWeight={"600"}
            component="div"
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {descriptions}
          </Typography>

        </CardContent>

      </CardActionArea>
      {poweredBy &&
        <p style={{ textAlign: 'end', fontStyle: 'italic', color: 'grey', padding: '10px', position: 'absolute', bottom: '5px', right: '5px' }}>Powered by <span style={{ fontWeight: 600 }}>{poweredBy}</span></p>
      }
    </Card>
  );
};

export default CardList;
