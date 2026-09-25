// Custom Shivraj line-icon set — 24 grid, 1.5 stroke, round joins. Drawn for this project.
const P = {
  dog: '<path d="M5 9.5 3.5 5l4 1.8M19 9.5 20.5 5l-4 1.8"/><path d="M7.5 6.8C8.8 5.8 10.3 5.3 12 5.3s3.2.5 4.5 1.5c1.4 1.1 2 2.8 2 4.7 0 4-2.9 7.2-6.5 7.2s-6.5-3.2-6.5-7.2c0-1.9.6-3.6 2-4.7Z"/><circle cx="9.6" cy="11" r=".6" fill="currentColor"/><circle cx="14.4" cy="11" r=".6" fill="currentColor"/><path d="M10.8 14.2h2.4L12 15.5Z" fill="currentColor"/><path d="M12 15.5v1.3"/>',
  cat: '<path d="M5.5 10.5V4.5l4 3.2c.8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3l4-3.2v6"/><path d="M5.5 10.5c0 4.4 2.9 8 6.5 8s6.5-3.6 6.5-8"/><path d="M9 11.8c.4-.4 1-.4 1.4 0M13.6 11.8c.4-.4 1-.4 1.4 0"/><path d="M11.3 14.3h1.4l-.7.8Z" fill="currentColor"/><path d="M2.5 13.5 7 14M2.8 16 7 15.2M21.5 13.5 17 14M21.2 16 17 15.2"/>',
  bird: '<path d="M8.5 20.5c0-1.7.9-3 2.3-3.9"/><path d="M9.5 16.5C6 15.5 4.5 12.8 5.2 9.6 6 5.9 9.3 3.8 12.6 4.5c2 .4 3.3 1.6 3.9 3.3l3 .7-2.6 1.8c.1 3.6-2.2 6.4-5.6 6.9"/><circle cx="13.8" cy="7.7" r=".7" fill="currentColor"/><path d="M8 11.5c1.6 1.4 3.6 1.9 6 1.4"/><path d="M13.5 20.5l-1.2-3.8"/>',
  rabbit: '<path d="M9.3 9.5C8 7.8 7.5 5.4 8 3.5c1.6.4 2.8 2.4 3 4.6M14.7 9.5c1.3-1.7 1.8-4.1 1.3-6-1.6.4-2.8 2.4-3 4.6"/><path d="M12 8.3c-3.4 0-6 2.6-6 6 0 3.5 2.7 5.7 6 5.7s6-2.2 6-5.7c0-3.4-2.6-6-6-6Z"/><circle cx="9.8" cy="13.3" r=".6" fill="currentColor"/><circle cx="14.2" cy="13.3" r=".6" fill="currentColor"/><path d="M11.3 15.6h1.4l-.7.7Z" fill="currentColor"/>',
  turtle: '<path d="M4 14.5c.6-4.2 3.9-7 8-7s7.4 2.8 8 7Z"/><path d="M4 14.5h16"/><path d="M9 8.3 10.3 11l-2.8 3.5M15 8.3 13.7 11l2.8 3.5M10.3 11h3.4"/><path d="M20 12.3c.9-.9 2-1 2.8-.3-.1 1.4-1.2 2.4-2.8 2.5M6 14.5 5 17.5M18 14.5l1 3M9.5 14.5 9 17M14.5 14.5 15 17"/>',
  lizard: '<path d="M4 19c2.5 0 4-1 5-3l2.5-5c1-2 2.6-3.3 4.5-3.8L19 6.5c1.2-.3 2 .6 1.6 1.7-.4 1.2-1.6 1.9-2.9 2L16 10.5"/><path d="M8 12.5 6 11M10.4 16.2l-1.3 2.3M12.9 11.7 15 13.2M11.5 9.3 10.3 7"/><circle cx="18.6" cy="7.6" r=".5" fill="currentColor"/>',
  guinea: '<path d="M4 15c0-3.9 3.5-7 8-7 3.3 0 5.9 1.4 7.3 3.7 1 .2 1.7 1 1.7 2 0 .7-.3 1.3-.9 1.7-.8 2.3-3.4 3.6-7.6 3.6H8c-2.2 0-4-1.8-4-4Z"/><circle cx="17.3" cy="12.2" r=".6" fill="currentColor"/><path d="M15 8.6c.3-1.2 1.2-2 2.3-2 .2.9-.1 1.8-.6 2.5M7.5 18.8V20M13.5 18.8V20"/>',
  syringe: '<path d="m18 3 3 3M19.5 4.5 16 8M14 6l4 4M15 7 7 15l-1.6 3.6L9 17l8-8M8.2 13.8l1.5 1.5M10.7 11.3l1.5 1.5M3 21l2.4-2.4"/>',
  stethoscope: '<path d="M6 3.5H4.5v5a4.5 4.5 0 0 0 9 0v-5H12"/><path d="M9 13v1.5a5 5 0 0 0 10 0v-2"/><circle cx="19" cy="10.5" r="2"/>',
  microscope: '<path d="M6 20.5h13M8.5 20.5c0-3.6 2.6-6.5 6-6.8M9.5 3.5l3 1.7-3.5 6-3-1.7ZM11 6.1l2 1.2M8.3 11.3l-1 1.7 1.8 1 1-1.7"/><circle cx="15.5" cy="13.7" r="2"/>',
  xray: '<rect x="3.5" y="3.5" width="17" height="17" rx="1.5"/><path d="M12 6.5v11M9 8.5c1 .6 2 .9 3 .9s2-.3 3-.9M8.5 11.5c1.1.6 2.3 1 3.5 1s2.4-.4 3.5-1M9 14.5c1 .6 2 .9 3 .9s2-.3 3-.9"/>',
  ultrasound: '<path d="M4 20 12 6l8 14"/><path d="M7 15.5c1.4-.9 3.1-1.5 5-1.5s3.6.6 5 1.5M9.3 11.6c.8-.4 1.7-.6 2.7-.6s1.9.2 2.7.6"/><rect x="10" y="3" width="4" height="3.5" rx="1"/>',
  scalpel: '<path d="M3.5 20.5 13 11l2 2-6.5 6.3c-1.3 1.2-3.3 1.6-5 1.2Z"/><path d="m13 11 6.5-6.5a1.4 1.4 0 0 1 2 2L15 13"/>',
  capsule: '<rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="m10 9.2 4 5.6"/>',
  bone: '<path d="M8.6 15.4 15.4 8.6M6.8 13.6a2.2 2.2 0 1 0-1.5 3.8 2.2 2.2 0 1 0 3.8 1.5M17.2 10.4a2.2 2.2 0 1 0 1.5-3.8 2.2 2.2 0 1 0-3.8-1.5"/>',
  pulse: '<path d="M2.5 12.5h4l2-5 3.5 11 3-8 1.5 2h5"/>',
  paw: '<ellipse cx="7" cy="9.5" rx="1.6" ry="2.1"/><ellipse cx="10.4" cy="6.2" rx="1.6" ry="2.1"/><ellipse cx="13.9" cy="6.2" rx="1.6" ry="2.1"/><ellipse cx="17.2" cy="9.5" rx="1.6" ry="2.1"/><path d="M12.1 11.2c2.3 0 5 3.3 5 5.6 0 1.7-1.3 2.7-3 2.7-.8 0-1.3-.4-2-.4s-1.2.4-2 .4c-1.7 0-3-1-3-2.7 0-2.3 2.7-5.6 5-5.6Z"/>',
  phone: '<path d="M5 3.5h3.5l1.8 4.5-2.3 1.5a11 11 0 0 0 6.5 6.5l1.5-2.3 4.5 1.8V19a1.5 1.5 0 0 1-1.5 1.5A16 16 0 0 1 3.5 5 1.5 1.5 0 0 1 5 3.5Z"/>',
  whatsapp: '<path d="M4 20l1.3-3.9A8.5 8.5 0 1 1 8.1 19Z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .9A4.6 4.6 0 0 1 11 10.8l.9-1-1-2Z"/>',
  pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  arrow: '<path d="M4.5 12h15M13.5 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8.5 7H17v8.5"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="1.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  menu: '<path d="M4 8h16M4 16h16"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".8" fill="currentColor"/>',
  facebook: '<path d="M14.5 8.5H13a1.5 1.5 0 0 0-1.5 1.5v10.5M9 13h5.5M14.5 3.5H13A4.5 4.5 0 0 0 8.5 8"/>',
  star: '<path d="m12 3.8 2.5 5.1 5.6.8-4 4 .9 5.5-5-2.6-5 2.6.9-5.5-4-4 5.6-.8Z"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="1.5"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
};

// Owner-supplied illustrated buttons replace the line icons for call + WhatsApp everywhere.
const IMG = {
  phone: ['call-cat-button-shivraj-pet-clinic', 95],
  whatsapp: ['whatsapp-cat-button-shivraj-pet-clinic', 96],
};

function icon(name, cls = '') {
  if (IMG[name]) {
    const [file, h] = IMG[name];
    return `<img class="i i--img i--${name}${cls ? ' ' + cls : ''}" src="/images/ui/${file}-96.webp" srcset="/images/ui/${file}-96.webp 1x, /images/ui/${file}-192.webp 2x" width="96" height="${h}" alt="" aria-hidden="true" decoding="async">`;
  }
  const body = P[name];
  if (!body) throw new Error(`Unknown icon: ${name}`);
  return `<svg class="i${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

module.exports = { icon, ICONS: Object.keys(P) };
