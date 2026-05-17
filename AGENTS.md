# Agents Guide — MeuRachao

Purpose: Give an AI coding agent the immediately useful, project-specific knowledge needed to be productive working on this repo.

Quick pointers
- Primary project doc: `README.md` (root) — contains the full product vision, domain vocabulary and feature roadmap (MVP through later iterations).
- Code folders: `backend/` and `frontend/` (root) — expected locations for server and client; both are currently empty scaffolds.
- No existing agent instructions found in the repo (search for AGENT.md / AGENTS.md / .github/copilot-instructions.md returned nothing). Check `README.md` first for domain rules.

Big-picture architecture (what agents must know)
- Two main components: frontend (mobile-first SPA) and backend (domain service implementing core business rules). Keep a clear service boundary: UI -> HTTP/GraphQL -> backend domain services.
- Backend responsibility: domain logic, orchestration of flows (monthly vs avulso slots, confirmation windows, matchmaking/balancing algorithm), notifications (WhatsApp/SMS OTP and vacancy notifications), and persistence.
- Frontend responsibility: mobile-first UX for groups/sessions, OTP flow, confirmation UI, session roster, visualization of skill icons, team editor (drag/drop).
- Design intent from README: Domain-Driven Design + Clean Architecture (layers: domain, application, infrastructure). Implement business rules in the domain layer and keep transport/controllers thin.

Key domain concepts (explicit from README)
- Group (the rachão): name, description, location, capacity, session recurrence settings.
- Session: scheduled occurrence, capacity, confirmation window (deadline), confirmed players list.
- Players: identified only by phone number + OTP code; no sensitive personal data stored (no CPF/financials).
- Vacancy types: mensalista (fixed monthly slot) vs avulso (ad hoc player). When mensalista marks "não vou" or misses confirmation, slots can be released to avulsos.
- Skill profile (per group): per-player ratings for SAQUE, PASSE, ATAQUE (1–5), possibly extra attributes like saque type (por baixo / por cima). These feed the matchmaking algorithm.
- TeamComposition / Matchmaking: backend computes teams trying to balance the sum of fundamentals (saque/passe/ataque) in 6x0 context.

Practical API / data shape examples (implementations should follow these shapes)
- POST /auth/otp-request { phone }
- POST /auth/otp-verify { phone, code } -> returns session token / player id
- POST /groups { name, description, location, capacity, mensalistasCount, avulsosMax }
- POST /groups/:id/sessions { recurPattern, startTime, confirmationDeadline }
- POST /sessions/:id/confirmations { playerId, status: [vai|nao|sem-resposta] }
- POST /sessions/:id/matchmaking { mode: [equilibrio_maximo|mix_social|aleatorio_guiado] } -> returns teams

Project-specific conventions and constraints
- Authentication: phone + one-time code only. Do NOT design password-based flows or store sensitive identifiers. (README: "Sem login com senha...Identificação por número de telefone + código via WhatsApp/SMS")
- Privacy: avoid storing CPF/RG/financial data. Keep PII footprint minimal.
- Skill ratings are scoped per group. A player's rating in one group is independent from others unless an explicit migration/merge is implemented.
- 6x0 domain assumptions: everyone can pass/attack; algorithms should not assume rigid specialized roles by default.

Developer workflows and commands (what to look for)
- There are no build/test scripts present in the repo yet (no package manifests detected in root, `backend/` or `frontend/`). Before running builds, inspect `backend/` and `frontend/` for package.json / pyproject.toml / build files.
- When adding services, include clear README additions explaining how to start frontend and backend (example: `cd backend && npm install && npm run dev` and `cd frontend && npm install && npm run dev`).
- Add automated checks (linting / basic unit tests) at the earliest scaffold stage so future agents can rely on standardized commands like `npm test` or `pytest`.

Integration points / external dependencies (expected)
- OTP delivery: WhatsApp or SMS provider (Twilio, MessageBird, or WhatsApp API). Implement NotificationService interface in infra layer and mock it in tests.
- Persistent storage: relational DB expected (Postgres or SQLite for dev). Keep migrations and schema in `backend/migrations`.
- Optional: background job scheduler for confirmation-window expirations (cron, delayed job or queue like Bull/Sidekiq). Implement an idempotent job to release slots and notify waiting avulsos.

Patterns to follow (examples from README and implied design)
- Keep domain services pure: e.g., Matchmaker takes a list of confirmed players + skill profiles and returns teams; it should be testable without infra.
- Notification and transport are adapters: they call into domain services but don’t contain business rules.
- Data model example files to create under `backend/domain/`: player.py, group.py, session.py, skill_profile.py, matchmaking.py.

First tasks an agent should do when arriving
1. Open `README.md` and internalize domain vocabulary (group, mensalista, avulso, janela de confirmação, 6x0, saques/passe/ataque).
2. Create minimal scaffolding: backend README, basic API skeleton, infra interfaces (NotificationService, Persistence), and tests for Matchmaker using the SAQUE/PASSE/ATAQUE model.
3. Add developer README entries that document start/test commands.

Where to update this guide
- If you add implementation code, also update `AGENTS.md` with concrete start commands and any deviations from the conventions above.

Useful files to inspect next
- `README.md` (root) — product vision and domain rules
- `backend/` and `frontend/` — expected implementation locations (create README and manifests here)
- `.idea/workspace.xml` — indicates Copilot/IDE setup but contains no project-specific agent rules

If you are an agent modifying the repo: after creating core scaffolding, run static tests and then update this document with real commands to run the services.

---
Small-change log: created AGENTS.md describing domain, API shapes, conventions and first-tasks for new agents.

