// Function to get the correct base path for components
function getBasePath() {
	const currentPath = window.location.pathname;

	// Check if we're on GitHub Pages (has repository name in path)
	if (currentPath.includes('/sp2025-cp03-qva-1/')) {
		return '/sp2025-cp03-qva-1/';
	}

	// Check if we're in a subdirectory (pages folder)
	if (currentPath.includes('/pages/')) {
		return '../';
	}

	// Default for root directory
	return './';
}

// Function to fix asset paths in loaded components
function fixAssetPaths(html, basePath) {
	// Fix image and asset paths
	html = html.replace(/src="assets\//g, `src="${basePath}assets/`);
	html = html.replace(/href="(?!http|#|mailto:)/g, `href="${basePath}`);

	return html;
}

const basePath = getBasePath();

fetch(basePath + 'components/navbar.html')
	.then(res => res.text())
	.then(data => {
		// Fix asset paths in the navbar
		const fixedData = fixAssetPaths(data, basePath);
		document.getElementById('navbar').innerHTML = fixedData;

		setupLanguageDropdown();

		const links = document.querySelectorAll('.nav-link');

		links.forEach(link => {
			if (link.href === window.location.href) {
				link.classList.add('active');
			}
		});

		const hamburger = document.getElementById('hamburger-menu');
		const navList = document.getElementById('nav-list');

		if (hamburger && navList) {
			hamburger.addEventListener('click', () => {
				navList.classList.toggle('show');
			});
		}
	})
	.catch(error => {
		console.error('Error loading navbar:', error);
	});

fetch(basePath + 'components/footer.html')
	.then(res => res.text())
	.then(data => {
		// Fix asset paths in the footer
		const fixedData = fixAssetPaths(data, basePath);
		document.getElementById('footer').innerHTML = fixedData;

		const yearEl = document.getElementById('year');
		if (yearEl) {
			yearEl.textContent = new Date().getFullYear();
		}
		setupFlagListeners();
	})
	.catch(error => {
		console.error('Error loading footer:', error);
	});
