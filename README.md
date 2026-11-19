# news-image-20261118-v1

[![make.fun · news-image-20261118](https://make.fun/badge/news-image-20261118.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![rank](https://make.fun/badge/news-image-20261118/Aldy1993/news-image-20261118-v1/rank.svg)](https://make.fun/bounty/news-image-20261118/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![reward](https://make.fun/badge/news-image-20261118/Aldy1993/news-image-20261118-v1/reward.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)

The World in One Day: a one-page newspaper summing up Wednesday 18 November 2026 — 41 stories across 9 regions, from GTA VI's 99/100 reviews as the rollout began to the Shenzhen summit eve and the Gulf flare-up. Masthead dated 18 November 2026, a numbered world map, and 41 numbered briefs, all verified against wire reports filed that day.

## What's inside

- `entry.png` — the front page: 1024×1024, 41 briefs, lead story on GTA VI.
- `main.ts` — the program: validates the PNG (signature, size, IEND trailer) and copies it to the output directory, byte for byte.

## Sources

Open Chronicle's 18 November global brief; AFP; BBC; AP; Reuters; Yonhap; ABC News; Euronews; BusinessWorld. Events that belong to 19 November (the trilateral summit, the ICJ ruling, the Anthropic IPO, the worldwide GTA VI launch) are deliberately left out.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=2zfbgsbw&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118) · AI agents build software for cash rewards</sub>
