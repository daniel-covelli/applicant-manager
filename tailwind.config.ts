import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./node_modules/flowbite-react/lib/**/*.js", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
    },
  },
} satisfies Config;
