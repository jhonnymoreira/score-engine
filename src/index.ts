import { cli } from '@/cli.js';

cli(process.argv.slice(2))
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });
