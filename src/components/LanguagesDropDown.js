import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "in", name: "Hindi" },
  { code: "bd", name: "Bangladesh" },
  { code: "et", name: "Ethiopia" },
  { code: "id", name: "Indonesia" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "ru", name: "Русский" },
  { code: "pt", name: "Português" },
  { code: "my", name: "Malay" },
  { code: "sa", name: "العربية" },
  { code: "ur", name: "اُردُو" },
  { code: "srk", name: "سرائیکی" },
  { code: "tr", name: "Türkçe" },
  { code: "cn", name: "中国人" },
  { code: "jp", name: "日本語" },
  { code: "kr", name: "Korean" },
  { code: "br", name: "Brazil" },
  { code: "bn", name: "Bangála" },
  { code: "vi", name: "Việt Nam" },
  { code: "te", name: "తెలుగు" },
  { code: "th", name: "ภาษาไทย" },
];

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleLanguageChange = useCallback(
    (code, name) => {
      setSelectedLanguage(name);
      setIsOpen(false);

      // Save only the language code to localStorage
      typeof window !== "undefined" &&  localStorage.setItem("selectedLanguageCode", code);

      // Update the URL with the selected language
      const segments = pathname.split("/");
      const currentLangCode = segments[1];
      if (currentLangCode) {
        segments[1] = code;
      } else {
        segments.unshift(code);
      }
      const newPathname = segments.join("/");
      router.push(newPathname);
    },
    [pathname, router]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Retrieve language code from localStorage
    const storedLanguageCode =
     typeof window !== "undefined" && localStorage.getItem("selectedLanguageCode") || "en";
    const currentLang = languages.find(
      (lang) => lang.code === storedLanguageCode
    );
    if (currentLang) {
      setSelectedLanguage(currentLang.name);
    } else {
      setSelectedLanguage("English");
    }

    // Update URL based on stored language code
    const segments = pathname.split("/");
    if (segments[1] && segments[1] !== storedLanguageCode) {
      segments[1] = storedLanguageCode;
      router.push(segments.join("/"));
    }
  }, [pathname, router]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="bg-gray-700 text-white p-2 rounded-md focus:outline-none w-40 flex items-center justify-between"
      >
        {selectedLanguage}
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <ul className="absolute bg-gray-700 text-white mt-2 rounded-md w-40 z-10 max-h-52 overflow-y-auto">
          {languages.map(({ code, name }) => (
            <li
              key={code}
              className="cursor-pointer hover:bg-gray-600 p-2 rounded-md"
              onClick={() => handleLanguageChange(code, name)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
