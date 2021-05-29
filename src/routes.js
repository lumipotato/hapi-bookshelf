const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => 'Homepage',
  },
  {
    method: '*',
    path: '/',
    handler: (request, h) => 'Halaman tidak dapat diakses dengan method tersebut',
  },
  {
    method: 'GET',
    path: '/about',
    handler: (request, h) => 'About page',
  },
  {
    method: '*',
    path: '/about',
    handler: (request, h) => 'Halaman tidak dapat diakses dengan method',
  },
  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => 'Halaman tidak ditemukan',
  },
];

export default routes;