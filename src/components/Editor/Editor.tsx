import React, {useState, useRef, useEffect} from 'react';
import './Editor.scss';

import EditorSectionTitle from '../EditorSectionTitle/EditorSectionTitle';
import Markdown from 'react-markdown';

import showPreviewIcon from '../../assets/icon-show-preview.svg';
import hidePreviewIcon from '../../assets/icon-hide-preview.svg';

const Editor: React.FC = () => {

    const [markdown, setMarkdown] = useState('');
    const [isPreviewFullWidth, setIsPreviewFullWidth] = useState(false);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "100%";
            const scrollHeight = textAreaRef.current.scrollHeight;

            textAreaRef.current.style.height = scrollHeight + "px";
        }
    }, [textAreaRef, markdown]);

    return (
        <div className={`editor ${isPreviewFullWidth ? 'editor_full-preview' : ''}`}>
            <div className="editor__section editor__markdown">
                <EditorSectionTitle title="markdown" />
                <textarea ref={textAreaRef} className="editor__section-fill editor__markdown-textarea" value={markdown} onChange={(e) => setMarkdown(e.target.value)}></textarea>
            </div>
            <div className="editor__section editor__preview">
                <EditorSectionTitle title="preview" />
                <div className="editor__section-fill markdown-preview">
                    <Markdown children={markdown} />
                </div>
            </div>
            <button className="editor__preview-button" onClick={() => setIsPreviewFullWidth(!isPreviewFullWidth)}>
                <img src={isPreviewFullWidth ? hidePreviewIcon : showPreviewIcon} alt="preview icon" className="editor__preview-icon" />
            </button>
        </div>
    );
};

export default Editor;