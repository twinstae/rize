@genType
@react.component
let make = () => {
	let (isDark, setIsDark) = React.useState(_ => true);

	let onClick = (_) => {
		setIsDark(old => !old)
	}

	<button ariaLabel={isDark ? "현재 다크 모드" : "현재 라이트 모드"} onClick>
		(isDark ? <MoonIcon /> : <SunIcon />)
	</button>
}