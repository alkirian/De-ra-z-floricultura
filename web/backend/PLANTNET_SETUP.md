# PlantNet Setup Rapido

1. Copia `backend/.env.example` a `backend/.env` (ya creado en local).
2. Reemplaza `PLANTNET_API_KEY` por tu key real de Pl@ntNet.
3. Levanta backend con `npm run dev` dentro de `backend/`.
4. El endpoint disponible es `POST /api/plantnet/identify` con campo `image`.

Nota:
- Si `PLANTNET_API_KEY=FAKE_PLANTNET_API_KEY_REPLACE_ME`, el backend responde en modo mock para probar frontend sin API real.
