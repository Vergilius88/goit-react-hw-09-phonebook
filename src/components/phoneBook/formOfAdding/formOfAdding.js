import React, { useState } from "react";
import { useDispatch } from "react-redux";
import phoneBookOperations from "../../redux/phoneBook/phoneBook-operations";
import formOfAddingStyles from "./formOfAddingStyles";
const { Button } = formOfAddingStyles;

export default function FormOfAdding() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case "name":
        return setName(value);

      case "number":
        return setNumber(value);

      default:
        return;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(phoneBookOperations.addContact({ name, number }));
    alert("Форма отправлена ");
    setName("");
    setNumber("");
  };
  const formValidator = (e) => {
    name && number ? handleSubmit(e) : alert("Заполните все поля.");
  };
  return (
    <form onSubmit={formValidator}>
      <label>
        Name
        <input
          type="text"
          placeholder="Your Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          placeholder="Your Phone"
          name="number"
          value={number}
          list="defaultTels"
          onChange={handleChange}
        />
        <datalist name="age" id="defaultTels">
          <option value="" disabled>
            ...
          </option>
          <option value="+38(068)">+38(068)</option>
          <option value="+38(097)">+38(097)</option>
          <option value="+38(063)">+38(063)</option>
        </datalist>
      </label>
      <Button type="submit">Create contact</Button>
    </form>
  );
}
