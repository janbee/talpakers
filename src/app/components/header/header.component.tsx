import React, { memo, useCallback } from "react";
import "./header.component.scss";
import { Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export const HeaderComponent = memo(() => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate("/");
  }, []);
  return (
    <div className="header-wrap">
      <div className="icon-wrap" onClick={handleClick}>
        <Image
          className="icon"
          src={process.env.PUBLIC_URL + "/assets/icon.png"}
        />
      </div>
      <span onClick={handleClick}>Talpakers</span>
    </div>
  );
});
