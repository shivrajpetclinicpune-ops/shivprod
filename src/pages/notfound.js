const { picture, btn } = require('../components');

module.exports = function notFound() {
  return {
    path: '/404',
    title: 'Page not found | Shivraj Pet Clinic & Lab',
    description: 'This page could not be found.',
    noindex: true,
    bodyClass: 'page-404',
    body: `<section class="nf wrap">
      <figure class="nf__img">${picture('bird-parakeet-closeup', { sizes: '(min-width:1024px) 30vw, 70vw', eager: true, alt: 'A curious parakeet tilting its head', pos: '50% 40%' })}</figure>
      <div>
        <p class="kicker">Error 404</p>
        <h1 class="display display--page">This page has<br>flown the cage.</h1>
        <p>The link may be old or mistyped. Try one of these instead:</p>
        <div class="nf__btns">${btn('/', 'Home')}${btn('/services/', 'Services', { variant: 'ghost' })}${btn('/blog/', 'Blog', { variant: 'ghost' })}</div>
      </div>
    </section>`,
  };
};
