import React, { useState } from 'react';

interface DiscordConfig {
  webhookUrl: string;
  messageTemplate: string;
  botUsername: string;
}

export const DiscordConfigPanel: React.FC = () => {
  const [config, setConfig] = useState<DiscordConfig>({
    webhookUrl: '',
    messageTemplate: '🚀 New Event: {{body.title}}',
    botUsername: 'AutomationBot',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[Resend UI Save]:', config);
    alert('Configuration saved successfully.');
  };

  return (
    <div style={{
      maxWidth: '420px',
      padding: '24px',
      background: '#000000', // Deep pitch black Resend background
      color: '#ededed',
      borderRadius: '8px',
      border: '1px solid #222222', // Sharp, subtle dark border
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>
          Configure Discord Action
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#888888' }}>
          Route your workflow execution data into a Discord channel.
        </p>
      </div>
      
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* 1. Webhook URL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 500, color: '#888888' }}>Webhook URL</label>
          <input
            type="password"
            name="webhookUrl"
            value={config.webhookUrl}
            onChange={handleChange}
            placeholder="https://discord.com/api/webhooks/..."
            style={inputStyle}
            required
          />
        </div>

        {/* 2. Message Template */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 500, color: '#888888' }}>Message Template</label>
          <textarea
            name="messageTemplate"
            value={config.messageTemplate}
            onChange={handleChange}
            rows={4}
            placeholder="Write message template. Use {{body.key}} for variables."
            style={{ ...inputStyle, resize: 'none', lineHeight: '1.5' }}
            required
          />
        </div>

        {/* 3. Bot Username */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 500, color: '#888888' }}>Bot Username Override</label>
          <input
            type="text"
            name="botUsername"
            value={config.botUsername}
            onChange={handleChange}
            placeholder="AutomationBot"
            style={inputStyle}
          />
        </div>

        {/* Resend Style Action Button */}
        <button
          type="submit"
          style={{
            marginTop: '8px',
            padding: '10px',
            background: '#ffffff', // Crisp white button
            color: '#000000', // Pitch black text
            border: 'none',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#e1e1e1')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

// Shared style mimicking Resend's premium input fields
const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderRadius: '6px',
  border: '1px solid #222222',
  background: '#0a0a0a',
  color: '#ffffff',
  fontSize: '13px',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s ease',
};