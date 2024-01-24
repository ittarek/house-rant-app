import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

const ExpandMore = styled(props => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RoomCard = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = React.useState([]);


  React.useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getHouseData");
        setData(response.data);
      } catch (error) {
        console.error(error);
    
      }
    };

    fetchData();
  }, []); 



  const handleExpandClick = houseId => {
    setExpanded(expanded === houseId ? null : houseId);
  };

  return (
    <>
      {data.map(house => (
        <Card key={house._id} sx={{}} className="mx-auto ">
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1558&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              ></Avatar>
            }
            title="Home Name"
            subheader="September 14, 2016 availability"
          />
          <CardMedia
            component="img"
            className="h-[150px] rounded-lg hover:scale-110 target:duration-500 transition-all object-cover"
            image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1558&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Paella dish"
          />
          <CardContent className="space-y-1">
            <Typography variant="body2" className="text-bolder">
              {house.city}
            </Typography>
            <Typography variant="body2">{house.bedrooms} : BedRooms</Typography>
            <Typography variant="body2">
              {house.bathrooms}: BathRooms
            </Typography>
            <Typography variant="body2">{house.roomSize} Inc</Typography>
            <Typography variant="body2">{house.rentPerMonth} Taka</Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>

            <ExpandMore
              aria-expanded={expanded === house._id}
              onClick={() => handleExpandClick(house._id)}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded === house._id} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Description:</Typography>

              <Typography paragraph className="w-[150px] max-h-[100px]">
                {house.description}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </>
  );
}
export default  RoomCard;