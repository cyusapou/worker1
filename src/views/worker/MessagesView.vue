<template>
  <div class="messages-page">
    <div class="messages-layout">
      <!-- Conversation List -->
      <div class="conversations-panel">
        <div class="conversations-header">
          <h3>Messages</h3>
          <button class="new-msg-btn" @click="fetchConversations">
            <Icon icon="ph:arrows-clockwise" :class="{ 'spin': isFetchingConv }" />
          </button>
        </div>
        <div class="conversations-search">
          <Icon icon="ph:magnifying-glass" />
          <input type="text" placeholder="Search conversations..." v-model="searchConvo" />
        </div>
        <div class="conversations-list">
          <div
            v-for="convo in filteredConversations"
            :key="convo.id"
            class="conversation-item"
            :class="{ 'conversation-item--active': activeConvo === convo.id, 'conversation-item--unread': convo.unreadCount > 0 }"
            @click="selectConversation(convo.id)"
          >
            <div class="convo-avatar">{{ getInitials(convo.name) }}</div>
            <div class="convo-info">
              <div class="convo-name">{{ convo.name }}</div>
              <div class="convo-preview">{{ convo.lastMessage }}</div>
            </div>
            <div class="convo-meta">
              <span class="convo-time">{{ formatTime(convo.time) }}</span>
              <span v-if="convo.unreadCount > 0" class="convo-badge">{{ convo.unreadCount }}</span>
            </div>
          </div>
          
          <div v-if="conversations.length === 0 && !isFetchingConv" class="empty-list">
            <p>No conversations yet.</p>
          </div>
        </div>
      </div>

      <!-- Chat Panel -->
      <div class="chat-panel">
        <template v-if="activeConversation">
          <div class="chat-header">
            <div class="chat-user">
              <div class="chat-avatar">{{ getInitials(activeConversation.name) }}</div>
              <div>
                <div class="chat-name">{{ activeConversation.name }}</div>
                <div class="chat-status">{{ activeConversation.role }}</div>
              </div>
            </div>
            <button class="chat-action" @click="fetchMessages">
              <Icon icon="ph:arrows-clockwise" :class="{ 'spin': isFetchingMsgs }" />
            </button>
          </div>
          <div class="chat-messages" ref="chatContainer">
            <div
              v-for="msg in messages"
              :key="msg.id"
              class="message"
              :class="msg.senderId === workerId ? 'message--sent' : 'message--received'"
            >
              <div class="message-bubble">
                <p>{{ msg.text }}</p>
                <span class="message-time">{{ formatTime(msg.createdAt) }}</span>
              </div>
            </div>
          </div>
          <div class="chat-input">
            <input
              type="text"
              v-model="newMessage"
              placeholder="Type a message..."
              @keyup.enter="sendMessage"
              :disabled="isSending"
            />
            <button class="send-btn" @click="sendMessage" :disabled="!newMessage.trim() || isSending">
              <Icon v-if="!isSending" icon="ph:paper-plane-tilt-fill" />
              <Icon v-else icon="ph:circle-notch" class="spin" />
            </button>
          </div>
        </template>
        <div v-else class="chat-empty">
          <Icon icon="ph:chat-circle-dots" />
          <h3>Select a conversation</h3>
          <p>Choose a conversation from the left to start messaging</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useAuthStore } from '../../stores/auth.store'

const authStore = useAuthStore()
const workerId = computed(() => authStore.user?.id)
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

const searchConvo = ref('')
const activeConvo = ref<string | null>(null)
const newMessage = ref('')
const chatContainer = ref<HTMLElement | null>(null)

const conversations = ref<any[]>([])
const messages = ref<any[]>([])
const isFetchingConv = ref(false)
const isFetchingMsgs = ref(false)
const isSending = ref(false)
let pollingInterval: any = null

const fetchConversations = async () => {
  if (!workerId.value) return
  isFetchingConv.value = true
  try {
    const response = await fetch(`${API_BASE}/api/conversations?userId=${workerId.value}`)
    if (response.ok) {
      conversations.value = await response.json()
    }
  } catch (err) {
    console.error('Fetch conversations error:', err)
  } finally {
    isFetchingConv.value = false
  }
}

const fetchMessages = async () => {
  if (!workerId.value || !activeConvo.value) return
  isFetchingMsgs.value = true
  try {
    const response = await fetch(`${API_BASE}/api/messages?userId1=${workerId.value}&userId2=${activeConvo.value}`)
    if (response.ok) {
      messages.value = await response.json()
      await nextTick()
      scrollChat()
    }
  } catch (err) {
    console.error('Fetch messages error:', err)
  } finally {
    isFetchingMsgs.value = false
  }
}

