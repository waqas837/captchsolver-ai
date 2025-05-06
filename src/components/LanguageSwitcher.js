// components/LanguageSwitcher.jsx
"use client"; // Ensure client-side functionality for interactivity
import { useRouter } from 'next/navigation';

const LanguageSwitcher = () => {
  const router = useRouter();

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    router.push(`/${selectedLang}`);
  };

  return (
    <select onChange={handleLanguageChange} defaultValue="en">
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="es">Español</option>
      <option value="de">Deutsch</option>
      <option value="ar">العربية</option>
    </select>
  );
};

export default LanguageSwitcher;
