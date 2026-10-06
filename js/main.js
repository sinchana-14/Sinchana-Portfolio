/**
 * Portfolio Main Logic & Renderer
 * Renders data dynamically from window.portfolioConfig (data.js)
 * Manages theme state, navigation, active links, smooth scroll, and form feedback.
 */

function initApp() {
  const config = window.portfolioConfig;
  if (!config) {
    console.error('Portfolio config data missing!');
    return;
  }

  // 1. Initialize DOM Elements & Render Sections
  renderHero(config.profile);
  renderAbout(config.profile);
  renderSkills(config.skills);
  renderProjects(config.projects);
  renderCertifications(config.certifications);
  renderEducation(config.education);
  renderOptionalSections(config.optional);
  renderResume(config.profile);
  renderContact(config.profile);

  // 2. Initialize Interactivity
  initMobileMenu();
  initFloatingDock();
  initScrollSpy();
  initScrollReveal();
  initContactForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/* --------------------------------------------------------------------------
   SECTION RENDERERS
   -------------------------------------------------------------------------- */

function renderHero(profile) {
  const nameEls = document.querySelectorAll('.candidate-name');
  nameEls.forEach(el => el.textContent = profile.name);

  const logoEl = document.getElementById('navBrandLogo');
  if (logoEl) logoEl.textContent = profile.logoText || profile.name;

  const titleEl = document.getElementById('heroTitle');
  if (titleEl) {
    titleEl.innerHTML = `
      <span class="hero-greeting">Hi, I'm</span>
      <span class="highlight candidate-name">${escapeHTML(profile.name)}</span>
    `;
  }

  const subtitleEl = document.getElementById('heroSubtitle');
  if (subtitleEl) subtitleEl.textContent = profile.title;

  const highlightsEl = document.getElementById('heroHighlightsList');
  if (highlightsEl && profile.heroHighlights) {
    const checkIcon = '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>';
    const headingHtml = profile.heroHeading ? `<div class="hero-highlights-heading">${escapeHTML(profile.heroHeading)}</div>` : '';

    highlightsEl.innerHTML = `
      ${headingHtml}
      <ul class="hero-subhighlights-ul">
        ${profile.heroHighlights.map(text => `
          <li class="hero-highlight-item">
            <span class="highlight-bullet-badge">${checkIcon}</span>
            <span class="highlight-item-text">${escapeHTML(text)}</span>
          </li>
        `).join('')}
      </ul>
    `;
  }

  // Right Side Hero Showcase: Big Portrait Photo Card
  const rightGraphicEl = document.getElementById('heroRightGraphic');
  if (rightGraphicEl && profile.avatarUrl) {
    rightGraphicEl.innerHTML = `
      <div class="glass-card hero-portrait-card">
        <div class="portrait-img-wrapper">
          <img src="${escapeHTML(profile.avatarUrl)}" alt="${escapeHTML(profile.name)}" class="hero-portrait-img" onerror="this.closest('#heroRightGraphic').innerHTML=\`<div class='glass-card hero-graphic-card'><div class='code-card-header'><div class='code-dots'><span class='code-dot dot-red'></span><span class='code-dot dot-yellow'></span><span class='code-dot dot-green'></span></div><div class='code-title'>SoftwareEngineer.java</div></div><pre class='code-body'><code><span class='code-keyword'>public class</span> <span class='code-class'>SoftwareCandidate</span> {\\n  <span class='code-keyword'>private final String</span> degree = <span class='code-string'>&quot;B.E. ISE (2026)&quot;</span>;\\n  <span class='code-keyword'>private final String[]</span> coreTech = {\\n    <span class='code-string'>&quot;Java&quot;</span>, <span class='code-string'>&quot;SQL&quot;</span>, <span class='code-string'>&quot;MySQL&quot;</span>, <span class='code-string'>&quot;OOP&quot;</span>, <span class='code-string'>&quot;DSA&quot;</span>\\n  };\\n\\n  <span class='code-keyword'>public void</span> <span class='code-class'>buildSoftware</span>() {\\n    System.out.println(<span class='code-string'>&quot;Ready to solve problems!&quot;</span>);\\n  }\\n}</code></pre></div>\`" />
        </div>
      </div>
    `;
  }

  // Social Links in Hero
  const socialsContainer = document.getElementById('heroSocials');
  if (socialsContainer) {
    socialsContainer.innerHTML = `
      <a href="${escapeHTML(profile.githubUrl)}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub Profile">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
      </a>
      <a href="${escapeHTML(profile.linkedinUrl)}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn Profile">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.262-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      </a>
      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${escapeHTML(profile.email)}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Email Me">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
      </a>
    `;
  }
}

function renderAbout(profile) {
  const bioEl = document.getElementById('aboutBio');
  if (bioEl) bioEl.textContent = profile.aboutBio;
}

function renderSkills(skills) {
  const container = document.getElementById('skillsGrid');
  if (!container) return;

  container.innerHTML = skills.map(cat => `
    <div class="glass-card skill-category-card reveal-on-scroll">
      <div class="skill-category-header">
        <div class="skill-icon-wrap">
          ${getCategoryIconSvg(cat.icon)}
        </div>
        <h3 class="skill-category-title">${escapeHTML(cat.category)}</h3>
      </div>
      <div class="skill-tags-list">
        ${cat.skills.map(s => `
          <span class="tech-tag" title="${escapeHTML(s.level || s.name)}">
            ${escapeHTML(s.name)} ${s.level ? `<small style="opacity:0.75; margin-left:4px;">(${escapeHTML(s.level)})</small>` : ''}
          </span>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function renderProjects(projects) {
  const container = document.getElementById('projectsGrid') || document.getElementById('frontendProjectsGrid');
  if (!container) return;

  const projectList = Array.isArray(projects)
    ? projects
    : (projects.frontendProjects || (projects.mainProject ? [projects.mainProject] : []));

  if (projectList.length === 0) return;

  container.innerHTML = projectList.map(p => `
    <div class="glass-card frontend-project-card reveal-on-scroll">
      <div>
        <div class="project-img-wrapper">
          ${p.video ? `
            <video src="${escapeHTML(p.video)}" class="hover-video-preview" loop muted playsinline preload="metadata" poster="${escapeHTML(p.image || '')}" style="width:100%; height:auto; display:block; border-radius:inherit;"></video>
            <a href="${escapeHTML(p.video)}" onclick="openVideoModal(event, '${escapeHTML(p.video)}', '${escapeHTML(p.title)}')" target="_blank" rel="noopener noreferrer" class="video-expand-pill" title="Open Video in New Tab">
              <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Open Video ↗
            </a>
          ` : `
            <img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.title)} preview" loading="lazy" />
          `}
        </div>
        <h3 class="project-title">${escapeHTML(p.title)}</h3>
        <p class="project-description" style="font-size:0.92rem; margin-bottom:1rem;">${escapeHTML(p.description)}</p>
        <ul class="project-features-list" style="margin-bottom:1rem;">
          ${(p.features || []).map(f => `<li>${escapeHTML(f)}</li>`).join('')}
        </ul>
      </div>
      <div>
        <div class="project-tech-stack" style="margin-bottom:1rem;">
          ${(p.technologies || []).map(t => `<span class="tech-tag">${escapeHTML(t)}</span>`).join('')}
        </div>
        <div class="project-actions">
          ${p.githubUrl ? `
            <a href="${escapeHTML(p.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" aria-label="GitHub Repository">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
          ` : ''}
          ${p.liveUrl ? `
            <a href="${escapeHTML(p.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" aria-label="Live Demo">
              <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `).join('');

  // Bind Hover-to-Play on all project preview cards with video
  initProjectVideoHover();
}

function initProjectVideoHover() {
  const cards = document.querySelectorAll('.frontend-project-card, .project-card');
  cards.forEach(card => {
    const video = card.querySelector('video.hover-video-preview');
    if (!video) return;

    card.addEventListener('mouseenter', () => {
      video.play().catch(() => { });
    });

    card.addEventListener('mouseleave', () => {
      video.pause();
    });

    // Right-Click Context Menu on video / video wrapper
    const wrapper = video.closest('.project-img-wrapper') || video;
    wrapper.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const videoSrc = video.getAttribute('src') || video.src;
      showVideoContextMenu(e.clientX, e.clientY, videoSrc, video);
    });

    // Touch/click toggle for mobile devices
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      if (video.paused) {
        video.play().catch(() => { });
      } else {
        video.pause();
      }
    });
  });
}

function showVideoContextMenu(x, y, videoSrc, videoEl) {
  // Remove existing menu if any
  const existing = document.getElementById('videoContextMenu');
  if (existing) existing.remove();

  const menu = document.createElement('div');
  menu.id = 'videoContextMenu';
  menu.className = 'video-custom-context-menu';

  // Adjust coordinates so it doesn't overflow screen bounds
  const menuWidth = 220;
  const menuHeight = 130;
  const posX = (x + menuWidth > window.innerWidth) ? (window.innerWidth - menuWidth - 16) : x;
  const posY = (y + menuHeight > window.innerHeight) ? (window.innerHeight - menuHeight - 16) : y;

  menu.style.left = `${posX}px`;
  menu.style.top = `${posY}px`;

  menu.innerHTML = `
    <a href="${escapeHTML(videoSrc)}" target="_blank" rel="noopener noreferrer" class="video-context-menu-item" id="ctxOpenNewTab">
      <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      Open video in new tab ↗
    </a>
    <button type="button" class="video-context-menu-item" id="ctxTogglePlay">
      <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      ${videoEl && !videoEl.paused ? 'Pause preview' : 'Play preview'}
    </button>
    <button type="button" class="video-context-menu-item" id="ctxCopyLink">
      <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      Copy video address
    </button>
  `;

  document.body.appendChild(menu);

  // Bind actions
  menu.querySelector('#ctxOpenNewTab').addEventListener('click', (e) => {
    e.preventDefault();
    menu.remove();
    openVideoModal(null, videoSrc, 'Project Video Preview');
  });

  menu.querySelector('#ctxTogglePlay').addEventListener('click', () => {
    if (videoEl) {
      if (videoEl.paused) videoEl.play().catch(() => { });
      else videoEl.pause();
    }
    menu.remove();
  });

  menu.querySelector('#ctxCopyLink').addEventListener('click', () => {
    const fullUrl = new URL(videoSrc, window.location.href).href;
    navigator.clipboard.writeText(fullUrl).then(() => {
      const btn = menu.querySelector('#ctxCopyLink');
      if (btn) btn.innerHTML = `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
      setTimeout(() => menu.remove(), 600);
    }).catch(() => menu.remove());
  });

  const dismiss = (e) => {
    if (!menu.contains(e.target)) {
      menu.remove();
      document.removeEventListener('click', dismiss);
      document.removeEventListener('contextmenu', dismiss);
    }
  };

  setTimeout(() => {
    document.addEventListener('click', dismiss);
    document.addEventListener('contextmenu', dismiss);
  }, 50);
}