const selectConversation = (id: string) => {
  activeConvo.value = id
  fetchMessages()
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || !activeConvo.value || !workerId.value) return
  isSending.value = true
  
  const text = newMessage.value
  newMessage.value = '' // Clear early for UX
  
  try {
    const response = await fetch(`${API_BASE}/api/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        senderId: workerId.value,
        receiverId: activeConvo.value,
        text
      })
    })
    
    if (response.ok) {
      const msg = await response.json()
      messages.value.push(msg)
      await nextTick()
      scrollChat()
      fetchConversations() // Update sidebar
    }
  } catch (err) {
    console.error('Send message error:', err)
    newMessage.value = text // Restore on error
  } finally {
    isSending.value = false
  }
}

const filteredConversations = computed(() => {
  if (!searchConvo.value) return conversations.value
  return conversations.value.filter(c => c.name.toLowerCase().includes(searchConvo.value.toLowerCase()))
})

const activeConversation = computed(() => conversations.value.find(c => c.id === activeConvo.value))

const getInitials = (name: string) => {
  if (!name) return '??'
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

const formatTime = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

const scrollChat = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

onMounted(() => {
  fetchConversations()
  // Simple polling for a "live" feel
  pollingInterval = setInterval(() => {
    fetchConversations()
    if (activeConvo.value) fetchMessages()
  }, 5000)
})

onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval)
})
</script>

<style scoped>
.messages-page { height: calc(100vh - 140px); }
.messages-layout { display: flex; height: 100%; background: white; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden; }

.conversations-panel { width: 340px; border-right: 1px solid #e5e7eb; display: flex; flex-direction: column; flex-shrink: 0; }
.conversations-header { display: flex; align-items: center; justify-content: space-between; padding: 20px; border-bottom: 1px solid #f1f5f9; }
.conversations-header h3 { margin: 0; font-size: 18px; font-weight: 700; color: #0f172a; }

.new-msg-btn { width: 36px; height: 36px; border-radius: 10px; border: none; background: #3b82f6; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
.new-msg-btn:hover { background: #2563eb; }

.conversations-search { display: flex; align-items: center; gap: 8px; margin: 12px 16px; padding: 0 14px; height: 40px; background: #f8fafc; border-radius: 10px; border: 1px solid #e5e7eb; }
.conversations-search svg { width: 16px; height: 16px; color: #94a3b8; flex-shrink: 0; }
.conversations-search input { flex: 1; border: none; background: none; font-size: 13px; color: #334155; outline: none; }

.conversations-list { flex: 1; overflow-y: auto; }
.conversation-item { display: flex; align-items: center; gap: 12px; padding: 14px 16px; cursor: pointer; border-left: 3px solid transparent; }
.conversation-item:hover { background: #f8fafc; }
.conversation-item--active { background: #eff6ff; border-left-color: #3b82f6; }
.conversation-item--unread .convo-name { font-weight: 800; color: #1e40af; }

.convo-avatar { width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; }
.convo-info { flex: 1; min-width: 0; }
.convo-name { font-size: 14px; font-weight: 600; color: #0f172a; }
.convo-preview { font-size: 13px; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.convo-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
.convo-time { font-size: 11px; color: #94a3b8; }
.convo-badge { min-width: 20px; height: 20px; padding: 0 6px; border-radius: 10px; background: #3b82f6; color: white; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; }

.chat-panel { flex: 1; display: flex; flex-direction: column; background: #fcfdfe; }
.chat-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid #f1f5f9; background: white; }
.chat-user { display: flex; align-items: center; gap: 12px; }
.chat-avatar { width: 40px; height: 40px; border-radius: 50%; background: #3b82f6; color: white; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; }
.chat-name { font-size: 15px; font-weight: 700; color: #0f172a; }
.chat-status { font-size: 12px; color: #94a3b8; }

.chat-messages { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
.message { display: flex; max-width: 80%; }
.message--sent { align-self: flex-end; }
.message--received { align-self: flex-start; }
.message-bubble { padding: 10px 16px; border-radius: 16px; position: relative; }
.message--sent .message-bubble { background: #3b82f6; color: white; border-bottom-right-radius: 4px; }
.message--received .message-bubble { background: white; color: #1e293b; border-bottom-left-radius: 4px; border: 1px solid #e2e8f0; }
.message-bubble p { margin: 0 0 4px; font-size: 14px; line-height: 1.5; }
.message-time { font-size: 10px; opacity: 0.7; }

.chat-input { display: flex; align-items: center; gap: 10px; padding: 16px 20px; background: white; border-top: 1px solid #f1f5f9; }
.chat-input input { flex: 1; height: 44px; padding: 0 16px; border: 1px solid #e5e7eb; border-radius: 12px; font-size: 14px; outline: none; transition: 0.2s; }
.chat-input input:focus { border-color: #3b82f6; }
.send-btn { width: 44px; height: 44px; border-radius: 12px; border: none; background: #3b82f6; color: white; transition: 0.2s; cursor: pointer; }
.send-btn:hover { transform: scale(1.05); }

.spin { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.chat-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #94a3b8; }
.empty-list { text-align: center; padding: 40px; color: #94a3b8; font-size: 14px; }
</style>
