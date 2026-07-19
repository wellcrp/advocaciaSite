//Pegar o ano atual
document.getElementById('year').textContent = new Date().getFullYear();

// Ajusta a variável CSS --header-height com a altura do header fixo
function updateHeaderHeightVar() {
	const header = document.querySelector('header.header-bg') || document.querySelector('header');
	if (!header) return;
	const height = header.getBoundingClientRect().height;
	document.documentElement.style.setProperty('--header-height', Math.round(height) + 'px');
}

window.addEventListener('DOMContentLoaded', () => {
	updateHeaderHeightVar();
});

window.addEventListener('resize', () => {
	updateHeaderHeightVar();
});

// Set CSS --vh to represent 1% of the viewport height (fix mobile 100vh issues)
function updateVhVar() {
	const vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', vh + 'px');
}

window.addEventListener('DOMContentLoaded', () => {
	updateVhVar();
});

window.addEventListener('resize', () => {
	updateVhVar();
});

// Debounce helper
function debounce(fn, wait) {
	let t;
	return function (...args) {
		clearTimeout(t);
		t = setTimeout(() => fn.apply(this, args), wait);
	};
}

// Adjust wallpaper background-position so the image's visual center stays visible
function updateWallpaperPosition() {
	const el = document.querySelector('.wallpaper-top');
	if (!el) return;
	const vw = window.innerWidth;
	const vh = window.innerHeight;
	const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 0;

	if (vw > 900) {
		// Compute percentage so image center is placed slightly lower to account for fixed header
		const extraPercent = (headerHeight / (2 * vh)) * 100;
		let p = 50 + extraPercent;
		p = Math.min(100, Math.max(0, p));
		el.style.backgroundPosition = `center ${p}%`;
	} else {
		// Mobile: keep centered
		el.style.backgroundPosition = 'center center';
	}
}

// Run on load
window.addEventListener('DOMContentLoaded', () => {
	updateWallpaperPosition();
});

// Update on resize with debounce
const onResizeAll = debounce(() => {
	updateHeaderHeightVar();
	updateVhVar();
	updateWallpaperPosition();
}, 120);

window.addEventListener('resize', onResizeAll);