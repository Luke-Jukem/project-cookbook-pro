import React from "react";
import ".././create-recipe.css";

const MappedInputFieldsForm = ({ fields, formData, onChange }) => {
  return (
    <div className="label-row-container">
      {fields.map((field) => (
        <div className="field-row" key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            placeholder={field.name}
            value={formData[field.name] || ""}
            min={field.min}
            max={field.max}
            onChange={onChange}
          />
        </div>
      ))}
    </div>
  );
};

export default MappedInputFieldsForm;
