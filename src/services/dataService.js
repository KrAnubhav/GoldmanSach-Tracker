import Papa from 'papaparse';
import generatedCompanies from '../data/generated-companies.json';

/**
 * DataService - Centralized service for fetching company data dynamically
 */

// Convert generated companies array to object for faster lookup
const COMPANY_CONFIGS = {};
generatedCompanies.forEach(company => {
    COMPANY_CONFIGS[company.id] = company;
});

console.log(`📊 Loaded ${Object.keys(COMPANY_CONFIGS).length} companies`);

// Time period configurations
const TIME_PERIODS = {
    '30days': { id: '30days', label: '30 Days', file: '1. Thirty Days.csv' },
    '3months': { id: '3months', label: '3 Months', file: '2. Three Months.csv' },
    '6months': { id: '6months', label: '6 Months', file: '3. Six Months.csv' },
    '6plus': { id: '6plus', label: '6+ Months', file: '4. More Than Six Months.csv' },
    'all': { id: 'all', label: 'All Time', file: '5. All.csv' }
};

/**
 * Parse CSV data from text
 */
const parseCSV = (csvText) => {
    return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => resolve(results.data),
            error: (error) => reject(error)
        });
    });
};

/**
 * Transform CSV row to problem object
 */
const transformProblem = (row, index) => {
    return {
        id: `problem-${index}`,
        title: row.Title || '',
        difficulty: (row.Difficulty || 'Medium').toUpperCase(),
        frequency: parseFloat(row.Frequency || 0),
        acceptance: row['Acceptance Rate'] || row.Acceptance || '0%',
        link: row.Link || '#',
        topic: row.Topics || row.Topic || 'General',
        tags: row.Topics ? row.Topics.split(',').map(t => t.trim()) : []
    };
};

/**
 * DataService class
 */
class DataService {
    constructor() {
        this.cache = new Map();
    }

    /**
     * Get all available companies
     */
    async getCompanies() {
        return Object.values(COMPANY_CONFIGS);
    }

    /**
     * Get company by ID
     */
    async getCompanyById(companyId) {
        const normalizedId = companyId.toLowerCase();
        return COMPANY_CONFIGS[normalizedId] || null;
    }

    /**
     * Get problems for a company and time period
     */
    async getProblems(companyId, timePeriod = 'all') {
        const cacheKey = `${companyId}-${timePeriod}`;

        // Check cache
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const normalizedId = companyId.toLowerCase();
            const period = TIME_PERIODS[timePeriod] || TIME_PERIODS.all;

            // For Goldman Sachs, use the existing JS file
            if (normalizedId === 'goldman-sachs') {
                const { PROBLEMS } = await import(`../data/goldman-sachs/problems.js`);
                this.cache.set(cacheKey, PROBLEMS);
                return PROBLEMS;
            }

            // For other companies, load from CSV
            const folderName = this.getFolderName(normalizedId);
            const csvPath = `/src/data/${folderName}/${period.file}`;

            const response = await fetch(csvPath);
            if (!response.ok) {
                throw new Error(`Failed to load problems for ${companyId}`);
            }

            const csvText = await response.text();
            const rows = await parseCSV(csvText);
            const problems = rows.map((row, index) => transformProblem(row, index));

            // Cache the results
            this.cache.set(cacheKey, problems);
            return problems;
        } catch (error) {
            console.error(`Error loading problems for ${companyId}:`, error);
            return [];
        }
    }

    /**
     * Get experiences for a company
     */
    async getExperiences(companyId) {
        const cacheKey = `${companyId}-experiences`;

        // Check cache
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const normalizedId = companyId.toLowerCase();

            // For Goldman Sachs, use the existing JS file
            if (normalizedId === 'goldman-sachs') {
                const { EXPERIENCES } = await import(`../data/goldman-sachs/experiences.js`);
                this.cache.set(cacheKey, EXPERIENCES);
                return EXPERIENCES;
            }

            // For other companies, return empty array for now
            // TODO: Add experiences CSV support if needed
            return [];
        } catch (error) {
            console.error(`Error loading experiences for ${companyId}:`, error);
            return [];
        }
    }

    /**
     * Get available time periods for a company
     */
    getTimePeriods() {
        return Object.values(TIME_PERIODS);
    }

    /**
     * Search companies by query
     */
    searchCompanies(query) {
        const lowerQuery = query.toLowerCase();
        return Object.values(COMPANY_CONFIGS).filter(company =>
            company.name.toLowerCase().includes(lowerQuery) ||
            company.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    }

    /**
     * Get folder name from company ID
     */
    getFolderName(companyId) {
        const company = COMPANY_CONFIGS[companyId];
        if (company && company.folderName) {
            return company.folderName;
        }

        // Fallback: Convert company ID to folder name (capitalize first letter)
        return companyId.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
    }
}

// Export singleton instance
export const dataService = new DataService();

// Export named functions for backward compatibility
export const getCompanies = () => dataService.getCompanies();
export const getCompanyById = (id) => dataService.getCompanyById(id);
export const searchCompanies = (query) => dataService.searchCompanies(query);
