'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatWidget.module.css';
import { clsx } from 'clsx';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const WEBHOOK_URL = '/api/chat';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Generar ID único para la sesión si no existe
        let id = sessionStorage.getItem('carolina_session_id');
        if (!id) {
            id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            sessionStorage.setItem('carolina_session_id', id);
        }
        setConversationId(id);

        // Mensaje de bienvenida inicial
        setMessages([
            {
                id: 'initial',
                text: '¡Hola! Soy Carolina, tu asistente de Advanced Health. ¿En qué puedo ayudarte hoy?',
                sender: 'bot',
                timestamp: new Date(),
            },
        ]);
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userText = inputValue.trim();
        const userMessage: Message = {
            id: Date.now().toString(),
            text: userText,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userText,
                    conversationId: conversationId,
                    timestamp: new Date().toISOString(),
                }),
            });

            if (!response.ok) throw new Error('Error de conexión');

            const data = await response.json();

            // Manejar diferentes formatos de respuesta de n8n
            let botResponseText = '';
            if (typeof data === 'string') {
                botResponseText = data;
            } else {
                botResponseText = data.output || data.response || data.message || data.text || 'He recibido tu mensaje, pero no tengo una respuesta clara ahora.';
            }

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: botResponseText,
                sender: 'bot',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'Lo siento, tuve un problema al conectar. Por favor intenta de nuevo en un momento.',
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.chatContainer}>
            {/* Ventana de Chat */}
            {isOpen && (
                <div className={styles.chatWindow}>
                    {/* Cabecera */}
                    <div className={styles.header}>
                        <div className={styles.headerInfo}>
                            <div className={styles.avatar}>
                                <span className="material-symbols-outlined">support_agent</span>
                            </div>
                            <div className={styles.headerText}>
                                <h3>Carolina</h3>
                                <div className={styles.status}>
                                    <div className={styles.statusDot}></div>
                                    <span>En línea</span>
                                </div>
                            </div>
                        </div>
                        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    {/* Área de Mensajes */}
                    <div className={styles.messages}>
                        {messages.map((msg) => (
                            <div key={msg.id} className={clsx(styles.message, styles[msg.sender])}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className={styles.loading}>
                                <div className={styles.dot}></div>
                                <div className={styles.dot}></div>
                                <div className={styles.dot}></div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Área de Entrada */}
                    <form className={styles.inputArea} onSubmit={handleSendMessage}>
                        <div className={styles.inputWrapper}>
                            <input
                                className={styles.input}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Escribe un mensaje..."
                                disabled={isLoading}
                            />
                            <button className={styles.sendBtn} type="submit" disabled={!inputValue.trim() || isLoading}>
                                <span className="material-symbols-outlined">send</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Burbuja Flotante */}
            <button
                className={clsx(styles.bubble, isOpen && styles.bubbleOpen)}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Abrir chat con Carolina"
            >
                <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                    {isOpen ? 'close' : 'chat'}
                </span>
            </button>
        </div>
    );
}
