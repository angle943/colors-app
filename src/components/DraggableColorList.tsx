import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";
import { INewColor } from "./ColorPickerForm";

interface ParentProps {
  colors: INewColor[];
  handleDelete(colorName: string): void;
}

const DraggableColorList: React.FC<ParentProps> = props => {
  const { colors, handleDelete } = props;
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, i) => (
        <DraggableColorBox
          key={color.name}
          {...color}
          index={i}
          handleDelete={() => handleDelete(color.name)}
        />
      ))}
    </div>
  );
};

export default SortableContainer(DraggableColorList);
