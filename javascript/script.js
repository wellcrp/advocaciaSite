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

function setupHomeOverlayHeader() {
	if (!document.body.classList.contains('home-page')) return;

	const header = document.querySelector('header.header-bg');
	if (!header) return;

	const syncHeaderState = () => {
		const shouldSolid = window.scrollY > 24;
		header.classList.toggle('header-scrolled', shouldSolid);
	};

	window.addEventListener('scroll', debounce(syncHeaderState, 20), { passive: true });
	window.addEventListener('resize', debounce(syncHeaderState, 50));
	syncHeaderState();
}

window.addEventListener('DOMContentLoaded', setupHomeOverlayHeader);

function setupActiveNavState() {
	const navLinks = Array.from(document.querySelectorAll('.navbar-nav .nav-link'));
	if (navLinks.length === 0) return;

	const isHome = window.location.pathname.endsWith('/index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';
	if (!isHome) return;

	const sectionLinks = navLinks
		.map((link) => {
			const href = link.getAttribute('href') || '';
			if (!href.startsWith('#')) return null;
			const target = document.querySelector(href);
			if (!target) return null;
			return { link, target };
		})
		.filter(Boolean);

	if (sectionLinks.length === 0) return;

	const setActive = (activeLink) => {
		navLinks.forEach((link) => {
			const isActive = link === activeLink;
			link.classList.toggle('is-active', isActive);
			if (isActive) {
				link.setAttribute('aria-current', 'page');
			} else {
				link.removeAttribute('aria-current');
			}
		});
	};

	const getVisibleSection = () => {
		const marker = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 0) + 24;
		let current = sectionLinks[0];

		for (const item of sectionLinks) {
			const top = item.target.getBoundingClientRect().top;
			if (top - marker <= 0) {
				current = item;
			}
		}

		return current;
	};

	const updateActiveByScroll = () => {
		const current = getVisibleSection();
		if (current) setActive(current.link);
	};

	const updateActiveByHash = () => {
		const currentHash = window.location.hash;
		const matched = sectionLinks.find((item) => item.link.getAttribute('href') === currentHash);
		if (matched) {
			setActive(matched.link);
		} else {
			updateActiveByScroll();
		}
	};

	window.addEventListener('scroll', debounce(updateActiveByScroll, 50), { passive: true });
	window.addEventListener('hashchange', updateActiveByHash);
	window.addEventListener('resize', debounce(updateActiveByScroll, 80));

	updateActiveByHash();
}

window.addEventListener('DOMContentLoaded', setupActiveNavState);