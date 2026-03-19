# Croce Verde Lucca Gap Analysis

## Scope

Reference site analyzed:
- `https://www.croceverdelucca.it/`

Local project analyzed:
- `http://localhost:3000/`
- `frontend/src/app/(public)`
- `frontend/src/lib/navigation.ts`
- `frontend/src/components/layout`
- `frontend/src/content/mock`

Goal:
- understand what the reference site contains
- compare it against the current project
- identify what is missing to ship a more modern and better organized version

## Executive Summary

The current local project is already cleaner, more readable, and visually more modern than the reference site. The problem is not baseline UI quality. The problem is depth.

The reference site feels old and overloaded, but it communicates institutional credibility through volume and specificity:
- more entry points
- more trust signals
- more real-world service paths
- more community and editorial depth
- more legally and operationally complete information

The local project currently feels like a strong modern shell around a still incomplete institutional website.

In short:
- reference = real, dense, dated
- local = modern, ordered, incomplete

## Reference IA

The reference site exposes a broader public IA than the local project.

Utility layer:
- phone
- social
- login/access
- search

Main navigation:
- Chi Siamo
- Cosa Facciamo
- Sedi
- Dona Ora
- Settori
- Donatori Sangue
- Biblioteca
- Prenota Servizi
- News
- Eventi
- Contatti
- Area Riservata

Homepage patterns:
- latest news feed
- promotional slider / visual banners
- donation prompt
- service-specific tiles
- volunteer call to action
- embedded media
- trust-rich footer with legal and institutional details

## Current Local IA

Current local navigation in [navigation.ts](C:/SVILUPPO/SITO-CROCE-VERDE/frontend/src/lib/navigation.ts):
- Chi siamo
- Servizi
- Formazione
- Protezione civile
- News
- Sezioni
- Contatti
- Prenota

Public routes currently available in [sitemap.md](C:/SVILUPPO/SITO-CROCE-VERDE/frontend/docs/sitemap.md):
- `/`
- `/chi-siamo`
- `/servizi`
- `/servizi/[slug]`
- `/protezione-civile`
- `/news`
- `/news/[slug]`
- `/contatti`
- `/prenota-servizi`
- `/sezioni`
- `/privacy`
- `/cookie-policy`

## Missing Or Weak Compared To Reference

### Missing Entire Sections

- `Dona Ora`
- `Eventi`
- `Donatori Sangue`
- `Biblioteca`
- `Area Riservata` public entry
- `Cosa Facciamo`
- `Settori`
- utility bar with phone/social/login/search

### Present But Too Thin

- `Chi siamo`
  - exists, but is still too generic and not institutionally rich enough
- `Prenota servizi`
  - currently informational only, not a structured request flow
- `Contatti`
  - useful, but still generic and partially placeholder-based
- `Protezione civile`
  - exists, but still reads like a prepared section rather than a mature operational area
- `News`
  - has structure, but not enough editorial depth, taxonomy, archive behavior, or metadata
- `Sezioni`
  - useful, but weaker than a full “Sedi” experience with stronger territorial trust
- footer
  - well organized visually, but not yet authoritative because data is incomplete

### Trust Signals Missing Or Weak

- real phone/email/address/PEC everywhere they matter
- legal and institutional completeness
- stronger footer with statutory and institutional references
- donation credibility elements
- volunteer and donor-specific journeys
- more visible operational access points
- clearer institutional identity in the hero and above-the-fold messaging

## Content And CMS Gap

The editorial system is structurally present, but still minimal.

Current strengths:
- news listing exists in [news/page.tsx](C:/SVILUPPO/SITO-CROCE-VERDE/frontend/src/app/(public)/news/page.tsx)
- news detail exists in [news/[slug]/page.tsx](C:/SVILUPPO/SITO-CROCE-VERDE/frontend/src/app/(public)/news/[slug]/page.tsx)
- admin editing base exists in [PostEditorForm.tsx](C:/SVILUPPO/SITO-CROCE-VERDE/frontend/src/components/admin/PostEditorForm.tsx)

Current weaknesses:
- very few mock items
- short content bodies
- no author
- no event-specific model
- no featured content
- no archive behavior
- no filters
- no related content
- no editorial metadata depth