function openVideoModal(e, videoSrc, title) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const fullUrl = new URL(videoSrc, window.location.href).href;
  const win = window.open('', '_blank');

  if (!win) {
    window.open(fullUrl, '_blank');
    return;
  }

  win.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${escapeHTML(title || 'Project Video Preview')}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background-color: #0b0f19;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          padding: 1.5rem;
        }
        .header-bar {
          position: absolute;
          top: 1.25rem;
          left: 1.5rem;
          right: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 10;
        }
        .title-text {
          font-size: 1.1rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 0.01em;
        }
        .video-container {
          position: relative;
          max-width: 1280px;
          width: 95vw;
          box-shadow: 0 25px 65px rgba(0, 0, 0, 0.7);
          border-radius: 16px;
          overflow: hidden;
          background: #000000;
          border: 1.5px solid rgba(255, 255, 255, 0.15);
        }
        video {
          width: 100%;
          height: auto;
          max-height: 85vh;
          display: block;
          outline: none;
        }
      </style>
    </head>
    <body>
      <div class="header-bar">
        <div class="title-text">📹 ${escapeHTML(title || 'Project Video Preview')}</div>
      </div>
      <div class="video-container">
        <video src="${escapeHTML(fullUrl)}" controls autoplay playsinline></video>
      </div>
    </body>
    </html>
  `);
  win.document.close();
}

function openPdfModal(e, pdfUrl, title) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const fullUrl = new URL(pdfUrl, window.location.href).href;
  const win = window.open('', '_blank');

  if (!win) {
    window.open(fullUrl, '_blank');
    return;
  }

  win.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${escapeHTML(title || 'Resume')}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body, html { width: 100%; height: 100%; overflow: hidden; background-color: #525659; }
        iframe, embed, object { width: 100%; height: 100%; border: none; display: block; }
      </style>
    </head>
    <body>
      <iframe src="${escapeHTML(fullUrl)}" type="application/pdf"></iframe>
    </body>
    </html>
  `);
  win.document.close();
}

