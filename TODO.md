# TODO List for Fixing Errors

## Frontend Fixes

- [x] Replace `class` with `className` in `SkeletonLoader.jsx` to fix React warning.

## Backend Fixes

- [x] Correct error message in `aiController.js` for `generateConceptExplanation` from "Failed to generate questions" to "Failed to generate explanation".
- [x] Added logging to debug JSON parsing issues in `generateConceptExplanation`.

## Testing

- [x] Backend server started on port 8000.
- [x] Frontend server started on port 5174.
- [ ] Test frontend: Open http://localhost:5174 in browser and check for no React warnings.
- [ ] Test backend: Use the app to trigger the generate-explanation API and verify no 500 error.
