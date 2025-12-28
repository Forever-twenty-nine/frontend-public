// Sistema de notificaciones personalizado sin dependencias externas
export type NotificationType = 'success' | 'error' | 'loading' | 'warning' | 'info';

// Configuración de notificaciones
interface NotificationOptions {
  duration?: number;
  position?: 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right';
}

// Contenedor global para las notificaciones
let notificationContainer: HTMLDivElement | null = null;
let isClient = false;

// Función para inicializar en el cliente
const initializeNotifications = () => {
  if (typeof window === 'undefined') return;
  isClient = true;
};

// Función para crear el contenedor si no existe
const createContainer = () => {
  if (!isClient || notificationContainer) return notificationContainer;

  notificationContainer = document.createElement('div');
  notificationContainer.id = 'custom-notification-container';
  notificationContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 2147483647;
    pointer-events: none;
    font-family: 'Satoshi, sans-serif', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  `;
  document.body.appendChild(notificationContainer);
  return notificationContainer;
};

// Función para crear una notificación
const createNotification = (message: string, type: NotificationType, options: NotificationOptions = {}) => {
  if (!isClient) return null;

  const { duration = 3000, position = 'top-center' } = options;

  const container = createContainer();
  if (!container) return null;

  // Crear el elemento de notificación
  const notification = document.createElement('div');
  notification.style.cssText = `
    background: ${getBackgroundColor(type)};
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    font-size: 14px;
    font-weight: 500;
    max-width: 400px;
    word-wrap: break-word;
    pointer-events: auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: slideIn 0.3s ease-out;
    position: relative;
    overflow: hidden;
    min-width: 300px;
    justify-content: flex-start;
  `;

  // Agregar icono
  const icon = document.createElement('span');
  icon.textContent = getIcon(type);
  icon.style.fontSize = '16px';
  notification.appendChild(icon);

  // Agregar mensaje
  const text = document.createElement('span');
  text.textContent = message;
  notification.appendChild(text);

  // Agregar barra de progreso para notificaciones con duración
  if (duration > 0 && type !== 'loading') {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: rgba(255, 255, 255, 0.7);
      animation: progress ${duration}ms linear;
    `;
    notification.appendChild(progressBar);
  }

  // Agregar al contenedor
  container.appendChild(notification);

  // Función para remover la notificación
  const removeNotification = () => {
    notification.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  };

  // Evento de click para cerrar
  notification.addEventListener('click', removeNotification);

  // Auto-remover después de la duración (excepto loading)
  if (duration > 0 && type !== 'loading') {
    setTimeout(removeNotification, duration);
  }

  return {
    id: Date.now().toString(),
    remove: removeNotification
  };
};

// Funciones auxiliares
const getBackgroundColor = (type: NotificationType): string => {
  switch (type) {
    case 'success': return '#10B981';
    case 'error': return '#EF4444';
    case 'warning': return '#F59E0B';
    case 'loading': return '#6B7280';
    case 'info':
    default: return '#3B82F6';
  }
};

const getIcon = (type: NotificationType): string => {
  switch (type) {
    case 'success': return '✓';
    case 'error': return '✕';
    case 'warning': return '⚠';
    case 'loading': return '⏳';
    case 'info':
    default: return 'ℹ';
  }
};

// Función principal para mostrar notificaciones
export const showNotification = (
  message: string,
  type: NotificationType = 'info',
  options?: NotificationOptions
) => {
  // Crear una notificación visual simple
  if (isClient) {
    // Crear un elemento de notificación temporal
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${getBackgroundColor(type)};
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 9999;
      font-family: Arial, sans-serif;
      font-size: 14px;
      max-width: 300px;
      word-wrap: break-word;
      cursor: pointer;
      animation: slideInRight 0.3s ease-out;
    `;

    notification.innerHTML = `<strong>${getIcon(type)}</strong> ${message}`;

    // Agregar animación CSS si no existe
    if (!document.getElementById('notification-animations')) {
      const style = document.createElement('style');
      style.id = 'notification-animations';
      style.textContent = `
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto-remover después de 3 segundos
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideInRight 0.3s ease-in reverse';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }
    }, options?.duration || 3000);

    // Click para cerrar
    notification.addEventListener('click', () => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    });

    return { id: Date.now().toString(), remove: () => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }};
  }

  // Server-side logging
  return null;
};

// Funciones de conveniencia
export const showSuccess = (message: string, options?: NotificationOptions) =>
  showNotification(message, 'success', options);

export const showError = (message: string, options?: NotificationOptions) =>
  showNotification(message, 'error', options);

export const showWarning = (message: string, options?: NotificationOptions) =>
  showNotification(message, 'warning', options);

export const showInfo = (message: string, options?: NotificationOptions) =>
  showNotification(message, 'info', options);

export const showLoading = (message: string = 'Procesando...', options?: NotificationOptions) =>
  showNotification(message, 'loading', { ...options, duration: 0 });

// Función para cerrar notificaciones
export const closeLoading = (notificationId?: string) => {
  if (!isClient) return;

  if (notificationId) {
    // Si se proporciona un ID específico, buscar y remover esa notificación
    const container = notificationContainer;
    if (container) {
      const notifications = container.querySelectorAll('[data-notification-id]');
      notifications.forEach((notif) => {
        if ((notif as HTMLElement).dataset.notificationId === notificationId) {
          (notif as HTMLElement).click(); // Simular click para remover con animación
        }
      });
    }
  } else {
    // Cerrar todas las notificaciones de loading
    const container = notificationContainer;
    if (container) {
      const loadingNotifications = container.querySelectorAll('div');
      loadingNotifications.forEach((notif) => {
        const element = notif as HTMLElement;
        if (element.textContent?.includes('⏳')) {
          element.click();
        }
      });
    }
  }
};

// Función para notificación rápida
export const triggerNotification = (
  message: string,
  type: NotificationType = 'info',
  duration?: number
) => {
  const options = duration ? { duration } : {};
  return showNotification(message, type, options);
};

// Agregar estilos CSS para las animaciones
const addStyles = () => {
  if (typeof window === 'undefined' || document.getElementById('custom-notification-styles')) return;

  const style = document.createElement('style');
  style.id = 'custom-notification-styles';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }

    @keyframes progress {
      from {
        width: 100%;
      }
      to {
        width: 0%;
      }
    }
  `;
  document.head.appendChild(style);
};

// Inicializar estilos cuando se importa el módulo
if (typeof window !== 'undefined') {
  initializeNotifications();
  addStyles();
}

// Exportar todo bajo un objeto para compatibilidad
const notificationUtils = {
  showNotification,
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showLoading,
  closeLoading,
  triggerNotification,
};

export default notificationUtils;