Recommended content model additions:
- content type: `news` / `event`
- `author`
- `publishAt`
- `featuredImage`
- `imageAlt`
- `tags`
- `featured`
- `seoTitle`
- `seoDescription`
- `relatedLinks`
- `eventStartAt`
- `eventEndAt`
- `location`
- `registrationUrl`
- `ctaLabel`

## UX/UI Assessment

Reference site:
- strong in perceived legitimacy
- weak in clarity, hierarchy, and restraint
- noisy homepage
- dated layout language
- overloaded navigation
- weaker mobile readability

Local site:
- clearly more modern
- cleaner visual rhythm
- better spacing and card readability
- stronger baseline accessibility patterns
- but still feels like a prototype where content is incomplete

Main design conclusion:
- do not copy the reference visual system
- copy its institutional depth, service breadth, and trust density
- preserve the local project’s cleaner information presentation

## What To Port From The Reference

Must port conceptually:
- donation journey
- more complete institutional IA
- donor-specific and volunteer-specific paths
- events as a first-class content area
- richer trust-heavy footer
- public reserved-area access point
- stronger territorial sections and service shortcuts

Should port in a modernized form:
- utility top bar
- more explicit operational entry points
- more prominent trust/proof blocks
- richer homepage modules for conversion and reassurance

Should not port as-is:
- crowded slider-heavy homepage logic
- redundant promotional blocks
- weak visual hierarchy
- excessive density above the fold

## Recommended Target IA

Suggested main navigation:
- Chi siamo
- Cosa facciamo
- Servizi
- Sedi
- News & Eventi
- Donatori sangue
- Biblioteca
- Protezione civile
- Contatti
- Area riservata

Persistent CTA:
- Dona ora
- Prenota servizi

Suggested utility layer:
- phone
- emergency / service hours
- social
- search
- access/login

## Recommended Homepage Structure

1. Hero
- stronger institutional positioning
- two clear CTAs: `Prenota servizi`, `Dona ora`
- proof bar with 3-4 real trust signals

2. Key service shortcuts
- main service categories
- direct access to high-intent actions

3. Institutional trust band
- numbers, territorial presence, years, volunteer network, affiliations

4. News and events split
- latest news
- upcoming events

5. Volunteer / donor / citizen pathways
- become volunteer
- donate blood
- support the association

6. Sedi / territorio
- map or territorial cards
- contact and hours by location

7. Strong footer
- legal
- contacts
- PEC
- quick links
- external institutional references

## Priority Backlog

### Must Have

1. Replace all placeholder contact and organization data in [site.ts](C:/SVILUPPO/SITO-CROCE-VERDE/frontend/src/config/site.ts)
2. Add `Dona Ora` page and persistent CTA in navbar/home/footer
3. Add `Eventi` as dedicated content area
4. Add `Donatori Sangue` page
5. Add `Area Riservata` public entry
6. Turn `Prenota Servizi` into a real guided request flow
7. Strengthen `Contatti` with real channels, hierarchy, and operational clarity
8. Upgrade footer into a trust block

### Should Have

1. Add `Cosa Facciamo`
2. Add `Settori`
3. Add `Biblioteca`
4. Add utility top bar
5. Split `News` and `Eventi` in the homepage and in content model
6. Improve `Sezioni` into a stronger `Sedi` experience
7. Expand `Chi siamo` with governance, history, mission, numbers, and network

### Nice To Have

1. Search
2. richer editorial detail pages
3. related content blocks
4. stronger media strategy
5. fuller accessibility and mobile refinement pass

## Implementation Order

1. Real data and trust foundation
2. Navigation and IA expansion
3. Donation and reservation funnels
4. News/events content model upgrade
5. New institutional sections
6. Homepage redesign around stronger IA
7. Final accessibility, metadata, and QA sweep

## Final Direction

The right move is not to recreate `croceverdelucca.it`.

The right move is to build:
- the same institutional completeness
- the same service breadth
- the same trust density

while keeping:
- the local project’s cleaner structure
- a sharper, more contemporary layout
- better mobile behavior
- less noise
- stronger hierarchy
