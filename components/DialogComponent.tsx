import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogComponetProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
}
const DialogComponent: React.FC<
  DialogComponetProps & React.PropsWithChildren
> = ({ isOpen, title, onClose, children }) => {
  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        data-testid="dialog"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle data-testid="dialog-title">{title}</DialogTitle>
        <DialogContent data-testid="dialog-child">{children}</DialogContent>
        <DialogActions data-testid="dialog-actions">
          <Button onClick={() => onClose()}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogComponent;
