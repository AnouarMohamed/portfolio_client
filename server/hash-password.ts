import { createPasswordHash } from './auth';

const input = process.argv.slice(2).join(' ').trim();

if (!input) {
  console.error('Usage: npm run hash:password -- "your-strong-password"');
  process.exit(1);
}

console.log(createPasswordHash(input));
