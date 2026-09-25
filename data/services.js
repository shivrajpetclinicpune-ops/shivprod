// Service taxonomy + presentation data. Long-form copy comes from data/extracted.json (legacy pages).
// Blurbs are condensed from each page's own lead paragraph — no new claims.
const groups = [
  { id: 'everyday', name: 'Everyday care', kicker: 'Prevent · Treat · Supply' },
  { id: 'exotic', name: 'Exotic Animal Centre', kicker: 'Birds · Rabbits · Reptiles' },
  { id: 'diagnostics', name: 'Diagnostics', kicker: 'Lab · X-ray · Ultrasound' },
  { id: 'surgery', name: 'Surgery', kicker: 'Gaseous anaesthesia' },
];

const services = [
  { slug: 'preventive-medicine', name: 'Preventive Medicine', group: 'everyday', icon: 'syringe', photo: 'dog-pug', blogCat: 'health',
    blurb: 'Vaccination schedules, deworming and wellness checks for dogs, cats and exotic pets.', related: ['clinical-medicine', 'pathology-lab', 'vet-pharmacy'] },
  { slug: 'clinical-medicine', name: 'Clinical Medicine', group: 'everyday', icon: 'stethoscope', photo: 'dog-exam', blogCat: 'dog',
    blurb: 'Consultations, diagnosis and treatment plans. Walk-ins accepted, second opinions welcome.', related: ['pathology-lab', 'digital-xray', 'preventive-medicine'] },
  { slug: 'vet-pharmacy', name: 'Vet Pharmacy', group: 'everyday', icon: 'capsule', photo: 'pharmacy-shelves', blogCat: 'health',
    blurb: 'Prescription medicines, parasite control, supplements, therapeutic diets and e-collars on site.', related: ['clinical-medicine', 'preventive-medicine', 'exotic-animal-centre'] },
  { slug: 'exotic-animal-centre', name: 'Exotic Animal Centre', group: 'exotic', icon: 'bird', photo: 'bird-sun-conure', blogCat: 'exotic',
    blurb: 'Birds, rabbits, turtles, reptiles, guinea pigs and hamsters, examined, diagnosed and operated on with species-appropriate care and gaseous anaesthesia.', related: ['pathology-lab', 'digital-xray', 'soft-tissue-surgery'] },
  { slug: 'pathology-lab', name: 'Pathology Lab', group: 'diagnostics', icon: 'microscope', photo: 'lab-analysers', blogCat: 'surgery',
    blurb: 'In-house blood panels, urinalysis and cytology. CBC and biochemistry ready in 15–20 minutes.', related: ['digital-xray', 'sonography', 'clinical-medicine'] },
  { slug: 'digital-xray', name: 'Digital X-Ray', group: 'diagnostics', icon: 'xray', photo: 'xray-review-turtle', blogCat: 'surgery',
    blurb: 'On-site digital radiography with instant images, for dogs, cats and exotic patients alike.', related: ['pathology-lab', 'sonography', 'foreign-body-removal-surgery'] },
  { slug: 'sonography', name: 'Sonography', group: 'diagnostics', icon: 'ultrasound', photo: 'sonography-puppy', blogCat: 'surgery',
    blurb: 'Ultrasound imaging at the clinic, including pregnancy confirmation.', related: ['digital-xray', 'pathology-lab', 'clinical-medicine'] },
  { slug: 'dog-neutering', name: 'Dog Neutering', group: 'surgery', icon: 'scalpel', photo: 'surgery-frenchie', blogCat: 'surgery',
    blurb: 'Routine same-day neutering under gas anaesthesia, with pre-surgery bloodwork in our own lab.', related: ['cat-spaying', 'soft-tissue-surgery', 'pathology-lab'] },
  { slug: 'cat-spaying', name: 'Cat Spaying', group: 'surgery', icon: 'scalpel', photo: 'surgery-cat-team', blogCat: 'surgery',
    blurb: 'Safe spaying for female cats, with a 10-day suture check.', related: ['dog-neutering', 'soft-tissue-surgery', 'pathology-lab'] },
  { slug: 'soft-tissue-surgery', name: 'Soft Tissue Surgery', group: 'surgery', icon: 'scalpel', photo: 'surgery-ot-lights', blogCat: 'surgery',
    blurb: 'Hernia, cherry eye, anal gland and bladder surgery.', related: ['dog-tumor-surgery', 'foreign-body-removal-surgery', 'emergency-surgery'] },
  { slug: 'orthopedic-surgery', name: 'Orthopedic Surgery', group: 'surgery', icon: 'bone', photo: 'surgery-team-xray-arm', blogCat: 'surgery',
    blurb: 'Fracture repair with plating, intramedullary pinning and external fixation.', related: ['digital-xray', 'emergency-surgery', 'soft-tissue-surgery'] },
  { slug: 'dog-tumor-surgery', name: 'Dog Tumor Surgery', group: 'surgery', icon: 'scalpel', photo: 'surgery-supervision', blogCat: 'surgery',
    blurb: 'Lump evaluation by fine-needle aspirate, surgical removal and histopathology.', related: ['pathology-lab', 'soft-tissue-surgery', 'digital-xray'] },
  { slug: 'foreign-body-removal-surgery', name: 'Foreign Body Removal', group: 'surgery', icon: 'scalpel', photo: 'xray-review-cat', blogCat: 'surgery',
    blurb: 'X-ray confirmation and removal of swallowed objects.', related: ['digital-xray', 'emergency-surgery', 'soft-tissue-surgery'] },
  { slug: 'emergency-surgery', name: 'Emergency Surgery', group: 'surgery', icon: 'pulse', photo: 'cat-anaesthesia-monitor', blogCat: 'surgery',
    blurb: 'GDV, trauma and C-sections during opening hours. Call the clinic first so the team can prepare.', related: ['pathology-lab', 'digital-xray', 'soft-tissue-surgery'] },
  // C5: referral-only, temporarily hidden from menus at the client's request; URL kept for existing links.
  { slug: 'ct-scan-mri', name: 'CT Scan & MRI (referral)', group: 'diagnostics', icon: 'xray', photo: 'ct-workstation', blogCat: 'surgery', hidden: true,
    blurb: 'Referral coordination for advanced imaging.', related: ['digital-xray', 'sonography', 'pathology-lab'] },
];

