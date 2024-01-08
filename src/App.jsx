// App.jsx
import React, { useState, useRef } from 'react';
import StageDimensionsContext from './contexts/StageDimensionsContext';
import Canvas from './components/Canvas';
import Stencil from './components/Stencil';
import useShapes from './hooks/useShapes';
import useTextTags from './hooks/useTextTags';
import useBackground from './hooks/useBackground';
import { ThemeProvider } from '@mui/material/styles';
import theme from './config/theme';
import './App.css';
import useLines from './hooks/useLines';
////////////////////////////////////////////////////////////////////////////////////////
/*
TODO: add undo/redo
TODO: add selection rectangle
TODO: save and load feature (requires database)
*/
////////////////////////////////////////////////////////////////////////////////////////
function App() {
  const imageRef = useRef(null);
  const stageRef = useRef(null);
  const [colorButtonPressCount, setColorButtonPressCount] = useState(0);
  const [strokeTypeButtonPressCount, setStrokeTypeButtonPressCount] = useState(0);
  const [strokeEndButtonPressCount, setStrokeEndButtonPressCount] = useState(0);
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [selectedTextTags, setSelectedTextTags] = useState([]);
  const [selectedColor, setSelectedColor] = useState(theme.palette.pitchBlack.main); //default color
  const [selectedLineStroke, setSelectedLineStroke] = useState('straight'); // default straight line
  const [selectedLineEnd, setSelectedLineEnd] = useState('arrow'); // default arrow line end
  const [stageDimensions, setStageDimensions] = useState({ width: 0, height: 0 });
  const { backgroundImage, fieldType, setFieldType, setZone, zone, setRedLine, redLine } = useBackground();
  const { shapes, addFormation, addShape, updateShape, deleteShape, deleteFormation, deleteAllShapes, hideShapeContextMenu } = useShapes(stageDimensions, imageRef);
  const { textTags, addTextTag, updateTextTag, deleteTextTag, deleteAllTextTags, hideTextTagContextMenu } = useTextTags(imageRef);
  const { lines, startPos, endPos, startDrawing, draw, stopDrawing, deleteAllLines, setLines, deleteLine, updateLine } = useLines(imageRef, stageRef);

  return (
    <>
      <ThemeProvider theme={theme}>
        <StageDimensionsContext.Provider value={{ stageDimensions }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '1vw',
            height: '90vh',
            width: '98vw',
          }}>
            <div className="custom-scrollbar">
              <Stencil
                onAddFormation={addFormation}
                onAddShape={addShape}
                onAddTextTag={addTextTag}
                fieldType={fieldType}
                setFieldType={setFieldType}
                setZone={setZone}
                zone={zone}
                setRedLine={setRedLine}
                redLine={redLine}
                onDeleteAllShapes={deleteAllShapes}
                onChangeFormation={deleteFormation} //deletes all other formation shapes except one chosen
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedLineStroke={selectedLineStroke}
                setSelectedLineStroke={setSelectedLineStroke}
                selectedLineEnd={selectedLineEnd}
                setSelectedLineEnd={setSelectedLineEnd}
                onDeleteAllTextTags={deleteAllTextTags}
                onDeleteAllLines={deleteAllLines}
                setColorButtonPressCount={setColorButtonPressCount}
                setStrokeTypeButtonPressCount={setStrokeTypeButtonPressCount}
                setStrokeEndButtonPressCount={setStrokeEndButtonPressCount}
                stageRef={stageRef}
              />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1.8,
              padding: '1vw',
              maxWidth: 'calc(80% - 4vw)',
              marginRight: '2vw',
              borderTop: '1px solid black',
              borderRight: '1px solid black',
              borderBottom: '1px solid black',
              height: '100%',
              backgroundColor: '#dcdcdc', // See parent div
            }}>
              <Canvas
                imageRef={imageRef}
                colorButtonPressCount={colorButtonPressCount}
                strokeTypeButtonPressCount={strokeTypeButtonPressCount}
                strokeEndButtonPressCount={strokeEndButtonPressCount}
                lines={lines}
                setLines={setLines}
                startPos={startPos}
                endPos={endPos}
                startDrawing={startDrawing}
                draw={draw}
                stopDrawing={stopDrawing}
                deleteAllLines={deleteAllLines}
                onLineChange={updateLine}
                onLineDelete={deleteLine}
                shapes={shapes}
                selectedShapes={selectedShapes}
                setSelectedShapes={setSelectedShapes}
                onShapeChange={updateShape}
                onShapeDelete={deleteShape}
                onHideContextMenu={hideShapeContextMenu}
                textTags={textTags}
                selectedTextTags={selectedTextTags}
                setSelectedTextTags={setSelectedTextTags}
                onTextTagChange={updateTextTag}
                onTextTagDelete={deleteTextTag}
                onHideTextTagContextMenu={hideTextTagContextMenu}
                selectedColor={selectedColor}
                selectedLineStroke={selectedLineStroke}
                selectedLineEnd={selectedLineEnd}
                backgroundImage={backgroundImage}
                setStageDimensions={setStageDimensions}
                stageRef={stageRef}
              />
            </div>
          </div>
        </StageDimensionsContext.Provider>
      </ThemeProvider>
    </>
  );
}
export default App;