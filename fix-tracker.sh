#!/bin/bash

# This script modifies CompanyTracker.jsx to use imported data instead of hardcoded arrays

FILE="src/components/company/CompanyTracker.jsx"

# Step 1: Add imports after the existing imports
sed -i '' '/import { Radar, Bar } from .react-chartjs-2./a\
import { INTERVIEW_EXPERIENCES } from '"'"'../../data/goldman-sachs/experiences'"'"';\
import { PROBLEMS } from '"'"'../../data/goldman-sachs/problems'"'"';
' "$FILE"

# Step 2: Remove the hardcoded INTERVIEW_EXPERIENCES array (lines 214-1388)
# and SAMPLE_DATA array (lines 1390-1483)
# Replace with a comment
sed -i '' '214,1483d' "$FILE"
sed -i '' '213a\
\
// --- Data is imported from separate files ---\
// INTERVIEW_EXPERIENCES from '"'"'../../data/goldman-sachs/experiences'"'"'\
// PROBLEMS from '"'"'../../data/goldman-sachs/problems'"'"'\
' "$FILE"

# Step 3: Replace SAMPLE_DATA with PROBLEMS in useState
sed -i '' 's/useState(SAMPLE_DATA)/useState(PROBLEMS)/g' "$FILE"

echo "✅ CompanyTracker.jsx has been updated successfully!"
