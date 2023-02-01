function focusLock(container: HTMLElement, e: KeyboardEvent){
	const nodes = container.querySelectorAll('*');
	const tabbable = Array.from(nodes).filter((n) => n instanceof HTMLElement && n.tabIndex >= 0) as HTMLElement[];
	let index = document.activeElement ? tabbable.indexOf(document.activeElement as HTMLElement) : -1;

	if (index === -1 && e.shiftKey) index = 0;

	index += tabbable.length + (e.shiftKey ? -1 : 1);
	index %= tabbable.length;
	tabbable.at(index)?.focus();
}

export default focusLock;