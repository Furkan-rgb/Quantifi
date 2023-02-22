import React from "react";

export const DotButton = ({
  selected,
  onClick,
}: {
  selected: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => (
  <button
    className={`embla__dot ${selected ? "is-selected" : ""}`}
    type="button"
    onClick={onClick}
  />
);
