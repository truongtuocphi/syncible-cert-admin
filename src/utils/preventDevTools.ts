// utils/preventDevTools.ts

interface ExtendedWindow extends Window {
  Firebug?: {
    chrome?: {
      isInitialized?: boolean;
    };
  };
  console?: ExtendedConsole;
  isDevToolsOpen?: boolean;
}

interface ExtendedConsole extends Console {
  firebug?: any;
  [key: string]: any;
}

export const preventDevTools = () => {
  if (typeof window === 'undefined') return;

  const extendedWindow = window as ExtendedWindow;
  let isMonitoring = false;
  let checkInterval: ReturnType<typeof setInterval> | null = null;
  let warningDisplayed = false;

  // Detect if developer tools are open
  const detectDevTools = () => {
    const widthThreshold = 160;
    const heightThreshold = 160;

    // Kiểm tra xem DevTools có mở hay không
    const devToolsOpen =
      window.outerWidth - window.innerWidth > widthThreshold ||
      window.outerHeight - window.innerHeight > heightThreshold ||
      extendedWindow.Firebug?.chrome?.isInitialized ||
      extendedWindow.console?.firebug ||
      (document as any).documentElement.hasAttribute('webdriver');

    // Đảm bảo chỉ hiển thị thông báo nếu DevTools thực sự đang mở
    return devToolsOpen && !extendedWindow.isDevToolsOpen;
  };

  // Create blocking overlay
  const createBlockingOverlay = () => {
    const overlay = document.createElement('div');
    overlay.id = 'devtools-blocking-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        padding: 20px;
      `;

    const message = document.createElement('h2');
    message.textContent = 'Developer Tools are not allowed on this site';
    message.style.marginBottom = '20px';

    const subMessage = document.createElement('p');
    subMessage.textContent = 'Please close Developer Tools to continue browsing.';

    overlay.appendChild(message);
    overlay.appendChild(subMessage);

    return overlay;
  };

  // Handle dev tools detection
  const handleDevToolsDetection = () => {
    if (!warningDisplayed) {
      warningDisplayed = true;
      extendedWindow.isDevToolsOpen = true;

      // Clear sensitive data
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (error) {
        console.error('Error clearing storage:', error);
      }

      // Add blocking overlay if it doesn't exist
      if (!document.getElementById('devtools-blocking-overlay')) {
        const overlay = createBlockingOverlay();
        document.body.appendChild(overlay);
      }
    }
  };

  // Check if DevTools were closed
  const checkAndRestoreContent = () => {
    if (!detectDevTools() && warningDisplayed) {
      warningDisplayed = false;
      extendedWindow.isDevToolsOpen = false;

      // Remove blocking overlay
      const overlay = document.getElementById('devtools-blocking-overlay');
      if (overlay) {
        overlay.remove();
      }
    }
  };

  // Start monitoring every second
  const startMonitoring = () => {
    if (isMonitoring) return;
    isMonitoring = true;

    checkInterval = setInterval(() => {
      if (detectDevTools()) {
        handleDevToolsDetection();
      } else {
        checkAndRestoreContent();
      }
    }, 1000);
  };

  // Stop monitoring
  const stopMonitoring = () => {
    if (checkInterval) {
      clearInterval(checkInterval);
      checkInterval = null;
      isMonitoring = false;
    }
  };

  // Prevent keyboard shortcuts
  const handleKeydown = (e: KeyboardEvent) => {
    const forbiddenKeys = ['F12', 'I', 'J', 'C', 'U', 'S', 'K'];
    const isForbiddenKey = forbiddenKeys.includes(e.key.toUpperCase());
    const isModifierKey = e.ctrlKey || e.metaKey || e.shiftKey || e.altKey;

    if (e.key.toUpperCase() === 'F12' || (isForbiddenKey && isModifierKey)) {
      e.preventDefault();
      e.stopPropagation();
      handleDevToolsDetection();
    }
  };

  // Prevent right-click
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setTimeout(() => {
      if (detectDevTools()) {
        handleDevToolsDetection();
      }
    }, 500);
  };

  // Listen for events to block DevTools
  document.addEventListener('keydown', handleKeydown, true);
  document.addEventListener('contextmenu', handleContextMenu, true);

  // Protect console output
  const protectConsole = () => {
    const noop = () => undefined;
    const methods = ['log', 'debug', 'info', 'warn', 'error', 'clear'] as const;

    try {
      methods.forEach((method) => {
        (console as any)[method] = noop;
      });
    } catch (e) {}
  };

  startMonitoring();
  protectConsole();

  return () => {
    stopMonitoring();
    document.removeEventListener('keydown', handleKeydown, true);
    document.removeEventListener('contextmenu', handleContextMenu, true);
  };
};
