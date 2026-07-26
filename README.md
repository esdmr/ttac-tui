# TTAC TUI

[![asciicast](https://asciinema.org/a/FMh1E6MYqe2K49y4.svg)](https://asciinema.org/a/FMh1E6MYqe2K49y4)

This TUI lets you browse the local pharmacies which have recently sold a particular drug.

**Features:**

- Save and recall drug IDs
- Save and recall locations
- Filter by city
- Filter by when it was last sold
- Show a list of pharmacies which sell all the drugs
- Copy the result for sharing
- Keep the API results for retrying the filters or if something goes wrong

**How to use:**

```shell
corepack pnpm i
corepack pnpm start
```

<img src="witch.webp" alt="Picture of the Wicked Queen from Snow White, holding an apple, with the apple being 'shopped to the logo of Iran's Food and Drug Administration" width="480px">

The file [cities.json](src/stores/cities.json) is borrowed from [this gist by @alirezanet](https://gist.github.com/alirezanet/0bbfb2921e421f8acb46244e0b5a8f8a). Many thanks :3
