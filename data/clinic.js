// Single source of truth for NAP + clinic facts. Every value here is traced in docs/04-Content-Source-of-Truth.md.
const clinic = {
  name: 'Shivraj Pet Clinic & Lab',
  shortName: 'Shivraj Pet Clinic & Lab',
  alt: 'Shivraj Pet Clinic & Exotic Animal Centre',
  site: 'https://www.shivrajpetclinicpune.com',
  founded: 2013,
  phone: '+917756965169',
  phoneDisplay: '+91 77569 65169',
  whatsapp: 'https://wa.me/917756965169',
  email: 'shivrajclinic@gmail.com', // owner-confirmed 2026-10-17 (replaces visiting-card address) — C19
  address: {
    street: 'Shop No. B-4, Alpine Avenue, Aundh–Wakad Road, Vishal Nagar',
    locality: 'Pimple Nilakh',
    city: 'Pune',
    region: 'Maharashtra',
    pin: '411027',
    country: 'IN',
    landmark: 'Near Jagtap Dairy, Aundh–Wakad Road',
  },
  geo: { lat: 18.5883921, lng: 73.7822047 },
  mapsUrl: 'https://www.google.com/maps/place/Shivraj+Pet+Clinic+%26+lab,+Alpine+Avenue,+Shop+No+B-4,+Aundh-Wakad+Rd,+Vishal+Nagar,+Pimple+Nilakh,+Pimpri-Chinchwad,+Maharashtra+411027/data=!4m2!3m1!1s0x3bc2b93d19aeeeef:0xbb41140a3a0bac96!18m1!1e1',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.681510156904!2d73.77962977519334!3d18.588392082518382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b93d19aeeeef%3A0xbb41140a3a0bac96!2sShivraj%20Pet%20Clinic%20%26%20lab!5e0!3m2!1sen!2sin!4v1790280509148!5m2!1sen!2sin',
  // Owner-supplied pop-up (2 s on directions / dog content, 4-min cooldown each).
  // ⚠ Fan art of a trademarked cartoon character (Courage the Cowardly Dog): owner must confirm rights before launch — set to false to disable.
  // Disabled 2026-09-25 (owner decision): trademark risk + conflicts with the "no cartoon animals" rule.
  hugPopup: { enabled: false, src: '/images/ui/dog-hug-shivraj-pet-clinic-and-lab-480.webp', alt: 'A happy dog getting a warm hug' },
  // 24h local time (Asia/Kolkata). Wednesday closed.
  hours: [
    { label: 'Morning', open: '10:30', close: '13:30' },
    { label: 'Evening', open: '15:00', close: '20:30' },
  ],
  openDays: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  closedDay: 'Wednesday',
  hoursText: 'Mon, Tue, Thu–Sun · 10:30 AM–1:30 PM & 3:00–8:30 PM · Wednesday closed',
  fees: { regular: 300, exotic: 400 },
  // Booking slots (C4: 3–5 PM usually reserved for surgery on the legacy site).
  slots: {
    morning: ['10:30–11:30 AM', '11:30 AM–12:30 PM', '12:30–1:30 PM'],
    evening: ['5:00–6:00 PM', '6:00–7:00 PM', '7:00–8:00 PM', '8:00–8:30 PM'],
  },
  areas: ['Pimple Nilakh', 'Vishal Nagar', 'Wakad', 'Pimple Saudagar', 'Baner', 'Aundh'],
  socials: {
    instagram: 'https://www.instagram.com/shivraj_petclinic_pune/',
    facebook: 'https://www.facebook.com/people/Shivraj-Pet-Clinic-Exotic-Animal-Centre/61559604395021/',
    practo: 'https://www.practo.com/pune/clinic/shivraj-pet-clinic-and-lab-pimple-nilakh',
  },
  reviews: [
    { name: 'Practo', url: 'https://www.practo.com/pune/clinic/shivraj-pet-clinic-and-lab-pimple-nilakh' },
    { name: 'Justdial', url: 'https://www.justdial.com/Pune/Shivraj-Pet-Clinic-Vishal-Nagar-Pimple-Nilakh/020PXX20-XX20-160501162003-K8F4_BZDET' },
    { name: 'Google Maps', url: 'https://www.google.com/maps/place/Shivraj+Pet+Clinic+%26+lab,+Alpine+Avenue,+Shop+No+B-4,+Aundh-Wakad+Rd,+Vishal+Nagar,+Pimple+Nilakh,+Pimpri-Chinchwad,+Maharashtra+411027/data=!4m2!3m1!1s0x3bc2b93d19aeeeef:0xbb41140a3a0bac96!18m1!1e1' },
  ],
  ga4: 'G-94PYDYSWKF',
  doctors: [
    {
      id: 'pritesh',
      name: 'Dr. Pritesh S. Vidhate',
      role: 'Head Veterinarian',
      creds: 'B.V.Sc. & A.H., M.V.Sc.', // specialisation conflicting across sources — C1
      reg: 'MSVC Reg. No. 9959',
      photo: 'dr-pritesh-microscope',
      alt: ['dr-pritesh-turtle', 'dr-pritesh-dog', 'dr-pritesh-surgery'],
      bio: 'Leads clinical care at Shivraj Pet Clinic & Lab, with a focus on exotic animal medicine, soft tissue surgery and diagnostic ultrasonography. Known for thorough, patient consultations, honest evidence-based care, and as the vet Pune pet parents come to for second opinions.',
      focus: ['Exotic animal medicine', 'Surgery', 'Ultrasonography', 'Preventive medicine', 'Cardiology'],
    },
    {
      id: 'shivaji',
      name: 'Dr. Shivaji B. Vidhate',
      role: 'Founder & Senior Veterinarian',
      creds: 'M.V.Sc. (Pathology)',
      reg: 'MSVC Reg. No. 3182',
      years: '33+',
      photo: 'dr-shivaji-desk',
      alt: ['dr-shivaji-stethoscope', 'dr-shivaji-parrot', 'dr-shivaji-portrait'],
      bio: 'Retired District Animal Husbandry Officer, Pune, with 33+ years of experience in field and companion animal medicine and surgery. He founded Shivraj Pet Clinic & Lab in 2013 and remains the clinic’s pathology anchor.',
      focus: ['Pathology', 'Field medicine', 'Surgery', 'Retired DAHO, Pune'],
    },
  ],
  team: [
    { name: 'Mr. Deepak Joshi', role: 'Veterinary Technician', photo: 'team-deepak', bio: 'Known for gentle animal handling and a calm presence in the consultation room and operation theatre.' },
  ],
  // C11: shown as on the current site, pending owner confirmation.
  testimonials: [
    // Review text shown in the clinic's own cat-spay reel (supplied video V1); only the clearly legible sentences are quoted.
    { quote: 'I just got my cats spay surgery over here. The process was very smooth and she got recovered very well. … He explained every step and medicines need to my cat in details.', name: 'Vikash Shelke', pet: 'Cat · Spay surgery' },
    { quote: 'Our cat Jenny had Panleukopenia at the last stage. We had almost given up hope. Dr. Pritesh treated her on priority without wasting a minute. He saved our baby. Truly the best vet in Pune.', name: 'Sneha R.', pet: 'Cat · Panleukopenia' },
    { quote: 'Best exotic animal vet in Pune. Brought my parrot and turtle — both treated with expertise I’ve never seen anywhere else in PCMC. The in-house lab saved hours. Highly recommended.', name: 'Kavita S.', pet: 'Parrot + Turtle · Exotic care' },
  ],
};

