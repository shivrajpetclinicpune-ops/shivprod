// Species landing pages (GEO/SEO 2026-11-17). Same shape as data/extracted.json services.
// Every fact here is already published elsewhere on the site (exotic-animal-centre page,
// pet-care FAQs, blog posts, data/clinic.js) — no new clinical or business claims.
// Answer-first: each lead and FAQ answer opens with the direct answer.
const clinic = require('./clinic');

const FEE = clinic.fees.exotic;
const VISIT = `<h2>Visiting with your pet</h2>
<p>Shivraj Pet Clinic &amp; Lab is at ${clinic.address.street}, ${clinic.address.locality}, Pune ${clinic.address.pin}, on Aundh–Wakad Road near Jagtap Dairy. It is a short drive from Wakad, Pimple Saudagar, Baner and Aundh.</p>
<ul>
<li><strong>Consultation:</strong> ₹${FEE} for exotic pets, paid at the clinic.</li>
<li><strong>Hours:</strong> Monday, Tuesday and Thursday to Sunday, 10:30 AM–1:30 PM and 3:00–8:30 PM. Closed on Wednesdays.</li>
<li><strong>Appointments:</strong> call or WhatsApp ${clinic.phoneDisplay}. Urgent cases are seen during opening hours; we do not offer after-hours emergency service.</li>
</ul>`;

