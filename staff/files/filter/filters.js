(function(){


    // Filters (now grouped)
  const FILTERS = [
    { key: 'uol',  label: 'UoL',              dot: '#FF8FAB', group: 'programme' },
    { key: 'ob',   label: 'Open Bachelors',   dot: '#57CC99', group: 'programme' },

    { key: 'ds',   label: 'Data Science',     dot: '#4F8BFF', group: 'degree' },
    { key: 'pir',  label: 'Politics & IR',    dot: '#B56DFF', group: 'degree' },
    { key: 'econ', label: 'Economics',        dot: '#FF6B6B', group: 'degree' },
    { key: 'psy',  label: 'Psychology',       dot: '#2EC4B6', group: 'degree' },
    { key: 'b&m',  label: 'Business & Mgmt',  dot: '#FFB347', group: 'degree' },

    { key: 'openai',  label: 'OpenAI',              dot: '#FFB347', group: 'model' },
    { key: 'claude',   label: 'Claude',   dot: '2EC4B6', group: 'model' },

    // later:
    // { key: 'whatever', label:'...', dot:'#...', group:'category' }
  ];

  // Which filter-groups to show per page
  const PAGE_GROUPS = {
    generic: ['model'],
    subject: ['degree','programme'],
    tools:   [] // tweak later
  };

  // Optional: restrict specific bots to certain pages (if not listed => allowed everywhere)
  const BOT_PAGES = {
    // 'Some Bot Name': ['tools']
  };

  // Bot title → required filter keys (AND logic)
  const BOT_ASSOCIATIONS = {
    'Data Science BuddAI': ['ds','uol'],
    'PIR Feedback Builder': ['pir','uol'],
    'chjatgpt':['openai']
  };

  // Pages (category tabs)
const PAGES = [
{
  key: 'generic',
  label: 'Generic Models',
  icon: `
  <svg viewBox="0 0 320 320" aria-hidden="true">
  <path fill="currentColor" d="m297.06 130.97c7.26-21.79 4.76-45.66-6.85-65.48-17.46-30.4-52.56-46.04-86.84-38.68-15.25-17.18-37.16-26.95-60.13-26.81-35.04-.08-66.13 22.48-76.91 55.82-22.51 4.61-41.94 18.7-53.31 38.67-17.59 30.32-13.58 68.54 9.92 94.54-7.26 21.79-4.76 45.66 6.85 65.48 17.46 30.4 52.56 46.04 86.84 38.68 15.24 17.18 37.16 26.95 60.13 26.8 35.06.09 66.16-22.49 76.94-55.86 22.51-4.61 41.94-18.7 53.31-38.67 17.57-30.32 13.55-68.51-9.94-94.51zm-120.28 168.11c-14.03.02-27.62-4.89-38.39-13.88.49-.26 1.34-.73 1.89-1.07l63.72-36.8c3.26-1.85 5.26-5.32 5.24-9.07v-89.83l26.93 15.55c.29.14.48.42.52.74v74.39c-.04 33.08-26.83 59.9-59.91 59.97zm-128.84-55.03c-7.03-12.14-9.56-26.37-7.15-40.18.47.28 1.3.79 1.89 1.13l63.72 36.8c3.23 1.89 7.23 1.89 10.47 0l77.79-44.92v31.1c.02.32-.13.63-.38.83l-64.41 37.19c-28.69 16.52-65.33 6.7-81.92-21.95zm-16.77-139.09c7-12.16 18.05-21.46 31.21-26.29 0 .55-.03 1.52-.03 2.2v73.61c-.02 3.74 1.98 7.21 5.23 9.06l77.79 44.91-26.93 15.55c-.27.18-.61.21-.91.08l-64.42-37.22c-28.63-16.58-38.45-53.21-21.95-81.89zm221.26 51.49-77.79-44.92 26.93-15.54c.27-.18.61-.21.91-.08l64.42 37.19c28.68 16.57 38.51 53.26 21.94 81.94-7.01 12.14-18.05 21.44-31.2 26.28v-75.81c.03-3.74-1.96-7.2-5.2-9.06zm26.8-40.34c-.47-.29-1.3-.79-1.89-1.13l-63.72-36.8c-3.23-1.89-7.23-1.89-10.47 0l-77.79 44.92v-31.1c-.02-.32.13-.63.38-.83l64.41-37.16c28.69-16.55 65.37-6.7 81.91 22 6.99 12.12 9.52 26.31 7.15 40.1zm-168.51 55.43-26.94-15.55c-.29-.14-.48-.42-.52-.74v-74.39c.02-33.12 26.89-59.96 60.01-59.94 14.01 0 27.57 4.92 38.34 13.88-.49.26-1.33.73-1.89 1.07l-63.72 36.8c-3.26 1.85-5.26 5.31-5.24 9.06l-.04 89.79zm14.63-31.54 34.65-20.01 34.65 20v40.01l-34.65 20-34.65-20z"/>
  </svg>`
  },

  {
    key: 'subject',
    label: 'Subject BuddAIs',
    icon: `<svg viewBox="-4 0 28 25" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M3 6.1519V19.3095C3.99197 18.8639 5.40415 18.4 7 18.4C8.58915 18.4 9.9999 18.8602 11 19.3094V6.1519C10.7827 6.02653 10.4894 5.8706 10.1366 5.71427C9.31147 5.34869 8.20352 5 7 5C5.26385 5 3.74016 5.72499 3 6.1519ZM13 6.1519V19.3578C13.9977 18.9353 15.41 18.5 17 18.5C18.596 18.5 20.0095 18.9383 21 19.3578V6.1519C20.2598 5.72499 18.7362 5 17 5C15.7965 5 14.6885 5.34869 13.8634 5.71427C13.5106 5.8706 13.2173 6.02653 13 6.1519ZM12 4.41985C11.7302 4.26422 11.3734 4.07477 10.9468 3.88572C9.96631 3.45131 8.57426 3 7 3C4.69187 3 2.76233 3.97065 1.92377 4.46427C1.30779 4.82687 1 5.47706 1 6.11223V20.0239C1 20.6482 1.36945 21.1206 1.79531 21.3588C2.21653 21.5943 2.78587 21.6568 3.30241 21.3855C4.12462 20.9535 5.48348 20.4 7 20.4C8.90549 20.4 10.5523 21.273 11.1848 21.6619C11.6757 21.9637 12.2968 21.9725 12.7959 21.6853C13.4311 21.32 15.0831 20.5 17 20.5C18.5413 20.5 19.9168 21.0305 20.7371 21.4366C21.6885 21.9075 23 21.2807 23 20.0593V6.11223C23 5.47706 22.6922 4.82687 22.0762 4.46427C21.2377 3.97065 19.3081 3 17 3C15.4257 3 14.0337 3.45131 13.0532 3.88572C12.6266 4.07477 12.2698 4.26422 12 4.41985Z"/>
    </svg>`
  },

  {
    key: 'tools',
    label: 'Forward AI Tools',
    icon: `<svg viewBox="500 100 400 300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M 659.328,76.057 H 420.671 v 238.657 h 238.657 z" transform="matrix(1.3333333,0,0,-1.3333333,0,521.02667)"/>
      <path fill="#fff" d="M 0,0 V -15.575 H 29.198 V -32.75 H 0 V -61.714 H -19.088 V 17.839 H 37.629 V 0 Z" transform="matrix(1.3333333,0,0,-1.3333333,707.63907,231.2632)"/>
    </svg>`
  }
  ];



  function ensureFilterBox(){
    let box = document.getElementById('filter-box');
    if(box) return box;

    const target = document.querySelector('div > .flex.h-full.w-full.flex-col.overflow-hidden');
    if(!target || !target.parentNode) return null;

    box = document.createElement('div');
    box.id = 'filter-box';
    target.parentNode.insertBefore(box, target);
    return box;
  }

  function mount(){
    const box = ensureFilterBox();
    if(!box) return;
    if(box.querySelector('[data-filter-ui]')) return;

    let currentPage = 'subject'; // default

    const shell = document.createElement('div');
    shell.className = 'fb-shell';
    shell.setAttribute('data-filter-ui','1');

    // --- Profile section (placeholder) ---
    const profile = document.createElement('div');
    profile.className = 'fb-profile';
    profile.innerHTML = `
    <div class="fb-profile-left">
      <div class="fb-email">leonardo@forward.eu</div>
      <div class="fb-degree">
        <span class="fb-degree-text">BSc. Data Science &amp; Business Analytics</span>
      </div>
      <button type="button" class="fb-reset" data-act="reset">(reset default)</button>
      <button type="button" class="fb-reset" data-act="edit-degree">(edit degree)</button>
    </div>
  `;

    // --- Pages section ---
    const pages = document.createElement('div');
    pages.className = 'fb-tabs';

    // collapse state
    let filtersOpen = false;

    const pageBtns = {};
    PAGES.forEach(p=>{
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'fb-tab' + (p.key === currentPage ? ' is-active' : '');
      b.dataset.page = p.key;
      b.innerHTML = `
        <span class="fb-tab-ico">${p.icon}</span>
        <span class="fb-tab-label">${p.label}</span>
      `;
      pageBtns[p.key] = b;
      pages.appendChild(b);
    });

    // --- Filters section (grouped) ---
    const filtersWrap = document.createElement('div');
    filtersWrap.className = 'fb-filters';

    const controls = document.createElement('div');
    controls.className = 'fb-controls';

    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'fb-filters-toggle';
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.innerHTML = `
      <span class="fb-chev" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
    `;
    controls.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', ()=>{
      setFiltersOpen(!filtersOpen);
    });

    
    const filterBtns = {}; // key -> button

    function makeFilterBtn({ key, label, dot }){
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'blob-btn is-active';
      b.dataset.filter = key;
      b.style.setProperty('--dot', dot);
      b.innerHTML = '<span class="dot"></span><span>' + label + '</span>';
      return b;
    }

    function setFiltersOpen(open, animate = true){
      filtersOpen = open;
      toggleBtn.setAttribute('aria-expanded', String(!!open));
      filtersWrap.classList.toggle('is-collapsed', !open);

      if(open && animate) animateFiltersOpen();
    }

    function instantCloseFilters(){
      filtersWrap.classList.add('no-trans');     // kill transition
      setFiltersOpen(false, false);              // close instantly
      void filtersWrap.offsetHeight;             // force style flush
      filtersWrap.classList.remove('no-trans');  // restore transition for opening
    }

    function replayFiltersOpen(delay = 120){
      instantCloseFilters();
      setTimeout(()=>setFiltersOpen(true, true), delay);
    }

    function animateFiltersOpen(){
      filtersWrap.classList.remove('is-anim');
      void filtersWrap.offsetHeight;
      filtersWrap.classList.add('is-anim');
      clearTimeout(filtersWrap._animT);
      filtersWrap._animT = setTimeout(()=>filtersWrap.classList.remove('is-anim'), 650); // match 600ms-ish
    }

    function renderFilters(){
      filtersWrap.innerHTML = '';

      const groupsToShow = PAGE_GROUPS[currentPage] || ['degree','programme','category'];

      groupsToShow.forEach(groupName=>{
        const group = document.createElement('div');
        group.className = 'fb-group';

        const h = document.createElement('div');
        h.className = 'fb-group-title';

        const row = document.createElement('div');
        row.className = 'filter-row';

        FILTERS
          .filter(f => f.group === groupName)
          .forEach(f=>{
            if(!filterBtns[f.key]) filterBtns[f.key] = makeFilterBtn(f);
            row.appendChild(filterBtns[f.key]);
          });

        group.appendChild(h);
        group.appendChild(row);
        filtersWrap.appendChild(group);
      });

      resetVisibleFiltersOn();
      filterBots();
      if(filtersOpen) animateFiltersOpen();
    }

    function visibleFilterKeys(){
      return Object.keys(filterBtns).filter(k => filterBtns[k].isConnected);
    }

    function resetVisibleFiltersOn(){
      visibleFilterKeys().forEach(k => filterBtns[k].classList.add('is-active'));
    }

    function getActiveKeys(){
      return visibleFilterKeys().filter(k => filterBtns[k].classList.contains('is-active'));
    }

    function filterBots(){
      const activeKeys = new Set(getActiveKeys());

      document.querySelectorAll('div.flex.flex-col > button').forEach(btn=>{
        const card = btn.parentElement;
        const p = btn.querySelector('p');
        if(!p) return;

        const title = p.textContent.trim();

        // page restriction (optional)
        const allowedPages = BOT_PAGES[title];
        if(allowedPages && !allowedPages.includes(currentPage)){
          card.style.display = 'none';
          return;
        }

        const requiredKeys = BOT_ASSOCIATIONS[title];

        // If bot not listed, always show (subject to page restriction above)
        if(!requiredKeys){
          card.style.display = '';
          return;
        }

        const visible = requiredKeys.every(k => activeKeys.has(k));
        card.style.display = visible ? '' : 'none';
      });
    }

    // Build UI
    shell.appendChild(profile);
    shell.appendChild(pages);
    shell.appendChild(filtersWrap);
    shell.appendChild(controls);
    box.appendChild(shell);

    // Page switching
    Object.values(pageBtns).forEach(b=>{
      b.addEventListener('click', ()=>{
        const next = b.dataset.page;
        if(next === currentPage) return;
        currentPage = next;

        Object.values(pageBtns).forEach(x=>x.classList.toggle('is-active', x.dataset.page === currentPage));

        renderFilters(); 
        replayFiltersOpen(30);

      });
    });

    // Filter toggles (delegated)
    filtersWrap.addEventListener('click', (e)=>{
      const btn = e.target.closest('button[data-filter]');
      if(!btn) return;
      btn.classList.toggle('is-active');
      filterBots();
    });

    // Profile actions (placeholder)
    profile.addEventListener('click', (e)=>{
      const b = e.target.closest('button[data-act]');
      if(!b) return;
      const act = b.dataset.act;
      if(act === 'reset'){
        resetVisibleFiltersOn();
        filterBots();
      }
      // edit/home/search are placeholders for now
    });

 
    renderFilters();
    replayFiltersOpen(30);
    setInterval(filterBots, 1200); // survives dynamic re-render
  
  }

  setTimeout(mount, 900);

})();
