<template>
  <footer :class="$style.footer">
    <div :class="$style.meta">
      <span :class="$style.name">Scaletive</span>
      <span class="u-truncate">Free SVG/PNG background generator. No accounts, no server.</span>
    </div>
    <div :class="$style.links">
      <a href="https://vercel.com" target="_blank" rel="noreferrer">Deploy</a>
      <a href="#pricing">Pricing</a>
      <a href="#faq">FAQ</a>
    </div>
  </footer>
</template>

<style module lang="scss">
@use '@/styles/_tokens.scss' as *;
@use '@/styles/_mixins.scss' as mixins;

.footer {
  margin-top: $space-8;
  padding: $space-5 0 $space-4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $space-3;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  @include mixins.mq(sm) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.meta {
  display: flex;
  flex-direction: column;
  gap: $space-1;
  color: $color-muted;
}

.name {
  font-weight: 700;
  color: $color-text;
}

.links {
  display: flex;
  gap: $space-3;

  a {
    color: $color-muted;
    font-size: 14px;
    transition: color 120ms ease;

    &:hover {
      color: $color-text;
    }
  }
}
</style>
