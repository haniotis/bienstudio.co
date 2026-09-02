import { createCn } from "cn/config"

// Register the theme's heading font sizes (text-h1..h6) so the merge engine
// doesn't mistake them for text colors and drop color utilities like text-strong.
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [(value: string) => /^h[1-6]$/.test(value)],
        },
      ],
    },
  },
})
