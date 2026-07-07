const fs = require('fs');
let content = fs.readFileSync('src/pages/company/ReferralDashboard.jsx', 'utf8');

// Replace standard literal $ signs before amounts
content = content.replace(/\$([0-9]+)/g, '$1'); 
content = content.replace(/\+\$([0-9]+)/g, '+$1');

// Replace template literals in JSX where a literal $ precedes a JSX expression
// Example: >${totalEarned.toFixed(2)} -> >{totalEarned.toFixed(2)}
content = content.replace(/>\$\{/g, '>{');

// Example: className="...">${pendingRewards} -> >{pendingRewards}
// In JSX this might be written as >${val}
content = content.replace(/>\s*\$\{/g, '>{');

// Another pattern: a $ reward! -> a reward! (or just remove the $)
content = content.replace(/ a \$([0-9]+) reward/g, ' a $1 reward');

// Write the file back
fs.writeFileSync('src/pages/company/ReferralDashboard.jsx', content);
console.log('Replaced $ signs successfully');