// ---- CMS overrides (edited in /admin → "Clinic settings"). Missing files fall back to the defaults above.
const fs = require('fs');
const path = require('path');
const cms = (f) => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'cms', f), 'utf8')); } catch (e) { return null; } };
const to12 = (t) => { const [h, m] = t.split(':').map(Number); return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`; };
const site = cms('site.json');
if (site) {
  ['phone', 'phoneDisplay', 'email', 'mapsUrl', 'mapsEmbed', 'fees', 'areas', 'slots'].forEach((k) => { if (site[k]) clinic[k] = site[k]; });
  if (site.whatsappNumber) clinic.whatsapp = `https://wa.me/${String(site.whatsappNumber).replace(/\D/g, '')}`;
  if (site.address) clinic.address = { ...clinic.address, ...site.address };
  if (site.socials) clinic.socials = { ...clinic.socials, ...site.socials };
  if (site.hours) {
    if (site.hours.sessions?.length) clinic.hours = site.hours.sessions;
    if (site.hours.openDays?.length) clinic.openDays = site.hours.openDays;
    if (site.hours.closedDay !== undefined) clinic.closedDay = site.hours.closedDay;
    clinic.hoursText = site.hours.summary || clinic.hoursText;
  }
}
clinic.hoursRanges = clinic.hours.map((h) => `${to12(h.open)} – ${to12(h.close)}`);
const team = cms('team.json');
if (team?.doctors?.length) clinic.doctors = team.doctors;
if (team?.team) clinic.team = team.team;
const words = cms('testimonials.json');
if (words?.items) clinic.testimonials = words.items;
clinic.notice = cms('notice.json') || { enabled: false };

module.exports = clinic;
