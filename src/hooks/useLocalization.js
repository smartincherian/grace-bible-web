import { useSelector } from "react-redux";
const useLocalization = () => {
  //   const [translations, setTranslations] = useState({});
  //   const [currentLanguage, setCurrentLanguage] = useState('english'); // Default language

  const { currentLanguage, translations } = useSelector(
    (state) => state.localizationData
  );

  const translate = (key) => {
    if (translations[key] && translations[key][currentLanguage]) {
      return translations[key][currentLanguage];
    } else if (translations[key] && translations[key]["english"]) {
      return translations[key]["english"];
    }
    return key;
  };

  const switchLanguage = (language) => {
    // if (translations[Object.keys(translations)[0]][language]) {
    // }
  };

  return { translate, switchLanguage, currentLanguage };
};

export default useLocalization;
