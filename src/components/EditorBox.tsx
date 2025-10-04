import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { noop } from '../utils/core';

 // Custom toolbar configuration to match the original design
 const modules = {
    toolbar: [
      [{ 'font': [] }],
      ['bold', 'italic'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'font', 'bold', 'italic', 'list', 'bullet', 'link', 'image'
  ];

const EditorBox = ({setIsDescriptionEditing = noop}: {setIsDescriptionEditing?: (val: boolean) => void}) => {
  const [descriptionText, setDescriptionText] = useState('');

  const handleDescriptionSave = () => {
    setIsDescriptionEditing(false);
  };

  const handleDescriptionCancel = () => {
    setIsDescriptionEditing(false);
    setDescriptionText('');
  };

  return (
    <div className="description-editor">
            <ReactQuill
              theme="snow"
              value={descriptionText}
              onChange={setDescriptionText}
              modules={modules}
              formats={formats}
              placeholder="Pro tip: Hit 'Enter' for a new paragraph, and 'Shift + Enter' for a simple line break."
              className="custom-quill-editor"
            />
            
            <div className="editor-actions">
              <button 
                className="btn btn-primary save-btn"
                onClick={handleDescriptionSave}
              >
                Save
              </button>
              <button 
                className="btn btn-secondary cancel-btn"
                onClick={handleDescriptionCancel}
              >
                Cancel
              </button>
              <a href='https://support.atlassian.com/trello/docs/how-to-format-your-text-in-trello/' className="formatting-help" target='_blank' rel="noopener noreferrer">
                Formatting help
              </a>
            </div>
          </div>
  )
};

export default EditorBox;