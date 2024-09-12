import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
//controller -> the library embraces uncontrolled components and native HTML inputs

export default function RTE({ name, control, label, defaultValue = "" }) {
  // ye control react hook form se ata hai aur yehi responsible hai iski sari state vagera ko component to form mein lejane ke liye
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller //nme , control , rules , render
        name={name || "content"}
        control={control}
        // rules={{ required: true }}
        render={({field:{onChange}})=>{
            <Editor
            initialValue={defaultValue}
            init={{
                initialValue:defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                    " advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount"
                    ],
                    toolbar:
                    "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright align| bullist numlist outdent indent | removeformat | help",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
            />
        }}
      />
    </div>
  );
}
