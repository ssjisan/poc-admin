import { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Quill as GlobalQuill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import { Box, Toolbar } from '@mui/material';
import Sidebar from '../../Layout/Sidebar';

// Register Quill modules
GlobalQuill.register('modules/imageResize', ImageResize);
export default function WriteABlog() {
  const drawerWidth = 280;
  const [editorContent, setEditorContent] = useState("");
  const quillRef = useRef(null);
  console.log(editorContent);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { header: "3" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link", "image"], // Adding image option
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["clean"], // Remove formatting
    ],
    imageResize: {
      // Optional configuration options for image resize
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
  };
  return (
    <Box>
      <Sidebar />
      <Box
        component="main"
        sx={{
          p: 3,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        <Box>
          <div>
            <ReactQuill
              modules={modules} // Add the custom modules
              ref={quillRef} // Get the Quill instance through the ref
              value={editorContent}
              onChange={setEditorContent}
              theme="snow" // Apply Snow theme
            />
          </div>
        </Box>
      </Box>
    </Box>
  );
}
