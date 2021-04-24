// Adjust these params to your needs
const SVG_FOLDER_LOCATION = "/svg"

// Usage: file:yourSvgName (no file extensions)
const NAMESPACE = "file"

async function loadFile(path) {
	const response = await fetch(`/local${SVG_FOLDER_LOCATION}/${path}.svg`)
	if (response.ok) {
		const svgString = await response.text()
		return /d="(.*?)"/.exec(svgString)[1]
	} else {
		return "M18.677,15.975 C17.922,16.509 17.489,17.269 17.489,18.059 C17.489,18.881 16.822,19.548 16,19.548 C15.179,19.548 14.512,18.881 14.512,18.059 C14.512,16.29 15.404,14.645 16.957,13.544 C17.399,13.233 17.803,12.605 17.615,11.776 C17.482,11.189 16.996,10.704 16.408,10.571 C15.698,10.409 15.198,10.7 14.964,10.886 C14.567,11.204 14.338,11.677 14.338,12.186 C14.338,13.008 13.672,13.674 12.85,13.674 C12.029,13.674 11.362,13.008 11.362,12.186 C11.362,10.768 11.998,9.446 13.107,8.56 C14.217,7.673 15.661,7.349 17.067,7.667 C18.776,8.056 20.13,9.41 20.519,11.119 C20.941,12.98 20.217,14.886 18.677,15.975 M16,24.5 C15.172,24.5 14.5,23.829 14.5,23 C14.5,22.172 15.172,21.5 16,21.5 C16.828,21.5 17.5,22.172 17.5,23 C17.5,23.829 16.828,24.5 16,24.5 M16,4 C9.372,4 4,9.373 4,16 C4,22.627 9.372,28 16,28 C22.627,28 28,22.627 28,16 C28,9.373 22.627,4 16,4"
	}
}

async function getIcon(name) {
	const svgString = await loadFile(name)
	return {
		path: svgString,
		viewBox: "0 0 32 32"
	};
}

window.customIconsets = window.customIconsets || {};
window.customIconsets[NAMESPACE] = getIcon;