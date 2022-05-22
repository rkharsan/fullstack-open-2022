import axios from "axios";

const BASE_URL = "/api/persons";

const getAllPersons = () => {
  return axios.get(BASE_URL).then((res) => res.data);
};

const addPerson = (newPerson) => {
  return axios.post(BASE_URL, newPerson).then((res) => res.data);
};

const deletePerson = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

const updatePerson = (id, updatedPerson) => {
  return axios.put(`${BASE_URL}/${id}`, updatedPerson).then((res) => res.data);
};

const personService = { getAllPersons, addPerson, deletePerson, updatePerson };
export default personService;
