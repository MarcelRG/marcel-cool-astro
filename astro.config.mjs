import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import mdx from "@astrojs/mdx"; // https://astro.build/config

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), react()],
});
