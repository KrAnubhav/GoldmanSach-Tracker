# 🎯 Implementation Plan: Dynamic Multi-Company Tracker System

## 📊 Current State Analysis

### Existing Structure
```
GoldmanSach-Tracker/
├── src/
│   ├── data/
│   │   ├── companies.js (hardcoded company metadata)
│   │   └── goldman-sachs/
│   │       ├── problems.js (hardcoded problems array)
│   │       └── experiences.js (hardcoded experiences array)
│   └── components/
│       ├── landing/ (LandingPage, HeroSection, CompanySearch)
│       └── company/ (CompanyTracker)
```

### Problem Statement
- **Current**: Goldman Sachs data is hardcoded in JS files
- **Requirement**: Support multiple companies with data from Excel sheets
- **Goal**: Make system dynamic and scalable

---

## 🏗️ Architecture Design

### Phase 1: Data Structure Setup (Excel → JSON Pipeline)

#### 1.1 Excel File Organization
```
public/data/
├── companies.json (auto-generated company registry)
├── amazon/
│   ├── problems.xlsx
│   └── experiences.xlsx
├── google/
│   ├── problems.xlsx
│   └── experiences.xlsx
├── goldman-sachs/
│   ├── problems.xlsx
│   └── experiences.xlsx
├── microsoft/
│   ├── problems.xlsx
│   └── experiences.xlsx
└── ... (other companies)
```

#### 1.2 Excel Sheet Format Standards

**problems.xlsx** columns:
- `id` - Problem ID (e.g., "42", "custom-1")
- `title` - Problem title
- `acceptance` - Acceptance rate (e.g., "48.9%")
- `difficulty` - Easy/Medium/Hard
- `frequency` - Frequency score (0-1)
- `link` - LeetCode link
- `topic` - Topic category

**experiences.xlsx** columns:
- `id` - Unique experience ID
- `role` - Job role (e.g., "Software Engineer")
- `year` - Year (e.g., "2024")
- `round` - Interview round
- `difficulty` - Easy/Medium/Hard
- `experience` - Full experience text
- `tags` - Comma-separated tags

**company-metadata** (in companies.json):
- `id` - URL-friendly slug (e.g., "goldman-sachs")
- `name` - Display name (e.g., "Goldman Sachs")
- `logo` - Emoji or icon
- `description` - Company description
- `color` - Theme color
- `tags` - Array of tags

---

### Phase 2: Build System & Data Processing

#### 2.1 Install Dependencies
```bash
npm install xlsx papaparse
npm install --save-dev node-xlsx
```

#### 2.2 Create Build Script (`scripts/processExcelData.js`)
```javascript
// This script will:
// 1. Scan public/data/ for company folders
// 2. Read Excel files from each folder
// 3. Convert to JSON
// 4. Generate companies.json registry
// 5. Save processed data to public/data/processed/
```

#### 2.3 Update package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "npm run process-data && vite build",
    "process-data": "node scripts/processExcelData.js",
    "preview": "vite preview"
  }
}
```

---

### Phase 3: Frontend Data Layer

#### 3.1 Create Data Service (`src/services/dataService.js`)
```javascript
// Centralized service for fetching company data
export const DataService = {
  // Fetch all companies
  async getCompanies() { ... },
  
  // Fetch company by ID
  async getCompanyById(id) { ... },
  
  // Fetch problems for a company
  async getProblems(companyId) { ... },
  
  // Fetch experiences for a company
  async getExperiences(companyId) { ... },
  
  // Search companies
  searchCompanies(query) { ... }
}
```

#### 3.2 Update Data Structure
```javascript
// src/data/companies.js → DELETE (replaced by dynamic fetch)
// src/data/goldman-sachs/* → MOVE to public/data/goldman-sachs/*.xlsx
```

---

### Phase 4: Component Updates

#### 4.1 Update LandingPage Component
```javascript
// Before: import { COMPANIES } from '../../data/companies'
// After: Fetch companies dynamically on mount

const [companies, setCompanies] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  DataService.getCompanies().then(setCompanies);
}, []);
```

#### 4.2 Update CompanyTracker Component
```javascript
// Before: import { PROBLEMS } from '../../data/goldman-sachs/problems'
// After: Fetch based on route param

const { companyId } = useParams();
const [problems, setProblems] = useState([]);
const [experiences, setExperiences] = useState([]);

