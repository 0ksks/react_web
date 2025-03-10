import { useAppDispatch } from "@/store";
import { changeSnackbarPropsAction } from "@/store/modules/notification";
import { Button, SnackbarProps } from "@mui/material";
import React, { useState } from "react";

const Home = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>();
  const dispatch = useAppDispatch();
  const handleBoolClick = () => {
    setOpen(!open);
    setSnackbarProps({
      open: !open,
      children: <div>hello this is children</div>,
    });
    dispatch(changeSnackbarPropsAction(snackbarProps));
  };

  return (
    <div>
      <div>home</div>
      <Button onClick={handleBoolClick}>toggle bool</Button>
    </div>
  );
};

export default Home;
