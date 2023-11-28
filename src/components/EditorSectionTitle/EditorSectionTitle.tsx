import React from 'react';
import './EditorSectionTitle.scss';

interface IProps {
    title: string;
}

const EditorSectionTitle: React.FC<IProps> = ({title}) => {
    return (
        <p className="editor-section-title text_body_m-spaced">{title}</p>
    );
};

export default EditorSectionTitle;