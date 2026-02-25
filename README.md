# soundwave

When downloading oneshot soundpacks for music production, you will often get sounds that sound very similiar or maybe even are exactly the same, just named uniquely or have other slight differences.

I'm trying to ease weeding out these duplicate sounds by building an app to detect and review sounds that are either the exact same, or sound very, very similiar.

## repo layout

- `apps/desktop`: frontend app (React + TypeScript) and Tauri shell
- `services/audio-engine`: backend analysis service (Python)
- `packages/shared-types`: shared frontend type contracts
- `docs`: architecture notes and planning docs
- `scripts`: helper scripts for development/release workflows