// Species journey (verified list in docs/04). Six groups, each with distinct real patients.
const species = [
  { id: 'dogs', name: 'Dogs', word: 'Dog', latin: 'Canis familiaris', photos: ['dog-labrador', 'dog-maltese', 'dog-golden-stairs'],
    line: 'Puppies to seniors: vaccinations, medicine, diagnostics and surgery.', link: '/services/clinical-medicine', faq: '/pet-care-faqs#dog-faqs' },
  { id: 'cats', name: 'Cats', word: 'Cat', latin: 'Felis catus', photos: ['cat-persian-sitting', 'cat-bella', 'cat-stethoscope'],
    line: 'Calm, cat-aware handling for check-ups, dental care and surgery.', link: '/services/cat-spaying', faq: '/pet-care-faqs#cat-faqs' },
  { id: 'rabbits', name: 'Rabbits', word: 'Rabbit', latin: 'Oryctolagus cuniculus', photos: ['rabbit-exam', 'rabbit-white', 'xray-rabbit-tortoise'],
    line: 'Rabbit medicine, dental rasping, ultrasound and gaseous anaesthesia.', link: '/services/exotic-animal-centre', faq: '/pet-care-faqs#rabbit-faqs' },
  { id: 'birds', name: 'Birds', word: 'Bird', latin: 'Aves', photos: ['bird-sun-conure', 'bird-cockatiel-lutino', 'bird-stethoscope'],
    line: 'African greys, macaws, budgies, cockatiels, conures, finches and lovebirds.', link: '/services/exotic-animal-centre', faq: '/pet-care-faqs#bird-faqs' },
  { id: 'reptiles', name: 'Turtles & reptiles', word: 'Reptile', latin: 'Testudines · Squamata', photos: ['turtle-exam', 'iguanas-basket', 'xray-turtle-plate'],
    line: 'Turtles, tortoises and iguanas: shell, skin, nutrition and X-ray.', link: '/services/exotic-animal-centre', faq: '/pet-care-faqs#turtle-faqs' },
  { id: 'exotics', name: 'Small exotics', word: 'Exotic', latin: 'Rodentia & more', photos: ['guinea-pigs-pair', 'squirrels-rescue', 'cat-guinea-pigs-edge'],
    line: 'Guinea pigs, hamsters and gerbils, and the occasional rescued squirrel.', link: '/services/exotic-animal-centre', faq: '/pet-care-faqs#guineapig-faqs' },
];

// CMS overrides (/admin → "Services").
try {
  const cms = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, 'cms', 'services.json'), 'utf8'));
  (cms.items || []).forEach((o) => {
    const s = services.find((x) => x.slug === o.slug);
    if (!s) return;
    if (o.name) s.name = o.name;
    if (o.blurb) s.blurb = o.blurb;
    s.hidden = !!o.hidden;
  });
} catch (e) { /* defaults */ }

module.exports = { groups, services, species };
