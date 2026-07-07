const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/AdminReferrals.jsx', 'utf8');

// Replace standard literal $ signs before amounts or curly braces
content = content.replace(/\$([0-9]+)/g, '$1'); 
content = content.replace(/\+\$([0-9]+)/g, '+$1');

// Replace template literals in JSX where a literal $ precedes a JSX expression
// Example: >${totalEarned.toFixed(2)} -> >{totalEarned.toFixed(2)}
content = content.replace(/>\$\{/g, '>{');
content = content.replace(/>\s*\$\{/g, '>{');

// Also remove isolated $ before a `{` in JSX body if any, like:
// >
//   ${referrals...
content = content.replace(/^\s*\$\{/gm, '{');
content = content.replace(/ \$\{/g, ' {');

fs.writeFileSync('src/pages/admin/AdminReferrals.jsx', content);
console.log('Replaced $ signs in AdminReferrals.jsx successfully');
