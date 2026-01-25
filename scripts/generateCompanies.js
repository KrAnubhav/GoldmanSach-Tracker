/**
 * Auto-generate company configurations from data folder
 * This script scans the data folder and creates company metadata automatically
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../src/data');

// Company logo mapping based on industry/type
const getCompanyLogo = (name) => {
    const nameLower = name.toLowerCase();

    // Tech Giants
    if (['google', 'meta', 'apple', 'microsoft', 'amazon'].some(t => nameLower.includes(t))) return '🚀';

    // Finance & Banking
    if (['goldman', 'morgan', 'bank', 'capital', 'fidelity', 'blackrock', 'citadel', 'jpmorgan', 'j.p. morgan', 'wells fargo', 'citigroup', 'barclays', 'hsbc', 'ubs', 'deutsche bank'].some(t => nameLower.includes(t))) return '🏦';

    // Trading & Hedge Funds
    if (['trading', 'sigma', 'shaw', 'jane street', 'jump', 'optiver', 'imc', 'akuna', 'drw', 'sig', 'tower research', 'hudson river'].some(t => nameLower.includes(t))) return '📈';

    // Fintech & Payments
    if (['pay', 'stripe', 'square', 'visa', 'mastercard', 'razorpay', 'paytm', 'phonepe', 'coinbase', 'robinhood', 'revolut', 'wise'].some(t => nameLower.includes(t))) return '💳';

    // E-commerce & Retail
    if (['amazon', 'flipkart', 'walmart', 'shopify', 'ebay', 'etsy', 'target', 'alibaba'].some(t => nameLower.includes(t))) return '🛒';

    // Food & Delivery
    if (['uber', 'doordash', 'swiggy', 'zomato', 'grubhub', 'deliveroo', 'instacart', 'dunzo'].some(t => nameLower.includes(t))) return '🍔';

    // Ride-sharing & Transportation
    if (['lyft', 'ola', 'grab', 'didi', 'gojek', 'careem'].some(t => nameLower.includes(t))) return '🚗';

    // Social Media & Communication
    if (['facebook', 'instagram', 'twitter', 'linkedin', 'snap', 'pinterest', 'reddit', 'discord', 'telegram', 'whatsapp', 'tiktok'].some(t => nameLower.includes(t))) return '💬';

    // Gaming
    if (['game', 'gaming', 'riot', 'blizzard', 'activision', 'electronic arts', 'unity', 'roblox', 'zynga', 'epic'].some(t => nameLower.includes(t))) return '🎮';

    // Cloud & Infrastructure
    if (['aws', 'azure', 'cloud', 'databricks', 'snowflake', 'mongodb', 'redis', 'elastic'].some(t => nameLower.includes(t))) return '☁️';

    // AI & ML
    if (['openai', 'anthropic', 'deepmind', 'nvidia', 'scale ai'].some(t => nameLower.includes(t))) return '🤖';

    // Consulting
    if (['mckinsey', 'bcg', 'bain', 'deloitte', 'pwc', 'ey', 'kpmg', 'accenture', 'capgemini'].some(t => nameLower.includes(t))) return '💼';

    // Healthcare & Biotech
    if (['health', 'medical', 'pharma', 'bio', 'roche', 'optum'].some(t => nameLower.includes(t))) return '🏥';

    // Automotive
    if (['tesla', 'ford', 'gm', 'general motors', 'waymo', 'cruise', 'rivian', 'lucid'].some(t => nameLower.includes(t))) return '🚙';

    // Cybersecurity
    if (['security', 'palo alto', 'crowdstrike', 'fortinet', 'zscaler', 'okta'].some(t => nameLower.includes(t))) return '🔒';

    // Media & Entertainment
    if (['netflix', 'spotify', 'disney', 'hulu', 'twitch', 'youtube'].some(t => nameLower.includes(t))) return '🎬';

    // Default
    return '🏢';
};

// Get company color based on type
const getCompanyColor = (name) => {
    const nameLower = name.toLowerCase();

    if (['google', 'meta', 'microsoft'].some(t => nameLower.includes(t))) return 'blue';
    if (['goldman', 'morgan', 'bank'].some(t => nameLower.includes(t))) return 'indigo';
    if (['trading', 'capital'].some(t => nameLower.includes(t))) return 'purple';
    if (['pay', 'stripe', 'visa'].some(t => nameLower.includes(t))) return 'green';
    if (['amazon', 'flipkart', 'walmart'].some(t => nameLower.includes(t))) return 'orange';
    if (['uber', 'lyft', 'ola'].some(t => nameLower.includes(t))) return 'pink';
    if (['netflix', 'spotify'].some(t => nameLower.includes(t))) return 'red';

    return 'blue';
};

// Get company tags based on name
const getCompanyTags = (name) => {
    const nameLower = name.toLowerCase();
    const tags = [];

    if (['google', 'meta', 'microsoft', 'apple', 'amazon'].some(t => nameLower.includes(t))) {
        tags.push('Tech Giant', 'FAANG');
    }

    if (['goldman', 'morgan', 'bank', 'capital'].some(t => nameLower.includes(t))) {
        tags.push('Finance', 'Banking');
    }

    if (['trading', 'sigma', 'shaw'].some(t => nameLower.includes(t))) {
        tags.push('Trading', 'Quant', 'Finance');
    }

    if (['startup', 'unicorn'].some(t => nameLower.includes(t))) {
        tags.push('Startup');
    }

    tags.push('Technology');

    return tags.slice(0, 3); // Max 3 tags
};

// Convert folder name to URL-friendly ID
const toKebabCase = (str) => {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// Generate company description
const getCompanyDescription = (name) => {
    const nameLower = name.toLowerCase();

    // Specific descriptions for well-known companies
    const descriptions = {
        'google': 'Global technology leader in search, cloud, and AI',
        'meta': 'Social technology company behind Facebook, Instagram, and WhatsApp',
        'microsoft': 'Leading technology company in software, cloud, and AI',
        'amazon': 'E-commerce and cloud computing giant',
        'apple': 'Innovative technology company known for iPhone, Mac, and services',
        'goldman sachs': 'Leading global investment banking and financial services firm',
        'morgan stanley': 'Global financial services firm specializing in investment banking',
        'netflix': 'Streaming entertainment service with original content',
        'uber': 'Technology platform for ride-sharing and delivery',
        'airbnb': 'Online marketplace for lodging and tourism experiences',
        'stripe': 'Financial infrastructure platform for online payments',
        'salesforce': 'Cloud-based customer relationship management platform',
        'adobe': 'Global leader in digital media and marketing solutions',
        'nvidia': 'Leading designer of graphics processing units and AI chips',
        'tesla': 'Electric vehicle and clean energy company',
        'spotify': 'Digital music streaming service',
        'snapchat': 'Multimedia messaging app',
        'twitter': 'Social media platform for real-time updates',
        'linkedin': 'Professional networking platform',
        'oracle': 'Enterprise software and cloud solutions provider',
        'ibm': 'Technology and consulting company',
        'intel': 'Semiconductor chip manufacturer',
        'cisco': 'Networking hardware and telecommunications equipment',
        'paypal': 'Online payments system',
        'square': 'Financial services and mobile payment company',
        'coinbase': 'Cryptocurrency exchange platform',
        'robinhood': 'Commission-free stock trading platform',
        'databricks': 'Unified analytics platform for big data',
        'snowflake': 'Cloud data platform',
        'mongodb': 'NoSQL database platform',
        'atlassian': 'Software company known for Jira and Confluence',
        'zoom': 'Video communications platform',
        'slack': 'Business communication platform',
        'dropbox': 'Cloud storage and file sharing service',
        'twilio': 'Cloud communications platform',
        'shopify': 'E-commerce platform for online stores',
        'doordash': 'Food delivery platform',
        'instacart': 'Grocery delivery service',
        'lyft': 'Ride-sharing platform',
        'pinterest': 'Visual discovery and bookmarking platform',
        'reddit': 'Social news aggregation and discussion platform',
        'tiktok': 'Short-form video sharing platform',
        'bytedance': 'Technology company behind TikTok',
        'palantir': 'Data analytics and software company',
        'roblox': 'Online gaming platform',
        'unity': 'Game development platform',
        'epic games': 'Video game and software developer',
        'riot games': 'Video game developer and publisher',
        'activision': 'Video game publisher',
        'electronic arts': 'Video game company',
        'cloudflare': 'Web infrastructure and security company',
        'datadog': 'Monitoring and analytics platform',
        'okta': 'Identity and access management platform',
        'crowdstrike': 'Cybersecurity technology company',
        'palo alto networks': 'Cybersecurity company',
        'zscaler': 'Cloud security company'
    };

    for (const [key, desc] of Object.entries(descriptions)) {
        if (nameLower.includes(key)) {
            return desc;
        }
    }

    // Generic description based on type
    if (nameLower.includes('bank') || nameLower.includes('capital') || nameLower.includes('financial')) {
        return 'Financial services and investment firm';
    }
    if (nameLower.includes('tech') || nameLower.includes('software')) {
        return 'Technology and software solutions company';
    }
    if (nameLower.includes('consulting')) {
        return 'Professional consulting services firm';
    }

    return `Leading company in technology and innovation`;
};

// Main function to generate company configs
const generateCompanyConfigs = () => {
    try {
        // Read all directories in data folder
        const items = fs.readdirSync(DATA_DIR, { withFileTypes: true });
        const companies = [];

        for (const item of items) {
            // Skip files and special folders
            if (!item.isDirectory()) continue;
            if (item.name === 'goldman-sachs' || item.name === 'web-app' || item.name.startsWith('.')) continue;

            const companyName = item.name;
            const companyId = toKebabCase(companyName);

            companies.push({
                id: companyId,
                name: companyName,
                logo: getCompanyLogo(companyName),
                description: getCompanyDescription(companyName),
                color: getCompanyColor(companyName),
                tags: getCompanyTags(companyName),
                folderName: companyName
            });
        }

        // Add Goldman Sachs manually (special case with different structure)
        companies.push({
            id: 'goldman-sachs',
            name: 'Goldman Sachs',
            logo: '🏦',
            description: 'Leading global investment banking, securities and investment management firm',
            color: 'blue',
            tags: ['Investment Banking', 'Finance', 'Technology'],
            folderName: 'goldman-sachs'
        });

        // Sort companies alphabetically
        companies.sort((a, b) => a.name.localeCompare(b.name));

        console.log(`✅ Generated ${companies.length} company configurations`);
        console.log(`\nSample companies:`);
        companies.slice(0, 10).forEach(c => {
            console.log(`  ${c.logo} ${c.name} (${c.id})`);
        });

        // Write to file
        const outputPath = path.join(__dirname, '../src/data/generated-companies.json');
        fs.writeFileSync(outputPath, JSON.stringify(companies, null, 2));
        console.log(`\n📝 Saved to: ${outputPath}`);

        return companies;
    } catch (error) {
        console.error('Error generating company configs:', error);
        throw error;
    }
};

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    generateCompanyConfigs();
}

export { generateCompanyConfigs };
