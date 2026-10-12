# AGENTS

This repository is intentionally minimal at the moment. Treat it as a greenfield workspace: discover the actual structure before changing anything, and keep the instructions here reusable as the project grows.

## Core expectations

- Inspect the actual files in the repo before making a change.
- Prefer the smallest possible fix that matches the request.
- Do not assume a framework, package manager, or app structure without checking the workspace first.
- Preserve existing conventions when they already exist; do not introduce new patterns just for the sake of novelty.
- Avoid scaffolding a new project unless the user explicitly asks for one.

## Working rules for this repo

- Check for package manifests and lockfiles before installing dependencies or running build commands.
- Use the repo's existing package manager and scripts whenever they already exist.
- Run the smallest relevant validation command for the changed behavior.
- If a task affects UI or front-end behavior, verify visually or with the project’s relevant frontend checks.
- Keep documentation in dedicated docs files and link to them instead of duplicating large sections here.

## Before coding

1. Confirm the relevant project files and conventions.
2. Identify the exact behavior to change or add.
3. Make the minimal patch that satisfies the requirement.
4. Validate with the most direct command available.
5. Stop once the task is complete; avoid unrelated cleanup.

## Repo hygiene

- Use clear, descriptive file and symbol names.
- Keep related logic close together and avoid spreading one concern across many files unnecessarily.
- Prefer simple, readable solutions over clever abstractions.
- Add or update tests when the repo already has a testing pattern; otherwise validate with the project’s current commands.
- Keep this file focused on repo behavior and workflow, not generic coding advice.

## Expected future structure

As the workspace expands, prefer the following patterns unless the repo already establishes different ones:

- README or project docs for overview and setup
- package manifests at the repo root for install and scripts
- app or src directories that reflect the actual tech stack
- tests next to the code they validate when the project uses a conventional testing setup

## Related documentation

Add links here when project docs exist, for example:

- [README.md](README.md)
- docs or architecture notes
- contribution and setup guides
- testing instructions

Do not duplicate those documents in this file; link to them instead.
