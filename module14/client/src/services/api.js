import axios from "axios";
import { Notyf } from "notyf";
const notyf = new Notyf();
axios.defaults.baseURL = "http://localhost:3000/notes";
axios.defaults.headers.post["Content-Type"] = "application/json";

const URL = "http://localhost:3000/notes";

export const getNotes = async () => {
  try {
    const response = await axios.get();

    const data = response.data;

    return data;
  } catch (error) {
    notyf.error("Status Text: " + error.response.status);
 
  }
};

export const saveNote = async note => {
  try {
    const response = await axios.post(URL, note);
    const data = response.data;
    return data;
  } catch (error) {
    notyf.error("Status Text: " + error.response.status);
  }
};

export const deleteNote = async id => {
  try {
    const response = await axios.delete(`${URL}/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    notyf.error("Status Text: " + error.response.status);
  }
};

export const updateNote = async (id, updatedNote) => {
  try {
    const response = await axios.patch({
      method: "patch",
      url: `${URL}/${id}`,
      data: { ...updateNote }
    });
    const data = response.data;
    return data;
  } catch (error) {
    notyf.error("Status Text: " + error.response.status);
  }
};
