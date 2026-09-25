// Curated real-photo manifest — one best copy per duplicate/burst group
// (see docs/08-Asset-Map.md). `g` = audit group id, `src` = A:(asset library) or B:(legacy site images).
// `pos` = CSS object-position focal point. Doctor captions follow the owner's
// IMAGE_RENAME_MANIFEST (younger = Dr. Pritesh, senior = Dr. Shivaji) — see conflict C18.
module.exports = [
  // ── Clinic & people
  { g: 1, id: 'clinic-signboard', src: 'A:2021-11-27.jpg', alt: 'Illuminated Shivraj Pet Clinic & Lab signboard naming Dr. Shivaji B. Vidhate and Dr. Pritesh S. Vidhate above the clinic entrance at night', pos: '50% 30%', tags: ['clinic'] },
  { g: 186, id: 'clinic-storefront', src: 'B:gallery/clinic-storefront.jpg', alt: 'Shivraj Pet Clinic & Lab storefront on Aundh–Wakad Road, Vishal Nagar, Pimple Nilakh', pos: '50% 50%', tags: ['clinic'] },
  { g: 192, id: 'pharmacy-shelves', src: 'B:services/pharmacy.jpg', alt: 'Veterinary pharmacy shelves stocked with medicines, parasite control and pet care products', pos: '50% 40%', tags: ['clinic', 'pharmacy'] },
  { g: 45, id: 'dr-pritesh-microscope', src: 'A:dr-pritesh-cat.jpg', alt: 'Dr. Pritesh Vidhate at the microscope with a tabby kitten on the consultation table', pos: '62% 30%', tags: ['doctors', 'pritesh', 'lab', 'cats'] },
  { g: 187, id: 'dr-pritesh-dog', src: 'B:gallery/dr-pritesh-dog-exam.jpg', alt: 'Dr. Pritesh Vidhate standing beside a relaxed white dog on the examination table', pos: '50% 35%', tags: ['doctors', 'pritesh', 'dogs'] },
  { g: 47, id: 'dr-pritesh-turtle', src: 'A:dr-pritesh-turtle.jpg', alt: 'Dr. Pritesh Vidhate examining a turtle on the steel examination table', pos: '55% 45%', tags: ['doctors', 'pritesh', 'turtles'] },
  { g: 106, id: 'dr-pritesh-surgery', src: 'A:reel shivraj/new all pics/veterinary-assistant-cat-treatment-02.jpg', alt: 'Dr. Pritesh Vidhate in surgical scrubs operating on an anaesthetised cat', pos: '50% 35%', tags: ['doctors', 'pritesh', 'surgery'] },
  { g: 85, id: 'dr-pritesh-dental', src: 'A:reel shivraj/new all pics/cat-dental-treatment-01.jpg', alt: 'Dental scaling on a cat under anaesthesia, performed by Dr. Pritesh Vidhate', pos: '55% 40%', tags: ['surgery', 'cats', 'pritesh'] },
  { g: 188, id: 'dr-shivaji-desk', src: 'B:gallery/dr-shivaji-desk.jpg', alt: 'Dr. Shivaji Vidhate at his consultation desk writing a prescription', pos: '55% 35%', tags: ['doctors', 'shivaji'] },
  { g: 48, id: 'dr-shivaji-parrot', src: 'A:dr-shivaji-parrot.jpg', alt: 'Dr. Shivaji Vidhate with an Alexandrine parakeet patient', pos: '50% 40%', tags: ['doctors', 'shivaji', 'birds'] },
  { g: 99, id: 'dr-shivaji-portrait', src: 'A:reel shivraj/new all pics/dr-shivaji-clinic-portrait-01.jpg', alt: 'Dr. Shivaji Vidhate smiling at the clinic in grey scrubs', pos: '50% 30%', tags: ['doctors', 'shivaji'] },
  { g: 102, id: 'dr-shivaji-stethoscope', src: 'A:reel shivraj/new all pics/dr-shivaji-veterinary-portrait-01.jpg', alt: 'Dr. Shivaji Vidhate in a surgical cap with his veterinary degree certificate behind him', pos: '50% 30%', tags: ['doctors', 'shivaji'] },
  { g: 111, id: 'dr-shivaji-closeup', src: 'A:reel shivraj/new all pics/dr-shivaji-veterinary-closeup-01.jpg', alt: 'Dr. Shivaji Vidhate at work in the clinic', pos: '50% 35%', tags: ['doctors', 'shivaji'] },
  { g: 98, id: 'dr-shivaji-notes', src: 'A:reel shivraj/new all pics/dr-shivaji-clinic-work-01.jpg', alt: 'Dr. Shivaji Vidhate writing clinical notes after an examination', pos: '50% 40%', tags: ['doctors', 'shivaji'] },
  { g: 35, id: 'team-deepak', src: 'A:deepak-surgery.jpg', alt: 'Veterinary technician Deepak Joshi smiling beside the surgeon in the operation theatre', pos: '70% 45%', tags: ['team', 'surgery'] },
  { g: 100, id: 'team-cat-care', src: 'A:reel shivraj/new all pics/veterinary-team-cat-treatment-01.jpg', alt: 'Dr. Pritesh and Dr. Shivaji Vidhate treating a cat together', pos: '50% 40%', tags: ['team', 'cats'] },

  // ── Diagnostics
  { g: 191, id: 'lab-analysers', src: 'B:services/lab.jpg', alt: 'In-house haematology and biochemistry analysers in the Shivraj Pet Clinic & Lab pathology lab', pos: '45% 50%', tags: ['lab', 'diagnostics'] },
  { g: 2, id: 'xray-turtle-unit', src: 'A:WhatsApp Image 2026-08-02 at 12.02.24 PM.jpeg', alt: 'A turtle positioned on the digital X-ray plate beneath the clinic X-ray unit', pos: '50% 60%', tags: ['xray', 'turtles', 'diagnostics'] },
  { g: 3, id: 'xray-turtle-plate', src: 'A:WhatsApp Image 2026-08-02 at 12.02.25 PM.jpeg', alt: 'Top view of a turtle on the X-ray cassette ready for a radiograph', pos: '50% 45%', tags: ['xray', 'turtles'] },
  { g: 6, id: 'xray-review-turtle', src: 'A:WhatsApp Image 2026-08-02 at 12.02.31 PM.jpeg', alt: 'Veterinarian reviewing a turtle radiograph on the digital X-ray monitor', pos: '55% 35%', tags: ['xray', 'diagnostics'] },
  { g: 92, id: 'xray-review-cat', src: 'A:reel shivraj/new all pics/dr-shivaji-reviewing-cat-xray-01.jpg', alt: 'Dr. Shivaji Vidhate reviewing a cat X-ray on the monitor', pos: '60% 35%', tags: ['xray', 'diagnostics', 'shivaji'] },
  { g: 199, id: 'xray-room', src: 'B:services/xray.jpg', alt: 'The digital X-ray room at Shivraj Pet Clinic & Lab', pos: '50% 45%', tags: ['xray'] },
  { g: 125, id: 'xray-rabbit-tortoise', src: 'A:turtle-rabbit-xray.jpg', alt: 'A rabbit and a tortoise in front of the X-ray workstation', pos: '50% 55%', tags: ['xray', 'rabbits', 'turtles'] },
  { g: 194, id: 'sonography-puppy', src: 'B:services/sonography.jpg', alt: 'Ultrasound scan being performed on a dog at the clinic', pos: '50% 45%', tags: ['sonography', 'diagnostics', 'dogs'] },
  { g: 193, id: 'sonography-machine', src: 'B:services/sonography-2.jpg', alt: 'Portable ultrasound machine used for sonography at the clinic', pos: '50% 45%', tags: ['sonography'] },
  { g: 72, id: 'rabbit-sonography', src: 'A:new rabbit reel/rabbit.png', alt: 'A rabbit held gently for an ultrasound examination', pos: '50% 45%', tags: ['rabbits', 'sonography', 'exotics'] },
  { g: 160, id: 'bladder-stones', src: 'A:reel shivraj/WhatsApp Image 2026-07-24 at 10.21.04 AM.jpeg', alt: 'Bladder stones removed from a cat, collected in a sample tube for analysis', pos: '50% 60%', tags: ['lab', 'surgery'] },
  { g: 198, id: 'urinary-stones', src: 'B:services/urinary-stone.jpg', alt: 'Urinary stones removed during surgery, measured against a ruler', pos: '50% 50%', tags: ['surgery', 'lab'] },
  { g: 190, id: 'ct-workstation', src: 'B:services/ct-scan.jpg', alt: 'CT imaging workstation displaying a scan', pos: '50% 45%', tags: ['ct'] },

  // ── Surgery
  { g: 197, id: 'surgery-frenchie', src: 'B:services/surgery.jpg', alt: 'French bulldog under anaesthesia on the operating table', pos: '50% 50%', tags: ['surgery', 'dogs'] },
  { g: 195, id: 'surgery-ot-lights', src: 'B:services/surgery-2.jpg', alt: 'Surgery in progress under the operation theatre lights', pos: '50% 40%', tags: ['surgery'] },
  { g: 5, id: 'surgery-team-xray-arm', src: 'A:WhatsApp Image 2026-08-02 at 12.02.31 PM (2).jpeg', alt: 'Surgical team operating with the X-ray arm positioned overhead', pos: '50% 40%', tags: ['surgery'] },
  { g: 83, id: 'surgery-cat-team', src: 'A:reel shivraj/new all pics/cat-surgery-team-01.jpg', alt: 'Dr. Shivaji and Dr. Pritesh Vidhate operating on a cat together', pos: '50% 40%', tags: ['surgery', 'cats'] },
  { g: 11, id: 'surgery-supervision', src: 'A:WhatsApp Image 2026-08-04 at 11.08.13 PM.jpeg', alt: 'Senior veterinarian supervising a procedure at the operating table', pos: '45% 40%', tags: ['surgery'] },
  { g: 88, id: 'cat-anaesthesia-monitor', src: 'A:reel shivraj/new all pics/dr-shivaji-cat-examination-01.jpg', alt: 'Dr. Shivaji Vidhate monitoring an anaesthetised orange cat before a procedure', pos: '50% 45%', tags: ['surgery', 'cats', 'shivaji'] },

  // ── Dogs
  { g: 43, id: 'dog-pug', src: 'A:dog-1.jpg', alt: 'A happy pug with its tongue out at the clinic', pos: '50% 45%', tags: ['dogs', 'hero'] },
  { g: 44, id: 'dog-maltese', src: 'A:dog-2.jpg', alt: 'A fluffy white Maltese sitting on the examination table', pos: '50% 45%', tags: ['dogs'] },
  { g: 53, id: 'dog-labrador', src: 'B:gallery/dog-clinic-waiting.jpg', alt: 'A Labrador sitting calmly in the clinic waiting area', pos: '50% 45%', tags: ['dogs'] },
  { g: 46, id: 'dog-exam', src: 'B:services/clinical-medicine-dog.jpg', alt: 'Veterinarian examining a large white dog with a stethoscope', pos: '45% 45%', tags: ['dogs', 'medicine'] },
  { g: 4, id: 'dog-golden-stairs', src: 'A:WhatsApp Image 2026-08-02 at 12.02.31 PM (1).jpeg', alt: 'A golden retriever waiting on the stairs outside the clinic', pos: '55% 40%', tags: ['dogs', 'clinic'] },

  // ── Cats
  { g: 163, id: 'cat-persian-guinea-pigs', src: 'A:reel shivraj/new all pics/WhatsApp Image 2026-08-09 at 2.59.25 PM.jpeg', alt: 'An orange Persian cat sitting between two guinea pigs on the examination table', pos: '52% 45%', tags: ['cats', 'exotics', 'hero'] },
  { g: 161, id: 'cat-persian-sitting', src: 'A:reel shivraj/new all pics/WhatsApp Image 2026-08-09 at 2.59.24 PM (1).jpeg', alt: 'An orange Persian cat sitting upright on the table', pos: '50% 40%', tags: ['cats'] },
  { g: 33, id: 'cat-calico', src: 'A:cat-1.jpg', alt: 'A long-haired calico cat on the table beside the operation theatre sign', pos: '50% 45%', tags: ['cats'] },
  { g: 149, id: 'cat-bella', src: 'A:reel shivraj/WhatsApp Image 2026-07-22 at 1.41.58 PM (1).jpeg', alt: 'A black Persian cat resting on the examination table', pos: '50% 45%', tags: ['cats'] },
  { g: 91, id: 'cat-stethoscope', src: 'A:reel shivraj/new all pics/dr-shivaji-cat-treatment-01.jpg', alt: 'Dr. Shivaji Vidhate listening to a tortoiseshell cat with a stethoscope', pos: '50% 50%', tags: ['cats', 'medicine', 'shivaji'] },

  // ── Birds
  { g: 7, id: 'bird-alexandrine', src: 'A:WhatsApp Image 2026-08-04 at 11.08.12 PM.jpeg', alt: 'An Alexandrine parakeet standing on the weighing scale during a check-up', pos: '45% 45%', tags: ['birds', 'hero'] },
  { g: 9, id: 'bird-parakeet-closeup', src: 'A:WhatsApp Image 2026-08-04 at 11.08.13 PM (2).jpeg', alt: 'Close-up of a parakeet patient', pos: '50% 50%', tags: ['birds'] },
  { g: 21, id: 'bird-cockatiel-lutino', src: 'A:bird-1.jpg', alt: 'A lutino cockatiel on the examination table beside the scale', pos: '50% 45%', tags: ['birds'] },
  { g: 22, id: 'bird-parakeet-scale', src: 'A:bird-2.jpg', alt: 'A green parakeet being weighed on the digital scale', pos: '50% 45%', tags: ['birds'] },
  { g: 51, id: 'bird-sun-conure', src: 'A:exotic-bird.jpg', alt: 'A bright sun conure perched on the scale', pos: '50% 45%', tags: ['birds', 'hero'] },
  { g: 80, id: 'bird-stethoscope', src: 'A:parrot-stethoscope.jpg', alt: 'A parakeet perched on a stethoscope', pos: '50% 45%', tags: ['birds'] },
  { g: 34, id: 'bird-cockatiel-pied', src: 'A:cockatiel-exam.jpg', alt: 'A pied cockatiel on the examination table', pos: '50% 45%', tags: ['birds'] },
  { g: 180, id: 'bird-cockatiel-cage', src: 'A:waffle new content/WhatsApp Image 2026-08-24 at 11.20.30 AM.jpeg', alt: 'A pearl cockatiel in its travel cage at the clinic', pos: '50% 50%', tags: ['birds'] },
  { g: 23, id: 'bird-hen', src: 'A:bird-3.jpg', alt: 'A hen being examined on the clinic table', pos: '50% 50%', tags: ['birds'] },

  // ── Rabbits & small mammals
  { g: 81, id: 'rabbit-white', src: 'A:rabbit-1.jpg', alt: 'A white rabbit on the examination table for an eye check', pos: '50% 45%', tags: ['rabbits'] },
  { g: 82, id: 'rabbit-exam', src: 'A:rabbit-exam.jpg', alt: 'A brown and white rabbit during its examination', pos: '50% 45%', tags: ['rabbits'] },
  { g: 162, id: 'guinea-pigs-pair', src: 'A:reel shivraj/new all pics/WhatsApp Image 2026-08-09 at 2.59.24 PM.jpeg', alt: 'Two guinea pigs side by side on the steel examination table', pos: '50% 55%', tags: ['smallpets', 'exotics'] },
  { g: 164, id: 'cat-guinea-pigs-edge', src: 'A:reel shivraj/new all pics/sadad.jpeg', alt: 'A Persian cat and two guinea pigs peeking over the edge of the table', pos: '45% 45%', tags: ['smallpets', 'cats'] },
  { g: 19, id: 'squirrels-rescue', src: 'A:exotic-1.jpg', alt: 'Two rescued baby palm squirrels resting on soft tissue', pos: '50% 50%', tags: ['smallpets', 'exotics'] },

  // ── Turtles & reptiles
  { g: 123, id: 'turtles-trio', src: 'A:turtle-1.jpg', alt: 'Three red-eared slider turtles on the examination table', pos: '45% 55%', tags: ['turtles', 'hero'] },
  { g: 124, id: 'turtle-exam', src: 'A:turtle-exam.jpg', alt: 'A red-eared slider turtle during its check-up', pos: '50% 50%', tags: ['turtles'] },
  { g: 50, id: 'iguana-arm', src: 'A:exotic-2.jpg', alt: 'A green iguana resting on an arm at the clinic', pos: '55% 45%', tags: ['reptiles', 'hero'] },
  { g: 52, id: 'iguanas-basket', src: 'A:iguanas-clinic.jpg', alt: 'Two iguanas on a basket waiting for their examination', pos: '50% 45%', tags: ['reptiles'] },
];