useEffect(() => {
  Promise.all([
    DataService.getProblems(companyId),
    DataService.getExperiences(companyId)
  ]).then(([p, e]) => {
    setProblems(p);
    setExperiences(e);
  });
}, [companyId]);
```

---

### Phase 5: Auto-Discovery System

#### 5.1 Company Auto-Discovery
```javascript
// scripts/processExcelData.js will:
// 1. Scan public/data/ folders
// 2. Auto-generate company metadata from folder names
// 3. Allow manual override via company-config.json
```

#### 5.2 Company Config Override (Optional)
```json
// public/data/amazon/company-config.json
{
  "name": "Amazon",
  "logo": "📦",
  "description": "E-commerce and cloud computing giant",
  "color": "orange",
  "tags": ["E-commerce", "Cloud", "Technology"]
}
```

---

## 📋 Implementation Steps (Priority Order)

### Step 1: Setup Data Infrastructure ⭐ CRITICAL
1. Create `public/data/` directory structure
2. Create Excel templates for problems and experiences
3. Migrate Goldman Sachs data to Excel format
4. Install required npm packages

### Step 2: Build Data Processing Pipeline ⭐ CRITICAL
1. Create `scripts/processExcelData.js`
2. Implement Excel → JSON conversion
3. Implement company auto-discovery
4. Test with Goldman Sachs data

### Step 3: Create Data Service Layer ⭐ HIGH
1. Create `src/services/dataService.js`
2. Implement async data fetching
3. Add caching mechanism (optional)
4. Add error handling

### Step 4: Update Components ⭐ HIGH
1. Update `LandingPage.jsx` for dynamic companies
2. Update `CompanySearch.jsx` for dynamic filtering
3. Update `CompanyTracker.jsx` for dynamic data loading
4. Add loading states and error boundaries

### Step 5: Testing & Migration ⭐ MEDIUM
1. Test with Goldman Sachs (existing data)
2. Add 2-3 more companies (Amazon, Google, Microsoft)
3. Verify all features work dynamically
4. Performance testing

### Step 6: Documentation & Deployment ⭐ LOW
1. Create README for adding new companies
2. Document Excel format requirements
3. Update deployment scripts
4. Create video tutorial (optional)

---

## 🎨 User Experience Enhancements

### Dynamic Company Discovery
- Landing page automatically shows all available companies
- No code changes needed to add new companies
- Just drop Excel files in a new folder!

### Scalability
- Support unlimited companies
- Each company isolated in its own folder
- Easy to add/remove companies

### Maintainability
- Non-technical users can update data via Excel
- No need to touch code for data updates
- Clear separation of data and logic

---

## 🔧 Technical Decisions

### Why Excel?
✅ Non-technical friendly
✅ Easy to edit and maintain
✅ Can be exported from databases
✅ Familiar to most users

### Why Build-Time Processing?
✅ Better performance (pre-processed JSON)
✅ No runtime Excel parsing overhead
✅ Static files can be CDN cached
✅ Smaller bundle size

### Alternative: Runtime Processing
❌ Slower (parse Excel in browser)
❌ Larger bundle (include xlsx library)
✅ More dynamic (no rebuild needed)

**Decision**: Build-time processing for better performance

---

## 📊 File Size Estimates

```
Before (Hardcoded):
- companies.js: 1 KB
- problems.js: 16 KB
- experiences.js: 94 KB
Total: ~111 KB for 1 company

After (Dynamic):
- companies.json: 2 KB (all companies)
- amazon/problems.json: 15 KB
- amazon/experiences.json: 90 KB
- google/problems.json: 15 KB
- google/experiences.json: 90 KB
Total: ~222 KB for 2 companies (loaded on-demand)
```

---

## 🚀 Migration Strategy

### Phase A: Parallel System (Week 1)
- Keep existing hardcoded data
- Build new dynamic system alongside
- Test thoroughly

### Phase B: Gradual Migration (Week 2)
- Migrate Goldman Sachs to Excel
- Add 1-2 new companies
- Run both systems in parallel

### Phase C: Full Cutover (Week 3)
- Remove hardcoded data files
- Switch all components to dynamic
- Deploy to production

---

## 📝 Success Metrics

✅ Add new company in < 5 minutes (just Excel files)
✅ No code changes needed for data updates
✅ Page load time < 2 seconds
✅ Support 10+ companies without performance issues
✅ Non-technical users can manage data

---

## 🎯 Next Steps

1. **Get Approval**: Review this plan with stakeholders
2. **Create Excel Templates**: Define exact column structure
3. **Start Implementation**: Begin with Step 1
4. **Iterate**: Gather feedback and refine

---

## 💡 Future Enhancements (Post-MVP)

- Admin panel for uploading Excel files
- Real-time data sync from Google Sheets
- Analytics dashboard per company
- Export functionality (JSON → Excel)
- Bulk import from CSV
- Version control for data changes
- A/B testing different data formats

---

**Estimated Timeline**: 2-3 weeks
**Complexity**: Medium
**Risk**: Low (can run parallel with existing system)
**ROI**: High (massive scalability improvement)
