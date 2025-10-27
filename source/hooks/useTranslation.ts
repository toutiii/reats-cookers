import { useTranslation as useI18nextTranslation } from "react-i18next";

export const useTranslation = (namespace?: string | string[]) => {
  return useI18nextTranslation(namespace);
};

export default useTranslation;
