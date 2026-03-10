// npm install @prisma/client
// npx prisma generate
Why: The original error was Cannot find module prisma/build/types.js. Running these revealed that prisma.config.ts was importing defineConfig from 'prisma' (wrong) instead of 'prisma/config', and using a wrong datasources shape.
