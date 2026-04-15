<template>
  <div class="language-switcher" ref="switcherRef">
    <button class="switcher-button" @click="toggleDropdown" :aria-expanded="isOpen">
      <span class="flag-icon">{{ currentLocaleInfo?.flag }}</span>
      <span class="lang-native">{{ currentLocaleInfo?.native }}</span>
      <Icon icon="ph:caret-down" class="dropdown-icon" :class="{ 'is-open': isOpen }" />
    </button>

    <Transition name="fade">
      <div v-if="isOpen" class="language-dropdown">
        <div class="dropdown-header">
          {{ $t('common.selectLanguage') || 'Select Language' }}
        </div>
        <div class="locales-list">
          <button
            v-for="item in availableLocales"
            :key="item.code"
            class="locale-item"
            :class="{ active: item.code === currentLocale }"
            @click="handleLocaleChange(item.code)"
          >
            <span class="locale-flag">{{ item.flag }}</span>
            <div class="locale-info">
              <span class="locale-native">{{ item.native }}</span>
              <span class="locale-name">{{ item.name }}</span>
            </div>
            <Icon v-if="item.code === currentLocale" icon="ph:check" class="active-icon" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import { 
  availableLocales, 
  getCurrentLocale, 
  setLocale, 
  getLocaleInfo,
  type LocaleCode
} from '../../i18n'

const isOpen = ref(false)
const switcherRef = ref<HTMLElement | null>(null)

const currentLocale = computed(() => getCurrentLocale())
const currentLocaleInfo = computed(() => getLocaleInfo(currentLocale.value as LocaleCode))

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const handleLocaleChange = (code: string) => {
  setLocale(code as LocaleCode)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (switcherRef.value && !switcherRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.language-switcher {
  position: relative;
}

.switcher-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 40px;
}

.switcher-button:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.flag-icon {
  font-size: 18px;
  line-height: 1;
}

.lang-native {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.dropdown-icon {
  width: 14px;
  height: 14px;
  color: #6b7280;
  transition: transform 0.2s ease;
}

.dropdown-icon.is-open {
  transform: rotate(180deg);
}

.language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  z-index: 1000;
  overflow: hidden;
}

.dropdown-header {
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.locales-list {
  padding: 4px;
}

.locale-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  text-align: left;
}

.locale-item:hover {
  background: #f3f4f6;
}

.locale-item.active {
  background: #eff6ff;
  color: #1e40af;
}

.locale-flag {
  font-size: 20px;
  line-height: 1;
}

.locale-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.locale-native {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.active .locale-native {
  color: #1e40af;
}

.locale-name {
  font-size: 12px;
  color: #6b7280;
}

.active-icon {
  width: 16px;
  height: 16px;
  color: #2563eb;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 640px) {
  .lang-native {
    display: none;
  }
  
  .switcher-button {
    padding: 8px;
  }
}
</style>