function renderCertifications(certList) {
  const container = document.getElementById('certificationsGrid');
  if (!container || !certList || certList.length === 0) return;

  container.innerHTML = certList.map(cert => `
    <div class="glass-card certification-card reveal-on-scroll ${cert.category.includes('Hackathon') ? 'cert-featured-hackathon' : ''}">
      <div>
        <div class="cert-card-header">
          <span class="cert-category-badge">${escapeHTML(cert.category || 'Certification')}</span>
          <span class="cert-date">${escapeHTML(cert.date || '')}</span>
        </div>
        <h3 class="cert-title">${escapeHTML(cert.title)}</h3>
        <div class="cert-issuer">${escapeHTML(cert.issuer)}</div>
        <p class="cert-description">${escapeHTML(cert.description)}</p>
        ${cert.credentialId ? `<div class="cert-credential-id">Credential / Ref ID: <code>${escapeHTML(cert.credentialId)}</code></div>` : ''}
      </div>

      <div class="cert-card-footer">
        ${cert.skills && cert.skills.length ? `
          <div class="cert-skills-list">
            ${cert.skills.map(s => `<span class="cert-skill-tag">${escapeHTML(s)}</span>`).join('')}
          </div>
        ` : ''}

        ${cert.fileUrl ? `
          <a href="${escapeHTML(cert.fileUrl)}" target="_blank" rel="noopener noreferrer" class="cert-view-btn">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            View Certificate ↗
          </a>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function renderEducation(eduList) {
  const container = document.getElementById('educationContainer');
  if (!container || !eduList || eduList.length === 0) return;

  const edu = eduList[0];
  container.innerHTML = `
    <div class="glass-card education-card reveal-on-scroll">
      <div class="edu-header">
        <div>
          <h3 class="edu-degree">${escapeHTML(edu.degree)}</h3>
          <div class="edu-branch">${escapeHTML(edu.branch)}</div>
          <div class="edu-institution">${escapeHTML(edu.institution)}</div>
        </div>
        <div style="text-align:right;">
          <span class="edu-duration-badge">${escapeHTML(edu.duration)}</span>
          ${edu.cgpa ? `<div style="font-size:0.9rem; font-weight:700; margin-top:6px; color:var(--accent-primary);">${escapeHTML(edu.cgpa)}</div>` : ''}
        </div>
      </div>
      <div class="edu-coursework-title">Relevant Core Coursework</div>
      <div class="skill-tags-list">
        ${edu.coursework.map(c => `<span class="tech-tag">${escapeHTML(c)}</span>`).join('')}
      </div>
    </div>
  `;
}

function renderOptionalSections(optional) {
  // 1. Experience
  const expSec = document.getElementById('experienceSection');
  const expGrid = document.getElementById('experienceGrid');
  if (expSec && expGrid) {
    if (!optional.experience || optional.experience.length === 0) {
      expSec.classList.add('is-hidden');
    } else {
      expSec.classList.remove('is-hidden');
      expGrid.innerHTML = optional.experience.map(e => `
        <div class="glass-card reveal-on-scroll" style="padding:2rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.75rem; margin-bottom:0.75rem;">
            <div>
              <h3 style="font-size:1.35rem; font-weight:800; color:var(--text-heading); margin-bottom:0.25rem;">${escapeHTML(e.role)}</h3>
              <div style="color:var(--accent-primary); font-weight:700; font-size:1.05rem;">${escapeHTML(e.organization)}</div>
              ${e.location ? `<div style="font-size:0.88rem; color:var(--text-muted); margin-top:0.2rem;">${escapeHTML(e.location)}</div>` : ''}
            </div>
            <div style="display:flex; flex-direction:column; align-items:flex-end; gap:0.35rem;">
              <span class="badge" style="background:var(--surface-pill); border:1px solid var(--border-subtle); color:var(--text-heading); font-weight:700; padding:0.3rem 0.8rem; border-radius:var(--radius-full); font-size:0.85rem;">${escapeHTML(e.duration)}</span>
              ${e.certificateNo ? `<span style="font-size:0.78rem; font-weight:600; color:var(--accent-primary);">Cert No: ${escapeHTML(e.certificateNo)}</span>` : ''}
            </div>
          </div>

          <p style="font-size:0.95rem; color:var(--text-main); margin:1rem 0; line-height:1.6;">${escapeHTML(e.description)}</p>

          ${e.highlights && e.highlights.length ? `
            <ul style="list-style:none; padding:0; margin:0 0 1.25rem 0; display:flex; flex-direction:column; gap:0.45rem;">
              ${e.highlights.map(h => `
                <li style="display:flex; align-items:center; gap:0.5rem; font-size:0.9rem; color:var(--text-main);">
                  <span style="color:var(--accent-primary); font-weight:bold;">✓</span>
                  <span>${escapeHTML(h)}</span>
                </li>
              `).join('')}
            </ul>
          ` : ''}

          ${e.technologies && e.technologies.length ? `
            <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1.25rem;">
              ${e.technologies.map(t => `<span class="tech-tag">${escapeHTML(t)}</span>`).join('')}
            </div>
          ` : ''}

          ${e.certificateUrl ? `
            <a href="${escapeHTML(e.certificateUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              View Certificate
            </a>
          ` : ''}
        </div>
      `).join('');
    }
  }

  // 2. Certifications
  const certSec = document.getElementById('certificationsSection');
  const certGrid = document.getElementById('certificationsGrid');
  if (certSec && certGrid) {
    if (!optional.certifications || optional.certifications.length === 0) {
      certSec.classList.add('is-hidden');
    } else {
      certSec.classList.remove('is-hidden');
      certGrid.innerHTML = optional.certifications.map(c => `
        <div class="glass-card reveal-on-scroll" style="padding:1.75rem;">
          <h3 style="font-size:1.15rem; font-weight:700; color:var(--text-heading); margin-bottom:0.35rem;">${escapeHTML(c.name)}</h3>
          <div style="font-size:0.95rem; color:var(--accent-primary); font-weight:600;">${escapeHTML(c.organization)} (${escapeHTML(c.year)})</div>
          ${c.credentialId ? `<div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;">Certificate ID: ${escapeHTML(c.credentialId)}</div>` : ''}
          ${c.verifyUrl ? `<a href="${escapeHTML(c.verifyUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="margin-top:1.25rem;">View Certificate</a>` : ''}
        </div>
      `).join('');
    }
  }

  // 3. Achievements
  const achSec = document.getElementById('achievementsSection');
  const achGrid = document.getElementById('achievementsGrid');
  if (achSec && achGrid) {
    if (!optional.achievements || optional.achievements.length === 0) {
      achSec.classList.add('is-hidden');
    } else {
      achSec.classList.remove('is-hidden');
      achGrid.innerHTML = optional.achievements.map(a => `
        <div class="glass-card reveal-on-scroll" style="padding:1.5rem;">
          <h3 style="font-size:1.1rem; font-weight:700; color:var(--text-heading);">${escapeHTML(a.title)}</h3>
          <div style="font-size:0.9rem; color:var(--accent-primary); font-weight:600;">${escapeHTML(a.organization)} - ${escapeHTML(a.year)}</div>
          <p style="font-size:0.9rem; color:var(--text-muted); margin-top:0.5rem;">${escapeHTML(a.description)}</p>
        </div>
      `).join('');
    }
  }

  // 4. Coding Profiles
  const profSec = document.getElementById('codingProfilesSection');
  const profFlex = document.getElementById('codingProfilesFlex');
  if (profSec && profFlex) {
    const validProfiles = (optional.codingProfiles || []).filter(p => p.url && p.url.trim() !== '');
    if (validProfiles.length === 0) {
      profSec.classList.add('is-hidden');
    } else {
      profSec.classList.remove('is-hidden');
      profFlex.innerHTML = validProfiles.map(p => `
        <a href="${escapeHTML(p.url)}" target="_blank" rel="noopener noreferrer" class="glass-card profile-card reveal-on-scroll">
          <div class="skill-icon-wrap">
            ${getCategoryIconSvg(p.icon || 'code')}
          </div>
          <div>
            <div style="font-weight:700; color:var(--text-heading);">${escapeHTML(p.platform)}</div>
            <div style="font-size:0.85rem; color:var(--text-muted);">${escapeHTML(p.username)}</div>
          </div>
        </a>
      `).join('');
    }
  }
}

function renderResume(profile) {
  const resumePath = profile.resumePath || './resume/SinchanaRes-JAVA.pdf';

  const downloadBtns = document.querySelectorAll('.resume-download-btn');
  downloadBtns.forEach(btn => {
    btn.setAttribute('href', resumePath);
    btn.removeAttribute('download');
    btn.setAttribute('target', '_blank');
    btn.onclick = (e) => openPdfModal(e, resumePath, `${profile.name} - Resume`);
  });

  const viewBtns = document.querySelectorAll('.resume-view-btn');
  viewBtns.forEach(btn => {
    btn.setAttribute('href', resumePath);
    btn.removeAttribute('download');
    btn.setAttribute('target', '_blank');
    btn.onclick = (e) => openPdfModal(e, resumePath, `${profile.name} - Resume`);
  });

  const dockResume = document.getElementById('dockResumeLink') || document.querySelector('.floating-dock .dock-item[data-tooltip="Resume"]');
  if (dockResume) {
    dockResume.setAttribute('href', resumePath);
    dockResume.removeAttribute('download');
    dockResume.setAttribute('target', '_blank');
    dockResume.onclick = (e) => openPdfModal(e, resumePath, `${profile.name} - Resume`);
  }
}

function renderContact(profile) {
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`;

  const emailEl = document.getElementById('contactEmailText');
  if (emailEl) emailEl.textContent = profile.email;

  const emailLink = document.getElementById('contactEmailLink');
  if (emailLink) {
    emailLink.setAttribute('href', gmailUrl);
    emailLink.setAttribute('target', '_blank');
    emailLink.setAttribute('rel', 'noopener noreferrer');
  }

  const ghLink = document.getElementById('contactGithubLink');
  if (ghLink) ghLink.setAttribute('href', profile.githubUrl);

  const liLink = document.getElementById('contactLinkedinLink');
  if (liLink) liLink.setAttribute('href', profile.linkedinUrl);

  const dockEmail = document.getElementById('dockEmail');
  if (dockEmail) {
    dockEmail.setAttribute('href', gmailUrl);
    dockEmail.setAttribute('target', '_blank');
    dockEmail.setAttribute('rel', 'noopener noreferrer');
  }

  const dockPhone = document.getElementById('dockPhone');
  if (dockPhone && profile.phone) {
    dockPhone.setAttribute('href', `tel:${profile.phone.replace(/\s+/g, '')}`);
    const tooltip = dockPhone.querySelector('.dock-tooltip');
    if (tooltip) tooltip.textContent = 'Phone';
    dockPhone.setAttribute('data-tooltip', 'Phone');
  }
}



/* --------------------------------------------------------------------------
   INTERACTIVITY HELPERS
   -------------------------------------------------------------------------- */

function initFloatingDock() {
  const dock = document.querySelector('.dock-container');
  const items = document.querySelectorAll('.dock-item');
  if (!dock || !items.length) return;

  const getScaleConfig = () => {
    const w = window.innerWidth;
    if (w <= 480) {
      return { maxScale: 1.35, maxDistance: 100, lift: 11 };
    } else if (w <= 768) {
      return { maxScale: 1.5, maxDistance: 115, lift: 14 };
    } else if (w <= 1024) {
      return { maxScale: 1.7, maxDistance: 135, lift: 18 };
    } else {
      return { maxScale: 1.9, maxDistance: 155, lift: 23 };
    }
  };

  const updateMagnification = (clientX) => {
    const { maxScale, maxDistance, lift } = getScaleConfig();
    let totalBonus = 0;

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(clientX - itemCenterX);

      if (distance < maxDistance) {
        // Cosine distance falloff curve for liquid icon wave magnification
        const factor = Math.cos((distance / maxDistance) * (Math.PI / 2));
        const scale = 1 + (maxScale - 1) * Math.pow(factor, 2);
        const translateY = -((scale - 1) * lift);

        item.style.transform = `scale(${scale.toFixed(3)}) translateY(${translateY.toFixed(2)}px)`;
        item.style.zIndex = Math.round(scale * 10);
        totalBonus += (scale - 1);
      } else {
        item.style.transform = '';
        item.style.zIndex = '';
      }
    });

    // Dynamically expand glass capsule padding & scale smoothly under active pointer wave
    if (totalBonus > 0) {
      const padBonus = Math.min(totalBonus * 16, 32);
      dock.style.paddingLeft = `calc(var(--dock-pad, 2.8rem) + ${padBonus.toFixed(1)}px)`;
      dock.style.paddingRight = `calc(var(--dock-pad, 2.8rem) + ${padBonus.toFixed(1)}px)`;
      dock.style.transform = `scale(1.03)`;
    }
  };

  const resetDock = () => {
    dock.style.paddingLeft = '';
    dock.style.paddingRight = '';
    dock.style.transform = '';
    items.forEach((item) => {
      item.style.transform = '';
      item.style.zIndex = '';
    });
  };

  dock.addEventListener('mousemove', (e) => updateMagnification(e.clientX));
  dock.addEventListener('mouseleave', resetDock);

  // Touch event support for smartphones and tablets
  dock.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) updateMagnification(e.touches[0].clientX);
  }, { passive: true });

  dock.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) updateMagnification(e.touches[0].clientX);
  }, { passive: true });

  dock.addEventListener('touchend', () => {
    setTimeout(resetDock, 350);
  });
}

function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileMenuDrawer');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!btn || !drawer) return;

  const toggle = () => {
    const isOpen = drawer.classList.toggle('is-open');
    btn.classList.toggle('is-active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  btn.addEventListener('click', toggle);
  links.forEach(l => l.addEventListener('click', () => {
    if (drawer.classList.contains('is-open')) toggle();
  }));
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(sec => observer.observe(sec));
}

function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  if (!form || !statusEl) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !message) {
      statusEl.className = 'form-status error';
      statusEl.textContent = 'Please fill out all required fields.';
      return;
    }

    // Simulate clean client-side submission state ready for Formspree / EmailJS
    statusEl.className = 'form-status success';
    statusEl.textContent = 'Thank you! Your message has been sent successfully.';
    form.reset();

    setTimeout(() => {
      statusEl.textContent = '';
    }, 6000);
  });
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g,
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

function getCategoryIconSvg(name) {
  switch (name) {
    case 'code':
      return `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>`;
    case 'globe':
      return `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`;
    case 'database':
      return `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`;
    case 'cpu':
      return `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>`;
    default:
      return `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`;
  }
}
