/**
 * UTILIDADES DE NOTIFICACIÓN MODERNAS
 *
 * Sistema de notificaciones personalizado sin dependencias externas
 * Reemplaza completamente SweetAlert2 con una API moderna y consistente
 */

// Importar funciones localmente para el objeto de compatibilidad
import {
  showNotification,
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showLoading,
  closeLoading,
  triggerNotification,
  type NotificationType
} from './notifications';

// Re-exportar todas las funciones
export {
  showNotification,
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showLoading,
  closeLoading,
  triggerNotification,
  type NotificationType
};

// Funciones de confirmación usando el navegador nativo (temporal)
export const showConfirmation = async (
  title: string,
  text: string,
  confirmButtonText: string = "Confirmar",
  cancelButtonText: string = "Cancelar",
): Promise<{ isConfirmed: boolean; isDismissed?: boolean; isDenied?: boolean; dismiss?: string; value?: any }> => {
  const result = confirm(`${title}\n\n${text}`);
  return {
    isConfirmed: result,
    isDismissed: !result,
    dismiss: result ? undefined : 'cancel',
    value: result
  };
};

export const showDeleteConfirmation = async (
  itemName: string = "este elemento",
): Promise<{ isConfirmed: boolean; isDismissed?: boolean; isDenied?: boolean; dismiss?: string; value?: any }> => {
  const result = confirm(`¿Estás seguro de que deseas eliminar ${itemName}? Esta acción no se puede deshacer.`);
  return {
    isConfirmed: result,
    isDismissed: !result,
    dismiss: result ? undefined : 'cancel',
    value: result
  };
};

// Exportar todo bajo un objeto para compatibilidad
const notificationUtils = {
  showNotification,
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showConfirmation,
  showDeleteConfirmation,
  showLoading,
  closeLoading,
  triggerNotification,
};

export default notificationUtils;