# PowerShell script to update color scheme across all JSX files

$files = Get-ChildItem -Path "src" -Filter "*.jsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace red/pink/purple gradients with blue-based equivalents
    $content = $content -replace 'from-red-600 via-pink-600 to-purple-600', 'from-primary via-primary-light to-primary-dark'
    $content = $content -replace 'from-red-600 via-pink-600 to-red-600', 'bg-primary'
    $content = $content -replace 'from-red-600 to-pink-600', 'from-primary to-primary-light'
    $content = $content -replace 'from-red-500 to-pink-500', 'from-primary-dark to-primary'
    $content = $content -replace 'from-orange-500 via-red-500 to-pink-500', 'from-primary-dark via-primary to-primary-light'
    $content = $content -replace 'from-purple-600 via-pink-600 to-red-600', 'from-primary-dark via-primary to-primary-light'
    $content = $content -replace 'from-purple-600 to-pink-600', 'from-primary to-primary-light'
    $content = $content -replace 'from-purple-900/85 via-pink-900/75 to-red-900/85', 'from-primary-dark/85 via-primary/75 to-primary-light/85'
    $content = $content -replace 'from-purple-900/85 via-pink-900/75 to-indigo-900/85', 'from-primary-dark/85 via-primary/75 to-primary/85'
    
    # Replace standalone color classes
    $content = $content -replace 'bg-red-600(?![0-9])', 'bg-primary'
    $content = $content -replace 'bg-red-700', 'bg-primary-dark'
    $content = $content -replace 'bg-red-500', 'bg-primary'
    $content = $content -replace 'bg-red-50', 'bg-primary/10'
    $content = $content -replace 'bg-pink-600', 'bg-primary-light'
    $content = $content -replace 'bg-pink-500', 'bg-primary-light'
    $content = $content -replace 'bg-purple-600', 'bg-primary'
    $content = $content -replace 'bg-purple-700', 'bg-primary-dark'
    $content = $content -replace 'bg-purple-500', 'bg-primary'
    $content = $content -replace 'bg-purple-50', 'bg-primary/10'
    
    # Replace text colors
    $content = $content -replace 'text-red-600(?![0-9])', 'text-primary'
    $content = $content -replace 'text-red-700', 'text-primary-dark'
    $content = $content -replace 'text-red-500', 'text-primary'
    $content = $content -replace 'text-red-100', 'text-blue-100'
    $content = $content -replace 'text-red-400', 'text-primary-light'
    $content = $content -replace 'text-pink-600', 'text-primary-light'
    $content = $content -replace 'text-pink-700', 'text-primary'
    $content = $content -replace 'text-purple-600', 'text-primary'
    $content = $content -replace 'text-purple-700', 'text-primary-dark'
    
    # Replace hover colors
    $content = $content -replace 'hover:bg-red-600', 'hover:bg-primary'
    $content = $content -replace 'hover:bg-red-700', 'hover:bg-primary-dark'
    $content = $content -replace 'hover:bg-red-50', 'hover:bg-primary/10'
    $content = $content -replace 'hover:bg-pink-600', 'hover:bg-primary-light'
    $content = $content -replace 'hover:bg-purple-600', 'hover:bg-primary'
    $content = $content -replace 'hover:bg-purple-700', 'hover:bg-primary-dark'
    $content = $content -replace 'hover:bg-purple-50', 'hover:bg-primary/10'
    
    $content = $content -replace 'hover:text-red-600', 'hover:text-primary'
    $content = $content -replace 'hover:text-red-700', 'hover:text-primary-dark'
    $content = $content -replace 'hover:text-pink-600', 'hover:text-primary-light'
    $content = $content -replace 'hover:text-purple-600', 'hover:text-primary'
    $content = $content -replace 'hover:text-purple-700', 'hover:text-primary-dark'
    
    # Replace border colors
    $content = $content -replace 'border-red-200', 'border-primary/20'
    $content = $content -replace 'border-red-100', 'border-primary/10'
    $content = $content -replace 'border-red-600', 'border-primary'
    $content = $content -replace 'border-purple-600', 'border-primary'
    $content = $content -replace 'border-pink-600', 'border-primary-light'
    
    # Replace hover border colors
    $content = $content -replace 'hover:border-red-100', 'hover:border-primary/10'
    $content = $content -replace 'hover:border-red-600', 'hover:border-primary'
    
    # Replace gradient backgrounds
    $content = $content -replace 'from-red-50 to-pink-50', 'from-primary/5 to-primary/10'
    $content = $content -replace 'via-purple-50 to-pink-50', 'via-blue-50 to-blue-100'
    $content = $content -replace 'from-slate-50 via-purple-50 to-pink-50', 'from-slate-50 via-blue-50 to-blue-100'
    
    # Replace hover gradient transformations
    $content = $content -replace 'hover:from-red-500 hover:to-pink-500', 'hover:from-primary-dark hover:to-primary'
    $content = $content -replace 'hover:from-red-600 hover:to-pink-600', 'hover:from-primary hover:to-primary-light'
    $content = $content -replace 'hover:from-purple-700 hover:to-pink-700', 'hover:from-primary-dark hover:to-primary'
    $content = $content -replace 'hover:from-indigo-700 hover:to-purple-700', 'hover:from-primary-dark hover:to-primary'
    
    # Replace shadow colors
    $content = $content -replace 'hover:shadow-purple-500/50', 'hover:shadow-primary/50'
    
    # Replace gray-800 to black for better contrast
    $content = $content -replace 'text-gray-800(?![0-9])', 'text-black'
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
}

Write-Host "Color scheme updated successfully across all JSX files!"
