@genType
@react.component
let make = () => {
	let (isDark, setIsDark) = React.useState(_ => true);

	React.useEffect0(%raw("() => {
		if (window.matchMedia !== undefined) {
			setIsDark(window.matchMedia('(prefers-color-scheme:dark)').matches);
		}
	}"));

	let onClick = (_) => {
		setIsDark(old => !old)
	}

	React.useEffect1(%raw("() => {
		const $html = document.getElementsByTagName('html')[0];
		$html.setAttribute('data-theme', isDark ? 'forest' : 'emerald');
	}"), [isDark])

	<button ariaLabel={isDark ? "현재 다크 모드" : "현재 라이트 모드"} onClick>
		(isDark ? <MoonIcon /> : <SunIcon />)
	</button>
}