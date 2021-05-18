import React from "react";
import AvatarEditor from "react-avatar-editor";

const CustomAvatarEditor = ({
  imageFile = `${process.env.NEXT_PUBLIC_API_URL}/utility/file/2452bb0a46371847628aa8b624493012`,
  handleImageChange,
}) => {
  return (
    <AvatarEditor
      image={imageFile}
      width={200}
      height={200}
      border={0}
      color={[255, 255, 255, 0.6]} // RGBA
      scale={1}
      rotate={0}
      className="rounded-full mx-auto"
      disableBoundaryChecks
      onImageChange={handleImageChange}
    />
  );
};

export default CustomAvatarEditor;
