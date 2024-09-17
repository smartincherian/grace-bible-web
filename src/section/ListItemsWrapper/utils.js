import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";

export const setTodaysSection = (section) => {
  const today = new Date().toDateString();
  const data = { section, date: today };
  setLocalStorage("todaysTopic", data); // Use your provided setLocalStorage function
};

export const getTodaysSection = () => {
  const storedData = getLocalStorage("todaysTopic");
  if (!storedData) return null;

  const { section, date } = storedData;
  const today = new Date().toDateString();

  if (today === date) {
    return section; // Return today's section if the date matches
  }
  return null;
};