const pages = [
  {
    slug: 'rabbit-vet',
    title: 'Rabbit Vet in Pune | Shivraj Pet Clinic & Lab',
    description: `Rabbit vet in Pimple Nilakh, Pune: GI stasis, dental disease, spay and neuter under gaseous anaesthesia, in-house blood tests and ultrasound. Consultation ₹${FEE}.`,
    tag: 'Exotic Animal Centre · Rabbits',
    h1: 'Rabbit vet in Pimple Nilakh, Pune',
    lead: `Yes, we treat rabbits. Our Exotic Animal Centre sees pet rabbits for check-ups, GI stasis, dental problems, spaying and neutering, with gaseous anaesthesia, in-house blood tests and ultrasound under one roof. Exotic consultation is ₹${FEE}.`,
    body: `<h2>When to bring your rabbit in</h2>
<p>A rabbit that stops eating is an emergency. Rabbits that go without food for more than 6–8 hours can develop gastrointestinal (GI) stasis, which becomes life-threatening within about 24 hours. Call the clinic straight away if your rabbit:</p>
<ul>
<li>has stopped eating, or is passing very small droppings or none at all</li>
<li>is drooling, dropping food, or losing weight (often a sign of overgrown teeth)</li>
<li>is sitting hunched in a corner, breathing with effort, or has a runny nose or eyes</li>
<li>has diarrhoea that is not normal caecotropes</li>
</ul>
<p>Rabbits hide illness. By the time a rabbit looks obviously unwell the problem is usually advanced, so being quieter than usual and eating less is reason enough to call.</p>
<h2>What we treat in rabbits</h2>
<ul>
<li><strong>GI stasis</strong>, the most common life-threatening rabbit emergency we see.</li>
<li><strong>Dental disease</strong>: rabbit teeth grow continuously, and overgrown or misaligned teeth stop a rabbit eating. Dental rasping is done at the clinic.</li>
<li><strong>Spaying and neutering</strong>: castration for males and spaying for females, performed regularly by Dr. Pritesh S. Vidhate. Unspayed female rabbits have a high risk of uterine cancer as they age.</li>
<li><strong>Respiratory infections</strong>, abscesses, wounds and tumour removal.</li>
</ul>
<h2>Diagnostics and anaesthesia for rabbits</h2>
<p>We use gaseous (inhalation) anaesthesia with species-specific protocols for rabbit procedures; injectable-only anaesthesia is riskier in small exotics and we avoid it. Blood tests run in our own <a href="/services/pathology-lab">pathology lab</a>, with CBC and biochemistry ready in 15–20 minutes, and <a href="/services/digital-xray">digital X-ray</a> and <a href="/services/sonography">ultrasound</a> are on site, so a sick rabbit is not sent across the city for tests.</p>
<h2>Feeding and preventive care</h2>
<p>Most rabbit illness we see is linked to diet. A healthy daily diet is unlimited grass hay, fresh water, leafy vegetables and a measured amount of good-quality pellets. An annual check-up is the best time to weigh your rabbit, check the teeth and plan spaying or neutering.</p>
${VISIT}`,
    faqs: [
      { q: 'Do you treat rabbits in Pune?', a: `Yes. Rabbits are seen at our Exotic Animal Centre in Pimple Nilakh, Pune, for check-ups, illness, dental care and surgery. The exotic consultation is ₹${FEE}.` },
      { q: 'My rabbit has stopped eating. Is it an emergency?', a: 'Yes. A rabbit that stops eating can develop GI stasis, which becomes life-threatening within about 24 hours. Call the clinic immediately if your rabbit stops eating or producing droppings.' },
      { q: 'Do you spay and neuter rabbits?', a: 'Yes. Rabbit spaying and neutering are done regularly at the clinic under gaseous anaesthesia. Spaying protects female rabbits from uterine cancer, which is common in unspayed females as they age.' },
      { q: 'Is anaesthesia safe for rabbits?', a: 'Yes, when it is done with gaseous anaesthesia, a pre-operative check and careful monitoring. That is the approach we use for rabbits; we avoid injectable-only anaesthesia in small exotics.' },
      { q: 'Why are my rabbit\'s teeth overgrowing?', a: 'Because rabbit teeth grow throughout life and need constant wear from hay. Too little hay, genetics or dental disease lead to painful overgrowth, which we treat with dental rasping at the clinic.' },
    ],
    posts: ['rabbit-gi-stasis', 'rabbit-not-eating', 'rabbit-dental-problems', 'neutering-rabbits', 'how-to-know-rabbit-is-sick', 'what-should-rabbits-eat'],
  },
  {
    slug: 'bird-vet',
    title: 'Bird & Parrot Vet in Pune | Shivraj Pet Clinic & Lab',
    description: `Avian vet in Pimple Nilakh, Pune for parrots, budgies, cockatiels, lovebirds, conures and macaws: illness, egg binding and DNA sexing. Consultation ₹${FEE}.`,
    tag: 'Exotic Animal Centre · Birds',
    h1: 'Bird and parrot vet in Pimple Nilakh, Pune',
    lead: `Yes, we treat pet birds. Budgies, cockatiels, lovebirds, conures, African greys, macaws, cockatoos, finches and canaries are seen at our Exotic Animal Centre for check-ups, illness, egg binding and surgery. Exotic consultation is ₹${FEE}.`,
    body: `<h2>Signs your bird needs a vet today</h2>
<p>Birds hide illness until they can no longer cope, so visible symptoms usually mean a bird is already seriously unwell. Call the clinic the same day if your bird is:</p>
<ul>
<li>sitting fluffed up, low on the perch or at the bottom of the cage</li>
<li>bobbing its tail while breathing, or breathing with its beak open</li>
<li>not eating, or vomiting or regurgitating seeds</li>
<li>straining, which in a female can mean egg binding</li>
<li>bleeding: keep the bird calm, apply gentle pressure with a clean cloth and come in, because birds lose dangerous amounts of blood quickly</li>
</ul>
<h2>What we treat in birds</h2>
<ul>
<li><strong>Respiratory disease</strong>: tail bobbing and open-mouth breathing.</li>
<li><strong>Egg binding</strong>: a female bird unable to pass an egg is painful and quickly fatal without treatment.</li>
<li><strong>Digestive and crop problems</strong>, poor appetite and changes in droppings.</li>
<li><strong>Feather loss and plucking</strong>, and nutritional deficiencies from seed-only diets.</li>
<li><strong>Beak and nail problems</strong>: overgrowth is examined for its underlying cause and trimmed when needed.</li>
<li><strong>Wounds and surgery</strong>, with gaseous anaesthesia and monitoring.</li>
</ul>
<h2>Feather DNA sexing</h2>
<p>Most parrots, cockatiels and lovebirds look the same whether male or female. We collect a few small chest feathers at the clinic in a couple of minutes, with no blood draw and no sedation, and send them to a specialised DNA laboratory. Results usually take about 7–10 days. Knowing a bird is female helps us watch for egg binding and calcium depletion.</p>
<h2>Check-ups and diet</h2>
<p>Healthy birds should have a preventive health check once a year, and older birds or those with ongoing problems more often. Seed-only diets are a common cause of illness; at the check-up we weigh your bird, review the diet and look at beak, nails and feathers.</p>
<p>Diagnostics such as blood tests, <a href="/services/digital-xray">digital X-ray</a> and <a href="/services/pathology-lab">in-house lab work</a> are done at the same clinic.</p>
${VISIT}`,
    faqs: [
      { q: 'Is there an avian vet for parrots in Pune?', a: `Yes. Shivraj Pet Clinic & Lab in Pimple Nilakh, Pune treats parrots and other pet birds at its Exotic Animal Centre. The exotic consultation is ₹${FEE}.` },
      { q: 'Which bird species do you treat?', a: 'We treat budgies, cockatiels, lovebirds, conures, African greys, macaws, cockatoos, finches, canaries and many other pet birds.' },
      { q: 'My bird is sitting fluffed up all day. What should I do?', a: 'Call the clinic the same day. A bird that stays fluffed up and inactive is usually ill and conserving heat and energy, and birds hide illness until it is advanced.' },
      { q: 'Can you tell if my parrot is male or female?', a: 'Yes, with feather DNA sexing. We collect a few chest feathers at the clinic and send them to a specialised DNA laboratory; results usually take about 7–10 days.' },
      { q: 'How often should my bird have a check-up?', a: 'Once a year for a healthy bird, and more often for older birds or birds with a medical condition.' },
    ],
    posts: ['sick-bird-syndrome-pet-birds', 'parrot-fluffed-up-all-day', 'bird-breathing-problem', 'parrot-not-eating', 'bird-feather-dna-sexing-test', 'diet-guide-budgies-cockatiels-parrots'],
  },
  {
    slug: 'turtle-reptile-vet',
    title: 'Turtle & Reptile Vet in Pune | Shivraj Pet Clinic & Lab',
    description: `Turtle, tortoise, iguana and lizard vet in Pimple Nilakh, Pune: shell rot, soft shell, swollen eyes, X-ray and husbandry advice. Exotic consultation ₹${FEE}.`,
    tag: 'Exotic Animal Centre · Turtles & reptiles',
    h1: 'Turtle, tortoise and reptile vet in Pimple Nilakh, Pune',
    lead: `Yes, we treat turtles, tortoises and reptiles. Shell rot, soft or pyramided shells, swollen eyes, poor appetite and shedding problems are examined at our Exotic Animal Centre, with digital X-ray on site. Exotic consultation is ₹${FEE}.`,
    body: `<h2>Common problems we see</h2>
<ul>
<li><strong>Shell rot</strong>: a bacterial or fungal infection of the shell, often linked to poor housing. Treatment is cleaning, medication and correcting the habitat.</li>
<li><strong>Soft shell or pyramided shell</strong> (metabolic bone disease): usually caused by too little calcium, too little UVB light or an unbalanced diet during growth.</li>
<li><strong>Swollen eyes</strong>: commonly vitamin A deficiency, infection or poor water quality.</li>
<li><strong>Floating sideways</strong>: can mean pneumonia, gut gas or a buoyancy disorder.</li>
<li><strong>Not eating</strong>: often wrong temperature, stress, infection or parasites.</li>
<li><strong>Lizards and iguanas</strong>: skin infections, difficult shedding, nutritional disorders and parasites.</li>
</ul>
<h2>X-ray and surgery for reptiles</h2>
<p>Turtles and tortoises are X-rayed on site with our <a href="/services/digital-xray">digital X-ray</a>, which shows shell and bone problems, eggs and swallowed objects. Surgery is sometimes needed for reproductive problems, shell injuries and abscesses.</p>
<h2>Housing, UVB and diet</h2>
<p>Most reptile illness starts with the enclosure. UVB light is essential for turtles, tortoises and most pet lizards, including iguanas, to use calcium; glass and mesh both filter UVB out, so sunlight through a window does not count. Tortoises generally need mostly dark leafy greens with only occasional fruit, aquatic turtles a mix of pellets, greens and protein, and iguanas a largely plant-based diet with calcium supplementation. Most pet tortoises in Pune do not need to hibernate given the mild winters; talk to us before attempting it.</p>
<p>An annual check-up helps catch nutritional problems, shell disease and internal illness before they become severe.</p>
${VISIT}`,
    faqs: [
      { q: 'Do you treat turtles and tortoises in Pune?', a: `Yes. Turtles and tortoises are seen at our Exotic Animal Centre in Pimple Nilakh, Pune, for shell problems, eye problems, poor appetite and check-ups. The exotic consultation is ₹${FEE}.` },
      { q: 'What is shell rot and can it be treated?', a: 'Shell rot is a bacterial or fungal infection of the shell, and yes, it can be treated with cleaning, medication and correcting the habitat that caused it.' },
      { q: 'Why is my turtle\'s shell soft?', a: 'A soft shell usually means metabolic bone disease from too little calcium, too little UVB light or an unbalanced diet. It is easier to prevent with correct husbandry than to reverse once set in.' },
      { q: 'Do you treat iguanas and other lizards?', a: 'Yes. Iguanas and other common pet lizards are seen alongside turtles, tortoises, birds and small mammals at our Exotic Animal Centre.' },
      { q: 'Does my tortoise need to hibernate in Pune?', a: 'Usually not. Most pet tortoises in Pune do not need to hibernate given the mild winters, and unsupervised hibernation carries real risk, so speak to us first.' },
    ],
    posts: ['turtle-shell-rot', 'respiratory-infections-pet-turtles', 'complete-diet-guide-turtles-tortoises', 'clinic-suitable-birds-rabbits-reptiles', 'exotic-vet-pcmc-turtle-rabbit-parrot'],
  },
  {
    slug: 'guinea-pig-hamster-vet',
    title: 'Guinea Pig & Hamster Vet in Pune | Shivraj Pet Clinic & Lab',
    description: `Guinea pig, hamster and gerbil vet in Pimple Nilakh, Pune: overgrown teeth, vitamin C deficiency, wet tail, bladder stones and bumblefoot. Consultation ₹${FEE}.`,
    tag: 'Exotic Animal Centre · Small mammals',
    h1: 'Guinea pig and hamster vet in Pimple Nilakh, Pune',
    lead: `Yes, we treat guinea pigs, hamsters and gerbils. Overgrown teeth, vitamin C deficiency, wet tail, bladder stones and skin problems are examined and treated at our Exotic Animal Centre. Exotic consultation is ₹${FEE}.`,
    body: `<h2>When to bring a small pet in</h2>
<p>Guinea pigs and hamsters are prey animals and hide pain well. Call the clinic the same day if your pet:</p>
<ul>
<li>has stopped eating; guinea pigs should never go long without food</li>
<li>is drooling, dropping food or losing weight, which often points to overgrown teeth</li>
<li>has severe diarrhoea (in hamsters, wet tail can be fatal within about 48 hours)</li>
<li>has blood in the urine or strains to urinate, a sign of bladder stones</li>
<li>is breathing with difficulty, very weak, or injured</li>
</ul>
<h2>What we treat</h2>
<ul>
<li><strong>Dental malocclusion</strong>: overgrown or misaligned teeth in guinea pigs and hamsters.</li>
<li><strong>Vitamin C deficiency (scurvy)</strong>: guinea pigs cannot make their own vitamin C; deficiency causes weakness, joint pain and poor healing.</li>
<li><strong>Wet tail</strong> in hamsters, and cheek pouch impaction.</li>
<li><strong>Bladder stones</strong>, which are relatively common in guinea pigs.</li>
<li><strong>Bumblefoot</strong>: painful foot infections from pressure sores, obesity or unsuitable flooring.</li>
<li><strong>Skin conditions</strong>, parasites and weight loss.</li>
</ul>
<p>Small mammals can safely have surgery when it is medically needed, with gaseous anaesthesia and monitoring. Blood tests and <a href="/services/digital-xray">X-rays</a> are done at the same clinic.</p>
<h2>Daily diet</h2>
<p>Guinea pigs need good-quality hay, fresh vegetables rich in vitamin C, fresh water and guinea pig-specific pellets every day. An annual check-up is recommended, and more often for older pets or those with a long-term condition.</p>
${VISIT}`,
    faqs: [
      { q: 'Do you treat guinea pigs and hamsters in Pune?', a: `Yes. Guinea pigs, hamsters and gerbils are seen at our Exotic Animal Centre in Pimple Nilakh, Pune. The exotic consultation is ₹${FEE}.` },
      { q: 'Why has my guinea pig stopped eating?', a: 'Usually dental disease, pain or a digestive problem, and it needs a vet visit the same day because guinea pigs should never go long without eating.' },
      { q: 'Why do guinea pigs need vitamin C?', a: 'Because guinea pigs cannot make vitamin C themselves. Without it in the diet they develop scurvy, with weakness, joint pain and poor wound healing.' },
      { q: 'What is wet tail in hamsters?', a: 'Wet tail is severe diarrhoea in hamsters. It can be fatal within about 48 hours without treatment, so bring your hamster in straight away.' },
      { q: 'Can guinea pigs have surgery safely?', a: 'Yes. With proper anaesthesia and monitoring, guinea pigs can safely have surgery when it is medically necessary.' },
    ],
    posts: ['guinea-pig-dental-problem', 'exotic-pet-care-pune', 'clinic-suitable-birds-rabbits-reptiles', 'exotic-vet-pcmc-turtle-rabbit-parrot'],
  },
];

module.exports = { speciesPages: pages };
