import React, { useState, useEffect, useRef } from 'react'
import { ReactComponent as MoonIcon } from "../assets/moon.svg";
import { ReactComponent as SunIcon } from "../assets/sun.svg";

export const ThemeToggle = () => {
  const [isEnabled, setIsEnabled] = useState(true) 
  const initialStyles = useRef({});

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const isDarkEnabled = storedTheme === 'dark'  || storedTheme === null;

    setIsEnabled(isDarkEnabled);

    const styles = getComputedStyle(document.documentElement);

    initialStyles.current = {
      black: styles.getPropertyValue("--black").trim(),
      white: styles.getPropertyValue("--white").trim(),
      boxShadowBlack: styles.getPropertyValue("--box-shadow-black").trim(),
      borderBlack: styles.getPropertyValue("--border-black").trim(),
      borderWhite: styles.getPropertyValue("--border-white").trim(),
      borderGoldenrod: styles.getPropertyValue("--border-goldenrod").trim(),
      borderBoldBlack: styles.getPropertyValue("--border-bold-black").trim(),
      borderBoldWhite: styles.getPropertyValue("--border-bold-white").trim(),
    }

    updateTheme(isDarkEnabled)
  }, [])

  const toggleState = () => {
    setIsEnabled((prevState) => {
      const newState = !prevState
      localStorage.setItem('theme', newState ? 'dark' : 'light')
      updateTheme(newState)
      return newState
    });
  };

  const updateTheme = (isDarkEnabled) => {
    const docEl = document.documentElement;

    const {
      black,
      white,
      boxShadowBlack,
      borderBlack,
      borderWhite,
      borderBoldBlack,
      borderBoldWhite,
    } = initialStyles.current;

    if (isDarkEnabled) {
      docEl.style.setProperty("--background-color", black);
      docEl.style.setProperty("--text-color", white);
      docEl.style.setProperty("--box-shadow-color", "none");
      docEl.style.setProperty("--border", borderWhite);
      docEl.style.setProperty("--border-bold", borderBoldWhite);
      document.querySelector("html").classList.add("darkmode");
    } else {
      docEl.style.setProperty("--background-color", white);
      docEl.style.setProperty("--text-color", black);
      docEl.style.setProperty("--box-shadow-color", boxShadowBlack);
      docEl.style.setProperty("--border", borderBlack);
      docEl.style.setProperty("--border-bold", borderBoldBlack);
      document.querySelector("html").classList.remove("darkmode");
    }
  }

  return (
    <div className="toggleContainer">
      <label className="toggle-wrapper" htmlFor="toggle">
        <div className={`toggle ${isEnabled ? "enabled" : "disabled"}`}>
          <span className="hidden">
            {isEnabled ? "Enable" : "Disable"}
          </span>
          <div className="icons">
            <SunIcon />
            <MoonIcon />
          </div>
          <input
            id="toggle"
            name="toggle"
            type="checkbox"
            checked={isEnabled}
            onChange={toggleState}
          />
        </div>
      </label>
    </div>
  )
}