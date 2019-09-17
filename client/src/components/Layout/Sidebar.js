import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Box from "@material-ui/core/Box";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import EditIcon from "@material-ui/icons/EditRounded";
import ViewIcon from "@material-ui/icons/FindInPageRounded";
import AddIcon from "@material-ui/icons/NoteAddRounded";
//import DashboardIcon from "@material-ui/icons/DashboardRounded";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  top: {
    margin: "5px 0px 0px 18px"
  },
  list: {
    width: 250
  },
  listSubtitle: {
    marginLeft: "22.5%"
  }
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={props.toggler()}
      onKeyDown={props.toggler()}
    >
      <Box className={classes.top}>
        <Typography variant="h6" gutterBottom>
          Admin: {props.data.admin}
        </Typography>

        <Typography variant="caption" gutterBottom>
          #Id: {props.data.id}
        </Typography>
      </Box>
      <Divider />
      <List>
        {/*<ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            onClick={() => props.defaultDisplay()}
          ></ListItemText>
        </ListItem> */}
        {["Add New Licence", "Registred Licences"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 !== 0 ? <ViewIcon /> : <AddIcon />}
            </ListItemIcon>
            <ListItemText
              primary={text}
              onClick={
                index === 0
                  ? () => props.displayRegOnly()
                  : () => props.displayViewOnly()
              }
            />
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        {["Edit Licence", "Delete Licence"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 !== 0 ? <DeleteIcon /> : <EditIcon />}
            </ListItemIcon>
            <ListItemText
              primary={text}
              onClick={() => {
                props.dialogToggler(text.split(" ")[0]);
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer open={props.open} onClose={props.toggler()}>
        {sideList()}
      </Drawer>
    </div>
  );
}
