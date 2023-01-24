

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as SunIcon from "./SunIcon.bs.js";
import * as MoonIcon from "./MoonIcon.bs.js";

function DarkModeButton(props) {
  var match = React.useState(function () {
        return true;
      });
  var setIsDark = match[1];
  var isDark = match[0];
  React.useEffect((() => {
		if (window.matchMedia !== undefined) {
			setIsDark(window.matchMedia('(prefers-color-scheme:dark)').matches);
		}
	}), []);
  var onClick = function (param) {
    Curry._1(setIsDark, (function (old) {
            return !old;
          }));
  };
  React.useEffect((() => {
		const $html = document.getElementsByTagName('html')[0];
		$html.setAttribute('data-theme', isDark ? 'forest' : 'emerald');
	}), [isDark]);
  return React.createElement("button", {
              "aria-label": isDark ? "현재 다크 모드" : "현재 라이트 모드",
              onClick: onClick
            }, isDark ? React.createElement(MoonIcon.make, {}) : React.createElement(SunIcon.make, {}));
}

var make = DarkModeButton;

export {
  make ,
}
/* react Not a pure module */
