import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height:"100%",
  bgcolor: "background.paper",
//   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function MyModal({ open, setOpen, title, children }) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className=""
      >
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
         sx={style}
        >
          <Typography id="nested-modal-title" level="h2" sx={{}}>
            <h2 className="uppercase ml-10">{title}</h2>
          </Typography>
          <Typography id="nested-modal-description" textColor="text.tertiary">
            {children}
          </Typography>
          {/* <Box
            className="h-full"
            sx={{
              mt: 1,
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", sm: "row-reverse" },
            }}
          ></Box> */}
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
