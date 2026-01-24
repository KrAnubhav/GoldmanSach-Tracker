// Central registry of all supported companies
export const COMPANIES = [
    {
        id: 'goldman-sachs',
        name: 'Goldman Sachs',
        logo: '🏦',
        description: 'Leading global investment banking, securities and investment management firm',
        color: 'blue',
        tags: ['Investment Banking', 'Finance', 'Technology'],
    },
    // More companies can be added here in the future
    // {
    //   id: 'morgan-stanley',
    //   name: 'Morgan Stanley',
    //   logo: '💼',
    //   description: 'Global financial services firm',
    //   color: 'indigo',
    //   tags: ['Investment Banking', 'Wealth Management'],
    // },
];

export const getCompanyById = (id) => {
    return COMPANIES.find(company => company.id === id);
};

export const getCompanyByName = (name) => {
    return COMPANIES.find(company =>
        company.name.toLowerCase() === name.toLowerCase()
    );
};

export const searchCompanies = (query) => {
    const lowerQuery = query.toLowerCase();
    return COMPANIES.filter(company =>
        company.name.toLowerCase().includes(lowerQuery) ||
        company.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
};
