import React, {useState, useRef, useEffect} from 'react';
import './Editor.scss';

import EditorSectionTitle from '../EditorSectionTitle/EditorSectionTitle';
import Markdown from 'react-markdown';

import showPreviewIcon from '../../assets/icon-show-preview.svg';
import hidePreviewIcon from '../../assets/icon-hide-preview.svg';

interface IProps {
    content: string;
    updateMarkup: (v: string) => void;
}

const Editor: React.FC<IProps> = ({content, updateMarkup}) => {
    
    const [isPreviewFullWidth, setIsPreviewFullWidth] = useState(false);

    // ----------- 
    // update textarea's height with content to prevent container overflow and scrollbar from appearing
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "100%";
            const scrollHeight = textAreaRef.current.scrollHeight;

            textAreaRef.current.style.height = scrollHeight + "px";
        }
    }, [textAreaRef, content]);
    // -----------

    return (
        <div className={`editor ${isPreviewFullWidth ? 'editor_full-preview' : ''}`}>
            <div className="editor__section editor__markdown">
                <EditorSectionTitle title="markdown" />
                <textarea ref={textAreaRef} className="editor__section-fill editor__markdown-textarea" value={content} onChange={(e) => updateMarkup(e.target.value)}></textarea>
            </div>
            <div className="editor__section editor__preview">
                <EditorSectionTitle title="preview" />
                <div className="editor__section-fill markdown-preview">
                    <Markdown children={content} />
                </div>
            </div>
            <button className="editor__preview-button" onClick={() => setIsPreviewFullWidth(!isPreviewFullWidth)}>
                <img src={isPreviewFullWidth ? hidePreviewIcon : showPreviewIcon} alt="preview icon" className="editor__preview-icon" />
            </button>
        </div>
    );
};

export default Editor;