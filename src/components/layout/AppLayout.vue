<template>
  <div class="app-layout">
    <!-- Sidebar -->
    <AppSidebar :class="{ 'sidebar--mobile-open': isMobileMenuOpen }" />

    <!-- Main Content Area -->
    <div class="main-content" :class="{ 'main-content--collapsed': sidebarCollapsed }">
      <!-- Header -->
      <AppHeader @toggle-mobile="toggleMobileMenu" />

      <!-- Page Content -->
      <main class="page-content">
        <div class="content-wrapper">
          <!-- Page Content -->
          <div class="page-body">
            <slot></slot>
          </div>
        </div>
      </main>
    </div>

    <!-- Mobile Overlay -->
    <Transition name="fade">
      <div 
        v-if="isMobileMenuOpen" 
        class="mobile-overlay" 
        @click="closeMobileMenu"
      ></div>
    </Transition>

    <!-- Mobile Navigation Bar -->
    <MobileNav v-if="isMobile" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import MobileNav from './MobileNav.vue'
import { useSync } from '../../composables/useSync'
import { useWindowSize } from '@vueuse/core'

const route = useRoute()
const isMobileMenuOpen = ref(false)
const sidebarCollapsed = ref(false)

const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 768)
const isDashboard = computed(() => route.path === '/dashboard')

// Global Synchronization Heartbeat
useSync()

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Methods
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Lifecycle
onMounted(() => {
  // Add any initialization logic here
})

onUnmounted(() => {
  // Cleanup logic here
})
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}

/* Main Content Area */
.main-content {
  flex: 1;
  margin-left: 272px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.main-content--collapsed {
  margin-left: 76px;
}

/* Page Content */
.page-content {
  flex: 1;
  padding-top: 72px; /* Desktop Header height */
  overflow-y: auto;
  transition: padding 0.3s ease;
}

@media (max-width: 768px) {
  .page-content {
    padding-top: var(--mobile-header-height);
    padding-bottom: calc(var(--mobile-nav-height) + var(--safe-area-bottom));
  }
}

.content-wrapper {
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Page Body */
.page-body {
  min-height: 400px;
}

/* Mobile Overlay */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1023px) {
  .app-layout {
    flex-direction: column;
  }
  
  .main-content {
    margin-left: 0;
  }
  
  .app-header {
    left: 0;
    height: 56px;
  }
  
  .page-content {
    padding-top: 56px;
    padding-bottom: calc(72px + env(safe-area-inset-bottom));
  }
  
  .content-wrapper {
    padding: 12px;
  }
  
  .page-header {
    margin-bottom: 16px;
  }
  
  .page-header-content {
    flex-direction: column;
    gap: 12px;
  }
  
  .page-title {
    font-size: 18px;
  }
  
  .page-subtitle {
    font-size: 13px;
  }
  
  .mobile-overlay {
    display: block;
  }
  
  .breadcrumb-list {
    flex-wrap: wrap;
  }
}

@media (min-width: 640px) and (max-width: 1023px) {
  .sidebar {
    width: 72px;
  }
  
  .main-content {
    margin-left: 72px;
  }
  
  .app-header {
    left: 72px;
  }
  
  .content-wrapper {
    padding: 16px;
  }
  
  .page-title {
    font-size: 22px;
  }
}

@media (min-width: 1024px) {
  .page-content {
    padding-bottom: 0;
  }
  
  .mobile-overlay {
    display: none;
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  
  .content-wrapper {
    padding: 16px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .page-subtitle {
    font-size: 14px;
  }
  
  .mobile-overlay {
    display: block;
  }
  
  .breadcrumb-list {
    flex-wrap: wrap;
  }
}

@media (max-width: 640px) {
  .content-wrapper {
    padding: 12px;
  }
  
  .page-title {
    font-size: 20px;
  }
  
  .page-header {
    margin-bottom: 24px;
  }
  
  .page-actions {
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>
