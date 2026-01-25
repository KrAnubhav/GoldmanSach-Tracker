// Central registry of all supported companies
// Now dynamically loaded from dataService
import { dataService } from '../services/dataService.js';

export const getCompanies = () => dataService.getCompanies();
export const getCompanyById = (id) => dataService.getCompanyById(id);
export const searchCompanies = (query) => dataService.searchCompanies(query);

// Backward compatibility - get company by name
export const getCompanyByName = async (name) => {
    const companies = await getCompanies();
    return companies.find(company =>
        company.name.toLowerCase() === name.toLowerCase()
    );
};

// For components that expect synchronous COMPANIES array
export const COMPANIES = getCompanies();
