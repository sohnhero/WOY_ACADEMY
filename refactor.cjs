const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Top of App -> Extract context provider and AppContent
const topPattern = /export default function App\(\) \{\s+const \[theme, setTheme\] = useState<Theme>\('terracotta'\);([\s\S]*?)const Logo = \(\{ className \}: \{ className\?: string \}\) => \([\s\S]*?<\/div>\s+\);\s+useEffect\(\(\) => \{/m;

const topReplacement = `export default function App() {
  const [theme, setTheme] = useState<Theme>('terracotta');
$1const contextValue = {
    theme, setTheme, activeTab, setActiveTab, currentLesson, setCurrentLesson,
    globalCoins, setGlobalCoins, isShieldActive, setIsShieldActive,
    isAuthenticated, setIsAuthenticated, handleActivateShield,
    colors: getThemeColors(theme), Logo
  };

  return (
    <AppContext.Provider value={contextValue}>
      <AppContent />
    </AppContext.Provider>
  );
}

function AppContent() {
  const { theme, colors, activeTab, currentLesson, isAuthenticated, setIsAuthenticated, Logo, globalCoins, setTheme } = React.useContext(AppContext);

  useEffect(() => {`;

code = code.replace(topPattern, topReplacement);

// 2. Component injection macro
const ctxInjection = `  const { theme, setTheme, colors, activeTab, setActiveTab, currentLesson, setCurrentLesson, globalCoins, setGlobalCoins, isShieldActive, setIsShieldActive, isAuthenticated, setIsAuthenticated, handleActivateShield, Logo } = React.useContext(AppContext);\n`;

const comps = [
  { name: 'AuthScreen', search: /const AuthScreen = \(\{ onLogin \}: \{ onLogin: \(\) => void \}\) => \{\n/ },
  { name: 'MobileLayout', search: /const MobileLayout = \(\) => \(\n/ },
  { name: 'DesktopLayout', search: /const DesktopLayout = \(\) => \(\n/ },
  { name: 'CoursMobileScreen', search: /const CoursMobileScreen = \(\) => \{\n/ },
  { name: 'CoursDesktopScreen', search: /const CoursDesktopScreen = \(\) => \{\n/ },
  { name: 'RapportScreen', search: /const RapportScreen = \(\) => \{\n/ },
  { name: 'LessonScreen', search: /const LessonScreen: React\.FC<\{ lessonId: string; onBack: \(\) => void \}> = \(\{ onBack \}\) => \{\n/ }
];

// Wait, MobileLayout and DesktopLayout are implicit returns `const X = () => (`!
// I need to change them to `const X = () => { const {...} = ...; return (`

code = code.replace(/const MobileLayout = \(\) => \(\n/, `const MobileLayout = () => {\n${ctxInjection}  return (\n`);
// Fix closing paren of MobileLayout
// Around line 700: it ends with `</div>\n  );\n`
code = code.replace(/(?<=Tes Modules N1[\s\S]*?<\/div>\n\s*<\/section>\n\s*<\/div>\n\s*)\);\n/m, `);\n};\n`);

code = code.replace(/const DesktopLayout = \(\) => \(\n/, `const DesktopLayout = () => {\n${ctxInjection}  return (\n`);
// Fix closing paren of DesktopLayout
// Ends with `</main>\n    </div>\n  );\n`
code = code.replace(/(?<=<Shield size=\{22\}[\s\S]*?<\/div>\n\s*<\/main>\n\s*<\/div>\n\s*)\);\n/m, `);\n};\n`);

// For components that are already block bodies:
code = code.replace(/const AuthScreen = \(\{ onLogin \}: \{ onLogin: \(\) => void \}\) => \{\n/, `const AuthScreen = ({ onLogin }: { onLogin: () => void }) => {\n${ctxInjection}`);
code = code.replace(/const CoursMobileScreen = \(\) => \{\n/, `const CoursMobileScreen = () => {\n${ctxInjection}`);
code = code.replace(/const CoursDesktopScreen = \(\) => \{\n/, `const CoursDesktopScreen = () => {\n${ctxInjection}`);
code = code.replace(/const RapportScreen = \(\) => \{\n/, `const RapportScreen = () => {\n${ctxInjection}`);
code = code.replace(/const LessonScreen: React\.FC<\{ lessonId: string; onBack: \(\) => void \}> = \(\{ onBack \}\) => \{\n/, `const LessonScreen: React.FC<{ lessonId: string; onBack: () => void }> = ({ onBack }) => {\n${ctxInjection}`);

// 3. Rename the main render block return to close `AppContent` before doing `}`.
// The file has a final `return (` block around line 2176. It closes at the very end of the file.
// We just need to make sure the final `}` now closes `AppContent`. (It currently closes `App` which was renamed to `AppContent` in theory, actually we created `AppContent`).
// Wait, `export default function App()` is closed ABOVE `AppContent`?
// No, I injected it IN PLACE. I closed `App()` and OPENED `AppContent()`. So the final `}` originally closing `App()` now naturally closes `AppContent()`.

fs.writeFileSync('src/App.tsx', code, 'utf-8');
console.log("Refactoring complete.");
