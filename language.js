// Language switching functionality
(function() {
    // Ensure translations object is on window (translations file uses var so global exists; copy to window for all code paths)
    if (typeof window !== 'undefined' && typeof translations !== 'undefined') {
        window.translations = translations;
    }
    
    const currentLang = localStorage.getItem('siciliabedda-lang') || 'en';
    
    // Place-name link data and injector - defined early so it works even without translations (e.g. home page fallback text)
    var PLACE_LINK_PAIRS = {
        en: [
            { name: 'Parco delle Madonie', url: 'parco-madonie.html' },
            { name: 'Sicily', url: 'sicily.html' },
            { name: 'Isnello', url: 'isnello.html' },
            { name: 'Collesano', url: 'collesano.html' },
            { name: 'Castelbuono', url: 'castelbuono.html' }
        ],
        it: [
            { name: 'Parco delle Madonie', url: 'parco-madonie.html' },
            { name: 'Sicilia', url: 'sicily.html' },
            { name: 'Isnello', url: 'isnello.html' },
            { name: 'Collesano', url: 'collesano.html' },
            { name: 'Castelbuono', url: 'castelbuono.html' }
        ],
        scn: [
            { name: 'Parco delle Madonie', url: 'parco-madonie.html' },
            { name: 'Sicilia', url: 'sicily.html' },
            { name: 'Isnello', url: 'isnello.html' },
            { name: 'Collesano', url: 'collesano.html' },
            { name: 'Castelbuono', url: 'castelbuono.html' }
        ],
        es: [
            { name: 'Parco delle Madonie', url: 'parco-madonie.html' },
            { name: 'Sicilia', url: 'sicily.html' },
            { name: 'Isnello', url: 'isnello.html' },
            { name: 'Collesano', url: 'collesano.html' },
            { name: 'Castelbuono', url: 'castelbuono.html' }
        ],
        fr: [
            { name: 'Parco delle Madonie', url: 'parco-madonie.html' },
            { name: 'Sicile', url: 'sicily.html' },
            { name: 'Isnello', url: 'isnello.html' },
            { name: 'Collesano', url: 'collesano.html' },
            { name: 'Castelbuono', url: 'castelbuono.html' }
        ]
    };
    function injectPlaceLinks(linkLang) {
        var l = (linkLang && PLACE_LINK_PAIRS[linkLang]) ? linkLang : 'en';
        var pairs = PLACE_LINK_PAIRS[l];
        if (!pairs) pairs = PLACE_LINK_PAIRS.en;
        var escapeRegex = function(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };
        var elList = document.querySelectorAll ? document.querySelectorAll('[data-add-place-links="true"]') : [];
        var alreadyLinked = {};
        for (var i = 0; i < elList.length; i++) {
            var element = elList[i];
            var html = (element.textContent != null ? element.textContent : element.innerText || '') + '';
            var sorted = pairs.slice().sort(function(a, b) { return b.name.length - a.name.length; });
            for (var j = 0; j < sorted.length; j++) {
                var item = sorted[j];
                if (alreadyLinked[item.name]) continue;
                // Avoid matching text that's already inside an anchor tag
                // Use a function to check if match is inside an anchor tag
                var re = new RegExp(escapeRegex(item.name));
                var newHtml = html.replace(re, function(match, offset) {
                    // Check if this match is inside an anchor tag
                    var beforeMatch = html.substring(0, offset);
                    var lastOpenTag = beforeMatch.lastIndexOf('<a');
                    var lastCloseTag = beforeMatch.lastIndexOf('</a>');
                    // If there's an open <a tag after the last </a, we're inside a link
                    if (lastOpenTag > lastCloseTag) {
                        return match; // Don't replace, return original
                    }
                    return '<a href="' + item.url + '" class="content-link">' + item.name + '</a>';
                });
                if (newHtml !== html) {
                    html = newHtml;
                    alreadyLinked[item.name] = true;
                }
            }
            element.innerHTML = html;
        }
    }
    if (typeof window !== 'undefined') window._injectPlaceLinks = injectPlaceLinks;
    
    // Ensure content links (place names) work on desktop and mobile; explicit navigation avoids browser quirks
    // Only intercept a.content-link; do not block nav links (e.g. Home) or touch on text nodes
    function setupContentLinkNavigation() {
        var root = document.body || document.documentElement;
        if (!root) return;
        root.addEventListener('click', function(e) {
            var target = e.target;
            if (!target || typeof target.closest !== 'function') return;
            var a = target.closest('a.content-link');
            if (!a || !a.href) return;
            var href = a.getAttribute('href');
            if (!href || href.indexOf('#') === 0) return;
            if (a.target === '_blank' || a.hasAttribute('download')) return;
            // Allow default for new-tab (middle click, ctrl/cmd+click)
            if (e.button !== 0 || e.ctrlKey || e.metaKey) return;
            e.preventDefault();
            window.location.href = a.href;
        }, true);
    }
    
    // Initialize language on page load
    function initLanguage() {
        const selector = document.getElementById('language-selector');
        if (selector) {
            selector.value = currentLang;
        }
        updatePageLanguage(currentLang);
    }
    
    // Update all elements with data-i18n attributes
    function updatePageLanguage(lang) {
        // Always read from window so we have the latest (script may load after language.js)
        const trans = (typeof window !== 'undefined' && window.translations) ? window.translations : (typeof translations !== 'undefined' ? translations : null);
        
        if (!trans || !trans[lang]) {
            console.warn('Translations not loaded or language not found:', lang);
            if (typeof window._injectPlaceLinks === 'function') window._injectPlaceLinks(lang);
            if (!trans && (!window._transRetryCount || window._transRetryCount < 25)) {
                window._transRetryCount = (window._transRetryCount || 0) + 1;
                setTimeout(function() { updatePageLanguage(lang); }, 80);
            }
            return;
        }
        window._transRetryCount = 0;
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update page title
        const titleMap = {
            'en': 'Sicilia Bedda',
            'it': 'Sicilia Bedda',
            'scn': 'Sicilia Bedda',
            'es': 'Sicilia Bedda',
            'fr': 'Sicilia Bedda'
        };
        document.title = titleMap[lang] || 'Sicilia Bedda';
        
        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        let updatedCount = 0;
        const fallbackLang = 'en';
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            let text = trans[lang] && trans[lang][key] ? trans[lang][key] : (trans[fallbackLang] && trans[fallbackLang][key] ? trans[fallbackLang][key] : null);
            if (text !== null) {
                element.textContent = text;
                updatedCount++;
            } else if (trans[lang] && !trans[lang][key]) {
                console.warn('Translation missing for key:', key, 'in language:', lang);
            }
        });
        
        // Mobile-specific fix: Ensure footer elements are updated (with multiple attempts)
        const updateFooterElements = () => {
            // Try multiple selectors to find footer elements
            const selectors = [
                'footer [data-i18n="footerOperatedBy"]',
                'footer p[data-i18n]',
                'footer [data-i18n]'
            ];
            
            selectors.forEach(selector => {
                const footerElements = document.querySelectorAll(selector);
                footerElements.forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    const translation = (trans[lang] && trans[lang][key]) ? trans[lang][key] : (trans[fallbackLang] && trans[fallbackLang][key]) ? trans[fallbackLang][key] : null;
                    if (translation) {
                        element.textContent = translation;
                        if (element.innerText !== undefined) element.innerText = translation;
                        if (element.textContent !== translation) element.innerHTML = translation;
                    }
                });
            });
        };
        updateFooterElements();
        
        // Also schedule additional updates for mobile
        setTimeout(updateFooterElements, 200);
        setTimeout(updateFooterElements, 500);
        
        // If no elements were updated and translations exist, retry (mobile fix)
        if (updatedCount === 0 && trans && (trans[lang] || trans[fallbackLang]) && elements.length > 0) {
            setTimeout(function() {
                elements.forEach(function(element) {
                    var key = element.getAttribute('data-i18n');
                    var text = (trans[lang] && trans[lang][key]) ? trans[lang][key] : (trans[fallbackLang] && trans[fallbackLang][key]) ? trans[fallbackLang][key] : null;
                    if (text) element.textContent = text;
                });
                var footerRetry = document.querySelectorAll('footer [data-i18n]');
                footerRetry.forEach(function(element) {
                    var key = element.getAttribute('data-i18n');
                    var text = (trans[lang] && trans[lang][key]) ? trans[lang][key] : (trans[fallbackLang] && trans[fallbackLang][key]) ? trans[fallbackLang][key] : null;
                    if (text) {
                        element.textContent = text;
                        if (element.innerText !== undefined) element.innerText = text;
                    }
                });
                if (typeof window._injectPlaceLinks === 'function') window._injectPlaceLinks(lang);
            }, 100);
        }
        
        // Update elements with data-i18n-html for HTML content (like links, italic subtitles)
        const htmlElements = document.querySelectorAll('[data-i18n-html]');
        htmlElements.forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const htmlKey = key;
            const textKey = key.replace(/Html$/, '');
            let html = (trans[lang] && trans[lang][htmlKey]) ? trans[lang][htmlKey] : (trans[fallbackLang] && trans[fallbackLang][htmlKey]) ? trans[fallbackLang][htmlKey] : null;
            if (html) {
                element.innerHTML = html;
            } else if (trans[lang] && textKey !== key && trans[lang][textKey]) {
                element.textContent = trans[lang][textKey];
            } else if (trans[fallbackLang] && trans[fallbackLang][textKey]) {
                element.textContent = trans[fallbackLang][textKey];
            } else if (!trans[lang] || !trans[lang][htmlKey]) {
                console.warn('Translation missing for HTML key:', key, 'in language:', lang);
            }
        });
        
        // Inject place-name hyperlinks into elements with data-add-place-links (after text is set)
        if (typeof window._injectPlaceLinks === 'function') window._injectPlaceLinks(lang);
        
        // Update elements with data-i18n-placeholder for input placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const val = (trans[lang] && trans[lang][key]) ? trans[lang][key] : (trans[fallbackLang] && trans[fallbackLang][key]) ? trans[fallbackLang][key] : null;
            if (val) element.placeholder = val;
        });
        
        // Store selected language
        localStorage.setItem('siciliabedda-lang', lang);
        
        // Update language buttons if they exist (desktop and mobile)
        const updateLanguageButtons = (lang) => {
            const flags = {
                'en': 'https://flagcdn.com/w40/gb.png',
                'it': 'https://flagcdn.com/w40/it.png',
                'scn': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Cpath fill='%23ffc72c' d='M0 0h3v1H0z'/%3E%3Cpath fill='%23d21034' d='M0 1h3v1H0z'/%3E%3C/svg%3E",
                'es': 'https://flagcdn.com/w40/es.png',
                'fr': 'https://flagcdn.com/w40/fr.png'
            };
            const names = {
                'en': 'English',
                'it': 'Italiano',
                'scn': 'Sicilianu',
                'es': 'Español',
                'fr': 'Français'
            };
            
            // Update desktop selector
            const currentFlag = document.getElementById('current-flag');
            const currentLanguage = document.getElementById('current-language');
            if (currentFlag && currentLanguage) {
                currentFlag.src = flags[lang] || flags['en'];
                currentLanguage.textContent = names[lang] || names['en'];
            }
            
            // Update mobile selector
            const currentFlagMobile = document.getElementById('current-flag-mobile');
            const currentLanguageMobile = document.getElementById('current-language-mobile');
            if (currentFlagMobile && currentLanguageMobile) {
                currentFlagMobile.src = flags[lang] || flags['en'];
                currentLanguageMobile.textContent = names[lang] || names['en'];
            }
        };
        
        updateLanguageButtons(lang);
    }
    
    // Handle language selector change
    function setupLanguageSelector() {
        const languageButton = document.getElementById('language-button');
        const languageMenu = document.getElementById('language-menu');
        const languageButtonMobile = document.getElementById('language-button-mobile');
        const languageMenuMobile = document.getElementById('language-menu-mobile');
        const currentFlag = document.getElementById('current-flag');
        const currentLanguage = document.getElementById('current-language');
        const currentFlagMobile = document.getElementById('current-flag-mobile');
        const currentLanguageMobile = document.getElementById('current-language-mobile');
        
        // Update button display for both desktop and mobile
        function updateButton(lang) {
            const flags = {
                'en': 'https://flagcdn.com/w40/gb.png',
                'it': 'https://flagcdn.com/w40/it.png',
                'scn': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Cpath fill='%23ffc72c' d='M0 0h3v1H0z'/%3E%3Cpath fill='%23d21034' d='M0 1h3v1H0z'/%3E%3C/svg%3E",
                'es': 'https://flagcdn.com/w40/es.png',
                'fr': 'https://flagcdn.com/w40/fr.png'
            };
            const names = {
                'en': 'English',
                'it': 'Italiano',
                'scn': 'Sicilianu',
                'es': 'Español',
                'fr': 'Français'
            };
            if (currentFlag) currentFlag.src = flags[lang] || flags['en'];
            if (currentLanguage) currentLanguage.textContent = names[lang] || names['en'];
            if (currentFlagMobile) currentFlagMobile.src = flags[lang] || flags['en'];
            if (currentLanguageMobile) currentLanguageMobile.textContent = names[lang] || names['en'];
        }
        
        // Initialize button with current language
        updateButton(currentLang);
        
        // Setup desktop selector
        if (languageButton && languageMenu) {
            // Toggle menu on button click
            languageButton.addEventListener('click', function(e) {
                e.stopPropagation();
                languageMenu.classList.toggle('active');
                if (languageMenuMobile) languageMenuMobile.classList.remove('active');
            });
            
            // Handle option clicks (use currentTarget so clicking child img/span still works)
            const options = languageMenu.querySelectorAll('.language-option');
            options.forEach(option => {
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const el = e.currentTarget || this;
                    const selectedLang = el.getAttribute('data-lang');
                    if (selectedLang) {
                        updatePageLanguage(selectedLang);
                        updateButton(selectedLang);
                    }
                    languageMenu.classList.remove('active');
                    // Force footer update after language change
                    setTimeout(() => {
                        const trans = (typeof window !== 'undefined' && window.translations) ? window.translations : (typeof translations !== 'undefined' ? translations : null);
                        if (trans && trans[selectedLang]) {
                            const footerElements = document.querySelectorAll('footer [data-i18n]');
                            footerElements.forEach(element => {
                                const key = element.getAttribute('data-i18n');
                                if (trans[selectedLang] && trans[selectedLang][key]) {
                                    element.textContent = trans[selectedLang][key];
                                }
                            });
                        }
                    }, 100);
                });
            });
        }
        
        // Apply language and close menu (shared for mobile click/touch)
        var lastMobileLangApply = 0;
        function applyMobileLanguage(selectedLang) {
            if (!selectedLang) return;
            var now = Date.now();
            if (now - lastMobileLangApply < 400) return; // avoid double apply from touch + click
            lastMobileLangApply = now;
            updatePageLanguage(selectedLang);
            updateButton(selectedLang);
            if (languageMenuMobile) languageMenuMobile.classList.remove('active');
            // Multiple delayed passes so all content (including hero, mission, footer) updates on mobile
            setTimeout(function() { updatePageLanguage(selectedLang); if (window._injectPlaceLinks) window._injectPlaceLinks(selectedLang); }, 100);
            setTimeout(function() { updatePageLanguage(selectedLang); }, 250);
            setTimeout(function() { updatePageLanguage(selectedLang); }, 500);
        }
        
        // Setup mobile selector
        if (languageButtonMobile && languageMenuMobile) {
            // Toggle menu on button click
            languageButtonMobile.addEventListener('click', function(e) {
                e.stopPropagation();
                languageMenuMobile.classList.toggle('active');
                if (languageMenu) languageMenu.classList.remove('active');
            });
            
            // Handle option: touch (immediate on mobile) and click (fallback)
            const optionsMobile = languageMenuMobile.querySelectorAll('.language-option');
            optionsMobile.forEach(option => {
                option.addEventListener('touchend', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const el = e.currentTarget || this;
                    const selectedLang = el.getAttribute('data-lang');
                    applyMobileLanguage(selectedLang);
                }, { passive: false });
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const el = e.currentTarget || this;
                    const selectedLang = el.getAttribute('data-lang');
                    applyMobileLanguage(selectedLang);
                });
            });
        }
        
        // Close menus when clicking outside
        document.addEventListener('click', function(e) {
            if (languageButton && languageMenu) {
                if (!languageButton.contains(e.target) && !languageMenu.contains(e.target)) {
                    languageMenu.classList.remove('active');
                }
            }
            if (languageButtonMobile && languageMenuMobile) {
                if (!languageButtonMobile.contains(e.target) && !languageMenuMobile.contains(e.target)) {
                    languageMenuMobile.classList.remove('active');
                }
            }
            const aboutBtn = document.getElementById('about-dropdown-button');
            const aboutMenu = document.getElementById('about-dropdown-menu');
            if (aboutBtn && aboutMenu && !aboutBtn.contains(e.target) && !aboutMenu.contains(e.target)) {
                if (typeof aboutDropdownLastToggled !== 'undefined' && (Date.now() - aboutDropdownLastToggled) < 500) return;
                aboutMenu.classList.remove('active');
                aboutBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Fallback for old select element
        const selector = document.getElementById('language-selector');
        if (selector) {
            selector.value = currentLang;
            selector.addEventListener('change', function(e) {
                const newLang = e.target.value;
                updatePageLanguage(newLang);
                updateButton(newLang);
            });
        }
    }

    // About dropdown (header: About -> Our Founder) — desktop (click) and mobile (touch)
    var aboutDropdownLastToggled = 0;
    var aboutDropdownHandledTouch = false;
    function setupSupportDropdown() {
        const supportBtn = document.getElementById('support-dropdown-button');
        const supportMenu = document.getElementById('support-dropdown-menu');
        if (!supportBtn || !supportMenu) return;
        function openSupportMenu() {
            supportMenu.classList.add('active');
            supportBtn.setAttribute('aria-expanded', 'true');
        }
        function closeSupportMenu() {
            supportMenu.classList.remove('active');
            supportBtn.setAttribute('aria-expanded', 'false');
        }
        function toggleSupportMenu(e) {
            if (e) { e.stopPropagation(); }
            const isOpen = supportMenu.classList.toggle('active');
            supportBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
        // Desktop: hover opens menu; delay before close so cursor can move to menu without it disappearing
        var supportContainer = supportBtn.closest ? supportBtn.closest('.about-dropdown') : supportBtn.parentElement;
        var supportCloseTimer = null;
        if (supportContainer) {
            supportContainer.addEventListener('mouseenter', function() {
                if (supportCloseTimer) { clearTimeout(supportCloseTimer); supportCloseTimer = null; }
                openSupportMenu();
            });
            supportContainer.addEventListener('mouseleave', function() {
                supportCloseTimer = setTimeout(function() { closeSupportMenu(); supportCloseTimer = null; }, 220);
            });
        }
        // Mobile: click toggles menu
        supportBtn.addEventListener('click', toggleSupportMenu);
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!supportContainer.contains(e.target)) {
                closeSupportMenu();
            }
        });
        // Close when clicking on a menu item
        supportMenu.querySelectorAll('.about-dropdown-item').forEach(function(item) {
            item.addEventListener('click', function() {
                closeSupportMenu();
            });
        });
    }
    
    function setupAboutDropdown() {
        const aboutBtn = document.getElementById('about-dropdown-button');
        const aboutMenu = document.getElementById('about-dropdown-menu');
        if (!aboutBtn || !aboutMenu) return;
        function openAboutMenu() {
            aboutDropdownLastToggled = Date.now();
            aboutMenu.classList.add('active');
            aboutBtn.setAttribute('aria-expanded', 'true');
        }
        function closeAboutMenu() {
            aboutMenu.classList.remove('active');
            aboutBtn.setAttribute('aria-expanded', 'false');
        }
        function toggleAboutMenu(e) {
            if (e) { e.stopPropagation(); }
            aboutDropdownLastToggled = Date.now();
            const isOpen = aboutMenu.classList.toggle('active');
            aboutBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
        // Desktop: hover opens menu; delay before close so cursor can move to menu without it disappearing
        var aboutContainer = aboutBtn.closest ? aboutBtn.closest('.about-dropdown') : aboutBtn.parentElement;
        var aboutCloseTimer = null;
        if (aboutContainer) {
            aboutContainer.addEventListener('mouseenter', function() {
                if (aboutCloseTimer) { clearTimeout(aboutCloseTimer); aboutCloseTimer = null; }
                openAboutMenu();
            });
            aboutContainer.addEventListener('mouseleave', function() {
                aboutCloseTimer = setTimeout(function() { closeAboutMenu(); aboutCloseTimer = null; }, 220);
            });
        }
        // Desktop: click also toggles (optional)
        aboutBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (aboutDropdownHandledTouch) { aboutDropdownHandledTouch = false; return; }
            toggleAboutMenu(e);
        });
        // Mobile: touchstart opens or closes menu immediately (so it's visible before any other event)
        aboutBtn.addEventListener('touchstart', function(e) {
            aboutDropdownHandledTouch = true;
            aboutDropdownLastToggled = Date.now();
            if (aboutMenu.classList.contains('active')) {
                e.preventDefault();
                closeAboutMenu();
            } else {
                e.preventDefault();
                openAboutMenu();
            }
        }, { passive: false });
        aboutBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
        }, { passive: false });
        // Close when tapping outside (mobile: touchend on document)
        document.addEventListener('touchend', function(e) {
            if (!aboutBtn || !aboutMenu) return;
            if (aboutBtn.contains(e.target) || aboutMenu.contains(e.target)) return;
            if (Date.now() - aboutDropdownLastToggled < 500) return;
            closeAboutMenu();
        }, { passive: true });
    }
    
    // Wait for translations to be available before initializing
    function waitForTranslations(callback, maxAttempts) {
        if (maxAttempts === undefined) maxAttempts = 40;
        const trans = (typeof window !== 'undefined' && window.translations) ? window.translations : (typeof translations !== 'undefined' ? translations : null);
        if (trans && trans.en) {
            callback();
        } else if (maxAttempts > 0) {
            setTimeout(function() { waitForTranslations(callback, maxAttempts - 1); }, 80);
        } else {
            console.error('Translations failed to load after multiple attempts');
            callback();
        }
    }
    
    // Force update translations after a short delay to ensure everything is loaded (mobile fix)
    function forceUpdateTranslations() {
        setTimeout(function() {
            var currentLang = localStorage.getItem('siciliabedda-lang') || 'en';
            updatePageLanguage(currentLang);
            if (typeof window._injectPlaceLinks === 'function') window._injectPlaceLinks(currentLang);
        }, 200);
    }
    
    // Initialize when DOM is ready and translations are loaded
    function initialize() {
        setupContentLinkNavigation();
        function doInit() {
            initLanguage();
            setupLanguageSelector();
            setupAboutDropdown();
            setupSupportDropdown();
            forceUpdateTranslations();
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                waitForTranslations(doInit, 30);
            });
        } else {
            waitForTranslations(doInit, 30);
        }
    }
    
    initialize();
    
    // Also update when window loads (ensures translations apply even if script loaded after DOM)
    window.addEventListener('load', function() {
        var currentLang = localStorage.getItem('siciliabedda-lang') || 'en';
        updatePageLanguage(currentLang);
        setTimeout(function() {
            updatePageLanguage(currentLang);
            if (typeof window._injectPlaceLinks === 'function') window._injectPlaceLinks(currentLang);
            // Additional mobile fix: Ensure footer is updated after full page load (multiple attempts)
            const updateFooter = () => {
                const trans = (typeof window !== 'undefined' && window.translations) ? window.translations : (typeof translations !== 'undefined' ? translations : null);
                if (trans && trans[currentLang]) {
                    const footerElements = document.querySelectorAll('footer [data-i18n]');
                    footerElements.forEach(element => {
                        const key = element.getAttribute('data-i18n');
                        if (trans[currentLang] && trans[currentLang][key]) {
                            element.textContent = trans[currentLang][key];
                            if (element.innerText !== undefined) {
                                element.innerText = trans[currentLang][key];
                            }
                        }
                    });
                }
            };
            // Try multiple times with increasing delays
            setTimeout(updateFooter, 150);
            setTimeout(updateFooter, 300);
            setTimeout(updateFooter, 500);
            // Also use requestAnimationFrame for when DOM is fully rendered
            requestAnimationFrame(() => {
                setTimeout(updateFooter, 100);
            });
        }, 100);
    });
    
    // Additional mobile fix: Update when translations are confirmed available
    if (typeof window !== 'undefined') {
        const checkAndUpdate = setInterval(() => {
            const trans = (window.translations) ? window.translations : (typeof translations !== 'undefined' ? translations : null);
            if (trans && trans.en && trans.it) {
                clearInterval(checkAndUpdate);
                var currentLang = localStorage.getItem('siciliabedda-lang') || 'en';
                updatePageLanguage(currentLang);
                if (typeof window._injectPlaceLinks === 'function') window._injectPlaceLinks(currentLang);
                // Ensure footer elements are updated
                const footerElements = document.querySelectorAll('footer [data-i18n]');
                footerElements.forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    if (trans[currentLang] && trans[currentLang][key]) {
                        element.textContent = trans[currentLang][key];
                        if (element.innerText !== undefined) {
                            element.innerText = trans[currentLang][key];
                        }
                    }
                });
            }
        }, 50);
        
        // Stop checking after 5 seconds (mobile/slow connections need longer for translations to load)
        setTimeout(() => clearInterval(checkAndUpdate), 5000);
    }
    
    // Mobile-only: run translation passes (does nothing on desktop)
    function runMobileTranslationPasses() {
        var isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
        if (!isMobile) return;
        var lang = localStorage.getItem('siciliabedda-lang') || 'en';
        updatePageLanguage(lang);
        if (typeof window._injectPlaceLinks === 'function') window._injectPlaceLinks(lang);
    }

    // Mobile initial load: extra translation passes for narrow viewports (DOM/layout can lag)
    function scheduleMobileInitialPasses() {
        var isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
        if (!isMobile) return;
        setTimeout(runMobileTranslationPasses, 400);
        setTimeout(runMobileTranslationPasses, 800);
        setTimeout(runMobileTranslationPasses, 1200);
        setTimeout(runMobileTranslationPasses, 2000);
        // Delayed check: viewport may report desktop width initially on mobile; re-check after 300ms
        setTimeout(function() {
            if (window.matchMedia('(max-width: 767px)').matches) {
                runMobileTranslationPasses();
                setTimeout(runMobileTranslationPasses, 500);
                setTimeout(runMobileTranslationPasses, 1000);
            }
        }, 300);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scheduleMobileInitialPasses);
    } else {
        scheduleMobileInitialPasses();
    }
    window.addEventListener('load', scheduleMobileInitialPasses);

    // Mobile-only: when viewport becomes or is mobile (resize/rotate), run translation passes
    if (typeof window !== 'undefined' && window.matchMedia) {
        var mql = window.matchMedia('(max-width: 767px)');
        if (mql.addEventListener) {
            mql.addEventListener('change', function(ev) {
                if (ev.matches) {
                    setTimeout(runMobileTranslationPasses, 100);
                    setTimeout(runMobileTranslationPasses, 400);
                }
            });
        }
    }
    // Expose updatePageLanguage globally for use in other scripts
    window.updatePageLanguage = updatePageLanguage;
    
    // Mobile-specific: Use MutationObserver to watch for footer elements being added
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            const trans = (typeof window !== 'undefined' && window.translations) ? window.translations : (typeof translations !== 'undefined' ? translations : null);
            if (trans) {
                const currentLang = localStorage.getItem('siciliabedda-lang') || 'en';
                const footerElements = document.querySelectorAll('footer [data-i18n]');
                footerElements.forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    if (trans[currentLang] && trans[currentLang][key]) {
                        // Only update if the text doesn't match the translation (avoid infinite loops)
                        if (element.textContent !== trans[currentLang][key]) {
                            element.textContent = trans[currentLang][key];
                        }
                    }
                });
            }
        });
        
        // Start observing when DOM is ready
        function startObserving() {
            const footer = document.querySelector('footer');
            if (footer) {
                observer.observe(footer, {
                    childList: true,
                    subtree: true,
                    characterData: true
                });
            } else {
                // Retry if footer doesn't exist yet
                setTimeout(startObserving, 100);
            }
        }
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startObserving);
        } else {
            startObserving();
        }
    }
})();
