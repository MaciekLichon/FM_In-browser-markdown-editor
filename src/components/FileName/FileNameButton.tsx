import React from "react";
import "./FileName.scss";

import { useDispatch } from "react-redux";
import { updateActiveId } from "../../redux/activeDocumentRedux";

import iconDocument from "../../assets/icon-document.svg";

interface IProps {
  id: string;
  fileName: string;
  dateAdded: string;
}

const FileNameButton: React.FC<IProps> = ({ id, dateAdded, fileName }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(updateActiveId(id));
  };

  return (
    <button className="file-name" onClick={handleClick}>
      <img className="file-name__icon" src={iconDocument} alt="icon document" />
      <p className="text_body_s">{dateAdded}</p>
      <p className="text_body_l file-name__title">{fileName}</p>
    </button>
  );
};

export default FileNameButton;