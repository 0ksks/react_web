import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { HeaderWrapper } from "./style";

interface IProps {
  children?: ReactNode;
}

const AppHeader: FC<IProps> = () => {
  return (
    <HeaderWrapper>
      <div className="content">
        <Link to={"/home"}>home</Link>
        <Link to={"/login"}>login</Link>
      </div>
    </HeaderWrapper>
  );
};

export default memo(AppHeader);
