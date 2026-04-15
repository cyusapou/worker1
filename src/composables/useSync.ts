import { onMounted, onUnmounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth.store'

export function useSync() {
  const authStore = useAuthStore()
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
  let intervalId: any = null

  const pulse = async () => {
    if (!authStore.user?.id) return

    try {
      const response = await fetch(`${API_BASE}/api/system/pulse?userId=${authStore.user.id}&role=worker`)
      if (response.ok) {
        const data = await response.json()
        
        // 1. Update Global Messages Count
        if (authStore.user) {
          authStore.user.unreadMessagesCount = data.unreadMessagesCount
        }

        // 2. We can store the global stats in a new sync store or emit/provide them
        // For now, we'll just update the authStore with a new custom field if needed
        // but for WorkerDashboard, it still has its own polling for more granular data.
        // However, we want "all options" to be considered.
      }
    } catch (err) {
      console.error('Worker pulse sync error:', err)
    }
  }

  onMounted(() => {
    pulse()
    intervalId = setInterval(pulse, 30000)
  })

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
  })

  return {
    pulse
  }
}
